import { Suspense, useEffect, useId, useRef, useState } from "react";
import { Field, Control } from "@radix-ui/react-form";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label";
import { Cross1Icon } from "@radix-ui/react-icons";
import Recommendations from "./Recommendations";
import { Skeleton } from "antd";

type Props = {
  label: string;
  name: string;
  value: string;
  error: boolean;
  onChange: (c: string) => void;
};

export default function Combobox({
  label,
  name,
  value,
  error,
  onChange,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const uniqueId = useId();

  const handleShowRecommendations = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleValueChange(event.target.value);
    setShowRecommendations(true);
  };

  const handleClickRecommendation = (rec: string) => {
    setShowRecommendations(false);
    handleValueChange(rec);
  };

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
  };

  const deleteValue = () => {
    handleValueChange("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <>
      <div
        className={`z-10 opacity-100 h-screen bg-transparent absolute w-screen top-0 left-0 ${
          showRecommendations ? "block" : "hidden"
        }`}
        onClick={() => setShowRecommendations(false)}
      />
      <Field
        name={name}
        className="flex flex-col relative"
        {...props}
        aria-required
      >
        <Label htmlFor={uniqueId}>{label}</Label>
        <Control
          role="combobox"
          name={name}
          autoComplete="off"
          id={uniqueId}
          ref={inputRef}
          onChange={handleShowRecommendations}
          className={`border-solid border rounded-md px-2 py-1 text-sm font-semibold focus-within:outline-none ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          aria-label="text-input"
        />
        <Cross1Icon
          role="button"
          className={`absolute right-1 bottom-[18px] text-purple ${
            value ? "opacity-100" : "opacity-0"
          }`}
          aria-label="delete"
          onClick={deleteValue}
        />
        <Suspense
          fallback={
            <div
              className={`absolute transition bg-white shadow-xl rounded py-2 -bottom-[5.5rem] h-[6.1rem] overflow-y-scroll overflow-x-hidden left-0 w-48 border border-light-purple ${
                showRecommendations ? " z-20 opacity-100" : "-z-20 opacity-0 hidden"
              }
              `}
            >
              <Skeleton
                title={false}
                paragraph={{ rows: 3, width: "9rem" }}
                className="px-2"
                active
                loading={true}
              />
            </div>
          }
        >
          <Recommendations
            show={showRecommendations}
            onClickRecommendation={(recommendation: string) =>
              handleClickRecommendation(recommendation)
            }
            value={value}
          />
        </Suspense>
        <ErrorMessage name={name} showError={error}>
          {`You must choose ${
            label.includes("origin") && value === ""
              ? "the city of origin"
              : "a valid city"
          }`}
        </ErrorMessage>
      </Field>
    </>
  );
}
