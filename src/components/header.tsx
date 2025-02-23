"use client";

import Brand from "./brand";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import ModeToggle from "./mode-toggle";
import SearchBarBtn from "./search-bar";
import { RainbowButton } from "./magicui/rainbow-button";
import { Github } from "@geist-ui/icons";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  isHome?: boolean;
}

export default function Header({ isHome = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b px-5 py-3 transition-all duration-300 fixed top-0 left-0 right-0 z-50 w-full",
        isScrolled && "bg-background/80 backdrop-blur-sm py-1 px-3"
      )}
    >
      <div className="hidden md:flex">
        <Brand isSrOnly={false}  />
      </div>
      <div className="flex md:hidden">
        <Brand isSrOnly={true} />
      </div>
      <div className="flex items-center gap-2 w-full md:w-fit">
        <SearchBarBtn />
        <Button className="md:hidden" size={"icon"} variant={"ghost"}>
          <Github />
        </Button>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <div className="hidden md:flex">
            <RainbowButton className="text-muted text-sm w-52 h-8 gap-3">
              <Github className="w-4 h-4" />
              Star on GitHub
            </RainbowButton>
          </div>
        </div>
      </div>
    </header>
  );
}
