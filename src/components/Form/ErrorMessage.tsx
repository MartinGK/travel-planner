import { Message, CustomMatcher } from "@radix-ui/react-form";

type matchInputs =
  | "badInput"
  | "patternMismatch"
  | "rangeOverflow"
  | "rangeUnderflow"
  | "stepMismatch"
  | "tooLong"
  | "tooShort"
  | "typeMismatch"
  | "valid"
  | "valueMissing"
  | CustomMatcher
  | undefined;

type Props = {
  match?: matchInputs;
  children: string;
  name?: string;
  showError: boolean;
};

export default function ErrorMessage({
  match,
  children,
  name,
  showError,
}: Props) {
  return (
    <div className="flex items-baseline justify-between h-3">
      {showError && (
        <Message
          role="alertdialog"
          aria-labelledby={name}
          className="text-red-600 text-[10px] font-semibold"
          match={match}
          name={name}
        >
          {children}
        </Message>
      )}
    </div>
  );
}
