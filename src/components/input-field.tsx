import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputFieldProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Corrigido para receber uma função
  value: string;
  id: string;
  type?: string; // Adicionado tipo opcional para o input
  placeholder?: string; // Adicionado placeholder opcional
}

export default function InputField({
  label,
  onChange,
  value,
  id,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="font-semibold text-sm" htmlFor={id}>{label}</Label>
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
