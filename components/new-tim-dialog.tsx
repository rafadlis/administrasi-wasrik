import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { NewTeamForm } from "./new-team-form";

export function NewTimDialog({
  className,
  buttonVariant,
}: {
  className?: string;
  buttonVariant?: "default" | "outline";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant={buttonVariant}>
          + Tambah Tim
        </Button>
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
