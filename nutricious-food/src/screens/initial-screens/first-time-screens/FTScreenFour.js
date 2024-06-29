import React from "react";
import ViewComponent from "../components/ViewComponent";

const FTScreenFour = () => {

  data = {
    imageUri: require("../../../../assets/food-delivery.png"),
    text1: "Get your",
    text2: "Food Delivered",
    text3: "to your Home Quickly...",
    naviScreen: "Welcome",
    text1Size: 34,
    text2Size: 36,
    text3Size: 27,
    visited: 4,
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenFour;