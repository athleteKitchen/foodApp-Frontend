import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MenuCategory from "../shared/components/MenuCategory";
import { menuItems } from "../shared/constants/Constants";
import Header from "../shared/components/Header";

const Tab = createMaterialTopTabNavigator();

const BreakfastScreen = () => <MenuCategory items={menuItems} />;
const LunchScreen = () => <MenuCategory items={menuItems} />;
const SnacksScreen = () => <MenuCategory items={menuItems} />;
const DesertScreen = () => <MenuCategory items={menuItems} />;
const DinnerScreen = () => <MenuCategory items={menuItems} />;

const TopNavigation = ({ route, navigation }) => {
  const { category } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: category.name });
  }, [navigation, category]);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <>
      <Header navigation={navigation} name={category.name} />
      <Tab.Navigator
        initialRouteName="Breakfast"
        screenOptions={{
          headerShown: false,
          contentStyle: styles.container,
          tabBarStyle: styles.tabBarStyle,
          tabBarIndicatorStyle: styles.indicator,
          tabBarLabelStyle: {
            ...styles.label,
          },
          tabBarItemStyle: styles.item,
          tabBarActiveTintColor: "#313130",
          tabBarInactiveTintColor: "#f5f5f5",
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Breakfast" component={BreakfastScreen} />
        <Tab.Screen name="Lunch" component={LunchScreen} />
        <Tab.Screen name="Snack" component={SnacksScreen} />
        <Tab.Screen name="Dinner" component={DinnerScreen} />
        <Tab.Screen name="Dessert" component={DesertScreen} />
      </Tab.Navigator>
    {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    width: "92%",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: "8%",
  },
  indicator: {
    backgroundColor: "#99d40d",
    position: "absolute",
    zIndex: -1,
    bottom: "15%",
    height: "70%",
    borderRadius: 10,
    color: "black",
  },
  label: {
    color: "#383535",
    fontFamily: "Poppins_800ExtraBold",
    numberOfLines: 1,
    ellipsizeMode: "tail",
    marginTop: 8,
    fontSize: 12,
  },
  item: {
    width: 100,
  },
});

export default TopNavigation;
