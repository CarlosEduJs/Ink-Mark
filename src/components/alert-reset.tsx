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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function AlertReset() {
  const { handleReset, openResetDialog, setOpenResetDialog } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <AlertDialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className={cn(!isMobile && `h-6 text-xs border-none`)}
        >
          <RotateCcw />
          <span className="sr-only md:not-sr-only">Reset Project</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will reset all saved data for
            your project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleReset}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
