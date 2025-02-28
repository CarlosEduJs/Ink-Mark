import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { inter } from "./fonts";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/components/app-provider";
import Link from "next/link";

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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <main className="pt-16">{children}</main>
            <Toaster />
            <footer className="flex justify-between items-center px-4 py-2 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Ink Mark &copy; {new Date().getFullYear()} - Created by <Link href="https://github.com/CarlosEduJs" className="underline">CarlosDevJs</Link>
              </p>
            </footer>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
