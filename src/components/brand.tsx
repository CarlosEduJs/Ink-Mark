import { cn } from "@/lib/utils";
import { SquareTerminal } from "lucide-react";

interface BrandProps {
  isSrOnly: boolean;
}

export default function Brand({ isSrOnly }: BrandProps) {
  return (
    <div className={cn("flex items-center gap-1 w-full")}>
      <SquareTerminal className="w-6 h-6 text-primary" />
      <span className={cn(isSrOnly && "sr-only", " font-semibold text-xl")}>
        Ink Mark
      </span>
    </div>
  );
}
