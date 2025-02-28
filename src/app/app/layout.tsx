"use client";

import Header from "@/components/header";
import AsideSectionsToUse from "@/components/aside-sections-to-use";
import CommandApp from "@/components/command-app";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { GripVertical } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAppContext } from "@/contexts/AppContext";
import DialogHelp from "@/components/dialog-help";
import BottomBar from "@/components/bottom-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const { asideOpen} = useAppContext();

  return (
    <div className="overflow-hidden">
      <Header isHome={true} />
      <main className="flex justify-between gap-3 w-full">
        {!isMobile && asideOpen ?  (
          <PanelGroup direction="horizontal" className="flex-1">
            <Panel
              defaultSize={25}
              minSize={20}
              maxSize={30}
              className="overflow-y-auto"
            >
              <AsideSectionsToUse />
            </Panel>
            <PanelResizeHandle className="w-2 bg-background border-r text-muted-foreground hover:text-muted hover:bg-primary transition-colors relative rounded-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <GripVertical className="w-4 h-4" />
              </div>
            </PanelResizeHandle>
            <Panel defaultSize={60} minSize={50} className="overflow-y-auto">
              <main className="h-full w-full">{children}</main>
            </Panel>
          </PanelGroup>
        ) : (
          <main className="h-full w-full flex-1 overflow-y-auto">
            {children}
          </main>
        )}
        <CommandApp />
      </main>
      <DialogHelp />
      <BottomBar />
      
    </div>
  );
}
