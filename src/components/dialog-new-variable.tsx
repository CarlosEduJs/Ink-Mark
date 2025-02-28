import { Pencil, Plus } from "lucide-react";
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
import InputField from "./input-field";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useAppContext, Variables } from "@/contexts/AppContext";
import { toast } from "sonner";
import VariableForm from "./variable-form";

export default function DialogNewVariable() {
  const [keyVAR, setKeyVAR] = useState("");
  const [valueVAR, setValueVAR] = useState("");
  const [noteVar, setNoteVar] = useState("");
  const [open, onOpenChange] = useState(false);
  const [toggleNote, setToggleNote] = useState(false);
  const isMobile = useIsMobile();
  const { addVariable } = useAppContext();

  useEffect(() => {
    setKeyVAR(keyVAR);
    setValueVAR(valueVAR);
    setNoteVar(noteVar);
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

  const handleNewVariable = () => {
    const dataVariable: Variables = {
      keyProps: keyVAR,
      value: valueVAR,
      isStandard: false,
    };

    if (toggleNote) {
      dataVariable.note = noteVar;
    }

    addVariable(dataVariable);
    toast("Variable created as success!");
    onOpenChange(false);
    setKeyVAR("");
    setNoteVar("");
    setToggleNote(false);
    setValueVAR("");
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button size={"sm"}>
            <Plus />
            Add Variable
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-w-full flex">
          <DrawerHeader className="px-12">
            <DrawerTitle>Add New Variable</DrawerTitle>
            <DrawerDescription>
              Create custom variables and use them in your project
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
              onClick={handleNewVariable}
            >
              <Plus /> Create
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <Plus />
          Add Variable
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[400px]">
        <DialogHeader>
          <DialogTitle>Add New Variable</DialogTitle>
          <DialogDescription>
            Create custom variables and use them in your project
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
            onClick={handleNewVariable}
          >
            <Plus /> Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
