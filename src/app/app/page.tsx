import BlockAppView from "@/components/block-app-view";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ink Mark App - Create Documentation",
  description:
    "Create and manage documentation with Ink Mark's powerful editor. Real-time preview, dynamic variables, and customizable sections.",
  keywords: [
    "Ink Mark app",
    "documentation editor",
    "real-time preview",
    "dynamic variables",
    "customizable sections",
  ],
};

export default function AppPage() {
  return (
    <div>
      <BlockAppView />
    </div>
  );
}
