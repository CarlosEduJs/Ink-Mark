"use client";

import { useAppContext } from "./app-provider";
import ReactMarkdown from "react-markdown";
import "@/app/styles/markdown-preview.css";

export function MarkdownPreview() {
  const { markdownCode, projectName } = useAppContext();

  return (
    <div className="flex flex-col gap-2 min-w-96 w-full h-[500px]">
      <h1 className="text-sm font-bold px-4">Preview</h1>
      <div className="px-2 markdown-preview prose w-full h-[500px] overflow-y-auto">
        <ReactMarkdown>
          {markdownCode.replace(/\$\{projectName\}/g, projectName)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
