import { v4 as uuid } from "uuid";
import { MutableRefObject, createRef, useRef, useState } from "react";
import { Field, Control } from "@radix-ui/react-form";
import ErrorMessage from "../Form/ErrorMessage";
import Label from "../Form/Label";
import { Skeleton } from "antd";
import { useQuery } from "react-query";
import { getRecommendationsList } from "../../utils/endpoints";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import { setRecommendedCities } from "../../store/slices/citiesSlice";
import { Cross1Icon } from "@radix-ui/react-icons";

type Props = {
  label: string;
  name: string;
  value: string;
  error: boolean;
  onChange: (c: string) => void;
};

export default function Combobox({
  label,
  name,
  value: v,
  error,
  onChange,
  ...props
}: Props) {
  const [value, setValue] = useState(v);
  const testRef = createRef<MutableRefObject<HTMLDivElement> | null>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const recommendations = useAppSelector(
    (state) => state.cities.recommendedCities
  );
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const uniqueId = uuid();
  const dispatch = useAppDispatch();

  useQuery({
    queryKey: ["cities", value],
    queryFn: () => {
      dispatch(setRecommendedCities([]));
      setIsLoadingRecommendations(true);
      return getRecommendationsList(value);
    },
    onSuccess(data) {
      setIsLoadingRecommendations(false);
      dispatch(setRecommendedCities(data));
    },
    onError() {
      setIsLoadingRecommendations(false);
      dispatch(setRecommendedCities(["No recommendations found"]));
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleShowRecommendations = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleValueChange(event.target.value);
    setIsLoadingRecommendations(true);
    setShowRecommendations(true);
  };

  const handleClickRecommendation = (rec: string) => {
    handleValueChange(rec);
    setShowRecommendations(false);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  const deleteValue = () => {
    setValue("");
  };

  return (
    <Field
      name={name}
      className="flex flex-col relative"
      {...props}
      aria-required
      ref={testRef.current}
    >
      <Label htmlFor={uniqueId}>{label}</Label>
      <Control
        role="combobox"
        name={name}
        id={uniqueId}
        ref={inputRef}
        value={value}
        onChange={handleShowRecommendations}
        className="border-gray-200 border-solid border rounded-md px-2 py-1 text-sm font-semibold focus-within:outline-none invalid:border-red-500"
        aria-label="text-input"
      />
      <Cross1Icon
        role="button"
        className={`absolute right-1 bottom-[18px] text-purple ${
          value ? "opacity-100" : "opacity-0"
        }`}
        aria-label="delete"
        onClick={deleteValue}
      />
      <div
        className={`absolute transition bg-white shadow-xl rounded py-2 ${
          recommendations.length === 1 ? "-bottom-6" : "-bottom-24"
        } left-0 w-48 h-fit border border-light-purple ${
          showRecommendations ? " z-10 opacity-100" : "-z-20 opacity-0"
        }
        `}
        onMouseLeave={() => setShowRecommendations(false)}
      >
        <Skeleton
          title={false}
          paragraph={{ rows: 3, width: "10rem" }}
          className="px-2"
          active
          loading={isLoadingRecommendations}
        />
        {!isLoadingRecommendations && (
          <Recommendations
            onClickRecommendation={(recommendation: string) =>
              handleClickRecommendation(recommendation)
            }
            disabled={recommendations.length === 1}
            recommendations={recommendations}
          />
        )}
      </div>
      <ErrorMessage name={name} showError={error}>
        {`You must choose ${
          label.includes("origin") && value === ""
            ? "the city of origin"
            : "a valid city"
        }`}
      </ErrorMessage>
    </Field>
  );
}

const Recommendations = ({
  recommendations,
  disabled,
  onClickRecommendation,
}: {
  recommendations: string[];
  disabled: boolean;
  onClickRecommendation: (r: string) => void;
}) => {
  return (
    <ul className="grid gap-2 justify-center relative">
      {recommendations.map((recommendation) => {
        return (
          <li
            key={recommendation}
            className={`flex items-center h-5 w-40 cursor-pointer ${
              disabled ? "hover:bg-light-purple" : ""
            } p-1 text-xs rounded`}
            onClick={() =>
              disabled ? null : onClickRecommendation(recommendation)
            }
          >
            {recommendation}
          </li>
        );
      })}
    </ul>
  );
};
