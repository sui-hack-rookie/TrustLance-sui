import { deleteContract } from "../../../lib/firestore";
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

export default function DeleteContractAction({ contractId, setForceRender }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Contract</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Contract</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <DialogDescription>
            Are you sure you want to delete this contract?
          </DialogDescription>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <Button variant="outline" size="lg">
                No
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                size="lg"
                onClick={async () => {
                  await deleteContract(contractId);
                  setForceRender((i) => i + 1);
                }}
              >
                Yes
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
