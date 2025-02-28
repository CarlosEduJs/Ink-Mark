"use client";

import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import Shortcut from "./shortcut";

export default function SearchBarBtn() {
  const { setOpen } = useAppContext();

  return (
    <>
      <Button
        size={"sm"}
        variant={"ghost"}
        className="bg-secondary text-muted-foreground flex justify-between min-w-52 w-full"
        onClick={() => setOpen(true)}
      >
        Search in app...
        <Shortcut shortchut="k"/>
      </Button>
    </>
  );
}
