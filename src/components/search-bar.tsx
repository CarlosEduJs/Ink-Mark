"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command } from "lucide-react";
import { cn } from "@/lib/utils";

import { useAppContext } from "./app-provider";

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
        <div
          className={cn(
            `w-8 h-6 bg-muted-foreground/10 rounded-md flex items-center justify-center border border-border text-xs`
          )}
        >
          <Command className="w-2 h-2" />K
        </div>
      </Button>
    </>
  );
}
