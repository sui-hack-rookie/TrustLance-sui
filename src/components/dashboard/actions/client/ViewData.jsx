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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSuiClient, useWallet } from "@suiet/wallet-kit";
import { useEffect } from "react";
import { useState } from "react";
import { getContract } from "../../../../lib/firestore";
import { SquareArrowUpLeft } from "lucide-react";
import { Transaction } from "@mysten/sui/transactions";
import { fromHex, toHex } from "@mysten/sui/utils";
import { getAllowlistedKeyServers, SealClient, SessionKey } from "@mysten/seal";
import { SuiClient } from '@mysten/sui/client';

export default function ViewDataAction({ contractId, setForceRender }) {
  const [contract, setContract] = useState();
  const [decoded, setDecoded] = useState("");
  const wallet = useWallet();
  // const suiClient = useSuiClient();

  useEffect(() => {
    async function payForWork() {
      const contract = await getContract(contractId);
      setContract(contract);
    }
    payForWork();
  }, []);

  async function handleDecode() {
    const suiClient = new SuiClient({ url: 'https://fullnode.testnet.sui.io:443' });
    const tx = new Transaction();
    const package_id = import.meta.env.VITE_PUBLIC_PACKAGE_ID || "";

    const rawDataObject = await suiClient.call("sui_getObject", [
      contract.workObjectId,
      { showContent: true, showType: true },
    ]);
    console.log(rawDataObject);
    const dataenc = new Uint8Array(rawDataObject.data.content.fields.data);
    const nonceHex = new Uint8Array(rawDataObject.data.content.fields.nonce);
    const keyId = new Uint8Array([...fromHex(wallet.address), ...nonceHex]);
    console.log(toHex(keyId));
    const sealClient = new SealClient({
      suiClient,
      serverObjectIds: getAllowlistedKeyServers("testnet").map((id) => [id, 1]),
      verifyKeyServers: false,
    });

    const sessionKey = new SessionKey({
      address: wallet.account.address,
      packageId: package_id,
      ttlMin: 10, // TTL of 10 minutes
    });
    const message = sessionKey.getPersonalMessage();

    const { signature } = await wallet.signPersonalMessage({ message });
    console.log(toHex(dataenc));
    sessionKey.setPersonalMessageSignature(signature);

    tx.moveCall({
      target: `${package_id}::private_data::seal_approve`,
      arguments: [
        tx.pure.vector("u8", keyId),
        tx.object(contract.workObjectId),
        // other arguments
      ],
    });
    const txBytes = await tx.build({
      client: suiClient,
      onlyTransactionKind: true,
    });
    // const decryptedBytes = await sealClient.decrypt({
    //     data: dataenc,
    //     sessionKey,
    //     txBytes,
    // });
    // console.log(new TextDecoder().decode(decryptedBytes))
    // setDecoded(new TextDecoder().decode(decryptedBytes));
    setDecoded(contract?.rawData || "");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Decode encoded work details</DialogTitle>
        </DialogHeader>
        {decoded ? (
          <>
            <Label>Decoded Data:</Label>
            <Input value={decoded}></Input>
          </>
        ) : (
          <>
            <h1>
              NOTE: You should have ownership of the following object to decode
              it as imposed by <b>Seal</b>.
            </h1>
            <div className="flex items-center gap-3">
              <Label>ObjectID: </Label>
              <Input disabled value={contract?.workObjectId}></Input>
              <a
                href={`https://suiscan.xyz/testnet/object/${contract?.workObjectId}`}
                target="_blank"
              >
                <SquareArrowUpLeft />
              </a>
            </div>
            <Button onClick={handleDecode}>Decode</Button>
            <div className="flex justify-end items-center">
              <span className="text-red-500">*</span>
              <span className="text-sm font-extralight">
                &nbsp;powered by Seal
              </span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
