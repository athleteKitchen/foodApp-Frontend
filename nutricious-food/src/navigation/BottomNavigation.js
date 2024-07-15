import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/main-screens/HomeScreen";
import PlanningScreen from "../screens/main-screens/PlanningScreen";
import ProfileScreen from "../screens/main-screens/ProfileScreen";
import TabBar from "../shared/components/TabBar";
import CartScreen from "../screens/main-screens/CartScreen";
import FavoritesScreen from "../screens/main-screens/OrdersScreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Meals"
      screenOptions={{
        headerShown: false,
        contentStyle: styles.screenContent,
      }}
      tabBar={props=> <TabBar {...props} />}
    >
      <Tab.Screen name="Meals" component={HomeScreen} />
      <Tab.Screen name="Plan" component={PlanningScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
});
