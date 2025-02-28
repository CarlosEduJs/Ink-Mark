import { saveToDB, getFromDB } from "@/utils/indexedDB";
import { Variables, Section } from "@/types";
import { standardVariables } from "@/constants/standardsVariables";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export const loadData = async () => {
  try {
    const savedProjectName = await getFromDB(
      DB_NAME,
      STORE_NAME,
      "projectName"
    );
    const savedSections = await getFromDB(DB_NAME, STORE_NAME, "sections");
    const savedCustomSections = await getFromDB(
      DB_NAME,
      STORE_NAME,
      "customSections"
    );
    const savedVariables = await getFromDB(DB_NAME, STORE_NAME, "variables");

    const variables = savedVariables || standardVariables;

    return {
      savedProjectName,
      savedSections,
      savedCustomSections,
      variables,
    };
  } catch (error) {
    console.error("Failed to load data from IndexedDB:", error);
    return null;
  }
};

export const saveData = async (data: {
  sections?: Section[];
  projectName?: string;
  customSections?: Section[];
  variables?: Variables[];
}) => {
  try {
    if (data.sections)
      await saveToDB(DB_NAME, STORE_NAME, "sections", data.sections);
    if (data.projectName)
      await saveToDB(DB_NAME, STORE_NAME, "projectName", data.projectName);
    if (data.customSections)
      await saveToDB(
        DB_NAME,
        STORE_NAME,
        "customSections",
        data.customSections
      );
    if (data.variables)
      await saveToDB(DB_NAME, STORE_NAME, "variables", data.variables);
  } catch (error) {
    console.error("Failed to save data to IndexedDB:", error);
  }
};
