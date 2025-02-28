"use client";

import { useAppContext } from "@/contexts/AppContext";
import AvailableSectionGroups from "./avaliable-sections-group";
import AddedSectionsList from "./added-sections-list";
import AddedCustomSectionsList from "./customs-sections-list";
import { GripHorizontal } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface BlockListsProps {
  isInAside: boolean;
}

export default function BlockLists({ isInAside }: BlockListsProps) {
  const { sections, availableGroups, cSections } = useAppContext();
  return (
    <PanelGroup direction="vertical" className="h-full">
      <Panel defaultSize={33} minSize={20} className="flex-grow">
        <AddedSectionsList sections={sections} isInAside={isInAside} />
      </Panel>

      <PanelResizeHandle className="w-full h-2 bg-background border text-muted-foreground hover:text-muted hover:bg-primary transition-colors relative rounded-md">
        <div className="absolute inset-0 flex items-center justify-center">
          <GripHorizontal className="w-4 h-4" />
        </div>
      </PanelResizeHandle>

      <Panel defaultSize={33} minSize={20} className="flex-grow">
        <AvailableSectionGroups
          isInAside={isInAside}
          groups={availableGroups}
        />
      </Panel>

      <PanelResizeHandle className="w-full h-2 bg-background border text-muted-foreground hover:text-muted hover:bg-primary transition-colors relative rounded-md">
        <div className="absolute inset-0 flex items-center justify-center">
          <GripHorizontal className="w-4 h-4 " />
        </div>
      </PanelResizeHandle>

      <Panel defaultSize={33} minSize={20} className="flex-grow ">
        <AddedCustomSectionsList sections={cSections} isInAside={isInAside} />
      </Panel>
    </PanelGroup>
  );
}
