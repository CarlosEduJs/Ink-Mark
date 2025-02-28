import { cn } from "@/lib/utils";
import InputField from "./input-field";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

interface VariableFormProps {
  keyVAR: string;
  valueVAR: string;
  noteVAR: string;
  toggleNote: boolean;
  handleOnChangeInputKEY: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeInputVALUE: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeInputNOTE: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: () => void;
  isMobile: boolean;
}

export default function VariableForm({
  keyVAR,
  valueVAR,
  noteVAR,
  toggleNote,
  handleOnChangeInputKEY,
  handleOnChangeInputVALUE,
  handleOnChangeInputNOTE,
  handleToggle,
  isMobile,
}: VariableFormProps) {
  return (
    <>
      <div className={cn(isMobile && "px-12 flex items-center w-fit gap-4")}>
        <div className="flex items-center gap-3 w-full mb-2">
          <InputField
            id={keyVAR}
            value={keyVAR}
            label="Key"
            onChange={handleOnChangeInputKEY}
            placeholder="ex: myKey"
          />
          <InputField
            id={valueVAR}
            value={valueVAR}
            label="Value"
            onChange={handleOnChangeInputVALUE}
            placeholder="ex: myValue"
          />
        </div>
        <Button
          onClick={handleToggle}
          variant={"outline"}
          size={"icon"}
          className={cn("mt-2", toggleNote && "bg-secondary")}
        >
          <Pencil />
          <span className="sr-only">Toggle Add Note</span>
        </Button>
      </div>
      {toggleNote && (
        <div className={cn(isMobile && "px-12")}>
          <InputField
            id={noteVAR}
            value={noteVAR}
            label="Note"
            onChange={handleOnChangeInputNOTE}
          />
        </div>
      )}
    </>
  );
}
