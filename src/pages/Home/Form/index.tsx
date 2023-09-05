import { Root } from "@radix-ui/react-form";
import { PlusCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Text from "../../../components/Text";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import Combobox from "../../../components/Form/Combobox";
import PassengersInput from "../../../components/Form/PassengersInput";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "../../../components/Form/DatePicker";
import CitiesPathIcons from "../../CitiesPathIcons";
import dayjs from "dayjs";

type paramsKeys = "cities" | "passengers" | "date";

type ResultsProps = {
  [k in paramsKeys]: string;
};

type FormErrors = {
  cities: boolean[];
  passengers: boolean;
  date: boolean;
};

const generateParamsObjectFromFormData = (data: {
  [k: string]: FormDataEntryValue;
}): ResultsProps => {
  const params: ResultsProps = {
    cities: "",
    passengers: "0",
    date: dayjs().format("MM/DD/YYYY"),
  };
  const citiesParam = ["", ""];
  Object.keys(data).forEach((key) => {
    if (key.includes("city")) {
      citiesParam[parseInt(key.split("-")[1])] = data[key] as string;
    } else if (key in params) {
      params[key as keyof ResultsProps] = data[key] as string;
    }
  });

  params.cities = JSON.stringify(citiesParam);
  return params;
};

export default function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const numberOfPassengers: string | null = searchParams.get("passengers");
  const date: string | null = searchParams.get("date");
  const [errors, setErrors] = useState<FormErrors>({
    cities: [false, false],
    passengers: false,
    date: false,
  });
  const chosenCities: string[] = searchParams.get("cities")
    ? JSON.parse(searchParams.get("cities") as string)
    : ["", ""];
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const newParams = generateParamsObjectFromFormData(data);
    const formErrors = getErrorsFormFromSearchParams(newParams);
    setErrors(formErrors);
    updateErrorsStatus();
    setSearchParams(newParams);
    if (checkIfErrorInForm(formErrors)) {
      form.checkValidity();
      setSubmitDisabled(true);
      event.stopPropagation();
      return;
    }
    navigate(`/results${location.search}`);
  };

  const checkIfErrorInForm = (formErrors: FormErrors) => {
    if (
      formErrors.cities.every((b) => b === false) &&
      !formErrors.passengers &&
      !formErrors.date
    ) {
      setSubmitDisabled(false);
      return false;
    }
    return true;
  };

  const addOneDestination = () => {
    const newChosenCitiesPlusOne = [...chosenCities, ""];
    updateSearchParams("cities", JSON.stringify(newChosenCitiesPlusOne));
  };

  const deleteDestination = (index: number) => {
    const newChosenCities = chosenCities.filter(
      (_: string, i: number) => i !== index
    );
    updateSearchParams("cities", JSON.stringify([...newChosenCities]));
  };

  const updateDestination = (cityName: string, index: number) => {
    const newChosenCities = [...chosenCities];
    newChosenCities[index] = cityName;
    updateSearchParams("cities", JSON.stringify([...newChosenCities]));
  };

  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitDisabled(false);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const newParams = generateParamsObjectFromFormData(data);
    setSearchParams(newParams);
  };

  const updateSearchParams = (key: paramsKeys, value: string) => {
    const allSearchParams = getAllSearchParams();
    removeError(key);
    setSearchParams({
      ...allSearchParams,
      [key]: value,
    });
  };

  const removeError = (key: paramsKeys, index?: number) => {
    const newErrors: FormErrors = { ...errors };
    if (key !== "cities") {
      newErrors[key] = false;
    } else if (index !== undefined && key === "cities") {
      newErrors[key][index] = false;
    }
    setErrors(newErrors);
  };

  const getErrorsFormFromSearchParams = (allSearchParams: ResultsProps) => {
    return {
      cities: JSON.parse(allSearchParams.cities).map((city: string): boolean =>
        city ? false : true
      ),
      passengers: allSearchParams.passengers === "0",
      date: dayjs(allSearchParams.date).isAfter(dayjs().add(-1, "day")),
    };
  };

  const getAllSearchParams = () => {
    const passengers: string = searchParams.get("passengers")
      ? searchParams.get("passengers")!
      : "0";
    const date: string = searchParams.get("date")
      ? searchParams.get("date")!
      : dayjs().format("DD/MM/YYYY");
    const cities: string[] = searchParams.get("cities")
      ? JSON.parse(searchParams.get("cities") as string)
      : ["", ""];

    return {
      cities: JSON.stringify(cities),
      passengers,
      date,
    };
  };

  const handleCityChange = (city: string, i: number) => {
    updateDestination(city, i);
    removeError("cities", i);
  };

  const updateErrorsStatus = () => {
    const allSearchParams = getAllSearchParams();
    const errors = getErrorsFormFromSearchParams(allSearchParams);
    setErrors(errors);
  };

  useEffect(() => {
    if (checkIfErrorInForm(errors)) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [errors]);

  return (
    <Root onSubmit={handleSubmit} onChange={handleFormChange}>
      <div className="flex justify-center sm:flex-row flex-col gap-4 items-center sm:items-start">
        <div className="flex gap-2">
          <div className="flex flex-col items-end justify-center ">
            <CitiesPathIcons dots={6} circles={chosenCities.length - 1} />
            <PlusCircledIcon className="h-3 w-3 self-center text-purple  align-bottom mt-auto justify-start" />
          </div>
          <div className={`flex flex-col gap-2  max-w-xs justify-center`}>
            {chosenCities.map((city: string, i: number) => {
              return (
                <div
                  key={`combobox-container-${i}`}
                  className="flex gap-2 justify-start"
                >
                  <Combobox
                    label={`City of ${i === 0 ? "origin" : "destination"}`}
                    name={`city-${i}`}
                    value={city}
                    onChange={(city: string) => handleCityChange(city, i)}
                    error={errors.cities[i]}
                  />
                  <div className="relative px-2">
                    <CrossCircledIcon
                      role="button"
                      className={`h-3 w-3 absolute self-center right-1 bottom-5 z-10 transition-opacity text-purple ${
                        i < 2 ? "hidden" : "opacity-100"
                      }`}
                      aria-label="delete"
                      onClick={() => deleteDestination(i)}
                    />
                  </div>
                </div>
              );
            })}
            <Text
              className="cursor-pointer"
              onClick={addOneDestination}
              secondary
            >
              Add destination
            </Text>
          </div>
        </div>

        <div className="col-start-2 flex gap-6 sm:gap-1 flex-row sm:flex-col -mt-1 ">
          <PassengersInput
            onChange={(value: string) =>
              updateSearchParams("passengers", value)
            }
            value={numberOfPassengers ? numberOfPassengers : "0"}
            error={errors.passengers}
          />
          <DatePicker
            value={date ? date : dayjs().format("DD/MM/YYYY")}
            onChange={(value) => {
              updateSearchParams("date", value);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center items-center pt-5">
        <SubmitButton
          disabled={submitDisabled}
          className=" col-start-3 col-end-4"
        />
      </div>
    </Root>
  );
}
