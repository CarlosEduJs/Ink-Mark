"use client";

import { useAppContext } from "./app-provider";
import { AlignLeft } from "@geist-ui/icons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import AvailableSectionGroups from "./avaliable-sections-group";
import AddedSectionsList from "./added-sections-list";
import { Button } from "./ui/button";
import AddedCustomSectionsList from "./customs-sections-list";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DrawerMenu() {
  const { sections, availableGroups, customSections } = useAppContext();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <AlignLeft className="cursor-pointer" />
          <h1 className="sr-only">Show Sections</h1>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[750px]">
        <DrawerHeader>
          <DrawerTitle className="sr-only">Sections</DrawerTitle>
          <DrawerDescription className="sr-only">
            Sections to use
          </DrawerDescription>
        </DrawerHeader>
        <nav className="flex flex-col gap-2 w-full h-full overflow-y-auto">
          <AddedSectionsList sections={sections} isInAside={false} />
          <AddedCustomSectionsList
            sections={customSections}
            isInAside={false}
          />
          <AvailableSectionGroups isInAside={false} groups={availableGroups} />
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
