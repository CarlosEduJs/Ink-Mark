import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFieldProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string;
  id: string;
  type?: string;
  placeholder?: string;
  badge?: string;
}

export default function InputField({
  label,
  onChange,
  value,
  id,
  type = "text",
  placeholder,
  badge,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <Label className="font-semibold text-sm" htmlFor={id}>
          {label}
        </Label>
        {badge && <Badge variant={"default"}>{badge}</Badge>}
      </div>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md"
      />
    </div>
  );
}
