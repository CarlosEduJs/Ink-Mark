import { useState } from "react";
import { Trash2 } from "lucide-react";
import {  useAppContext } from "@/contexts/AppContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface AlertDialogProps {
  keyProps: string;
}

export default function AlertDialogDeleteVariable({
  keyProps,
}: AlertDialogProps) {
  const [open, setOpen] = useState(false);
  const { removeVariable } = useAppContext();

  const handleVariableRemove = () => {
    removeVariable(keyProps);
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex items-center gap-2 px-2 text-sm py-1 hover:bg-accent w-full rounded-sm text-red-500">
        <Trash2 className="w-4 h-4" />
        Remove Variable
      </AlertDialogTrigger>
      <AlertDialogContent className="min-w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            When you click on Remove Variable, you can no longer recover it, do
            you want to continue with the action?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleVariableRemove}>
            Remove Variable
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
