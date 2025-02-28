"use client";

import { useEffect, useState } from "react";
import { type Section } from "./sections-to-use";
import { cn } from "@/lib/utils";
import { SectionItem } from "./sections-items";
import DialogNewAddCustomSection from "./dialog-new-add-custom-section";

interface AddedCustomSectionProps {
  sections: Section[];
  isInAside: boolean;
}

export default function AddedCustomSectionsList({
  sections,
  isInAside,
}: AddedCustomSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-labelledby="custom-sections-heading"
      className={cn(
        `flex py-6 gap-4 flex-col w-full border-r h-full  overflow-y-auto`,
        isScrolled && "top top-24 w-full"
      )}
    >
      <header className="px-4 sticky top-0 w-full bg-background flex items-center justify-between">
        <h1
          id="custom-sections-heading"
          className="text-sm font-semibold text-muted-foreground"
        >
          Custom Sections ({sections.length})
        </h1>
        <DialogNewAddCustomSection aria-label="Create new custom section" />
      </header>

      <div role="list" className="flex flex-col gap-9">
        <div className="flex flex-col gap-3 px-4 pb-2">
          <div className="flex flex-col gap-2" role="group">
            {sections.length > 0 ? (
              sections.map((section) => (
                <div key={section.id} role="listitem">
                  <SectionItem
                    section={section}
                    isInAside={isInAside}
                    isCustomSection={true}
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
    </nav>
  );
}
