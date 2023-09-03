type Props = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default function CounterButton({
  children,
  onClick,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={`bg-light-purple disabled:hover:bg-light-purple hover:bg-purple w-6 h-6 rounded transition-colors duration-300 ease-in-out text-white`}
      aria-label="counter-button"
      onClick={onClick}
      type="button"
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
