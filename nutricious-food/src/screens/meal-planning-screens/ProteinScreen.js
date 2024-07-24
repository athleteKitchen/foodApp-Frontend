import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PoppinsText from "../../shared/components/PoppinsText";
import Images from "../../shared/constants/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProtein } from "../../Redux/reducers/mealPlanSlice";

export default function ProteinScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState("30g");
  const dispatch = useDispatch();

  handleContinueButton = () => {
    dispatch(setProtein(selectedCategory));
    navigation.navigate("VegNonVeg");
  }

  const categories = [
    { id: 1, protein: "30g" },
    { id: 2, protein: "60g" },
    { id: 3, protein: "90g" },
    { id: 4, protein: "120g" },
  ];

  return (
    <LinearGradient colors={["#FFFFFF", "#F2F3FC"]} style={styles.container}>
      <View style={styles.content}>
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

        <Image source={Images.ProteinShake} style={styles.image} />
        <PoppinsText weight="600" style={{ fontSize: 25 }}>
          Step 4
        </PoppinsText>

        <PoppinsText weight="700" style={styles.title}>
          What's Your Protein Intake?
        </PoppinsText>

        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryBox,
                selectedCategory === category.protein && styles.selectedCategoryBox,
              ]}
              onPress={() => setSelectedCategory(category.protein)}
            >
              <PoppinsText weight="600" style={[styles.categoryText, selectedCategory === category.protein && styles.selectedCategoryBoxText ]}>
                {category.protein}
              </PoppinsText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.stepIndicatorContainer}>
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicator} />
          <View style={styles.stepIndicatorInactive} />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            columnGap: 100,
          }}
        >
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
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    width: wp(60),
    height: hp(25),
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
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp(10),
  },
  categoryBox: {
    width: wp(35),
    height: wp(28),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(2),
    borderWidth: 2,
    backgroundColor: "#fff",
  },
  categoryImage: {
    width: wp(30),
    height: wp(18),
    borderRadius: wp(4),
  },
  categoryText: {
    marginTop: wp(1),
    color: "#5c5b5b",
    fontSize: wp(8),
  },
  selectedCategoryBox: {
    backgroundColor: '#f8c807',
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedCategoryBoxText: {
    color: '#f5f5f5',
  },
});
