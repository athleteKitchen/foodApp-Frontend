import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "../screens/initial-screens/WelcomeScreen";
import FTScreenOne from "../screens/initial-screens/first-time-screens/FTScreenOne";
import FTScreenTwo from "../screens/initial-screens/first-time-screens/FTScreenTwo";
import FTScreenThree from "../screens/initial-screens/first-time-screens/FTScreenThree";
import FTScreenFour from "../screens/initial-screens/first-time-screens/FTScreenFour";
import RegisterScreen from "../screens/auth-screens/RegisterScreen";
import LoginScreen from "../screens/auth-screens/LoginScreen";
import ForgotPasswordScreen from "../screens/auth-screens/ForgotPasswordScreen";
import OtpScreen from "../screens/auth-screens/OtpScreen";
import ResetPasswordScreen from "../screens/auth-screens/ResetPasswordScreen";
import BottomNavigation from "./BottomNavigation";
import TopNavigation from "./TopNavigation";
import DetailsScreen from "../screens/main-screens/DetailsScreen";
import WeightScreen from "../screens/meal-planning-screens/WeightScreen";
import HeightScreen from "../screens/meal-planning-screens/HeightScreen";
import ProteinScreen from "../screens/meal-planning-screens/ProteinScreen";
import FitnessGoalScreen from "../screens/meal-planning-screens/FitnessGoalScreen";
import VegNonVegScreen from "../screens/meal-planning-screens/VegNonVegScreen";
import MealPrepLoading from "../screens/meal-planning-screens/MealPrepLoading";
import LoadingModal from "../shared/components/LoadingModal";
import { useInitApp } from "../shared/hooks/useInitApp";
import { useFontsLoaded } from "../shared/hooks/useFontsLoaded";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import MapView from "../screens/location-screens/MapView";
import LocationDetails from "../screens/location-screens/LocationDetails";

enableScreens();

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const screens = [
  { name: "Main", component: BottomNavigation },
  { name: "FitItems", component: TopNavigation },
  { name: "FTScreenOne", component: FTScreenOne },
  { name: "FTScreenTwo", component: FTScreenTwo },
  { name: "FTScreenThree", component: FTScreenThree },
  { name: "FTScreenFour", component: FTScreenFour },
  { name: "Welcome", component: WelcomeScreen },
  { name: "Register", component: RegisterScreen },
  { name: "Login", component: LoginScreen },
  { name: "ForgotPassword", component: ForgotPasswordScreen },
  { name: "Otp", component: OtpScreen },
  { name: "ResetPassword", component: ResetPasswordScreen },
  { name: "ItemDetails", component: DetailsScreen },
  { name: "Weight", component: WeightScreen },
  { name: "Height", component: HeightScreen },
  { name: "Protein", component: ProteinScreen },
  { name: "FitnessGoal", component: FitnessGoalScreen },
  { name: "VegNonVeg", component: VegNonVegScreen },
  { name: "MealPlanLoading", component: MealPrepLoading },
  { name: "MapView", component: MapView},
  { name: "LocationDetails", component: LocationDetails, animation: "slide_from_bottom" }
];

const StackNavigation = () => {
  const [isLoggedIn, loading] = useInitApp();
  const fontsLoaded = useFontsLoaded();

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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn === "true" ? "Main" : "FTScreenOne"}
          screenOptions={{
            headerShown: false,
            contentStyle: styles.screenContent,
          }}
        >
          {screens.map((screen) => (
            <Stack.Screen key={screen.name} name={screen.name} component={screen.component} options={{ animation: screen.animation ? screen.animation : "default" }} />
          ))}
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
