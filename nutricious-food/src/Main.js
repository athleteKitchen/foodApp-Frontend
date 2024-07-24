import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigation from "./navigation/StackNavigation";
import { AuthProvider } from "./shared/helpers/AuthContext";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import InternetCheck from "./shared/helpers/InternetCheck";
import "./shared/constants/Images";
import { Provider } from 'react-redux';
import store from "./Redux/Store";
import { useEffect } from "react";
import { requestLocationAsync, registerForPushNotificationsAsync } from "./shared/helpers/Permissions";

const Main = () => {

  useEffect(() => {
    requestLocationAsync();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <InternetCheck>
        <AuthProvider>
          <Provider store={store}>
            <StackNavigation />
          </Provider>
        </AuthProvider>
        <Toast />
        <StatusBar style="auto" />
      </InternetCheck>
    </GestureHandlerRootView>
  )
}

export default Main
