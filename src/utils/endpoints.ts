import haversineDistance from "./haversineDistance";
import { cities } from "../../src/utils/fakeApi/AppendixA.json";
const ERROR_STRING = "fail";
const ERROR_CITY = "Dijon";

export type DataResponse = {
  cities: Cities;
};

export type Cities = City[];
export type City = [string, number, number];
export type CitiesDistances = { [k: string]: number };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllCitiesData = async (): Promise<Cities> => {
  await sleep(3000);
  return new Promise((resolve) => resolve(cities as Cities));
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

  while (recommendations.length <= 2) {
    const index = Math.floor(Math.random() * allCitiesNames.length);
    if (!recommendations.includes(allCitiesNames[index])) {
      recommendations.push(allCitiesNames[index]);
    }
  }

  while (recommendations.length > 3) {
    recommendations.pop();
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
