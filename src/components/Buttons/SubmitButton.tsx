import * as RadixForm from "@radix-ui/react-form";
import PrimaryButton from "./PrimaryButton";

function SubmitButton({ ...props }: RadixForm.PrimitiveButtonProps) {

  return (
    <RadixForm.Submit asChild {...props} >
      <PrimaryButton type="submit" >Submit</PrimaryButton>
    </RadixForm.Submit>
  );
}

export default SubmitButton;
