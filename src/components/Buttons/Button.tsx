import { ButtonHTMLAttributes } from "react";

export default function Button({ onClick, disabled = false, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      aria-label="button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
