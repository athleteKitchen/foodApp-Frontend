import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  street: "",
  streetNumber: "",
  postalCode: "",
  city: "",
  district: "",
  latitude: "",
  longitude: "",
};

const locationStats = createSlice({
  name: "location",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setStreetNumber: (state, action) => {
      state.streetNumber = action.payload;
    },
    setPostalCode: (state, action) => {
      state.postalCode = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    resetLocation: (state) => {
      return initialState;
    }
  },
});

export const {
  setAddress,
  setStreet,
  setStreetNumber,
  setPostalCode,
  setCity,
  setDistrict,
  setLongitude,
  setLatitude,
  resetLocation,
} = locationStats.actions;

export default locationStats.reducer;
