import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { getContract } from "../../../../lib/firestore";
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient, useWallet } from "@suiet/wallet-kit";


export default function PayForWorkAction({ contractId, setForceRender }) {
  const [amount, setAmount] = useState(0);
  const [contract, setContract] = useState();
  const wallet = useWallet();
  const suiClient = useSuiClient();

  
  useEffect(() => {
    async function payForWork() {
      const contract = await getContract(contractId);
      setContract(contract);
      setAmount(contract.terms.rate);
    }
    payForWork();
  }, [])
  
  async function handlePay() {
    const txn = new Transaction();
    const [coin] = txn.splitCoins(txn.gas, [txn.pure.u64(Number(0.1 * Math.pow(10, 9)))]);

    txn.transferObjects([coin], txn.pure.address(contract.freelancer.walletAddr));

    const signedTxn = await wallet.signTransaction({
      transaction: txn,
    });
    
    await suiClient.executeTransactionBlock({
      transactionBlock: signedTxn.bytes,
      signature: [signedTxn.signature]
    });
    await suiClient.executeTransactionBlock(contract.freelancer.txn);
    // awazt turnInContractWork(contract.id, objectId, {
    //   transactionBlock: signedTxn.bytes,
    //   signature: [signedTxn.signature]
    // })
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Pay for Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for Work</DialogTitle>
        </DialogHeader>
        <h1>You are about to pay the freelancer and recieve the work.</h1>
        <Label>Amount: </Label><Input disabled value={amount}></Input>
        <Button onClick={handlePay}>Pay</Button>
      </DialogContent>
    </Dialog>
  )
}