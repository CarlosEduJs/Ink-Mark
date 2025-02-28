"use client";

import {
  Clipboard,
  ClipboardCheck,
  Code,
  Download,
  Eye,
  PanelLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "sonner";
import SheetVariables from "./sheet-variables";
import DialogSetNameProject from "./dialog-set-name-project";
import { AlertReset } from "./alert-reset";
import { ModeProps } from "@/types";
import { cn } from "@/lib/utils";

export default function BottomBar() {
  const {
    sections,
    markdownCode,
    copyFullCode,
    setCopyFullCode,
    mode,
    setMode,
    currentSection,
    setCurrentSection,
    isSaving,
  } = useAppContext();

  const isSectionsEmpty = sections.length === 0;

  const modeButtons: ModeProps[] = [
    {
      mode: "Preview",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      mode: "Split View",
      icon: <PanelLeft className="w-4 h-4" />,
    },
    {
      mode: "Editor",
      icon: <Code className="w-4 h-4" />,
    },
  ];

  const copyToClipboard = (text: string) => {
    setCopyFullCode(true);
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Full code copied to clipboard!");
        setTimeout(() => {
          setCopyFullCode(false);
        }, 2000);
      })
      .catch((err) => {
        toast("Error when copying code");
        setTimeout(() => {
          setCopyFullCode(false);
        }, 2000);
      });
  };

  const contentCopy = markdownCode;

  const handleDownload = () => {
    const blob = new Blob([contentCopy], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className=" hidden fixed bottom-3 left-1/2 -translate-x-1/2 md:flex flex-col min-w-[710px]">
      <div className="flex items-center px-10 ">
        <div className="flex items-center gap-2 border border-b-0 rounded-t-md mx-auto h-8 px-1 w-fit bg-background shadow-md shadow-primary/10">
          {modeButtons.map((button) => (
            <Button
              key={button.mode}
              variant={"ghost"}
              disabled={isSaving}
              className={cn(
                "h-6 text-xs",
                mode === button.mode &&
                  "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
              onClick={() => {
                setMode(button.mode);
                setCurrentSection(currentSection);
              }}
            >
              {button.icon}{" "}
              <span className="max-sm:sr-only text-xs">{button.mode}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 border rounded-full h-8 px-1 bg-background shadow-md shadow-muted-foreground/10">
        <Button
          size={"sm"}
          className="h-6 text-xs"
          disabled={isSectionsEmpty}
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          Download readme.md
        </Button>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="h-6 text-xs"
          disabled={isSectionsEmpty}
          onClick={() => copyToClipboard(contentCopy)}
        >
          {copyFullCode ? (
            <ClipboardCheck className="w-4 h-4" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
          <span className="max-sm:sr-only">Copy all code</span>
        </Button>
        <SheetVariables />
        <DialogSetNameProject />
        <AlertReset />
      </div>
    </div>
  );
}
