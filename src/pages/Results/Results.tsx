import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CitiesPathIcons from "../CitiesPathIcons";
import PurpleCloud from "../../components/PurpleCloud";
import Text from "../../components/Text";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { useQuery } from "react-query";
import { calculatesCitiesDistances } from "../../utils/endpoints";
import { setDistancesBetweenCities } from "../../store/slices/citiesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useReactRedux";
import ProgressBar from "../../components/ProgressBar";
import dayjs from "dayjs";

const TripInKmCloud = ({ distance }: { distance: any }) => {
  return (
    <PurpleCloud>
      {distance ? (
        <Text secondary>{distance.toFixed(2)} km</Text>
      ) : (
        <ProgressBar />
      )}
    </PurpleCloud>
  );
};

export default function Results() {
  const [searchParams] = useSearchParams();
  const cities: string[] = JSON.parse(searchParams.get("cities") as string);
  const passengers = searchParams.get("passengers") as string;
  const date = searchParams.get("date") as string;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const distancesBetweenCities = useAppSelector(
    (state) => state.cities.distancesBetweenCities
  );

  useQuery({
    queryKey: ["distancesBetweenCities", cities],
    queryFn: () => {
      return calculatesCitiesDistances(cities);
    },
    onSuccess(data) {
      dispatch(setDistancesBetweenCities(data));
    },
    onError() {
      navigate("/error");
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleClickBack = () => {
    navigate(`/${location.search}`);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[40%_1rem_40%] w-full place-content-center">
        <div className="flex flex-col items-end mt-10 gap-[1.3rem] mr-2">
          {cities.map((city, i) => {
            if (i + 1 < cities.length) {
              return (
                <TripInKmCloud
                  key={`${city}-${cities[i + 1]}`}
                  distance={distancesBetweenCities[`${city}-${cities[i + 1]}`]}
                />
              );
            }
            return <></>;
          })}
        </div>
        <CitiesPathIcons dots={3} circles={cities.length - 1} />
        <div className="flex flex-col gap-[1.8rem] mt-6 ml-2">
          {cities.map((city, i) => (
            <Text key={`${city}-${i}`}>{city}</Text>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full font-semibold justify-center items-center gap-2 mt-2 whitespace-nowrap">
        <Paragraph>
          <Text secondary>{`${Object.values(distancesBetweenCities)
            .reduce((acc, cur) => {
              return acc + cur;
            }, 0)
            .toFixed(2)}`}</Text>{" "}
          is total distance
        </Paragraph>
        <Paragraph>
          <Text secondary>{`${passengers}`}</Text> passengers
        </Paragraph>
        <Paragraph>
          <Text secondary>{`${dayjs(date, "DD/MM/YYYY").format(
            "MMM D, YYYY"
          )}`}</Text>
        </Paragraph>
        <PrimaryButton onClick={handleClickBack}>Back</PrimaryButton>
      </div>
    </div>
  );
}

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className=" text-xs">{children}</p>
);
