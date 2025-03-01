"use client";

import { useState, useEffect } from "react";
import AppContext from "@/contexts/AppContext";
import { Section, Variables, ModeProps, SaveMods } from "@/types";
import { DefaultSectionGroups } from "./sections-to-use";
import { getFromDB, saveToDB } from "@/utils/indexedDB";
import { handleKeyDown } from "@/handlers/keyboardHandlers";
import {
  generateMarkdown,
  replaceVariables,
} from "@/handlers/markdownHandlers";
import {
  updateVariable,
  addVariable,
  removeVariable,
} from "@/handlers/variablesHandlers";
import {
  updateSection,
  addSection,
  removeSection,
} from "@/handlers/sectionsHandlers";
import {
  handleNewCustomSection,
  handleRemoveCustomSection,
} from "@/handlers/customSectionHandlers";
import {
  handleReset,
  reorderSections,
} from "@/handlers/resetAndReorderHandlers";
import { standardVariables } from "@/constants/standardsVariables";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [asideOpen, setAsideOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openEditNameProjectDialog, setOpenEditNameProjectDialog] =
    useState(false);
  const [openChangeCurrentSectionDialog, setOpenChangeCurrentSectionDialog] =
    useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openSheetVariables, setOpenSheetVariables] = useState(false);
  const [openNewCustomSectionDialog, setOpenNewCustomSectionDialog] =
    useState(false);
  const [copyFullCode, setCopyFullCode] = useState(false);
  const [openDialogHelp, setOpenDialogHelp] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [customSections, setCustomSections] = useState<Section[]>([]);
  const [markdownCode, setMarkdownCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [variables, setVariables] = useState<Variables[]>([]);
  const [mode, setMode] = useState<ModeProps["mode"]>("Split View");
  const [isSaving, setIsSaving] = useState(false);
  const updateVariableHandler = updateVariable(setVariables);
  const addVariableHandler = addVariable(setVariables);
  const removeVariableHandler = removeVariable(setVariables);
  const [code, setCode] = useState<string>(currentSection?.code || "");

  useEffect(() => {
    if (currentSection) {
      setCode(currentSection.code);
    }
  }, [currentSection]);

  const updateSectionHandler = async (updatedSection: Section) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );

    const updatedSections = sections.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );

    try {
      await saveToDB(DB_NAME, STORE_NAME, "sections", updatedSections);
      console.log("Section updated successfully");
    } catch (error) {
      console.error("Error updating section", error);

      setSections((prev) =>
        prev.map((section) =>
          section.id === updatedSection.id ? updatedSection : section
        )
      );
      throw error;
    }
  };
  const addSectionHandler = addSection(setSections, setCurrentSection);
  const removeSectionHandler = removeSection(
    setSections,
    setCurrentSection,
    currentSection
  );
  const handleNewCustomSectionHandler =
    handleNewCustomSection(setCustomSections);
  const handleRemoveCustomSectionHandler = handleRemoveCustomSection(
    setCustomSections,
    removeSectionHandler
  );
  const handleResetHandler = handleReset(
    setSections,
    setCurrentSection,
    setCustomSections,
    setMarkdownCode,
    setVariables
  );
  const reorderSectionsHandler = reorderSections(setSections, setIsSaving);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const savedSections = await getFromDB(DB_NAME, STORE_NAME, "sections");
        const savedCustomSections = await getFromDB(
          DB_NAME,
          STORE_NAME,
          "customSections"
        );
        const savedVariables = await getFromDB(
          DB_NAME,
          STORE_NAME,
          "variables"
        );
        if (savedSections && savedSections.length > 0) {
          setSections(savedSections);
          setCurrentSection(savedSections[0]);
        } else {
          const defaultSections = [
            {
              id: "001-001",
              label: "Title And Description",
              description: "The title and description of README.md",
              default: true,
              added: true,
              code: "# ${projectName}\n\n- Enter description here...",
              defaultCode: "# ${projectName}\n\n- Enter description here...",
            },
          ];
          setSections(defaultSections);
          setCurrentSection(defaultSections[0]);
        }

        if (savedCustomSections) {
          setCustomSections(savedCustomSections);
        }

        if (savedVariables && savedVariables.length > 0) {
          setVariables(savedVariables);
        } else {
          setVariables(standardVariables);
          await saveToDB(DB_NAME, STORE_NAME, "variables", standardVariables);
        }
      } catch (error) {
        console.error("Failed to load data from IndexedDB:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    setMarkdownCode(generateMarkdown(sections, replaceVariables(variables)));
  }, [sections, variables]);

  useEffect(() => {
    const handleKeyPress = handleKeyDown(
      setOpen,
      setAsideOpen,
      setOpenDrawer,
      setOpenEditNameProjectDialog,
      setOpenChangeCurrentSectionDialog,
      setOpenResetDialog,
      setOpenSheetVariables,
      setOpenNewCustomSectionDialog,
      setCopyFullCode,
      markdownCode,
      setOpenDialogHelp,
      setMode,
      isSaving
    );
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AppContext.Provider
      value={{
        sections,
        setSections,
        currentSection,
        setCurrentSection,
        availableGroups: DefaultSectionGroups,
        markdownCode,
        setMarkdownCode,
        updateSection: updateSectionHandler,
        updateCustomSection: updateSectionHandler,
        addSection: addSectionHandler,
        removeSection: removeSectionHandler,
        customSections,
        cSections: customSections.map((section) => ({
          ...section,
          added: sections.some((s) => s.id === section.id),
        })),
        handleNewCustomSection: handleNewCustomSectionHandler,
        handleRemoveCustomSection: handleRemoveCustomSectionHandler,
        resetCodeSection: (updatedSection: Section) => {
          const defaultCode = updatedSection.defaultCode;
          updateSectionHandler({ ...updatedSection, code: defaultCode || "" });
          setTimeout(() => {
            setCurrentSection(updatedSection);
          }, 100);
        },
        reorderSections: reorderSectionsHandler,
        open,
        setOpen,
        asideOpen,
        setAsideOpen,
        handleReset: handleResetHandler,
        addVariable: addVariableHandler,
        removeVariable: removeVariableHandler,
        updateVariable: updateVariableHandler,
        variables,
        mode,
        setMode,
        openDrawer,
        setOpenDrawer,
        openEditNameProjectDialog,
        setOpenEditNameProjectDialog,
        openChangeCurrentSectionDialog,
        setOpenChangeCurrentSectionDialog,
        openResetDialog,
        setOpenResetDialog,
        openSheetVariables,
        setOpenSheetVariables,
        openNewCustomSectionDialog,
        setOpenNewCustomSectionDialog,
        copyFullCode,
        setCopyFullCode,
        openDialogHelp,
        setOpenDialogHelp,
        isSaving,
        setIsSaving,
        code,
        setCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
