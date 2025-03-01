import { createContext, useContext } from "react";
import { Section, type SectionGroup } from "@/components/sections-to-use";
import { ModeProps, SaveMods } from "@/types";

export type Variables = {
  keyProps: string;
  value: string;
  note?: string;
  isStandard: boolean;
};

interface AppContextType {
  sections: Section[];
  setSections: (sections: Section[]) => void;
  availableGroups: SectionGroup[];
  currentSection: Section | null;
  setCurrentSection: (section: Section | null) => void;
  markdownCode: string;
  setMarkdownCode: (code: string) => void;
  updateSection: (updatedSection: Section) => void;
  updateCustomSection: (updatedSection: Section) => void;
  resetCodeSection: (updatedSection: Section) => void;
  addSection: (newSection: Section) => void;
  removeSection: (sectionId: string) => void;
  customSections: Section[];
  cSections: Section[];
  handleNewCustomSection: (newCustomerSection: Section) => void;
  handleRemoveCustomSection: (sectionId: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  asideOpen: boolean;
  setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => Promise<void>;
  variables: Variables[];
  addVariable: (variable: Variables) => void;
  updateVariable: (name: string, newValue: string, newNote?: string) => void;
  removeVariable: (name: string) => void;
  mode: string;
  setMode: (mode: ModeProps["mode"]) => void;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  openEditNameProjectDialog: boolean;
  setOpenEditNameProjectDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openChangeCurrentSectionDialog: boolean;
  setOpenChangeCurrentSectionDialog: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  openResetDialog: boolean;
  setOpenResetDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openSheetVariables: boolean;
  setOpenSheetVariables: React.Dispatch<React.SetStateAction<boolean>>;
  openNewCustomSectionDialog: boolean;
  setOpenNewCustomSectionDialog: React.Dispatch<React.SetStateAction<boolean>>;
  copyFullCode: boolean;
  setCopyFullCode: React.Dispatch<React.SetStateAction<boolean>>;
  openDialogHelp: boolean;
  setOpenDialogHelp: React.Dispatch<React.SetStateAction<boolean>>;
  isSaving: boolean;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
