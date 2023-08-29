type Props = {
  onClick: () => void;
  children: string[] | string;
  secondary?: boolean;
};

export default function Text({ children, onClick, secondary }: Props) {
  return (
    <span
      onClick={onClick}
      className={`${secondary ? "purple-200" : "black-0"}`}
    >
      {children}
    </span>
  );
}
