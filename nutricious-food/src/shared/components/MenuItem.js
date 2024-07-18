import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PoppinsText from "./PoppinsText";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Octicons } from "@expo/vector-icons";

const MenuItem = ({ item, isLikeIconShown }) => {
  const {
    name,
    price,
    image,
    subTitle,
    rating,
    description,
    nutrients,
    ingredients,
    kcal,
    mealType,
  } = item;
  const navigation = useNavigation();

  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    if (!isLiked) setIsLiked(true);
    else setIsLiked(false);
    //Perform logic for adding to wishlist
  };

  return (
    <View style={styles.shadowContainer}>
      <LinearGradient
        colors={["#fdf0d7", "#ffffff"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.itemContainer}
      >
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={() => {
            navigation.navigate("ItemDetails", { item: item });
          }}
        >
          <View style={styles.itemImageContainer}>
            <Image source={image} style={styles.itemImage} />
          </View>
          <View style={styles.details}>
            <PoppinsText weight="700" style={styles.itemName}>
              {name}
            </PoppinsText>
            <PoppinsText weight="500" style={styles.itemSubTitle}>
              {subTitle}
            </PoppinsText>
            <PoppinsText weight="500" style={styles.itemPrice}>
              ₹ {price}
            </PoppinsText>
            <View style={styles.actions}>
              {(isLikeIconShown && (
                <TouchableOpacity
                  onPress={() => handleLike()}
                  onLongPress={() => setIsLiked(false)}
                >
                  <Octicons
                    name={isLiked ? "heart-fill" : "heart"}
                    size={22}
                    color={isLiked ? "#f72d59" : "#100f0f"}
                  />
                </TouchableOpacity>
              )) || (
                <TouchableOpacity style={[styles.button, {backgroundColor: "#d82b2b", paddingHorizontal: wp(3)}]} onPress={() => {}}>
                  <PoppinsText weight="700" style={styles.buttonText}>
                    REMOVE
                  </PoppinsText>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <PoppinsText weight="700" style={styles.buttonText}>
                  ADD
                </PoppinsText>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  shadowContainer: {
    ...Platform.select({
      ios: {
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 7,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    elevation: 10,
  },
  touchableContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  itemImageContainer: {
    borderRadius: 20,
    height: hp(13),
    width: wp(31),
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    backgroundColor: "transparent",
  },
  itemImage: {
    width: wp(31),
    borderRadius: 15,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        height: hp(13),
      },
      android: {
        height: hp(14),
      },
    }),
  },
  itemName: {
    fontSize: 16,
  },
  itemSubTitle: {
    fontSize: 16,
    color: "grey",
  },
  itemPrice: {
    fontSize: 18,
    color: "#888",
  },
  details: {
    flexDirection: "column",
    marginLeft: wp(4),
  },
  button: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(7),
    paddingTop: 4,
    borderRadius: wp(5),
    backgroundColor: "#2b9657",
  },
  buttonText: {
    fontSize: wp(4),
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: wp(48),
  },
  itemRating: {
    fontSize: 16,
    color: "#888",
  },
});
