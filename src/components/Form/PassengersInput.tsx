import CounterInput from "./CounterInput";

type Props = {
  value: string;
  error: boolean;
  onChange: (v: string) => void;
};

export default function PassengersInput({ value, error, onChange }: Props) {
  return (
    <CounterInput
      label="Passengers"
      name="passengers"
      value={value}
      onChange={onChange}
      error={error}
    />
  );
}
