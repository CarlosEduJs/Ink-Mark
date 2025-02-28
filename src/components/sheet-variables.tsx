import { Ellipsis, Search, Transgender, Variable } from "lucide-react";
import { Button } from "./ui/button";
import { useAppContext, Variables } from "@/contexts/AppContext";
import { useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import DialogNewVariable from "./dialog-new-variable";
import DialogEditVariable from "./dialog-edit-variable";
import AlertDialogDeleteVariable from "./alert-dialog-delete-variable";

export default function SheetVariables() {
  const { openSheetVariables, setOpenSheetVariables} =
    useAppContext();

  return (
    <Sheet open={openSheetVariables} onOpenChange={setOpenSheetVariables}>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          variant={"secondary"}
          className="md:text-xs md:h-6"
          aria-label="Open variables sheet"
        >
          <Variable />
          <span className="max-sm:sr-only">Variables</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Variables</SheetTitle>
          <SheetDescription>
            This is your variables center, you can edit, create, delete, etc.
          </SheetDescription>
        </SheetHeader>
        <BlockListVariables />
      </SheetContent>
    </Sheet>
  );
}

function VariableRender({ isStandard, keyProps, value, note }: Variables) {
  const copyToClipboard = (text: string, isKey: boolean = false) => {
    const textToCopy = isKey ? `\${${text}}` : text;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast("Copied successfully!");
      })
      .catch((err) => {
        toast("Error when copying code");
      });
  };

  return (
    <div className="flex items-center justify-between border-b w-full px-3 h-16 hover:bg-accent">
      <div className="flex items-center gap-5">
        <div
          className="h-8 w-8 border rounded-full flex justify-center items-center"
          aria-label="Variable icon"
        >
          <Transgender className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <h1
            className="text-sm font-semibold max-w-24 truncate cursor-pointer"
            onClick={() => copyToClipboard(keyProps, true)}
            aria-label={`Copy variable key ${keyProps}`}
          >
            {keyProps}
          </h1>
          <h2 className="text-sm text-muted-foreground">
            {isStandard ? "Standard" : "Variable created"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          onClick={() => copyToClipboard(value)}
          className="bg-secondary text-xs max-w-36 h-6 flex items-center rounded-sm px-2 truncate cursor-pointer"
          aria-label={`Copy variable value ${value}`}
        >
          {value}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              aria-label="Open variable options"
              role="button"
              aria-haspopup="true"
            >
              <Ellipsis aria-hidden="true" />
              <span className="sr-only">Show Options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-52">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              asChild
              className="cursor-pointer"
              aria-label="Edit variable"
            >
              <DialogEditVariable
                keyProps={keyProps}
                value={value}
                note={note}
                isStandard={isStandard}
              />
            </DropdownMenuItem>
            {keyProps !== "projectName" && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer"
                aria-label="Delete variable"
              >
                <AlertDialogDeleteVariable keyProps={keyProps} />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function BlockListVariables() {
  const { variables } = useAppContext();

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredVariables = variables.filter((variable) =>
    variable.keyProps.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-3 my-6">
      <header className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3 px-3 border rounded-md">
          <Search aria-label="Search icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full placeholder:font-normal outline-none border-none bg-transparent h-10 font-semibold text-sm"
            aria-label="Search for variables"
          />
        </div>
        <DialogNewVariable />
      </header>
      <div className="flex flex-col items-center border rounded-md pb-2 ">
        {filteredVariables.length > 0 ? (
          <ul className="px-0 w-full max-h-[600px] overflow-y-auto" role="list">
            {filteredVariables.map((variable) => (
              <li key={variable.keyProps} role="listitem">
                <VariableRender
                  isStandard={variable.isStandard}
                  value={variable.value}
                  keyProps={variable.keyProps}
                  note={variable.note}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 flex items-center justify-center font-bold">
            No variables found
          </div>
        )}
      </div>
    </div>
  );
}
