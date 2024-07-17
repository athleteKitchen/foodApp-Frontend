import { View, StyleSheet, ScrollView, Text } from "react-native";
import CalenderNavigation from "../main-screens/Components/CalenderNavigation";
import SearchBar from "../main-screens/Components/SearchBar";
import MealSection from "../main-screens/Components/MealSection";
import { LinearGradient } from "expo-linear-gradient";

const PlanningScreen = ({ route, navigation }) => {
  return (
    <>
      <CalenderNavigation navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.belowHeader}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
              colors={["#fdf5e4", "rgb(253, 250, 223)"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            >
              <SearchBar placeholder="Search meal..." filterShown={false} />
              <MealSection title="B R E A K F A S T" />
              <MealSection title="L U N C H" />
              <MealSection title="S N A C K S" />
              <MealSection title="D I N N E R" />
            </LinearGradient>
            <View>
              <Text>{"\n"}</Text>
              <Text>{"\n"}</Text>
              <Text>{"\n"}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    marginTop: -30,
  },
  belowHeader: {
    backgroundColor: "rgb(253, 250, 223)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    zIndex: 10,
  },
});

export default PlanningScreen;
