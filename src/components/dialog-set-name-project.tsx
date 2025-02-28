"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import { useAppContext } from "@/contexts/AppContext";
import { Pencil } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import InputField from "./input-field";
import Shortcut from "./shortcut";

export default function DialogSetNameProject() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    openEditNameProjectDialog,
    setOpenEditNameProjectDialog,
    variables,
    updateVariable,
  } = useAppContext();
  const isMobile = useIsMobile();

  const variableData = variables.find((v) => v.keyProps === "projectName");
  const [inputValue, setInputValue] = useState(variableData?.value);

  const handleSetNameProject = () => {
    updateVariable("projectName", inputValue || "");
    setIsOpen(false);
  };

  useEffect(() => {
    setInputValue(variableData?.value);
  }, [variableData?.value]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            <Pencil />
            <span className="sr-only md:not-sr-only">Edit Name Project</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-6 px-6 pb-2">
          <DrawerHeader>
            <DrawerTitle>Set Name Project</DrawerTitle>
            <DrawerDescription>
              This is the name of the project that will be used in the README.md
              file.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-3 px-3">
            <InputField
              label="Project Name"
              id="project-name"
              value={inputValue || ""}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="type name project here..."
            />
            <Button onClick={handleSetNameProject}>Set Name Project</Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  const handleSubmit = () => {
    handleSetNameProject();
    setOpenEditNameProjectDialog(false);
  };

  return (
    <Dialog
      open={openEditNameProjectDialog}
      onOpenChange={setOpenEditNameProjectDialog}
    >
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"} className="h-6 text-xs border-none">
          <Pencil />
          <span className="sr-only md:not-sr-only">Edit Name Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Name Project</DialogTitle>
          <DialogDescription>
            This is the name of the project that will be used in the README.md
            file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 ">
          <InputField
            label="Project Name"
            id="project-name"
            value={inputValue || ""}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="type name project here..."
          />
          <Button onClick={handleSubmit}>Set Name Project</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
