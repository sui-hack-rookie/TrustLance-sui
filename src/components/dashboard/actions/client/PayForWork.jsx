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


export default function PayForWorkAction({ contractId, setForceRender }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Pay for Work</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pay for Work</DialogTitle>
        </DialogHeader>
        {/*  */}
      </DialogContent>
    </Dialog>
  )
}