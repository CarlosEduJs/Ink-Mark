import { DiamondPlus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAppContext } from "@/contexts/AppContext";
import { useCallback, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { type Section } from "./sections-to-use";
import { v4 as uuidv4 } from "uuid";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import InputField from "./input-field";
import { toast } from "sonner";
import Shortcut from "./shortcut";

export default function DialogNewAddCustomSection() {
  const [nameCustomSection, setNameCustomSection] = useState("");
  const [descriptionCustomSection, setDescriptionCustomSection] = useState("");
  const [open, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    handleNewCustomSection,
    handleRemoveCustomSection,
    openNewCustomSectionDialog,
    setOpenNewCustomSectionDialog,
  } = useAppContext();
  const btnSubmitDisabled = !nameCustomSection || nameCustomSection.length < 3;

  const handleSubmit = useCallback(() => {
    const newId = uuidv4();

    const newCustomSection: Section = {
      id: newId,
      label: nameCustomSection,
      description: descriptionCustomSection,
      default: false,
      added: false,
      code: `## ${nameCustomSection}`,
      defaultCode: `## ${nameCustomSection}`,
    };

    handleNewCustomSection(newCustomSection);
    setNameCustomSection("");
    setDescriptionCustomSection("");
    toast("Section created successfully", {
      action: {
        label: "Undo",
        onClick: () => handleRemoveCustomSection(newCustomSection.id),
      },
    });
    setIsOpen(false);
    setOpenNewCustomSectionDialog(false);
  }, [nameCustomSection, descriptionCustomSection, handleNewCustomSection]);

  const onChangeNameCustomSection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameCustomSection(e.target.value);
  };

  const onChangeDescriptionCustomSection = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionCustomSection(e.target.value);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            <DiamondPlus />
            <span className="sr-only">Add new Custom Section</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-2 px-4">
          <DrawerHeader>
            <DrawerTitle>Add new Custom Sectiom</DrawerTitle>
            <DrawerDescription>
              Please enter name and description (opcional) to you custom section.
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full grid gap-2 ">
            <InputField
              label="Name Section"
              id="name-section"
              value={nameCustomSection}
              onChange={(e) => onChangeNameCustomSection(e)}
              type="text"
              placeholder="ex: Features"
            />
            <InputField
              label="Description Section"
              id="description-section"
              value={descriptionCustomSection}
              onChange={(e) => onChangeDescriptionCustomSection(e)}
              type="text"
              placeholder="ex: This section displays the main features"
            />
          </div>
          <div className="flex items-center justify-between my-3 px-3">
            <Button
              size={"sm"}
              onClick={handleSubmit}
              disabled={btnSubmitDisabled}
            >
              Confirm
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={openNewCustomSectionDialog}
      onOpenChange={setOpenNewCustomSectionDialog}
    >
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <DiamondPlus />
          <span className="sr-only">Add new Custom Section</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add new Custom Sectiom</DialogTitle>
          <DialogDescription>
            Please enter name and description (opcional) to you custom section.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full grid gap-2 ">
          <InputField
            label="Name Section"
            id="name-section"
            value={nameCustomSection}
            onChange={(e) => onChangeNameCustomSection(e)}
            type="text"
            placeholder="ex: Features"
          />
          <InputField
            label="Description Section"
            id="description-section"
            value={descriptionCustomSection}
            onChange={(e) => onChangeDescriptionCustomSection(e)}
            type="text"
            placeholder="ex: This section displays the main features"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button size={"sm"} onClick={handleSubmit} disabled={btnSubmitDisabled}>
            Confirm
          </Button>
          <Button
            variant={"outline"}
            size={"sm"}
            
            onClick={() => setOpenNewCustomSectionDialog(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
