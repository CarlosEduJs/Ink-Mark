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
import Link from "next/link";
import CTAButton from "./cta-button";

interface HeaderProps {
  isHome?: boolean;
}

const navLinks = [
  {
    title: "Hero",
    href: "#hero",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Technologies",
    href: "#technologies",
  },
];

export default function Header({ isHome = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      const scrollPosition = window.scrollY + 100; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b px-5 py-3 transition-all duration-300 fixed top-0 left-0 right-0 z-50 w-full",
        isScrolled && "bg-background/80 backdrop-blur-sm py-1 px-3",
        !isHome && isScrolled && " px-6",
        !isHome && "md:border-none py-1 md:py-2 md:px-12"
      )}
    >
      <div className="hidden md:flex">
        <Brand isSrOnly={false} />
      </div>
      <div className="flex md:hidden">
        <Brand isSrOnly={true} />
      </div>
      {!isHome && (
        <nav className="hidden md:flex items-center gap-9 mt-1">
          {navLinks.map((link) => (
            <NavItem
              key={link.title}
              href={link.href}
              label={link.title}
              isActive={activeSection === link.href.replace("#", "")}
              onClick={(e) => handleSmoothScroll(e, link.href)}
            />
          ))}
        </nav>
      )}
      <div className="flex items-center gap-2 w-full md:w-fit">
        {isHome && <SearchBarBtn />}

        {isHome ? (
          <Button className="md:hidden" size={"icon"} variant={"ghost"}>
            <Github />
          </Button>
        ) : (
          <Button size={"icon"} variant={"ghost"}>
            <Github />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {isHome && (
            <div className="hidden md:flex">
              <RainbowButton className="text-muted text-sm w-52 h-8 gap-3">
                <Github className="w-4 h-4" />
                Star on GitHub
              </RainbowButton>
            </div>
          )}
          {!isHome && <CTAButton />}
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  label,
  isActive,
  onClick,
}: {
  href: string;
  label: string;
  isActive?: boolean;
  onClick: (e: React.MouseEvent, href: string) => void;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => onClick(e, href)}
      className={cn(
        "text-muted-foreground w-fit text-center text-sm font-semibold transition-colors",
        isActive && "text-foreground border-b-2 border-primary"
      )}
    >
      {label}
    </Link>
  );
}
