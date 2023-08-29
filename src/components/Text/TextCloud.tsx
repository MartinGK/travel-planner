import Text from "../Text";

type Props = {
  children: string[] | string;
};

export default function TextCloud({ children }: Props) {
  return (
    <div>
      <Text secondary>{children}</Text>
    </div>
  );
}
