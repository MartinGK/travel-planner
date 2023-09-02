type Props = {
  onClick?: () => void;
  children: string[] | string |React.ReactNode;
  secondary?: boolean;
};

export default function Text({ children, onClick, secondary, className }: Props & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      onClick={onClick}
      className={`text-xs whitespace-nowrap ${secondary ? "text-purple" : "black-0"} ${className}`}
    >
      {children}
    </span>
  );
}
