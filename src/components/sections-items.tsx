import { cn } from "@/lib/utils";
import { useAppContext } from "./app-provider";
import { type Section } from "./sections-to-use";
import { Check, Hand, ListRestart, Plus, Trash } from "lucide-react";
import DialogEditCustomSection from "./dialog-edit-custom-section";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SectionItemProps {
  section: Section;
  isInAside: boolean;
  isCustomSection?: boolean;
}

function SectionItemInSectionAddeds({ section, isInAside }: SectionItemProps) {
  const {
    currentSection,
    removeSection,
    setCurrentSection,
    addSection,
    resetCodeSection,
    cSections,
  } = useAppContext();
  const isSelected = section.label === currentSection?.label;

  const handleRemoveSection = (section: Section) => {
    removeSection(section.id);
    toast("Section deleted successfully", {
      action: {
        label: "Undo",
        onClick: () => addSection(section),
      },
    });
  };

  const isInCustomSection = cSections.find(
    (cSection) => section.id === cSection.id
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="button"
      tabIndex={0}
      aria-label={`Select section ${section.label}`}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setCurrentSection(section);
      }}
      onKeyDown={(e) => e.key === "Enter" && setCurrentSection(section)}
      className={cn(
        "group focus:ring-2 focus:ring-primary focus:outline-none flex items-center justify-between min-w-fit border px-2 rounded-md cursor-pointer transition-all duration-300 py-1 hover:dark:bg-secondary/50 hover:bg-secondary",
        isSelected && "dark:bg-secondary/50 bg-secondary"
      )}
    >
      <div
        className="flex items-center gap-2 w-full"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentSection(section);
        }}
      >
        <div
          role="button"
          aria-label="Drag section"
          className="flex items-center gap-2"
        >
          <Hand className="w-4 h-4 hover:text-primary cursor-pointer text-muted-foreground" />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-3 w-full justify-between">
            <span className="text-sm font-semibold">{section.label}</span>
            {isInCustomSection && (
              <Badge className="h-4 mr-2">Custom Section</Badge>
            )}
          </div>
          <span
            className={cn(
              `text-xs text-muted-foreground w-52 truncate`,
              !isInAside && "w-3/4"
            )}
            aria-label={
              section.description
                ? `Description: ${section.description}`
                : "No description"
            }
          >
            {section.description || "Not description added"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label={`Reset code for ${section.label}`}
          onClick={(e) => {
            e.stopPropagation();
            resetCodeSection(section);
          }}
          className="p-1 hover:text-primary focus:ring-2 focus:ring-primary rounded"
        >
          <ListRestart className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          aria-label={`Delete section ${section.label}`}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveSection(section);
          }}
          className="p-1 hover:text-red-500 focus:ring-2 focus:ring-red-500 rounded"
        >
          <Trash className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

function SectionItem({
  section,
  isInAside,
  isCustomSection,
}: SectionItemProps) {
  const { addSection, handleRemoveCustomSection, handleNewCustomSection } =
    useAppContext();

  const handleAddSection = (section: Section) => {
    if (!section.added) {
      addSection(section);
    }
  };

  const removeCustomSection = (section: Section) => {
    handleRemoveCustomSection(section.id);
    toast("Section deleted successfully", {
      action: {
        label: "Undo",
        onClick: () => handleNewCustomSection(section),
      },
    });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Add section ${section.label}`}
      onDoubleClick={() => handleAddSection(section)}
      onKeyDown={(e) => e.key === "Enter" && handleAddSection(section)}
      className="group focus:ring-2 focus:outline-none focus:ring-primary flex items-center justify-between min-w-fit px-2 rounded-md cursor-pointer transition-all duration-300 py-1 hover:dark:bg-secondary/50 hover:bg-secondary"
    >
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center gap-2">
          {section.added ? (
            <span
              aria-hidden="true"
              className="w-4 h-4 text-muted-foreground px-1"
            >
              <Check className="w-4 h-4 " />
            </span>
          ) : (
            <button
              aria-label={`Add ${section.label} section`}
              onClick={() => handleAddSection(section)}
              className="p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-primary rounded"
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold">{section.label}</span>
          <span
            className={cn(
              `text-xs text-muted-foreground w-52 truncate`,
              !isInAside && "w-3/4"
            )}
            aria-label={
              section.description
                ? `Description: ${section.description}`
                : "No description"
            }
          >
            {section.description || "Not description added"}
          </span>
        </div>
        {isCustomSection && (
          <div className="flex items-center gap-3">
            <DialogEditCustomSection section={section} />
            <button
              aria-label={`Delete custom section ${section.label}`}
              onClick={(e) => {
                e.stopPropagation();
                removeCustomSection(section);
              }}
              className="p-1 hover:text-red-500 focus:ring-2 focus:ring-red-500 rounded"
            >
              <Trash className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { SectionItemInSectionAddeds, SectionItem };
