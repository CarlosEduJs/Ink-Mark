import { saveToDB } from "@/utils/indexedDB";
import { Section } from "../types";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export const updateSection =
  (setSections: React.Dispatch<React.SetStateAction<Section[]>>) =>
  async (updatedSection: Section) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === updatedSection.id ? updatedSection : section
      )
    );
    const updatedSections = await getUpdatedSections(setSections);
    await saveToDB(DB_NAME, STORE_NAME, "sections", updatedSections);
  };

export const addSection =
  (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    setCurrentSection: React.Dispatch<React.SetStateAction<Section | null>>
  ) =>
  async (newSection: Section) => {
    setSections((prev) => {
      if (prev.some((section) => section.id === newSection.id)) {
        return prev;
      }

      const updatedSections = [...prev, { ...newSection, added: true }];

      setCurrentSection(newSection);
      console.log(newSection.added);

      return updatedSections;
    });

    const updatedSections = await getUpdatedSections(setSections);
    await saveToDB(DB_NAME, STORE_NAME, "sections", updatedSections);
  };

export const removeSection =
  (
    setSections: React.Dispatch<React.SetStateAction<Section[]>>,
    setCurrentSection: React.Dispatch<React.SetStateAction<Section | null>>,
    currentSection: Section | null
  ) =>
  async (sectionId: string) => {
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

    const updatedSections = await getUpdatedSections(setSections);
    await saveToDB(DB_NAME, STORE_NAME, "sections", updatedSections);
  };

const getUpdatedSections = async (
  setSections: React.Dispatch<React.SetStateAction<Section[]>>
): Promise<Section[]> => {
  return new Promise((resolve) => {
    setSections((prev) => {
      resolve(prev);
      return prev;
    });
  });
};
