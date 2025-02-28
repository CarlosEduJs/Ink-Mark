import { useAppContext } from "@/contexts/AppContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Section } from "./sections-to-use";
import { Badge } from "./ui/badge";

export default function SelectSetCurrentSection() {
  const {
    sections,
    currentSection,
    setCurrentSection,
    cSections,
    openChangeCurrentSectionDialog,
    setOpenChangeCurrentSectionDialog,
  } = useAppContext();

  const handleIsInCustomSection = (section: Section) => {
    const isInCustomSection = cSections.find(
      (cSection) => section.id === cSection.id
    );
    return isInCustomSection;
  };

  return (
    <Select
      value={currentSection?.label || "Select A Section to continue"}
      onValueChange={(value) => {
        const selectedSection = sections.find(
          (section) => section.label === value
        );
        if (selectedSection) {
          setCurrentSection(selectedSection);
        }
      }}
      open={openChangeCurrentSectionDialog}
      onOpenChange={setOpenChangeCurrentSectionDialog}
    >
      <SelectTrigger className="w-full px-3 gap-2">
        <SelectValue placeholder="Select a section" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sections.map((section) => (
            <SelectItem key={section.id} value={section.label}>
              {section.label}
              {handleIsInCustomSection(section) && (
                <Badge variant={"destructive"} className="ml-3">
                  Custom Section
                </Badge>
              )}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
