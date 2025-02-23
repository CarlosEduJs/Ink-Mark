import Header from "@/components/header";
import AsideSectionsToUse from "@/components/aside-sections-to-use";
import CommandApp from "@/components/command-app";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden">
      <Header isHome={true} />
      <main className="flex justify-between gap-3 w-full  ">
        <AsideSectionsToUse />
        <main className=" h-full w-full overflow-y-auto">{children}</main>
        <CommandApp/>
      </main>
      <footer className="flex justify-between items-center px-4 py-2 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Ink Mark &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
