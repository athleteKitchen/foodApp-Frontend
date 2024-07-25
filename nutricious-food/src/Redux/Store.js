import { configureStore } from '@reduxjs/toolkit';
import mealPlanInputs from './reducers/mealPlanSlice';
import locationStats from './reducers/locationSlice';
import userInfo from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    mealInputs: mealPlanInputs,
    location: locationStats,
    userDetails: userInfo,
  },
});

export default store;