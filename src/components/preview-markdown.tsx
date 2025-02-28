"use client";

import { useAppContext } from "@/contexts/AppContext";
import ReactMarkdown from "react-markdown";
import "@/app/styles/markdown-preview.css";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { cn } from "@/lib/utils";

export function MarkdownPreview() {
  const { markdownCode, mode } = useAppContext();

  return (
    <div className={cn(
      "min-w-96 w-full h-full flex flex-col gap-2 mt-2",
      mode === "Editor" && "hidden" 
    )}>
      <h1 className="text-sm font-bold px-4">Preview</h1>
      <div className="px-2 markdown-preview prose w-full h-[530px]  overflow-y-auto">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {markdownCode}
        </ReactMarkdown>
      </div>
    </div>
  );
}
