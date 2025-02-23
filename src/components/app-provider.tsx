"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Section, DefaultSectionGroups, SectionGroup } from "./sections-to-use";

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
  projectName: string;
  setProjectName: (projectName: string) => void;
  customSections: Section[];
  cSections: Section[];
  handleNewCustomSection: (newCustomerSection: Section) => void;
  handleRemoveCustomSection: (sectionId: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState<string>("My New Project");
  const [sections, setSections] = useState<Section[]>([
    {
      id: "001-001",
      label: "Title And Description",
      description: "The title and description of README.md",
      default: true,
      added: true,
      code: "# ${projectName}\n\n- Enter description here...",
      defaultCode: "# ${projectName}\n\n- Enter description here...",
    },
  ]);
  const [currentSection, setCurrentSection] = useState<Section | null>(
    sections[0] ?? null
  );
  const availableGroups = useMemo(() => {
    return DefaultSectionGroups.map((group) => ({
      ...group,
      sections: group.sections.map((section) => ({
        ...section,
        added: sections.some((s) => s.id === section.id),
      })),
    }));
  }, [sections]);
  const [customSections, setCustomSections] = useState<Section[]>([]);
  const cSections = useMemo(() => {
    return customSections.map((section) => ({
      ...section,
      added: sections.some((s) => s.id === section.id),
    }));
  }, [sections, customSections]);

  const [markdownCode, setMarkdownCode] = useState<string>("");

  useEffect(() => {
    const generateMarkdown = () => {
      return sections
        .map((section) =>
          section.code.replace(/\$\{projectName\}/g, projectName)
        )
        .join("\n\n");
    };

    setMarkdownCode(generateMarkdown());
  }, [sections, projectName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setSectionsFunction = useCallback((sections: Section[]) => {
    setSections(sections);
    setCurrentSection(sections[0] ?? null);
  }, []);

  const handleSelectSection = useCallback((section: Section | null) => {
    setCurrentSection(section);
  }, []);

  const updateSection = useCallback((updatedSection: Section) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
  }, []);

  const updateCustomSection = useCallback((updatedSection: Section) => {
    setCustomSections((prev) =>
      prev.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
    updateSection(updatedSection);
  }, []);

  const resetCodeSection = useCallback((updatedSection: Section) => {
    const defaultCode = updatedSection.defaultCode;
    const data = {
      ...updatedSection,
      id: updatedSection.id,
      code: defaultCode || "",
    };
    updateSection(data);
    setTimeout(() => {
      setCurrentSection(data);
    }, 100);
  }, []);

  const addSection = useCallback((newSection: Section) => {
    setSections((prev) => {
      if (prev.some((section) => section.id === newSection.id)) {
        return prev;
      }
      setCurrentSection(newSection);
      return [...prev, { ...newSection, added: true }];
    });
  }, []);

  const handleNewCustomSection = useCallback((newCustomSection: Section) => {
    setCustomSections((prev) => {
      if (prev.some((section) => section.id === newCustomSection.id)) {
        return prev;
      }
      return [...prev, { ...newCustomSection }];
    });
  }, []);

  const removeSection = useCallback(
    (sectionId: string) => {
      setSections((prevSections) => {
        const updatedSections = prevSections.filter(
          (section) => section.id !== sectionId
        );
        if (currentSection?.id === sectionId) {
          let newCurrentSection = null;
          const removedIndex = prevSections.findIndex(
            (section) => section.id === sectionId
          );

          if (updatedSections.length > 0) {
            if (removedIndex < updatedSections.length) {
              newCurrentSection = updatedSections[removedIndex];
            } else {
              newCurrentSection = updatedSections[updatedSections.length - 1];
            }
          }

          setCurrentSection(newCurrentSection);
        } else {
          setCurrentSection(null);
        }

        return updatedSections;
      });
    },
    [currentSection, setCurrentSection]
  );

  const handleRemoveCustomSection = useCallback((sectionId: string) => {
    setCustomSections((prev) => {
      const updatedCustomSections = prev.filter(
        (section) => section.id !== sectionId
      );

      return updatedCustomSections;
    });
    removeSection(sectionId);
  }, []);

  const reorderSections = useCallback((activeId: string, overId: string) => {
    setSections((prevSections) => {
      const oldIndex = prevSections.findIndex((s) => s.id === activeId);
      const newIndex = prevSections.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prevSections;

      const updatedSections = [...prevSections];
      const [movedSection] = updatedSections.splice(oldIndex, 1);
      updatedSections.splice(newIndex, 0, movedSection);

      return updatedSections;
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        sections,
        setSections: setSectionsFunction,
        currentSection,
        setCurrentSection: handleSelectSection,
        availableGroups,
        markdownCode,
        setMarkdownCode,
        updateSection,
        updateCustomSection,
        addSection,
        removeSection,
        projectName,
        setProjectName,
        customSections,
        cSections,
        handleNewCustomSection,
        handleRemoveCustomSection,
        resetCodeSection,
        reorderSections,
        open,
        setOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
