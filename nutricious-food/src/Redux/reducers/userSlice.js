import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  mealPlan: {
    breakfast: "none",
    lunch: "none",
    dinner: "none",
    snack: "none",
    desert: "none",
  },
  isMealPlanDone: false,
};

const userInfo = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setMealPlan: (state, action) => {
      (state.mealPlan.breakfast = action.payload.breakfast),
        (state.mealPlan.lunch = action.payload.lunch),
        (state.mealPlan.dinner = action.payload.dinner),
        (state.mealPlan.snack = action.payload.snack),
        (state.mealPlan.desert = action.payload.desert);
    },
    setIsMealPlanDone: (state, action) => {
      state.isMealPlanDone = action.payload;
    },
    resetUserInfo: (state) => {
      return initialState;
    },
  },
});

export const {
  setName,
  setEmail,
  setPhone,
  setMealPlan,
  setIsMealPlanDone,
  resetUserInfo,
} = userInfo.actions;

export default userInfo.reducer;
