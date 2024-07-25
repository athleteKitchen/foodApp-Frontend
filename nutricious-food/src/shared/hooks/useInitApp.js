import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../helpers/AuthContext";
import { getGeoLocationAsync, getLocationCoordsAsync } from "../helpers/Permissions";
import { 
  setAddress, setCity, setDistrict, setLatitude, setLongitude, 
  setPostalCode, setStreet, setStreetNumber 
} from "../../Redux/reducers/locationSlice";
import { setEmail, setIsMealPlanDone, setMealPlan, setName, setPhone } from "../../Redux/reducers/userSlice";

export const useInitApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getIsLoggedIn, getUserInfo } = useContext(AuthContext);
  const dispatch = useDispatch();

  const getLocation = async () => {
    const geoLocation = await getGeoLocationAsync();
    const coords = await getLocationCoordsAsync();
    const actions = [
      setAddress(geoLocation[0].formattedAddress),
      setCity(geoLocation[0].city),
      setStreet(geoLocation[0].street),
      setStreetNumber(geoLocation[0].streetNumber),
      setDistrict(geoLocation[0].district),
      setPostalCode(geoLocation[0].postalCode),
      setLongitude(coords.longitude),
      setLatitude(coords.latitude)
    ];
    actions.forEach(dispatch);
  };

  const getUserDetails = async () => {
    try {
      const response = await getUserInfo();
      console.log(response.userInfo);
      const actions = [
        setName(response.userInfo.name),
        setEmail(response.userInfo.email),
        setPhone(response.userInfo.phone),
        setIsMealPlanDone(response.userInfo.isMealPlanDone),
        setMealPlan(response.userInfo.mealPlan)
      ]
      actions.forEach(dispatch);
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const val = await getIsLoggedIn();
        setIsLoggedIn(val);
        if(val === "true") getUserDetails();
      } catch (error) {
        console.error("Error getting login status:", error);
      } finally {
        setLoading(false);
      }
    };

    getLocation();
    checkLoginStatus();
  }, []);

  return [isLoggedIn, loading];
};
