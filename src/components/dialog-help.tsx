import { HandCoins, HandHelping } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { shortcuts } from "@/constants/shortcuts";
import Shortcut from "./shortcut";
import { useAppContext } from "@/contexts/AppContext";
import Link from "next/link";
import { Github } from "@geist-ui/icons";

export default function DialogHelp() {
  const { setOpenDialogHelp, openDialogHelp } = useAppContext();
  return (
    <Dialog open={openDialogHelp} onOpenChange={setOpenDialogHelp}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className="rounded-full fixed bottom-4 right-4 z-50"
        >
          <span className="sr-only ">Help</span>
          <HandHelping />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
          <DialogDescription className="sr-only">
            Help description
          </DialogDescription>
        </DialogHeader>
        <h1 className="text-sm font-semibold">Shortcuts in the app</h1>
        <ShortcutsRender />
        <DialogFooter className="w-full flex justify-end max-sm:gap-3 ">
          <Link
            target="_blank"
            href={"https://github.com/CarlosEduJs/Ink-Mark/issues"}
            className="w-fit h-fit"
          >
            <Button variant={"outline"} size={"sm"}>
              <Github />
              Report an issue or contribute
            </Button>
          </Link>
          <Link
            target="_blank"
            href={
              "https://www.paypal.com/donate/?business=Y6MKJVK2H83AJ&no_recurring=0&item_name=Turn+your+ideas+into+reality+with+powerful%2C+simple+tools.+Organize%2C+create%2C+and+bring+your+projects+to+life%21&currency_code=BRL"
            }
            className="w-fit h-fit"
          >
            <Button variant={"outline"} size={"sm"}>
              <HandCoins />
              Support the project ❤️
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutsRender() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-h-[500px] overflow-y-auto">
      {shortcuts.map((category) => (
        <div key={category.for} className="w-full flex flex-col gap-2">
          <p className="text-sm font-medium leading-none ">{category.for}</p>
          <div className="flex flex-col border rounded-md pb-1">
            {category.shortcuts.map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex items-center justify-between px-3 py-2 border-b"
              >
                <h1 className="text-sm text-muted-foreground">
                  {shortcut.name}
                </h1>
                <div className="flex gap-1">
                  {shortcut.shortcuts.map((key) => {
                    const cleanedKey = key.replace(/Ctrl\/Command/g, "").trim();

                    return (
                      <Shortcut
                        key={key}
                        shortchut={cleanedKey}
                        isWithCTRL={
                          key.includes("Ctrl") || key.includes("Command")
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
