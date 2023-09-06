import { v4 as uuid } from "uuid";
import { useEffect, useRef, useState } from "react";
import { Field, Control } from "@radix-ui/react-form";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { Skeleton } from "antd";
import { useQuery } from "react-query";
import {
  NO_RECOMMENDATIONS_MESSAGE,
  getRecommendationsList,
} from "../../utils/endpoints";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import { setRecommendedCities } from "../../store/slices/citiesSlice";
import { Cross1Icon } from "@radix-ui/react-icons";

type TRecommendationsBottomPosition = {
  [k: number]: string;
};

const RecommendationsBottomPosition: TRecommendationsBottomPosition = {
  0: "-bottom-20 h-24",
  1: "-bottom-[2rem] h-10",
  2: "-bottom-14 h-18",
  3: "-bottom-[5.5rem] h-[6.1rem]",
};

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
  value,
  error,
  onChange,
  ...props
}: Props) {
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
      dispatch(setRecommendedCities([NO_RECOMMENDATIONS_MESSAGE]));
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1
  });

  const handleShowRecommendations = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleValueChange(event.target.value);
    setIsLoadingRecommendations(true);
    setShowRecommendations(true);
  };

  const handleClickRecommendation = (rec: string) => {
    setShowRecommendations(false);
    handleValueChange(rec);
  };

  const handleValueChange = (newValue: string) => {
    onChange(newValue);
  };

  const deleteValue = () => {
    handleValueChange("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <>
      <div
        className={`z-10 opacity-100 h-screen bg-transparent absolute w-screen top-0 left-0 ${showRecommendations ? 'block': 'hidden'}`}
        onClick={() => setShowRecommendations(false)}
      />
      <Field
        name={name}
        className="flex flex-col relative"
        {...props}
        aria-required
      >
        <Label htmlFor={uniqueId}>{label}</Label>
        <Control
          role="combobox"
          name={name}
          autoComplete="off"
          id={uniqueId}
          ref={inputRef}
          onChange={handleShowRecommendations}
          className={`border-solid border rounded-md px-2 py-1 text-sm font-semibold focus-within:outline-none ${
            error ? "border-red-500" : "border-gray-200"
          }`}
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
            RecommendationsBottomPosition[
              recommendations.length >= 3 || isLoadingRecommendations
                ? 3
                : recommendations.length
            ]
          } overflow-y-scroll overflow-x-hidden left-0 w-48 border border-light-purple ${
            showRecommendations ? " z-20 opacity-100" : "-z-20 opacity-0 hidden"
          }
        `}
        >
          <Skeleton
            title={false}
            paragraph={{ rows: 3, width: "9rem" }}
            className="px-2"
            active
            loading={isLoadingRecommendations}
          />
          {showRecommendations && (
            <Recommendations
              onClickRecommendation={(recommendation: string) =>
                handleClickRecommendation(recommendation)
              }
              disabled={recommendations[0] === NO_RECOMMENDATIONS_MESSAGE}
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
    </>
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
