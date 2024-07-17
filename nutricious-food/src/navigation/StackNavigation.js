import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import WelcomeScreen from "../screens/initial-screens/WelcomeScreen";
import FTScreenOne from "../screens/initial-screens/first-time-screens/FTScreenOne";
import FTScreenTwo from "../screens/initial-screens/first-time-screens/FTScreenTwo";
import FTScreenThree from "../screens/initial-screens/first-time-screens/FTScreenThree";
import FTScreenFour from "../screens/initial-screens/first-time-screens/FTScreenFour";
import RegisterScreen from "../screens/auth-screens/RegisterScreen";
import LoginScreen from "../screens/auth-screens/LoginScreen";
import ForgotPasswordScreen from "../screens/auth-screens/ForgotPasswordScreen";
import { getIsLoggedIn } from "../shared/configs/AxiosConfig";
import { useState, useEffect, useCallback } from "react";
import OtpScreen from "../screens/auth-screens/OtpScreen";
import ResetPasswordScreen from "../screens/auth-screens/ResetPasswordScreen";
import BottomNavigation from "./BottomNavigation";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import {
  Inter_400Regular,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import TopNavigation from "./TopNavigation";
import DetailsScreen from "../screens/main-screens/DetailsScreen";

enableScreens();

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

const StackNavigation = () => {
  const [isLoggedInValue, setIsLoggedInValue] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    Inter_400Regular,
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  const isLoggedIn = async () => {
    try {
      const val = await getIsLoggedIn();
      return val;
    } catch (error) {
      console.error("Error getting login status:", error);
    }
  };

  useEffect(() => {
    isLoggedIn().then((val) => {
      setIsLoggedInValue(val);
      setLoading(false);
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loading) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={isLoggedInValue === "true" ? "Main" : "FTScreenOne"}
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            contentStyle: styles.screenContent,
          }}
        >
          <Stack.Screen name="Main" component={BottomNavigation} />
          <Stack.Screen name="FitItems" component={TopNavigation} />
          <Stack.Screen name="FTScreenOne" component={FTScreenOne} />
          <Stack.Screen name="FTScreenTwo" component={FTScreenTwo} />
          <Stack.Screen name="FTScreenThree" component={FTScreenThree} />
          <Stack.Screen name="FTScreenFour" component={FTScreenFour} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="ItemDetails" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
