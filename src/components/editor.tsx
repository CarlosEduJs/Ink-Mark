"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useAppContext } from "./app-provider";

export default function CodeEditor() {
  const { currentSection, updateSection } = useAppContext();
  const { theme } = useTheme();
  const [code, setCode] = useState(currentSection?.code || "");

  useEffect(() => {
    if (currentSection) {
      setCode(currentSection.code || "");
    }
  }, [currentSection]);

  const handleCodeChange = (value: string | undefined) => {
    if (currentSection) {
      const newCode = value || "";
      setCode(newCode);
      updateSection({
        ...currentSection,
        code: newCode,
      });
    }
  };

  const setIcon = ">";

  return (
    <div className="min-w-96 w-full h-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-muted-foreground px-2">
          Editor {setIcon}
        </span>
        <span className="text-sm font-bold ">
          Current Section: {currentSection?.label}
        </span>
      </div>
      <Editor
        height="500px"
        language="markdown"
        value={code}
        theme={theme === "dark" || theme === "system" ? "vs-dark" : "vs"}
        onChange={handleCodeChange}
        className="rounded-md w-full"
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
          "semanticHighlighting.enabled": true,
        }}
      />
    </div>
  );
}
