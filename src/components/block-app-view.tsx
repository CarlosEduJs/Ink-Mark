"use client";

import CodeEditor from "./editor";
import { Button } from "./ui/button";
import { Download } from "@geist-ui/icons";
import { useAppContext } from "@/contexts/AppContext";
import DialogSetNameProject from "./dialog-set-name-project";
import { MarkdownPreview } from "./preview-markdown";
import DrawerMenu from "./drawer-menu";
import {
  Clipboard,
  ClipboardCheck,
  FileQuestion,
  GripVertical,
  Loader,
  PanelLeftClose,
  PanelRightClose,
  X,
} from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { AlertReset } from "./alert-reset";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import SheetVariables from "./sheet-variables";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

export default function BlockAppView() {
  const {
    sections,
    currentSection,
    setAsideOpen,
    asideOpen,
    markdownCode,
    copyFullCode,
    setCopyFullCode,
    variables,
    mode,
    setIsSaving,
    isSaving,
    updateSection,
    code,
    setCode,
  } = useAppContext();
  const isSectionsEmpty = sections.length === 0;
  const isNotCurrentSection = !currentSection;
  const isMobile = useIsMobile();



  const handleAsideOpen = () => {
    setAsideOpen((open) => !open);
  };

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

  const handleCodeChange = useCallback(
    debounce(async (value: string) => {
      if (!currentSection) return;

      setIsSaving(true);
      setCode(value);

      try {
        await updateSection({
          ...currentSection,
          code: value,
        });
      } catch (error) {
        console.error("Error updating section:", error);
      } finally {
        setIsSaving(false);
      }
    }, 600),
    [currentSection, updateSection]
  );

  return (
    <section
      id="app-view"
      className="flex flex-col gap-4 py-3 max-md:px-1 overflow-y-auto "
    >
      <header className="flex flex-col gap-2 md:px-4 px-2 ">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleAsideOpen}
            variant={"ghost"}
            size={"icon"}
            className="hidden md:flex"
          >
            {asideOpen ? (
              <>
                <PanelLeftClose />
                <span className="sr-only">Close</span>
              </>
            ) : (
              <>
                <PanelRightClose />
                <span className="sr-only">Show</span>
              </>
            )}
          </Button>
          {(!asideOpen || isMobile) && <DrawerMenu />}
          <div className="flex items-center justify-between gap-3 w-full md:flex-row ">
            <h1 className="text-2xl font-bold">{variables[0].value}</h1>
            <div className="flex items-center gap-2 md:hidden">
              <DialogSetNameProject />
              <AlertReset />
            </div>
          </div>
          {isSaving && (
            <div className="flex items-center gap-1">
              <Loader className="animate-spin  w-4 h-4" />
              <span className="text-muted-foreground text-xs">Saving...</span>
            </div>
          )}
        </div>
        <span className="text-muted-foreground text-xs">
          Press Ctrl + Alt + H to open the Dialog Help
        </span>
      </header>
      <div className="flex items-center justify-between w-full px-3">
        <div className="flex items-center gap-2 md:hidden">
          <Button
            size={"sm"}
            disabled={isSectionsEmpty}
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download readme.md
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className=" "
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
        </div>
      </div>
      <div className="flex gap-2 max-w-full h-full px-3">
        {isSectionsEmpty ? (
          <IsEmptyBlock />
        ) : isNotCurrentSection ? (
          <IsNotCurrentSection />
        ) : (
          <>
            {isMobile ? (
              <div className="flex flex-col w-full">
                <CodeEditor
                  key={currentSection?.id}
                  currentSection={currentSection}
                  mode={mode as "Editor" | "Preview" | "Split View"}
                  onCodeChange={handleCodeChange as any}
                  code={code}
                />
                <MarkdownPreview />
              </div>
            ) : (
              <>
                {mode === "Split View" ? (
                  <PanelGroup
                    direction={"horizontal"}
                    className="w-full h-[80vh]"
                  >
                    <Panel defaultSize={50} minSize={30}>
                      <CodeEditor
                        key={currentSection?.id}
                        currentSection={currentSection}
                        mode={mode as "Editor" | "Preview" | "Split View"}
                        onCodeChange={handleCodeChange as any}
                        code={code}
                      />
                    </Panel>
                    <PanelResizeHandle className="w-2 bg-background border text-muted-foreground hover:text-muted hover:bg-primary transition-colors relative rounded-md">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <GripVertical className="w-4 h-4" />
                      </div>
                    </PanelResizeHandle>
                    <Panel defaultSize={50} minSize={30}>
                      <MarkdownPreview />
                    </Panel>
                  </PanelGroup>
                ) : (
                  <>
                    <div
                      className={cn(
                        "w-full h-[80vh]",
                        mode !== "Editor" && "hidden"
                      )}
                    >
                      <CodeEditor
                        key={currentSection?.id}
                        currentSection={currentSection}
                        mode={mode as "Editor" | "Preview" | "Split View"}
                        onCodeChange={handleCodeChange as any}
                        code={code}
                      />
                    </div>
                    <div
                      className={cn(
                        "w-full h-[80vh]",
                        mode !== "Preview" && "hidden"
                      )}
                    >
                      <MarkdownPreview />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function IsEmptyBlock() {
  return (
    <div className="flex flex-col p-3 w-full h-[500px] border justify-center rounded-lg items-center">
      <X className="w-32 h-32 text-red-500" />
      <h1 className="text-4xl font-semibold">No sections added</h1>
      <h2 className="text-xl text-muted-foreground">
        To continue, please add a section.
      </h2>
    </div>
  );
}

function IsNotCurrentSection() {
  return (
    <div className="flex flex-col p-3 w-full h-[500px] border justify-center rounded-lg items-center">
      <FileQuestion className="w-32 h-32 text-blue-500" />
      <h1 className="text-4xl font-semibold">No section selected</h1>
      <h2 className="text-xl text-muted-foreground">
        To continue, select a section in the left sidebar.
      </h2>
    </div>
  );
}
