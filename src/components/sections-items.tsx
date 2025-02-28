import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import { type Section } from "./sections-to-use";
import {
  CheckCircle,
  Ellipsis,
  Hand,
  Layers2,
  ListRestart,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import DialogEditCustomSection from "./dialog-edit-custom-section";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { group } from "console";

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
    setMode,
    mode,
    isSaving,
  } = useAppContext();
  const isSelected = section.label === currentSection?.label;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleRemoveSection = (section: Section) => {
    removeSection(section.id);
    toast("Section deleted successfully", {
      action: {
        label: "Undo",
        onClick: () => addSection(section),
      },
    });
  };

  const handleDuplicateSection = (section: Section) => {
    const newId = uuidv4();
    const newLabel = section.label + "(Duplicate)";

    const duplicateSection: Section = {
      ...section,
      label: newLabel,
      id: newId,
    };

    addSection(duplicateSection);
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

  const handleSelect = () => {
    if (isSaving) return;
    setCurrentSection(section);
    if (mode === "Preview") setMode("Editor");
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
        handleSelect();
      }}
      onKeyDown={(e) => e.key === "Enter" && !isSaving && handleSelect}
      className={cn(
        "group focus:ring-2 focus:ring-primary focus:outline-none flex items-center justify-between min-w-fit border px-2 rounded-md cursor-pointer transition-all duration-300 py-1 hover:dark:bg-secondary/50 hover:bg-secondary",
        isSelected && "dark:bg-secondary/50 bg-secondary",
        isSaving && "opacity-50"
      )}
    >
      <div
        className="flex items-center gap-2 w-full"
        onClick={(e) => {
          e.stopPropagation();
          handleSelect();
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
            <span className="text-sm font-semibold max-w-44 truncate">
              {section.label}
            </span>
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
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Open variable options"
            role="button"
            aria-haspopup="true"
          >
            <Ellipsis aria-hidden="true" />
            <span className="sr-only">Show Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-52">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleDuplicateSection(section);
                setDropdownOpen(false);
              }}
            >
              <Layers2 />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onMouseDown={(e) => {
                e.stopPropagation();
                resetCodeSection(section);
                setDropdownOpen(false);
              }}
            >
              <ListRestart />
              Reset code
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 text-red-500 cursor-pointer"
              onMouseDown={(e) => {
                e.stopPropagation();
                handleRemoveSection(section);
                setDropdownOpen(false);
              }}
            >
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SectionItem({
  section,
  isInAside,
  isCustomSection,
}: SectionItemProps) {
  const {
    addSection,
    handleRemoveCustomSection,
    handleNewCustomSection,
    sections,
  } = useAppContext();

  const findSectionInSections = sections.find((s) => s.id === section.id);

  const handleAddSection = (section: Section) => {
    const data: Section = {
      ...section,
      added: true,
    };
    if (!section.added) {
      addSection(data);
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
          {findSectionInSections ? (
            <span aria-hidden="true" className="w-4 h-4 text-muted-foreground">
              <CheckCircle className="w-4 h-4" />
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
