export type Variables = {
  keyProps: string;
  value: string;
  note?: string;
  isStandard: boolean;
};

export type Section = {
  id: string;
  label: string;
  description: string;
  default: boolean;
  added: boolean;
  code: string;
  defaultCode?: string;
};

export type ModeProps = {
  mode: "Preview" | "Editor" | "Split View";
  icon: React.ReactNode;
};

export type CurrentFormattingType = {
  formatting:
    | "Bold"
    | "Italic"
    | "Underline"
    | "Code"
    | "Link"
    | "Strikethrough"
    | "Checklist"
    | "Heading1"
    | "Heading2"
    | "Heading3"
    | "Heading4"
    | "Heading5"
    | "Heading6"
    | "Blockquote"
    | "Table"
    | "Image";
  icon: React.ReactNode;
};

export type SaveMods = {
  modes: "manual" | "auto";
};
