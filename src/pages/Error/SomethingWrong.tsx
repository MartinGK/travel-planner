import PrimaryButton from "../../components/Buttons/PrimaryButton";
import Text from "../../components/Text";
import { useNavigate } from "react-router-dom";

export const SOMETHING_WRONG_MESSAGE = "Oops! Something went wrong!";

export default function SomethingWrong() {
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <Text className="text-sm font-semibold mt-20" secondary>
        {SOMETHING_WRONG_MESSAGE}
      </Text>
      <PrimaryButton className="w-20" onClick={goToHome}>
        Back
      </PrimaryButton>
    </div>
  );
}
