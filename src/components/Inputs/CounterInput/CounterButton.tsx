type Props = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const onMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  const button = event.target as HTMLButtonElement;
  if (button.disabled) return;
  button.classList.remove("bg-purple-600");
  button.classList.add("bg-purple-200");
};

export default function CounterButton({ children, onClick, disabled, ...props }: Props) {
  return (
    <button
      className={`bg-purple-600`}
      aria-label="counter-button"
      onMouseOver={onMouseOver}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
