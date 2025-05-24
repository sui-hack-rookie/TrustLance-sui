import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import {
  EncryptedObject,
  getAllowlistedKeyServers,
  SealClient,
  SessionKey,
} from "@mysten/seal";
import { SuiClient } from "@mysten/sui/client";
import { Keypair, Signer } from "@mysten/sui/cryptography";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction, TransactionDataBuilder } from "@mysten/sui/transactions";
import { fromHex, toHex } from "@mysten/sui/utils";
import { useSuiClient, useWallet } from "@suiet/wallet-kit";
import { turnInContractWork } from "../../../../lib/firestore";
import { useToast } from "@/hooks/use-toast";

export default function TurnInWorkAction({ contract, setForceRender }) {
  const [workDetails, setWorkDetails] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wallet = useWallet();
  const suiClient = useSuiClient();
  const { toast } = useToast();

  const handleWorkSubmit = async (event) => {
    event.preventDefault();
    // STEP 1: Create a object id containing encrypted work data of freelancer, protected by seal
    const package_id = import.meta.env.VITE_PUBLIC_PACKAGE_ID || "";
    const creator = wallet.address;
    const nonceHex =
      "0x" +
      crypto
        .getRandomValues(new Uint8Array(8))
        .reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
    const data = new TextEncoder().encode(workDetails);
    const keyId = toHex(
      new Uint8Array([...fromHex(creator), ...fromHex(nonceHex)]),
    );
    console.log(keyId);
    const sealClient = new SealClient({
      suiClient,
      serverObjectIds: getAllowlistedKeyServers("testnet"),
      verifyKeyServers: false,
    });
    // Compute key ID (Seal does this internally using address + nonce)
    const encrypted = await sealClient.encrypt({
      threshold: 2,
      packageId: package_id,
      data,
      id: keyId,
    });
    console.log(encrypted);

    const tx = new Transaction();
    tx.moveCall({
      target: `${package_id}::private_data::store_entry`,
      arguments: [
        tx.pure.vector("u8", fromHex(nonceHex)),
        tx.pure.vector("u8", encrypted.encryptedObject),

        // other arguments
      ],
    });
    const signedTx = await wallet.signTransaction({
      transaction: tx,
    });
    
    const txData = await suiClient.executeTransactionBlock({
      transactionBlock: signedTx.bytes,
      signature: [signedTx.signature],
      options: {
        showObjectChanges: true,
      },
    });

    console.log("executed:", txData);
    
    const objectId = txData.objectChanges.find((change) => change.type === "created")?.objectId;
    if (!objectId) {
      console.error("Failed to create object");
      return;
    }
    console.log("objectId: ", objectId);
    // STEP 2: build a transaction to move ownership of object from freelancer to client
    const txn = new Transaction();
    txn.transferObjects(
        [txn.object(objectId)],
        txn.pure.address(contract.client.walletAddr)
    );
    const signedTxn = await wallet.signTransaction({
      transaction: txn,
    });
    // await suiClient.executeTransactionBlock({
    //   transactionBlock: signedTxn.bytes,
    //   signature: [signedTxn.signature]
    // });
    await turnInContractWork(contract.id, objectId, keyId, {
      transactionBlock: signedTxn.bytes,
      signature: [signedTxn.signature]
    })
    toast({
      title: "Waiting on Client for review.",
      description: "Dont worry we have not yet shared your work. The work will be passed on to the client when they pay for it.",
    });
    setIsOpen(false);
    setForceRender(prev => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Turn in Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Turn in Work</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleWorkSubmit}>
          <div className="grid gap-4">
            <div>
              <label>Proposed Amount</label>
              <Input value={contract.terms.rate} disabled className="w-full" />
            </div>
            <div>
              <label>Work Details</label>
              <Textarea
                rows={5}
                required
                value={workDetails}
                onChange={(e) => setWorkDetails(e.target.value)}
                placeholder="Enter a link to your work... (github, figma, etc.)"
                className="w-full"
              />
            </div>
            <div className="flex flex-col">
              <Button type="submit">Upload work to SUI Blockchain</Button>
              <div className="flex justify-end items-center">
                <span className="text-red-500">*</span>
                <span className="text-sm font-extralight">
                  &nbsp;powered by Seal
                </span>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
