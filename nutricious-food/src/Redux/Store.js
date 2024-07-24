import { configureStore } from '@reduxjs/toolkit';
import mealPlanInputs from './reducers/mealPlanSlice';
import locationStats from './reducers/locationSlice';

const store = configureStore({
  reducer: {
    mealInputs: mealPlanInputs,
    location: locationStats,
  },
});

export default store;