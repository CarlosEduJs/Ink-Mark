"use client";

import CodeEditor from "./editor";
import { Button } from "./ui/button";
import { Download } from "@geist-ui/icons";
import { useAppContext } from "./app-provider";
import DialogSetNameProject from "./dialog-set-name-project";
import { MarkdownPreview } from "./preview-markdown";
import DrawerMenu from "./drawer-menu";
import { FileQuestion, X } from "lucide-react";

export default function BlockAppView() {
  const { projectName, sections, currentSection } = useAppContext();

  const isSectionsEmpty = sections.length === 0;
  const isNotCurrentSection = !currentSection;

  return (
    <section
      id="app-view"
      className="flex flex-col gap-4 py-6 max-md:px-5 overflow-y-auto"
    >
      <header className="flex flex-col gap-2 md:px-4">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <DrawerMenu />
          </div>
          <h1 className="text-2xl font-bold">{projectName}</h1>
          <DialogSetNameProject />
        </div>
        <p className="text-sm text-muted-foreground pl-12 md:px-0 ">
          This is the app view area where you can write your content, select to
          show editor or preview.
        </p>
      </header>
      <div className="flex items-center border-b border-border justify-between w-full px-3">
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            className="rounded-b-none border-b-transparent"
            disabled={isSectionsEmpty}
          >
            <Download className="w-4 h-4" />
            Download readme.md
          </Button>
        </div>
      </div>
      <div className="flex gap-2 max-w-full h-full px-3 max-md:flex-col overflow-y-auto">
        {isSectionsEmpty ? (
          <IsEmptyBlock />
        ) : isNotCurrentSection ? (
          <IsNotCurrentSection />
        ) : (
          <>
            <CodeEditor />
            <MarkdownPreview />
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
