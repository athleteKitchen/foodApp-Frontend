import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../helpers/AuthContext";
import { getGeoLocationAsync, getLocationCoordsAsync } from "../helpers/Permissions";
import { 
  setAddress, setCity, setDistrict, setLatitude, setLongitude, 
  setPostalCode, setStreet, setStreetNumber 
} from "../../Redux/reducers/locationSlice";

export const useInitApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getIsLoggedIn } = useContext(AuthContext);
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

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const val = await getIsLoggedIn();
        setIsLoggedIn(val);
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
