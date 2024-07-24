import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weight: 40,
  height: 4,
  protein: "",
  fitnessGoal: "",
  vegNonVeg: "",
  nonVegComfort: [],
};

const mealPlanInputs = createSlice({
  name: "mealInputs",
  initialState,
  reducers: {
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setProtein: (state, action) => {
      state.protein = action.payload;
    },
    setFitnessGoal: (state, action) => {
      state.fitnessGoal = action.payload;
    },
    setVegNonVeg: (state, action) => {
      state.vegNonVeg = action.payload;
    },
    setNonVegComfort: (state, action) => {
      state.nonVegComfort = action.payload;
    },
  },
});

export const {
  setWeight,
  setHeight,
  setProtein,
  setFitnessGoal,
  setVegNonVeg,
  setNonVegComfort
} = mealPlanInputs.actions;

export default mealPlanInputs.reducer;
