import { View, Platform, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PoppinsText from "../../../shared/components/PoppinsText";
import { FontAwesome6 } from "@expo/vector-icons";

const meals = [
  {
    id: 1,
    name: "Salad with wheat and white egg",
    calories: 200,
    image: require("../../../../assets/foods31.jpg"),
  },
  {
    id: 2,
    name: "Pumpkin soup",
    calories: 200,
    image: require("../../../../assets/foods29.jpg"),
  },
];

const MealSection = ({ title }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <PoppinsText weight="800" style={styles.sectionTitle}>
          {title}
        </PoppinsText>
        <TouchableOpacity>
          <FontAwesome6 name="plus" size={24} color="#236b41" />
        </TouchableOpacity>
      </View>
      <View style={styles.caloriesContainer}>
        <FontAwesome6 name="fire-flame-curved" size={30} color="#fc560a" />
        <PoppinsText weight="700" color="#236b41" style={[styles.calorie, { fontSize: 25 }]}>
          120
        </PoppinsText>
        <PoppinsText weight="600" style={styles.calorie}>
          {" "}
          kcal / 450 kcal
        </PoppinsText>
      </View>
      {meals.map((meal) => (
        <View key={meal.id} style={styles.mealCard}>
          <Image source={meal.image} style={styles.mealImage} />
          <View style={styles.mealDetails}>
            <PoppinsText weight="600">{meal.name}</PoppinsText>
            <PoppinsText color="grey">{meal.calories} kcal</PoppinsText>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 10,
    marginHorizontal: 20,
    backgroundColor: "rgb(253, 249, 242)",
    paddingHorizontal: wp(5),
    borderCurve: "continuous",
    borderRadius: 20,
    paddingVertical: hp(3),
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 3,
      }
    })
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#236b41",
  },
  caloriesContainer: {
    flexDirection: "row",
    width: wp(48),
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    fontSize: 24,
    color: "#2ecc71",
  },
  mealCard: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  mealImage: {
    width: wp(25),
    height: hp(10),
    borderRadius: 10,
  },
  mealDetails: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  mealName: {
    flexShrink: 1,
    maxWidth: wp(50),
    flexWrap: "wrap",
  },
});

export default MealSection;