import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

const requestLocationAsync = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Location permission not granted");
  } else {
    console.log("Location permission granted");
  }
};

const registerForPushNotificationsAsync = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Notification permission not granted");
    return;
  }
};

const getLocationCoordsAsync = async () => {
  const status = await Location.hasServicesEnabledAsync();
  if (status === true) {
    const locationCoords = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });
    return {
      longitude: locationCoords.coords.longitude,
      latitude: locationCoords.coords.latitude,
    };
  } else {
    await requestLocationAsync();
    return;
  }
};

const getInputLocationCoordsAsync = async (address) => {
  const status = await Location.hasServicesEnabledAsync();
  if (status === true) {
    try {
      const geocodeResults = await Location.geocodeAsync(address);
      if (geocodeResults.length > 0) {
        const locationCoords = geocodeResults[0];
        return {
          longitude: locationCoords.longitude,
          latitude: locationCoords.latitude,
        };
      } else {
        throw new Error("No coordinates found for the provided address.");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  } else {
    await requestLocationAsync();
    return null;
  }
};

const getLocationAddressAsync = async (longitude, latitude) => {
  try {
    const address = await Location.reverseGeocodeAsync({
      longitude: longitude,
      latitude: latitude,
    });
    return address;
  } catch (error) {
    console.error(error)
    return "Some error Occurred"
  }
};

const getGeoLocationAsync = async () => {
  const status = await Location.hasServicesEnabledAsync();
  if (status === true) {
    const locationCoords = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });
    const address = await Location.reverseGeocodeAsync({
      longitude: locationCoords.coords.longitude,
      latitude: locationCoords.coords.latitude,
    });
    return address;
  } else {
    await requestLocationAsync();
    return;
  }
};

export {
  requestLocationAsync,
  registerForPushNotificationsAsync,
  getLocationCoordsAsync,
  getLocationAddressAsync,
  getGeoLocationAsync,
  getInputLocationCoordsAsync,
};
