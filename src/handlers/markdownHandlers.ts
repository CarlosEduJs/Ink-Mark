import { Variables, Section } from "@/types";

export const replaceVariables = (variables: Variables[]) => (code: string) => {
  return variables.reduce((acc, variable) => {
    return acc.replace(
      new RegExp(`\\$\\{${variable.keyProps}\\}`, "g"),
      variable.value
    );
  }, code);
};

export const generateMarkdown = (
  sections: Section[],
  replaceVariables: (code: string) => string
) => {
  return sections.map((section) => replaceVariables(section.code)).join("\n\n");
};
