import "react-native-gesture-handler";
import { useEffect, useState } from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthProvider } from "./src/shared/helpers/AuthContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";
import * as Notifications from 'expo-notifications';

const App = () => {
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Location permission not granted');
        // Handle permission denied case
    } else {
        console.log('Location permission granted');
        // Permission granted, proceed with using Location
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Notification permission not granted');
      return;
    }
  };
  
  useEffect(() => {
    getLocationAsync();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
      <Toast />
      <StatusBar style="auto" />
    </>
  );
};

export default App;
