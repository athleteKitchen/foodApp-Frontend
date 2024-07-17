import ViewComponent from "../components/ViewComponent";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FTScreenTwo = () => {

  data = {
    imageUri: require("../../../../assets/fitness-illustration-1-transperent.png"),
    text1: "Get a Chance to",
    text2: "Choose Varieties",
    text3: "of Fitness Meals...",
    naviScreen: "FTScreenThree",
    text1Size: 34,
    text2Size: wp(8),
    text3Size: 34,
    visited: 2,
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenTwo;