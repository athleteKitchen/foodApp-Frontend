import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PoppinsText from "../../shared/components/PoppinsText";
import Images from "../../shared/constants/Images";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { setNonVegComfort, setVegNonVeg } from "../../Redux/reducers/mealPlanSlice";

export default function VegNonVegScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState("Veg");
  const [nonVegComfortable, setNonVegComfortable] = useState([]);
  const dispatch = useDispatch();

  const categories = [
    { id: 1, diet: "Veg", color: "#2ecc71" },
    { id: 2, diet: "Non Veg", color: "#dd2619" },
  ];

  const nonVegComfortDays = [
    { id: 1, days: "Mon" },
    { id: 2, days: "Tue" },
    { id: 3, days: "Wed" },
    { id: 4, days: "Thru" },
    { id: 5, days: "Fri" },
    { id: 6, days: "Sat" },
    { id: 7, days: "Sun" },
  ];

  const toggleDay = (day) => {
    setNonVegComfortable((prevState) =>
      prevState.includes(day)
        ? prevState.filter((d) => d !== day)
        : [...prevState, day]
    );
  };

  const handleContinueButton = () => {
    dispatch(setVegNonVeg(selectedCategory));
    dispatch(setNonVegComfort(nonVegComfortable));
    navigation.navigate("MealPlanLoading");
  }

  return (
    <LinearGradient colors={["#FFFFFF", "#F2F3FC"]} style={styles.container}>
      <View style={styles.content}>
        <View style={{ flex: 1, alignItems: "center", marginTop: hp(5) }}>
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

          <Image source={Images.vegNonVeg} style={[styles.image]} />
          <PoppinsText weight="600" style={{ fontSize: 25 }}>
            Step 5
          </PoppinsText>

          <PoppinsText weight="700" style={styles.title}>
            What's your Dietary Habit?
          </PoppinsText>

          <View style={[styles.categoryContainer]}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryBox,
                  selectedCategory === category.diet &&
                    styles.selectedCategoryBox,
                  selectedCategory === category.diet && {
                    backgroundColor: category.color,
                  },
                ]}
                onPress={() => setSelectedCategory(category.diet)}
              >
                <PoppinsText
                  weight="600"
                  style={[
                    styles.categoryText,
                    selectedCategory === category.diet &&
                      styles.selectedCategoryBoxText,
                  ]}
                >
                  {category.diet}
                </PoppinsText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ flex: 0.225, paddingHorizontal: 30 }}>
          {selectedCategory === "Non Veg" && (
            <>
              <PoppinsText weight="600" style={{ textAlign: "center" }}>
                On which days do you eat Non-Veg?
              </PoppinsText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: "row", columnGap: 15 }}>
                  {nonVegComfortDays.map((nonVegComfortDay) => (
                    <TouchableOpacity
                      key={nonVegComfortDay.id}
                      style={[
                        styles.categoryBox,
                        { width: wp(18) },
                        nonVegComfortable.includes(nonVegComfortDay.days) &&
                          styles.selectedCategoryBox,
                      ]}
                      onPress={() => toggleDay(nonVegComfortDay.days)}
                    >
                      <PoppinsText
                        weight="600"
                        style={[
                          styles.categoryText,
                          nonVegComfortable.includes(nonVegComfortDay.days) &&
                          styles.selectedCategoryBoxText,
                        ]}
                      >
                        {nonVegComfortDay.days}
                      </PoppinsText>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>
        <View style={{flex: 0.25}}>
          <View style={styles.stepIndicatorContainer}>
            <View style={styles.stepIndicator} />
            <View style={styles.stepIndicator} />
            <View style={styles.stepIndicator} />
            <View style={styles.stepIndicator} />
            <View style={styles.stepIndicator} />
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
    marginVertical: 20,
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
    columnGap: 20,
  },
  categoryBox: {
    width: wp(30),
    height: wp(15),
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
    fontSize: wp(4),
  },
  selectedCategoryBox: {
    backgroundColor: "#f8c807",
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  selectedCategoryBoxText: {
    color: "#f5f5f5",
  },
});
