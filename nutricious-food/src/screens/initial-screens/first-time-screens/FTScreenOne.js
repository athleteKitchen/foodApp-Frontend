import React from "react";
import ViewComponent from "../components/ViewComponent";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FTScreenOne = () => {

  data = {
    imageUri: require("../../../../assets/foods30-transperent.png"),
    imageDim: 65,
    text1: "Welcome to",
    text2: "Nutritious Foods",
    text3: "Fuel Your Fitness...",
    naviScreen: "FTScreenTwo",
    visited: 1,
    text2Size: wp(9),
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenOne;