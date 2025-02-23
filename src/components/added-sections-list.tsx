"use client";

import { useEffect, useState } from "react";
import { type Section } from "./sections-to-use";
import { cn } from "@/lib/utils";
import { SectionItemInSectionAddeds } from "./sections-items";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAppContext } from "./app-provider";

interface AddedSectionsListProps {
  sections: Section[];
  isInAside: boolean;
}

export default function AddedSectionsList({
  sections,
  isInAside,
}: AddedSectionsListProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [orderedSections, setOrderedSections] = useState(sections);
  const { reorderSections } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setOrderedSections(sections);
  }, [sections]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderSections(active.id, over.id);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <nav
        aria-labelledby="sections-added-heading"
        className={cn(
          `flex py-6 gap-4 flex-col w-full border-r  overflow-y-auto border-b`,
          isScrolled && "top top-24 w-full", isInAside && "h-[200px]"
        )}
      >
        <h1
          id="sections-added-heading"
          className="text-sm font-semibold text-muted-foreground px-4 sticky top-0 w-full bg-background"
        >
          Sections Addeds ({sections.length})
        </h1>
        <SortableContext
          items={sections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div role="list" className="flex flex-col gap-9">
            <div className="flex flex-col gap-3 px-4 pb-2 ">
              <div className="flex flex-col gap-2" role="group">
                {sections.length > 0 ? (
                  sections.map((section) => (
                    <div key={section.id} role="listitem">
                      <SectionItemInSectionAddeds
                        section={section}
                        isInAside={isInAside}
                      />
                    </div>
                  ))
                ) : (
                  <div
                    className="text-xs text-muted-foreground px-2"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    No sections added yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </SortableContext>
      </nav>
    </DndContext>
  );
}
