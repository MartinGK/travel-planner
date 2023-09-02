import CounterButton from "./CounterButton";
import { Field, Control } from "@radix-ui/react-form";
import ErrorMessage from "../../Form/ErrorMessage";
import { v4 as uuid } from "uuid";
import Label from "../../Form/Label";

type Props = {
  name: string;
  label: string;
  value: string;
  error: boolean;
  onChange: (value: string) => void;
};

export default function CounterInput({
  name,
  label,
  value,
  error,
  onChange,
}: Props) {
  const uniqueId = uuid();

  const subtractOneToCounter = () => {
    if (parseInt(value) > 0) {
      handleChangeValue((parseInt(value) - 1).toString());
    }
  };

  const plusOneToCounter = () => {
    handleChangeValue((parseInt(value) + 1).toString());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeValue(event.target.value);
  };

  const handleChangeValue = (newValue: string) => {
    onChange(newValue);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChangeValue(event.target.value);
  }

  return (
    <Field
      className="relative"
      name={name}
      aria-required
      onChange={handleChange}
    >
      <Label htmlFor={uniqueId}>{label}</Label>

      <div
        className={`flex border ${
          error ? "border-red-500" : "border-gray-200"
        } p-1 rounded w-fit`}
      >
        <CounterButton
          aria-label="minus"
          onClick={subtractOneToCounter}
          disabled={value === "0"}
        >
          -
        </CounterButton>
        <Control
          type="number"
          name={name}
          aria-label="counter"
          className={`text-center w-8 focus-visible:outline-none`}
          onChange={handleChangeInput}
          value={value}
          id={uniqueId}
        />
        <CounterButton aria-label="plus" onClick={plusOneToCounter}>
          +
        </CounterButton>
      </div>
      <div className={`h-3 relative ${error ? "contents" : ""}`}>
        <ErrorMessage showError={error} name={name}>
          Select passengers
        </ErrorMessage>
      </div>
    </Field>
  );
}
