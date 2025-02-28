import { CurrentFormattingType } from "@/types";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Image,
  Italic,
  Link,
  ListChecks,
  Quote,
  Strikethrough,
  Table2,
  Underline,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface ToolbarProps {
  onFormatting: (
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
      | "Image"
  ) => void;
}

export default function Toolbar({ onFormatting }: ToolbarProps) {
  const formattings: CurrentFormattingType[] = [
    { formatting: "Bold", icon: <Bold className="w-4 h-4" /> },
    { formatting: "Italic", icon: <Italic className="w-4 h-4" /> },
    { formatting: "Underline", icon: <Underline className="w-4 h-4" /> },
    { formatting: "Code", icon: <Code className="w-4 h-4" /> },
    { formatting: "Link", icon: <Link className="w-4 h-4" /> },
    { formatting: "Blockquote", icon: <Quote className="w-4 h-4" /> },
    {
      formatting: "Strikethrough",
      icon: <Strikethrough className="w-4 h-4" />,
    },
    {
      formatting: "Checklist",
      icon: <ListChecks className="w-4 h-4" />,
    },
    {
      formatting: "Table",
      icon: <Table2 className="w-4 h-4" />,
    },
    {
      formatting: "Image",
      icon: <Image className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 w-fit px-3 py-1 h-8 border-r">
        {formattings.map((formatting) => (
          <Button
            key={formatting.formatting}
            variant={"ghost"}
            size={"icon"}
            onClick={() => {
              onFormatting(formatting.formatting);
            }}
          >
            <span className="sr-only">{formatting.formatting}</span>
            {formatting.icon}
          </Button>
        ))}
      </div>
      <SelectHeadings onFormatting={onFormatting} />
    </div>
  );
}

function SelectHeadings({ onFormatting }: ToolbarProps) {
  const [selectedHeading, setSelectedHeading] = useState<string>("Heading1");

  const headings: CurrentFormattingType[] = [
    {
      formatting: "Heading1",
      icon: <Heading1 className="w-4 h-4" />,
    },
    {
      formatting: "Heading2",
      icon: <Heading2 className="w-4 h-4" />,
    },
    {
      formatting: "Heading3",
      icon: <Heading3 className="w-4 h-4" />,
    },
    {
      formatting: "Heading4",
      icon: <Heading4 className="w-4 h-4" />,
    },
    {
      formatting: "Heading5",
      icon: <Heading5 className="w-4 h-4" />,
    },
    {
      formatting: "Heading6",
      icon: <Heading6 className="w-4 h-4" />,
    },
  ];

  return (
    <Select
      value={selectedHeading}
      onValueChange={(value) => {
        setSelectedHeading(value);
        onFormatting(value as any);
      }}
    >
      <SelectTrigger className="max-w-fit">
        <SelectValue placeholder="Heading Level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {headings.map((formatting) => (
            <SelectItem
              key={formatting.formatting}
              value={formatting.formatting}
              className="flex items-center gap-2"
            >
              {formatting.icon}
              <span className="text-sm text-muted-foreground">
                {formatting.formatting}
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
