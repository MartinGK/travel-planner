import {
  CircleIcon,
  DotFilledIcon,
} from "@radix-ui/react-icons";
import MapPoint from "../components/icons/MapPoint";

type Props = {
  dots: number;
  circles: number;
};

export default function CitiesPathIcons({ dots, circles }: Props) {
  return (
    <div className="row-span-1 col-span-1 text-center flex flex-col items-center pt-6">
      {new Array(circles).fill("").map((_, i) => {
        return (
          <div className="contents" key={`circle-and-points-container-${i}`}>
            <CircleIcon className="m-1 h-3 w-3" />
            {new Array(dots).fill("").map((_, j) => {
              return (
                <DotFilledIcon
                  className="h-1 w-1 mb-1"
                  key={`point-${i}-${j}`}
                />
              );
            })}
          </div>
        );
      })}
      <MapPoint className="m-1 h-4 w-4" />
    </div>
  );
}
