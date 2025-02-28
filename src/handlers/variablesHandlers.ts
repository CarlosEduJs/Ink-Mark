import { saveToDB } from "@/utils/indexedDB";
import { Variables } from "../types";

const DB_NAME = "AppDatabase";
const STORE_NAME = "AppStore";

export const updateVariable =
  (setVariables: React.Dispatch<React.SetStateAction<Variables[]>>) =>
  async (name: string, newValue: string, newNote?: string) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.keyProps === name ? { ...v, value: newValue, note: newNote } : v
      )
    );

    const updatedVariables = await getUpdatedVariables(setVariables);
    await saveToDB(DB_NAME, STORE_NAME, "variables", updatedVariables);
  };

export const addVariable =
  (setVariables: React.Dispatch<React.SetStateAction<Variables[]>>) =>
  async (variable: Variables) => {
    setVariables((prev) => {
      if (prev.some((v) => v.keyProps === variable.keyProps)) {
        return prev;
      }
      return [...prev, variable];
    });

    const updatedVariables = await getUpdatedVariables(setVariables);
    await saveToDB(DB_NAME, STORE_NAME, "variables", updatedVariables);
  };

export const removeVariable =
  (setVariables: React.Dispatch<React.SetStateAction<Variables[]>>) =>
  async (name: string) => {
    setVariables((prev) => prev.filter((v) => v.keyProps !== name));

    const updatedVariables = await getUpdatedVariables(setVariables);
    await saveToDB(DB_NAME, STORE_NAME, "variables", updatedVariables);
  };


export const getUpdatedVariables = async (
  setVariables: React.Dispatch<React.SetStateAction<Variables[]>>
): Promise<Variables[]> => {
  return new Promise((resolve) => {
    setVariables((prev) => {
      resolve(prev);
      return prev;
    });
  });
};
