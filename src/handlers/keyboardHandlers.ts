import { toast } from "sonner";
import { ModeProps } from "@/types";

export const handleKeyDown =
  (
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setAsideOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenEditNameProjectDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenChangeCurrentSectionDialog: React.Dispatch<
      React.SetStateAction<boolean>
    >,
    setOpenResetDialog: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenSheetVariables: React.Dispatch<React.SetStateAction<boolean>>,
    setOpenNewCustomSectionDialog: React.Dispatch<
      React.SetStateAction<boolean>
    >,
    setCopyFullCode: React.Dispatch<React.SetStateAction<boolean>>,
    markdownCode: string,
    setOpenDialogHelp: React.Dispatch<React.SetStateAction<boolean>>,
    setMode: React.Dispatch<React.SetStateAction<ModeProps["mode"]>>,
    isSaving: boolean
  ) =>
  (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setOpen((prev) => !prev); //command
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "b") {
      e.preventDefault();
      setAsideOpen((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "d") {
      e.preventDefault();
      setOpenDrawer((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
      e.preventDefault();
      setOpenEditNameProjectDialog((prev) => !prev);
    }
    if (e.altKey && e.shiftKey) {
      e.preventDefault();
      setOpenChangeCurrentSectionDialog((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "r") {
      e.preventDefault();
      setOpenResetDialog((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "v") {
      e.preventDefault();
      setOpenSheetVariables((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      setOpenNewCustomSectionDialog((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "h") {
      e.preventDefault();
      setOpenDialogHelp((prev) => !prev);
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "f") {
      e.preventDefault();
      navigator.clipboard.writeText(markdownCode);
      toast("Full code copied to clipboard!");
      setCopyFullCode(true);
      setTimeout(() => {
        setCopyFullCode(false);
      }, 2000);
    }

    const keyModeMap: Record<string, ModeProps["mode"]> = {
      p: "Preview",
      r: "Editor",
      s: "Split View",
    };

    if ((e.ctrlKey || e.metaKey) && e.altKey) {
      const key = e.key.toLowerCase();
      if (keyModeMap.hasOwnProperty(key)) {
        e.preventDefault();
        if (isSaving) return;
        setMode(keyModeMap[key]);
      }
    }
  };
