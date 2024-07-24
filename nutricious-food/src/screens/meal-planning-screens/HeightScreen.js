import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PoppinsText from "../../shared/components/PoppinsText";
import Images from "../../shared/constants/Images";
import MeasurementSlider from "../../shared/components/ButtonTab";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setHeight } from "../../Redux/reducers/mealPlanSlice";

export default function HeightScreen({ navigation, route }) {
  const [heightUnit, setHeightUnit] = useState(4);
  const dispatch = useDispatch();
  // const height = useSelector((state) => state.mealInputs.height);

  handleContinueButton = () => {
    dispatch(setHeight(heightUnit));
    navigation.navigate("FitnessGoal");
  }

  return (
    <View style={styles.content}>
      <LinearGradient colors={["#FFFFFF", "#F2F3FC"]} style={styles.container}>
        <View>
          <PoppinsText weight="800" style={{ fontSize: 23, marginTop: 10 }}>
            You are Few Steps away...
          </PoppinsText>
        </View>
        <View>
          <PoppinsText weight="600" style={{ fontSize: 20 }}>
            Tell Us About Yourself
          </PoppinsText>
        </View>

        <Image source={Images.Height} style={styles.image} />
        <PoppinsText weight="600" style={{ fontSize: 25 }}>
          Step 2
        </PoppinsText>

        <PoppinsText weight="700" style={styles.title}>
          What is your height?
        </PoppinsText>

        <View style={{ flex: 0.8, marginTop: 20 }}>
          <MeasurementSlider min={4} max={7} unit={"ft"} setUnit={setHeightUnit} />
        </View>

        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicatorInactive} />
          <View style={styles.stepIndicatorInactive} />
          <View style={styles.stepIndicatorInactive} />
        </View>

        <View style={{flexDirection: "row", justifyContent: "space-between", columnGap: 100}}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.continueButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueButton}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
  stepIndicator: {
    height: 4,
    width: 30,
    backgroundColor: "#2bbb67",
    borderRadius: 2,
    marginHorizontal: 2,
  },
  stepIndicatorInactive: {
    height: 4,
    width: 30,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginHorizontal: 2,
  },
  image: {
    width: 300,
    height: 250,
  },
  title: {
    fontSize: 24,
    color: "#333333",
    textAlign: "center",
  },
  continueButton: {
    backgroundColor: "#2bbb67",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    // marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
