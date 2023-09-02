type Props = {
  children: string[] | string | React.ReactNode;
};

export default function PurpleCloud({ children }: Props) {
  return (
    <div className="border-purple border rounded relative text-xs whitespace-nowrap p-1 w-fit flex min-h-[1.55rem] justify-center items-center">
      {children}
      <div className="border-purple border h-[5px] w-[5px] absolute -right-[3px] bg-white rotate-45 border-l-0 border-b-0 " />
    </div>
  );
}
