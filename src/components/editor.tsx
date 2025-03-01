"use client";

import { useEffect, useRef } from "react";
import CodeMirror, { EditorView, EditorState } from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { useTheme } from "next-themes";
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";
import "@/app/styles/code-mirror-editor.css";
import Toolbar from "./toolbar";
import { Section, Variables } from "@/types";
import { cn } from "@/lib/utils";
import SelectSetCurrentSection from "./select-set-current-section";
import { useAppContext } from "@/contexts/AppContext";

interface CodeEditorProps {
  currentSection: Section | null;
  mode: "Editor" | "Preview" | "Split View";
  onCodeChange: (value: string) => Promise<void>;
  code?: string;
}

export default function CodeEditor({
  currentSection,

  mode,
  onCodeChange,
  code,
}: CodeEditorProps) {
  const { variables } = useAppContext();
  const { theme } = useTheme();
  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorViewRef.current || !currentSection) return;

    const newState = EditorState.create({
      doc: currentSection.code || "",
      extensions: [
        markdown(),
        autocompletion({ override: [variableCompletions] }),
        customTheme,
      ],
    });

    editorViewRef.current.setState(newState);

    editorViewRef.current.focus();
  }, [currentSection]);

  const handleCodeChange = async (value: string) => {
    if (!currentSection) return;
    await onCodeChange(value);
  };

  const variableCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\$\{[\w]*/);
    if (!word) return null;
    return {
      from: word.from + 2,
      options: variables.map((variable) => ({
        label: variable.keyProps,
        type: "variable",
        apply: `${variable.keyProps}`,
      })),
    };
  };

  const customTheme = EditorView.theme({
    ".cm-tooltip.cm-tooltip-autocomplete": {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "4px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    ".cm-tooltip.cm-tooltip-autocomplete ul li": {
      padding: "4px 8px",
    },
    ".cm-tooltip.cm-tooltip-autocomplete ul li[aria-selected]": {
      backgroundColor: "hsl(var(--accent))",
      color: "hsl(var(--accent-foreground))",
    },
  });

  const applyFormatting = (
    formatting:
      | "Bold"
      | "Italic"
      | "Underline"
      | "Code"
      | "Link"
      | "Blockquote"
      | "Strikethrough"
      | "Checklist"
      | "Heading1"
      | "Heading2"
      | "Heading3"
      | "Heading4"
      | "Heading5"
      | "Heading6"
      | "Table"
      | "Image"
  ) => {
    const view = editorViewRef.current;
    if (!view) return;

    const { from, to } = view.state.selection.main;
    const selectedText = view.state.doc.sliceString(from, to);
    const hasSelection = from !== to;

    let formattedText = "";
    let cursorOffset = 0;

    switch (formatting) {
      case "Bold":
        formattedText = `**${selectedText}**`;
        cursorOffset = hasSelection ? 0 : 2;
        break;

      case "Italic":
        formattedText = `*${selectedText}*`;
        cursorOffset = hasSelection ? 0 : 1;
        break;

      case "Underline":
        formattedText = `<u>${selectedText}</u>`;
        cursorOffset = hasSelection ? 0 : 3;
        break;

      case "Code":
        if (hasSelection) {
          formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
          cursorOffset = 4;
        } else {
          formattedText = "```\n\n```";
          cursorOffset = 4;
        }
        break;

      case "Link":
        if (hasSelection) {
          const url = prompt("Type url:");
          if (url) {
            formattedText = `[${selectedText}](${url})`;
            cursorOffset = 0;
          } else return;
        } else {
          formattedText = "[text](url)";
          cursorOffset = 1;
        }
        break;

      case "Strikethrough":
        formattedText = `~~${selectedText}~~`;
        cursorOffset = 3;
        break;

      case "Heading1":
      case "Heading2":
      case "Heading3":
      case "Heading4":
      case "Heading5":
      case "Heading6":
        const level = parseInt(formatting.replace("Heading", ""), 10);
        const prefix = "#".repeat(level) + " ";

        const lineStart =
          view.state.doc.sliceString(0, from).lastIndexOf("\n") + 1;
        const isAtLineStart = from === lineStart;

        formattedText = (isAtLineStart ? "" : "\n") + prefix + selectedText;
        cursorOffset = formattedText.length;

        break;

      case "Checklist":
        formattedText = `- [ ] ${selectedText}`;
        cursorOffset = hasSelection ? 0 : 6;
        break;
      case "Blockquote":
        formattedText = `> ${selectedText}`;
        cursorOffset = 2;
        break;

      case "Table":
        formattedText =
          "| Column 1 | Column 2 |\n| -------- | -------- |\n| Text     | Text     |";
        cursorOffset = 0;
        break;

      case "Image":
        const imageUrl = prompt("Type image url:");
        if (imageUrl) {
          formattedText = `![](${imageUrl})`;
          cursorOffset = 0;
        } else return;

      default:
        formattedText = selectedText;
    }

    view.dispatch({
      changes: { from, to, insert: formattedText },
      selection: {
        anchor: from + cursorOffset,
        head: from + cursorOffset,
      },
    });
  };

  return (
    <div
      className={cn(
        "min-w-96 w-full h-full flex flex-col gap-2 mt-2",
        mode === "Preview" && "hidden"
      )}
    >
      <div className="flex items-center justify-between px-2">
        <span className="text-sm font-semibold text-muted-foreground truncate min-w-32">
          Current Section:
        </span>
        <SelectSetCurrentSection />
      </div>
      <Toolbar onFormatting={(formatting) => applyFormatting(formatting)} />
      <CodeMirror
        value={code}
        height="450px"
        extensions={[
          markdown(),
          autocompletion({ override: [variableCompletions] }),
          customTheme,
        ]}
        theme={theme === "dark" || theme === "system" ? "dark" : "light"}
        onChange={handleCodeChange}
        className="editor text-sm"
        onCreateEditor={(view) => {
          editorViewRef.current = view;
        }}
      />
    </div>
  );
}
