import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../helpers/AuthContext";
import {
  getGeoLocationAsync,
  getLocationCoordsAsync,
} from "../helpers/Permissions";
import {
  setAddress,
  setCity,
  setDistrict,
  setLatitude,
  setLongitude,
  setPostalCode,
  setStreet,
  setStreetNumber,
} from "../../Redux/reducers/locationSlice";
import {
  setEmail,
  setIsMealPlanDone,
  setMealPlan,
  setName,
  setPhone,
} from "../../Redux/reducers/userSlice";

export const useInitApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getIsLoggedIn, getUserInfo } = useContext(AuthContext);
  const dispatch = useDispatch();

  const getLocation = async () => {
    const geoLocation = await getGeoLocationAsync();
    const coords = await getLocationCoordsAsync();
    dispatch(setAddress(geoLocation[0].formattedAddress));
    dispatch(setCity(geoLocation[0].city));
    dispatch(setStreet(geoLocation[0].street));
    dispatch(setStreetNumber(geoLocation[0].streetNumber));
    dispatch(setDistrict(geoLocation[0].district));
    dispatch(setPostalCode(geoLocation[0].postalCode));
    dispatch(setLongitude(coords.longitude));
    dispatch(setLatitude(coords.latitude));
  };

  const getUserDetails = async () => {
    try {
      const response = await getUserInfo();
      dispatch(setName(response.userInfo.name));
      dispatch(setEmail(response.userInfo.email));
      dispatch(setPhone(response.userInfo.phone));
      dispatch(setIsMealPlanDone(response.userInfo.isMealPlanDone));
      dispatch(setMealPlan(response.userInfo.mealPlan));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const val = await getIsLoggedIn();
        setIsLoggedIn(val);
        if (val === "true") getUserDetails();
      } catch (error) {
        console.error("Error getting login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    getLocation();
  }, []);

  return [isLoggedIn, loading];
};
