import Header from "@/components/header";
import LandingPageBlock from "@/components/landing-page-block";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ink Mark - Simplify Documentation Creation",
  description:
    "Ink Mark is a modern tool for creating and managing documentation and READMEs. Built with Next.js, Tailwind CSS, and TypeScript.",
  keywords: [
    "Ink Mark",
    "documentation tool",
    "README generator",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
  ],
};

export default function Home() {
  return (
    <div className="px-1 md:px-12 w-full overflow-x-hidden">
      <Header />
      <LandingPageBlock />
    </div>
  );
}
