import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Images from "../../shared/constants/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PoppinsText from "../../shared/components/PoppinsText";
import { useSelector } from "react-redux";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealPrepLoading = ({ navigation }) => {
  const { weight, height, protein, fitnessGoal, vegNonVeg, nonVegComfort } =
    useSelector((state) => state.mealInputs);
  const mealInputs = {
    height: height,
    weight: weight,
    fitnessGoal: fitnessGoal,
    proteinIntake: protein,
    dietaryHabit: vegNonVeg,
    nonVegComfort: nonVegComfort,
  };

  console.log(mealInputs);

  const setMealInputReceived = async () => {
    await AsyncStorage.setItem('mealInputReceived', 'true');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setMealInputReceived();
      navigation.navigate("Meals")
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* <PoppinsText weight="700" style={{ fontSize: 26}}>All Set</PoppinsText> */}
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Image
          source={Images.mealPrepGIF1}
          style={{ width: wp(60), height: hp(25) }}
        />
        <PoppinsText weight="700">
          We are Preparing your meal Plan...
        </PoppinsText>
      </View>
      <View
        style={{
          // position: "absolute",
          justifyContent: "center",
        }}
      >
        <Animated.View
          entering={FadeInDown.duration(600).delay(2000)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0ab451",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 25,
            borderCurve: "circular",
            columnGap: 5,
            marginBottom: 20
          }}
        >
          <ActivityIndicator size="large" color="#f5f5f5" />
          <PoppinsText weight="600" style={{ fontSize: 22, color: "#f5f5f5" }}>
            {" "}
            We'll notify you shortly{" "}
          </PoppinsText>
        </Animated.View>
      </View>
    </View>
  );
};

export default MealPrepLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
