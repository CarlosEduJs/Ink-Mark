"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useAppContext } from "./app-provider";
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

export default function DialogSetNameProject() {
  const [isOpen, setIsOpen] = useState(true);
  const { setProjectName, projectName } = useAppContext();
  const isMobile = useIsMobile();

  const handleSetNameProject = (name: string) => {
    setProjectName(name);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button size={"sm"} variant={"outline"}>
            <Pencil className="w-2 h-2" />
            <span className="text-xs sr-only md:not-sr-only">
              Edit Name Project
            </span>
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
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              placeholder="type name project here..."
            />
            <Button onClick={() => handleSetNameProject(projectName)}>
              Set Name Project
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} variant={"outline"}>
          <Pencil className="w-2 h-2" />
          <span className="text-xs">Edit Name Project</span>
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
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type="text"
            placeholder="type name project here..."
          />
          <Button onClick={() => handleSetNameProject(projectName)}>
            Set Name Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
