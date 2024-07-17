import ViewComponent from "../components/ViewComponent";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const FTScreenThree = () => {

  data = {
    imageUri: require("../../../../assets/food-container1.png"),
    text1: "Plan your",
    text2: "Fitness Meal",
    text3: "for a Better You...",
    naviScreen: "FTScreenFour",
    text1Size: 40,
    text2Size: wp(11),
    text3Size: 34,
    visited: 3,
  };

  return (
    <ViewComponent data={data} />
  );
};

export default FTScreenThree;