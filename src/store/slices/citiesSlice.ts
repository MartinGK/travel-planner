import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CitiesDistances } from "../../utils/endpoints";

type CitiesInitialState = {
  recommendedCities: string[];
  distancesBetweenCities: {
    [k: string]: number;
  };
  loading: boolean;
};

const initialState: CitiesInitialState = {
  recommendedCities: [],
  distancesBetweenCities: {},
  loading: false,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    setDistancesBetweenCities: (state, action: PayloadAction<CitiesDistances>) => {
      state.distancesBetweenCities = action.payload;
    },
  },
});

export const { loading, setDistancesBetweenCities } = citiesSlice.actions;
export default citiesSlice.reducer;
