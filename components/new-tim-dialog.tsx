import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { NewTeamForm } from "./new-team-form";

export function NewTimDialog({ className }: { className: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className}>+ Tambah Tim</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Tim</DialogTitle>
        </DialogHeader>
        <NewTeamForm />
      </DialogContent>
    </Dialog>
  );
}
