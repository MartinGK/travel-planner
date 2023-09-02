import { FormLabel } from "@radix-ui/react-form";

type Props = {
  children: React.ReactNode;
  htmlFor: string;
};

export default function Label({ children, htmlFor }: Props) {
  return (
    <FormLabel htmlFor={htmlFor} className="text-xs pb-1 ">
      {children}
    </FormLabel>
  );
}
