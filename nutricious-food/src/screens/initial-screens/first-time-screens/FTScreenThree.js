import React from "react";
import ViewComponent from "../components/ViewComponent";

const FTScreenThree = () => {

  data = {
    imageUri: require("../../../../assets/food-container1.png"),
    text1: "Plan your",
    text2: "Fitness Meal",
    text3: "for a Better You...",
    naviScreen: "FTScreenFour",
    text1Size: 40,
    text2Size: 40,
    text3Size: 34,
    visited: 3,
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenThree;