import haversineDistance from "./haversineDistance";
import jsonData from "../../src/utils/fakeApi/AppendixA.json";

const ERROR_STRING = "fail";
const ERROR_CITY = "Dijon";
export const NO_RECOMMENDATIONS_MESSAGE = "No recommendations found";

export type DataResponse = {
  cities: Cities;
};

export type Cities = City[];
export type City = [string, number, number];
export type CitiesDistances = { [k: string]: number };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllCitiesData = async (): Promise<Cities> => {
  await sleep(3000);
  return new Promise((resolve) => resolve(jsonData.cities as Cities));
};

export const getAllCitiesNames = async (): Promise<string[]> => {
  const allCities = await getAllCitiesData();
  return allCities.map(([cityName]) => cityName);
};

//The first endpoint receives a keyword and returns a list of cities that match the keyword.
export const getRecommendationsList = async (keyword: string) => {
  if (keyword.toLowerCase() === ERROR_STRING.toLowerCase()) {
    throw new Error(`Oops! I did it again!`);
  }
  const allCitiesNames = await getAllCitiesNames();

  const recommendations = allCitiesNames.filter((c) =>
    c.toLowerCase().includes(keyword.toLowerCase())
  );

  if(recommendations.length === 0){
    recommendations.push(NO_RECOMMENDATIONS_MESSAGE);
  }

  return recommendations;
};

//The second endpoint receives a list of cities and calculates the distances.
export const calculatesCitiesDistances = async (citiesList: Array<string>) => {
  const allCities = await getAllCitiesData();
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
  if (cityNameToFind === ERROR_CITY) {
    throw new Error(`John, you can't travel to Dijon.`);
  }
  const foundCity = allCities.find(([cityName]) => cityName === cityNameToFind);
  if (foundCity) return foundCity;
  throw new Error(`Could not find ${cityNameToFind}`);
};
