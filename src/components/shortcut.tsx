import { Command } from "lucide-react";

interface ShortcutProps {
  shortchut: string;
  isWithCTRL?: boolean;
}

export default function Shortcut({
  shortchut,
  isWithCTRL = true,
}: ShortcutProps) {
  return (
    <div className="w-fit h-6 bg-muted-foreground/10 rounded-md flex items-center justify-center border border-border text-xs px-2">
      {isWithCTRL && <Command className="w-2 h-2" />}
      {shortchut.toUpperCase()}
    </div>
  );
}


