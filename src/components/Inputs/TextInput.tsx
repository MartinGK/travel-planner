import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";

type Props = {
  label: string;
  onChange: (value: string) => void;
  errorMessage: string;
  error: boolean;
};

export default function TextInput({
  label,
  onChange,
  errorMessage,
  error,
}: Props) {
  const [value, setValue] = useState("");
  const uniqueId = uuid();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  const deleteValue = () => {
    setValue("");
  };

  return (
    <div className="relative">
      <label htmlFor={uniqueId}>{label}</label>
      <input
        role="input"
        id={uniqueId}
        value={value}
        aria-label="text-input"
        onChange={handleOnChange}
      />
      <Cross1Icon
        role="button"
        className={`absolute right-0 ${value ? "opacity-100" : "opacity-0"}`}
        aria-label="delete"
        onClick={deleteValue}
      />
      {error && <span>{errorMessage}</span>}
    </div>
  );
}
