import { useEffect } from "react";
import { useState } from "react";
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

export default function ViewObjectAction({ contract, setForceRender }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  // const wallet = useWallet();
  // const suiClient = useSuiClient();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>View Work Object</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Work Object</DialogTitle>
        </DialogHeader>
        <a
          href={`https://suiscan.xyz/testnet/object/${contract?.workObjectId}`}
          target="_blank"
        >
          <Button>Go to object</Button>
        </a>
      </DialogContent>
    </Dialog>
  );
}
