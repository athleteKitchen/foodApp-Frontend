import "react-native-gesture-handler";
import { useEffect, useState, useCallback } from "react";
import StackNavigation from "./src/navigation/StackNavigation";
import { AuthProvider } from "./src/shared/helpers/AuthContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import {
  getLocationAsync,
  registerForPushNotificationsAsync,
} from "./src/shared/helpers/Permissions";
import InternetCheck from "./src/shared/helpers/InternetCheck";

const App = () => {

  useEffect(() => {
    getLocationAsync();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <InternetCheck>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
      <Toast />
      <StatusBar style="auto" />
    </InternetCheck>
  );
};

export default App;
