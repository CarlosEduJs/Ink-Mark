"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { File, Search, TableOfContents } from "lucide-react";
import { DefaultSectionGroups } from "./sections-to-use";
import { useAppContext } from "./app-provider";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

type Pages = {
  page: string;
  href: string;
};

const pages: Pages[] = [
  {
    page: "Home",
    href: "/",
  },
  {
    page: "App",
    href: "/app",
  },
  {
    page: "FAQ",
    href: "/faq",
  },
  {
    page: "Templates",
    href: "/templates",
  },
  {
    page: "Github Project",
    href: "https://github.com/CarlosEduJs",
  },
];



export default function CommandApp() {
  const { addSection, setOpen, open } = useAppContext();
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);

  const filteredPages = pages.filter((page) =>
    page.page.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSectionGroups = DefaultSectionGroups.map((group) => {
    const filteredSections = group.sections.filter((section) =>
      section.label.toLowerCase().includes(search.toLowerCase())
    );
    return {
      ...group,
      sections: filteredSections,
    };
  }).filter((group) => {
    return (
      group.label.toLowerCase().includes(search.toLowerCase()) ||
      group.sections.length > 0
    );
  });

  const totalItems =
    filteredPages.length +
    filteredSectionGroups.reduce(
      (acc, group) => acc + group.sections.length,
      0
    );

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "Escape") {
          setOpen(false);
        }

        if (e.key === "ArrowDown") {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev === null || prev >= totalItems - 1 ? 0 : prev + 1
          );
        }

        if (e.key === "ArrowUp") {
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev === null || prev <= 0 ? totalItems - 1 : prev - 1
          );
        }

        if (e.key === "Enter" && focusedIndex !== null) {
          e.preventDefault();
          const itemIndex = focusedIndex;
          if (itemIndex < filteredPages.length) {
            window.location.href = filteredPages[itemIndex].href;
          } else {
            const sectionIndex = itemIndex - filteredPages.length;
            let currentIndex = 0;
            for (const group of filteredSectionGroups) {
              if (sectionIndex < currentIndex + group.sections.length) {
                addSection(group.sections[sectionIndex - currentIndex]);
                setOpen(false);
                break;
              }
              currentIndex += group.sections.length;
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    open,
    focusedIndex,
    totalItems,
    filteredPages,
    filteredSectionGroups,
    addSection,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-background shadow-lg max-w-[500px] w-full">
        <DialogHeader className="hidden">
          <DialogTitle className="sr-only">Command Dialog</DialogTitle>
          <DialogDescription className="sr-only">
            Command Dialog
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center border-b py-1 px-3">
          <Search className="h-5 w-5 mr-3 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none border-none bg-transparent h-10 font-semibold text-sm"
            aria-label="Search for pages and sections"
          />
        </div>

        <ScrollArea className="max-h-[400px]">
          <div className="flex flex-col">
            {filteredPages.length > 0 && (
              <nav aria-label="Pages" className="border-b mb-3">
                <h3 className="text-muted-foreground font-semibold text-xs mb-2 px-3">
                  Pages
                </h3>
                <ul>
                  {filteredPages.map((page, index) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className={cn(
                          "p-2 hover:bg-accent rounded-md cursor-pointer text-sm font-semibold flex items-center gap-2 px-3",
                          focusedIndex === index && "bg-accent"
                        )}
                        tabIndex={0}
                        aria-label={`Go to ${page.page}`}
                        onFocus={() => setFocusedIndex(index)}
                      >
                        <File className="w-4 h-4" />
                        {page.page}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {filteredSectionGroups.length > 0 && (
              <nav aria-label="Available Sections">
                <ul>
                  {filteredSectionGroups.map((group, groupIndex) => (
                    <li key={group.id}>
                      <h4 className="text-xs text-muted-foreground mb-1 px-3">
                        {group.label}
                      </h4>
                      <ul>
                        {group.sections.map((section, sectionIndex) => {
                          const itemIndex =
                            filteredPages.length +
                            filteredSectionGroups
                              .slice(0, groupIndex)
                              .reduce(
                                (acc, group) => acc + group.sections.length,
                                0
                              ) +
                            sectionIndex;
                          return (
                            <li key={section.label}>
                              <div
                                className={cn(
                                  "p-2 hover:bg-accent rounded-md cursor-pointer text-sm font-semibold flex items-center gap-2 px-3",
                                  focusedIndex === itemIndex && "bg-accent"
                                )}
                                tabIndex={0}
                                aria-label={`Add ${section.label} section`}
                                onClick={() => {
                                  addSection(section);
                                  setOpen(false);
                                }}
                                onFocus={() => setFocusedIndex(itemIndex)}
                              >
                                <TableOfContents className="w-4 h-4" />
                                {section.label}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {filteredPages.length === 0 &&
              filteredSectionGroups.length === 0 && (
                <div className="p-2 text-muted-foreground text-sm px-3">
                  Nenhum resultado encontrado.
                </div>
              )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
