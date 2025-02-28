import { Section, Variables } from "@/types";
import { saveToDB } from "@/utils/indexedDB";
import { standardVariables } from "@/constants/standardsVariables";
import { getUpdatedVariables } from "./variablesHandlers";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export const handleReset =
  (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    setCurrentSection: React.Dispatch<React.SetStateAction<Section | null>>,
    setCustomSections: React.Dispatch<React.SetStateAction<Section[]>>,
    setMarkdownCode: React.Dispatch<React.SetStateAction<string>>,
    setVariables: React.Dispatch<React.SetStateAction<Variables[]>>
  ) =>
  async () => {
    try {
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
      setCustomSections([]);
      setMarkdownCode("");
      setVariables(standardVariables);
      const newV = await getUpdatedVariables(setVariables);
      await saveToDB(DB_NAME, STORE_NAME, "variables", newV);
      await saveToDB(DB_NAME, STORE_NAME, "sections", defaultSections);
      await saveToDB(DB_NAME, STORE_NAME, "customSections", []);
    } catch (error) {
      console.error("Failed to reset data:", error);
    }
  };

export const reorderSections =
  (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    setIsSaving: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (activeId: string, overId: string) => {
    setSections((prevSections) => {
      const oldIndex = prevSections.findIndex((s) => s.id === activeId);
      const newIndex = prevSections.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prevSections;

      const updatedSections = [...prevSections];
      const [movedSection] = updatedSections.splice(oldIndex, 1);
      updatedSections.splice(newIndex, 0, movedSection);

      setIsSaving(true);

      setTimeout(async () => {
        try {
          await saveToDB(
            "AppDatabase",
            "AppStore",
            "sections",
            updatedSections
          );
          console.log("Sections reordered and saved successfully");
        } catch (error) {
          console.error("Error saving reordered sections", error);
        } finally {
          setIsSaving(false);
        }
      }, 200);

      return updatedSections;
    });
  };
