import { saveToDB } from "@/utils/indexedDB";
import { Section } from "../types";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export const handleNewCustomSection =
  (setCustomSections: React.Dispatch<React.SetStateAction<Section[]>>) =>
  async (newCustomSection: Section) => {
    setCustomSections((prev) => {
      if (prev.some((section) => section.id === newCustomSection.id)) {
        return prev;
      }
      return [...prev, { ...newCustomSection }];
    });

    const updatedCustomSections = await getUpdatedCustomSections(
      setCustomSections
    );
    await saveToDB(
      DB_NAME,
      STORE_NAME,
      "customSections",
      updatedCustomSections
    );
  };

export const handleRemoveCustomSection =
  (
    setCustomSections: React.Dispatch<React.SetStateAction<Section[]>>,
    removeSection: (sectionId: string) => void
  ) =>
  async (sectionId: string) => {
    setCustomSections((prev) => {
      const updatedCustomSections = prev.filter(
        (section) => section.id !== sectionId
      );
      return updatedCustomSections;
    });

    removeSection(sectionId);

    // Salva as custom sections atualizadas no IndexedDB
    const updatedCustomSections = await getUpdatedCustomSections(
      setCustomSections
    );
    await saveToDB(
      DB_NAME,
      STORE_NAME,
      "customSections",
      updatedCustomSections
    );
  };

// Função auxiliar para obter o estado atualizado das custom sections
const getUpdatedCustomSections = async (
  setCustomSections: React.Dispatch<React.SetStateAction<Section[]>>
): Promise<Section[]> => {
  return new Promise((resolve) => {
    setCustomSections((prev) => {
      resolve(prev);
      return prev;
    });
  });
};
