import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { plus_jakarta_sans } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
import AsideSectionsToUse from "@/components/aside-sections-to-use";
import { AppProvider } from "@/components/app-provider";

export const metadata: Metadata = {
  title: "Ink Mark",
  description: "Ink Mark is app for creating readme files for your projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plus_jakarta_sans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header />
            <main className="pt-16">{children}</main>
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
