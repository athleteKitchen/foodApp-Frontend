import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PoppinsText from "../../shared/components/PoppinsText";
import Images from "../../shared/constants/Images";
import MeasurementSlider from "../../shared/components/ButtonTab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setWeight } from "../../Redux/reducers/mealPlanSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WeightScreen({ navigation, route }) {
  const [weightUnit, setWeightUnit] = useState(40);
  const dispatch = useDispatch();
  const [isMealInputReceived, setIsMealInputReceived] = useState(null);
  // const weight = useSelector((state) => state.mealInputs.weight);

  handleContinueButton = () => {
    dispatch(setWeight(weightUnit));
    navigation.navigate("Height");
  }

  const checkMealInputsReceived = async () => {
    try {
      const response = await AsyncStorage.getItem("mealInputReceived");
      if(response === "true"){
        setIsMealInputReceived(response)
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      await checkMealInputsReceived();
      if(isMealInputReceived === "true") navigation.navigate("MealPlanLoading");
    })();
  }, [isMealInputReceived])

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

        <Image source={Images.Weight} style={styles.image} />
        <PoppinsText weight="600" style={{ fontSize: 25 }}>
          Step 1
        </PoppinsText>

        <PoppinsText weight="700" style={styles.title}>
          What is your weight?
        </PoppinsText>

        <View style={{ flex: 0.8, marginTop: 20 }}>
          <MeasurementSlider min={40} max={130} unit="kg" setUnit={setWeightUnit} />
        </View>

        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicatorInactive} />
          <View style={styles.stepIndicatorInactive} />
          <View style={styles.stepIndicatorInactive} />
          <View style={styles.stepIndicatorInactive} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 80,
          }}
        >
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Main" }],
              })
            }
          >
            <Text style={styles.continueButtonText}>Home</Text>
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
    width: 250,
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
    paddingHorizontal: 25,
    borderRadius: 25,
    // marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
