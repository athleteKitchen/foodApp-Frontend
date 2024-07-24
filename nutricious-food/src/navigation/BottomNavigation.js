import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main-screens/HomeScreen";
import PlanningScreen from "../screens/main-screens/PlanningScreen";
import ProfileScreen from "../screens/main-screens/ProfileScreen";
import TabBar from "../shared/components/TabBar";
import CartScreen from "../screens/main-screens/CartScreen";
import FavoritesScreen from "../screens/main-screens/FavoritesScreen";
import { useState, useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../shared/helpers/AuthContext";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

  const [isMealPlanDone, setIsMealPlanDone] = useState(null);
  const { checkIsMealPlanDone } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const checkMealPlan = async () => {
    try {
      const response = await checkIsMealPlanDone();
      setIsMealPlanDone(response);
    } catch (err) {
      console.error("Error checking meal plan:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      checkMealPlan();
    }, [checkIsMealPlanDone])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ECC71" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Meals"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(255, 253, 239)",
        },
        tabBarOptions: {
          activeTintColor: '#236b41',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            elevation: 5,
          },
        },
        contentStyle: styles.screenContent,
      }}
      tabBar={props=> <TabBar {...props} />}
    >
      <Tab.Screen name="Meals" component={HomeScreen} />
      <Tab.Screen name="Plan" component={PlanningScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Wishlist" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
