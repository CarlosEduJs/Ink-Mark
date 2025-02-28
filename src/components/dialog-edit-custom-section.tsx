import { DiamondPlus, PencilLine } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {  useAppContext } from "@/contexts/AppContext";
import { useCallback, useEffect, useState } from "react";
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

interface EditCustomSection {
  section: Section;
}

export default function DialogEditCustomSection({
  section,
}: EditCustomSection) {
  const [customData, setCustomData] = useState<Section>(section)
  const [nameCustomSection, setNameCustomSection] = useState(customData.label);
  const [descriptionCustomSection, setDescriptionCustomSection] = useState(
    customData.description
  );
  const [open, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { updateCustomSection } = useAppContext();
  const btnSubmitDisabled = !nameCustomSection || nameCustomSection.length < 3;

  useEffect(() => {
    setCustomData(section)
  }, []);

  const handleSubmit = useCallback(() => {
    const editCustomSection: Section = {
      id: customData.id,
      label: nameCustomSection,
      description: descriptionCustomSection,
      default: customData.default,
      added: customData.added,
      code: customData.code,
    };

    updateCustomSection(editCustomSection);

    setIsOpen(false);
  }, [nameCustomSection, descriptionCustomSection, updateCustomSection]);

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
          <Button variant={"ghost"} size={"sm"}>
            <PencilLine />
            <span className="sr-only">Edit Custom Section</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-2 px-4">
          <DrawerHeader>
            <DrawerTitle>Edit Custom Sectiom</DrawerTitle>
            <DrawerDescription>
              Please enter name and description to you custom section.
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
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <PencilLine />
          <span className="sr-only">Edit Custom Section</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Custom Section</DialogTitle>
          <DialogDescription>
            Please enter name and description to you custom section.
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
      </DialogContent>
    </Dialog>
  );
}
