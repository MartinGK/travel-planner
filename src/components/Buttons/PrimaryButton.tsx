import { ButtonHTMLAttributes } from "react";
import Button from "./Button";

type PrimaryButtonProps = {
  className?: string;
};

export default function PrimaryButton({
  className,
  ...props
}: PrimaryButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`bg-black text-white py-2 px-3 transition rounded disabled:bg-gray-200 ${className}`}
      {...props}
    ></Button>
  );
}
