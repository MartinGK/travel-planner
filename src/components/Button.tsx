type Props = {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

function Button({ onClick, disabled = false, children }: Props) {
  return (
    <button aria-label="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
