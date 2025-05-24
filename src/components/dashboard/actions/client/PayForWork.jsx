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
import { endContract, getContract } from "../../../../lib/firestore";
import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSuiClient, useWallet } from "@suiet/wallet-kit";
import { useToast } from "@/hooks/use-toast";


export default function PayForWorkAction({ contract, setForceRender }) {
  const [isOpen, setIsOpen] = useState(false);
  const wallet = useWallet();
  const suiClient = useSuiClient();
  const { toast } = useToast();

  
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
    await endContract(contract.id);
    toast({
      title: "Contract completed!!",
      description: "The freelancer has got his payment. View data to get access to the freelancers' work ",
    });
    setIsOpen(false);
    setForceRender(prev => !prev);
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Pay for Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for Work</DialogTitle>
        </DialogHeader>
        <h1>You are about to pay the freelancer and recieve the work.</h1>
        <Label>Amount: </Label><Input disabled value={contract.terms.rate}></Input>
        <Button onClick={handlePay}>Pay</Button>
      </DialogContent>
    </Dialog>
  )
}