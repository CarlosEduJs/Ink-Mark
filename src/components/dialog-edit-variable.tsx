import { Check, PencilLine } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {  useAppContext, Variables } from "@/contexts/AppContext";
import { toast } from "sonner";
import VariableForm from "./variable-form";

export default function DialogEditVariable({
  keyProps,
  value,
  note,
  isStandard,
}: Variables) {
  const [keyVAR, setKeyVAR] = useState(keyProps);
  const [valueVAR, setValueVAR] = useState(value);
  const [noteVar, setNoteVar] = useState(note || "");
  const [open, onOpenChange] = useState(false);
  const [toggleNote, setToggleNote] = useState(false);
  const isMobile = useIsMobile();
  const { updateVariable } = useAppContext();

  useEffect(() => {
    setKeyVAR(keyVAR);
    setValueVAR(valueVAR);
    setNoteVar(noteVar);
    if (note) setToggleNote(true);
  }, [keyVAR, valueVAR, noteVar]);

  const handleOnChangeInputKEY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyVAR(e.target.value);
  };

  const handleOnChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueVAR(e.target.value);
  };

  const handleOnChangeInputNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteVar(e.target.value);
  };

  const handleToggle = () => {
    setToggleNote((toggle) => !toggle);
  };

  const btnSubmitIsDisabled =
    !valueVAR ||
    !keyVAR ||
    keyVAR.length < 3 ||
    keyVAR.length > 15 ||
    valueVAR.length < 2 ||
    noteVar.length > 200;

  const handleEditVariable = () => {
    const dataVariable: Variables = {
      keyProps: keyVAR,
      value: valueVAR,
      isStandard,
    };

    if (toggleNote) {
      dataVariable.note = noteVar;
    }

    updateVariable(
      dataVariable.keyProps,
      dataVariable.value,
      dataVariable.note
    );
    toast("Variable updated as success!");
    onOpenChange(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger className="flex items-center gap-2 px-2 text-sm py-1 hover:bg-accent w-full rounded-sm">
          <PencilLine className="w-4 h-4" />
          Edit Variable
        </DrawerTrigger>
        <DrawerContent className="max-w-full flex">
          <DrawerHeader className="px-12">
            <DrawerTitle>Edit Variable</DrawerTitle>
            <DrawerDescription>
              Edit custom variables and use them in your project
            </DrawerDescription>
          </DrawerHeader>
          <VariableForm
            keyVAR={keyVAR}
            valueVAR={valueVAR}
            noteVAR={noteVar}
            toggleNote={toggleNote}
            handleOnChangeInputKEY={handleOnChangeInputKEY}
            handleOnChangeInputVALUE={handleOnChangeInputValue}
            handleOnChangeInputNOTE={handleOnChangeInputNote}
            handleToggle={handleToggle}
            isMobile={isMobile}
          />
          <div className="flex items-center gap-4 justify-end my-4 px-12">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={btnSubmitIsDisabled}
              size={"sm"}
              onClick={handleEditVariable}
            >
              <Check /> Edit
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className="flex items-center gap-2 px-2 text-sm py-1 hover:bg-accent w-full rounded-sm">
        <PencilLine className="w-4 h-4" />
        Edit Variable
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Variable</DialogTitle>
          <DialogDescription>
            Edit custom variables and use them in your project
          </DialogDescription>
        </DialogHeader>
        <VariableForm
          keyVAR={keyVAR}
          valueVAR={valueVAR}
          noteVAR={noteVar}
          toggleNote={toggleNote}
          handleOnChangeInputKEY={handleOnChangeInputKEY}
          handleOnChangeInputVALUE={handleOnChangeInputValue}
          handleOnChangeInputNOTE={handleOnChangeInputNote}
          handleToggle={handleToggle}
          isMobile={isMobile}
        />
        <DialogFooter className="flex items-center gap-4 justify-end">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={btnSubmitIsDisabled}
            size={"sm"}
            onClick={handleEditVariable}
          >
            <Check /> Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
