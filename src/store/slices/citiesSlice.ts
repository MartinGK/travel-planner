import { createSlice } from "@reduxjs/toolkit";

type CitiesInitialState = {
  recommendedCities: string[];
  loading: boolean;
};

const initialState: CitiesInitialState = {
  recommendedCities: [],
  loading: false,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    setRecommendedCities: (state, action) => {
      state.recommendedCities = action.payload;
    },
  },
});

export const { loading, setRecommendedCities } = citiesSlice.actions;
export default citiesSlice.reducer;
