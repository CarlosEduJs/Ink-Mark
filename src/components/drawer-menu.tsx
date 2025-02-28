"use client";

import { useAppContext } from "@/contexts/AppContext";
import { AlignLeft } from "@geist-ui/icons";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import BlockLists from "./block-lists";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function DrawerMenu() {
  const { openDrawer, setOpenDrawer } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
      <DrawerTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className={cn(
            `min-w-fit `,
            !isMobile && "md:min-w-52"
          )}
        >
          <AlignLeft className="cursor-pointer" />
          <h1 className="md:not-sr-only sr-only">Show Sections</h1>
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
          <BlockLists isInAside={false} />
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
