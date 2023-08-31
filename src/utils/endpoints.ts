import haversineDistance from "./haversineDistance";

type DataResponse = {
  cities: Cities;
};

type Cities = City[];
type City = [string, number, number];
type CitiesDistances = { [k: string]: number };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getAllCities = async (): Promise<Cities> => {
  const res: Response = await fetch("http://localhost:3001/cities");
  const data: DataResponse = await res.json();
  await sleep(3000);
  return data.cities;
};

//The first endpoint receives a keyword and returns a list of cities that match the keyword.
export const getRecommendationsList = async (keyword: string) => {
  const allCities = await getAllCities();
  return allCities.filter((city) => city[0].includes(keyword));
};

//The second endpoint receives a list of cities and calculates the distances.
export const calculatesCitiesDistances = async (citiesList: Array<string>) => {
  const allCities = await getAllCities();
  const res: CitiesDistances = {};
  for (let i = 0; i < citiesList.length - 1; i++) {
    const [firstCityName, ...firstPoints] = findCity(allCities, citiesList[i]);
    const [secondCityName, ...secondPoints] = findCity(
      allCities,
      citiesList[i + 1]
    );
    const key = `${firstCityName}-${secondCityName}`;
    res[key] = haversineDistance({ firstPoints, secondPoints });
  }
  return res;
};

const findCity = (allCities: Cities, cityNameToFind: string): City => {
  const foundCity = allCities.find(([cityName]) => cityName === cityNameToFind);
  if (foundCity) return foundCity;
  throw new Error(`Could not find ${cityNameToFind}`);
};
