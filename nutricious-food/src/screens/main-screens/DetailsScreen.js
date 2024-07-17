import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SecondaryHeader from "../../shared/components/SecondaryHeader";
import { StatusBar } from "expo-status-bar";
import PoppinsText from "../../shared/components/PoppinsText";

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <>
      <View style={styles.header}>
        <SecondaryHeader navigation={navigation} name={""} color="white" />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.contentsContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subTitle}>{item.description}</Text>
          <View style={styles.quantityPrice}>
            <Text style={styles.price}>₹ {item.price}</Text>
            <View style={styles.quantityContainer}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="remove" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantity}>1</Text>
                <TouchableOpacity style={styles.quantityButton}>
                  <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View>
                <PoppinsText
                  weight="700"
                  style={{
                    fontSize: 15,
                    padding: 5,
                    backgroundColor: "#2b9657",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    color: "rgb(255, 253, 239)",
                  }}
                >
                  {item.mealType.toUpperCase()}
                </PoppinsText>
              </View>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Nutrients</Text>
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrient}>
              <View style={styles.nutrientValue}>
                <PoppinsText weight="600">{item.nutrients.carbs}</PoppinsText>
              </View>
              <PoppinsText weight="700" style={styles.nutrientName}>
                Carbs
              </PoppinsText>
            </View>
            <View style={styles.nutrient}>
              <View style={styles.nutrientValue}>
                <PoppinsText weight="600">
                  {item.nutrients.proteins}
                </PoppinsText>
              </View>
              <PoppinsText weight="700" style={styles.nutrientName}>
                Protein
              </PoppinsText>
            </View>
            <View style={styles.nutrient}>
              <View style={styles.nutrientValue}>
                <PoppinsText weight="600">{item.nutrients.fats}</PoppinsText>
              </View>
              <PoppinsText weight="700" style={styles.nutrientName}>
                Fats
              </PoppinsText>
            </View>
            <View style={styles.nutrient}>
              <View style={styles.nutrientValue}>
                <PoppinsText weight="600">{item.kcal}</PoppinsText>
              </View>
              <PoppinsText weight="700" style={styles.nutrientName}>
                KCal
              </PoppinsText>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <View style={styles.ingredientsContainer}>
            {item.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredient}>
                <Text style={styles.ingredientText}>{ingredient.name}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="light" />
    </>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#236b41",
    height: hp(25),
    zIndex: -1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -hp(12),
    backgroundColor: "rgb(255, 253, 239)",
    width: wp(80),
    borderRadius: 20,
    marginHorizontal: wp(5),
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        borderRadius: 50,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  image: {
    width: wp(80),
    height: hp(25),
    borderRadius: 20,
  },
  contentsContainer: {
    flex: 1,
    paddingTop: hp(2),
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 16,
    width: wp(100),
    paddingHorizontal: 20,
    zIndex: 1,
    marginTop: -hp(3),
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginBottom: hp(1),
  },
  quantityPrice: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(1),
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 40,
    // marginLeft: 100
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2b9657",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },
  ingredientsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ingredient: {
    alignItems: "center",
    margin: 0,
    top: 0,
  },
  ingredientIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  ingredientText: {
    fontSize: 14,
  },
  nutrientsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nutrient: {
    backgroundColor: "#2b9657",
    padding: 8,
    minWidth: wp(18),
    borderRadius: 20,
  },
  nutrientValue: {
    textAlign: "center",
    backgroundColor: "rgb(255, 253, 239)",
    padding: 8,
    height: hp(5),
    borderRadius: 15,
    alignItems: "center",
  },
  nutrientName: {
    textAlign: "center",
    color: "rgb(255, 253, 239)",
    padding: 5,
    minWidth: wp(15),
  },
  addToCartButton: {
    backgroundColor: "#2b9657",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: hp(2),
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
