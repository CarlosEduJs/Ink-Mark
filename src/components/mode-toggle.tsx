"use client";

import { Moon, Sun, Computer } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return (
          <Sun className="h-[1.5rem] w-[1.3rem] rotate-0 scale-100 transition-all" />
        );
      case "dark":
        return (
          <Moon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
        );
      case "system":
        return (
          <Computer className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
        );
      default:
        return (
          <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
        );
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
