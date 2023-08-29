import { useCallback, useState } from "react";
import CounterButton from "./CounterButton";
export const errorMessage = "Select passengers";

type Props = {
  onChange: (value: number) => void;
  errorMessage: string;
  error?: boolean;
};

export default function CounterInput({ onChange, error }: Props) {
  const [counter, setCounter] = useState(0);

  const subtractOneToCounter = useCallback(() => {
    if (counter > 0) {
      setCounter(counter - 1);
      onChange(counter);
    }
  }, [counter]);

  const plusOneToCounter = useCallback(() => {
    setCounter(counter + 1);
    onChange(counter);
  }, [counter]);

  const handleOnChange = useCallback(() => {
    onChange(counter);
  }, [counter]);

  return (
    <div>
      <div>
        <CounterButton aria-label="minus" onClick={subtractOneToCounter}>
          -
        </CounterButton>
        <input
          role="input"
          type="number"
          aria-label="counter"
          className="w-10 text-center"
          onChange={handleOnChange}
          value={counter}
        />
        <CounterButton aria-label="plus" onClick={plusOneToCounter}>
          +
        </CounterButton>
      </div>
      {error && <span>{errorMessage}</span>}
    </div>
  );
}
