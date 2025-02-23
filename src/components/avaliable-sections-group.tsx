import { SectionItem } from "./sections-items";
import { SectionGroup } from "./sections-to-use";
import { cn } from "@/lib/utils";
import SearchBarBtn from "./search-bar";

interface AvailableSectionGroupsProps {
  groups: SectionGroup[];
  isInAside: boolean;
}

export default function AvailableSectionGroups({
  groups,
  isInAside,
}: AvailableSectionGroupsProps) {
  const totalSections = groups.reduce(
    (total, group) => total + group.sections.length,
    0
  );

  return (
    <nav
      aria-labelledby="available-sections-heading"
      className={cn(
        `flex py-6 gap-4 flex-col overflow-y-auto w-full`,
        isInAside ? `h-[300px] border-r` : `h-[490px] px-4`
      )}
    >
      <header className="w-full bg-background sticky top-[-24] py-2 flex flex-col gap-2 z-50 px-1">
        <h1
          id="available-sections-heading"
          className="text-sm font-semibold text-muted-foreground"
        >
          Available Sections ({totalSections})
        </h1>
        <div role="search">
          <SearchBarBtn aria-label="Search available sections" />
        </div>
      </header>
      <div role="list" className="flex flex-col gap-9">
        {groups.map((group) => (
          <section
            key={group.id}
            aria-labelledby={`group-${group.id}-heading`}
            className="flex flex-col gap-3 px-4 pb-2 border-b"
          >
            <h2 id={`group-${group.id}-heading`} className="font-bold text-sm">
              {group.label}
            </h2>
            <div className="flex flex-col gap-2" role="group">
              {group.sections.length > 0 ? (
                group.sections.map((section) => (
                  <div key={section.id} role="listitem">
                    <SectionItem section={section} isInAside={isInAside} />
                  </div>
                ))
              ) : (
                <div
                  className="text-xs text-muted-foreground px-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  No sections in this group
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </nav>
  );
}
