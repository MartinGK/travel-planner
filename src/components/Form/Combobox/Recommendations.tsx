import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import {
  NO_RECOMMENDATIONS_MESSAGE,
  getRecommendationsList,
} from "../../../utils/endpoints";
type Props = {
  value: string;
  show: boolean;
  onClickRecommendation: (r: string) => void;
};

type TRecommendationsBottomPosition = {
  [k: number]: string;
};

const RecommendationsBottomPosition: TRecommendationsBottomPosition = {
  0: "-bottom-20 h-24",
  1: "-bottom-[2rem] h-10",
  2: "-bottom-14 h-18",
  3: "-bottom-[5.5rem] h-[6.1rem]",
};

export default function Recommendations({
  value,
  show,
  onClickRecommendation,
}: Props) {
  const [disabled, setDisabled] = useState(false);

  const { isLoading, data: recommendations = [] } = useQuery({
    queryKey: ["cities", value],
    queryFn: () => getRecommendationsList(value),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    cacheTime: 1,
    suspense: true,
  });

  useEffect(() => {
    setDisabled(recommendations[0] === NO_RECOMMENDATIONS_MESSAGE);
  }, [recommendations]);

  return (
    <div
      className={`absolute transition bg-white shadow-xl rounded py-2 ${
        RecommendationsBottomPosition[
          recommendations.length >= 3 || isLoading ? 3 : recommendations.length
        ]
      } overflow-y-scroll overflow-x-hidden left-0 w-48 border border-light-purple ${
        show ? " z-20 opacity-100" : "-z-20 opacity-0 hidden"
      }
    `}
    >
      <ul className="grid gap-2 justify-center relative">
        {recommendations.map((recommendation) => (
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
        ))}
      </ul>
    </div>
  );
}
