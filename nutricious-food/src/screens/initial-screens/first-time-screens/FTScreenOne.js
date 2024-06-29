import React from "react";
import ViewComponent from "../components/ViewComponent";

const FTScreenOne = () => {

  data = {
    imageUri: require("../../../../assets/foods30-transperent.png"),
    imageDim: 65,
    text1: "Welcome to",
    text2: "Nutritious Foods",
    text3: "Fuel Your Fitness...",
    naviScreen: "FTScreenTwo",
    visited: 1,
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenOne;