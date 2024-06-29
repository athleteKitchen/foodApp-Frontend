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
import HomeScreen from "../screens/main-screens/HomeScreen";
import ForgotPasswordScreen from "../screens/auth-screens/ForgotPasswordScreen";
import { getIsLoggedIn } from "../shared/configs/AxiosConfig";
import { useState, useEffect } from "react";
import OtpScreen from "../screens/auth-screens/OtpScreen";
import ResetPasswordScreen from "../screens/auth-screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const [isLoggedInValue, setIsLoggedInValue] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedInValue === "true" ? "Home" : "FTScreenOne"}
        // initialRouteName="Otp"
        screenOptions={{
          headerShown: false,
          contentStyle: styles.screenContent,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FTScreenOne" component={FTScreenOne} />
        <Stack.Screen name="FTScreenTwo" component={FTScreenTwo} />
        <Stack.Screen name="FTScreenThree" component={FTScreenThree} />
        <Stack.Screen name="FTScreenFour" component={FTScreenFour} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
