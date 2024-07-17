import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import PoppinsText from "./PoppinsText";
import { widthPercentageToDP as wp } from "react-native-responsive-screen"; // Ensure to import your wp function

const MatrixList = ({ data, navigation }) => {
  return (
    <View style={styles.categoryContainer}>
      {data.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.categoryBox]}
          onPress={() => navigation.navigate("FitItems", { category })}
        >
          <Image source={category.image} style={styles.categoryImage} />
          <PoppinsText weight="600" style={styles.categoryText}>
            {category.name}
          </PoppinsText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MatrixList;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
  },
  categoryBox: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(2),
    elevation: 10,
    backgroundColor: "rgb(255, 253, 239)",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryImage: {
    width: wp(24),
    height: wp(18),
    borderRadius: wp(4),
  },
  categoryText: {
    marginTop: wp(1),
    color: "#5c5b5b",
    fontSize: wp(4),
    lineHeight: 22,
  },
});
