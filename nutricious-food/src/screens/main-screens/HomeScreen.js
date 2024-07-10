import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getIsLoggedIn, getTokens } from "../../shared/configs/AxiosConfig";
import { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../shared/helpers/AuthContext";
import LoadingModal from "../../shared/components/LoadingModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const images = [
    {
      name: "Italian",
      image: "https://via.placeholder.com/150",
      color: "#ffad60",
    },
    {
      name: "Chinese",
      image: "https://via.placeholder.com/150",
      color: "#f54242",
    },
    {
      name: "Indian",
      image: "https://via.placeholder.com/150",
      color: "#f5a442",
    },
    {
      name: "Deshi",
      image: "https://via.placeholder.com/150",
      color: "#42f554",
    },
    {
      name: "Burger",
      image: "https://via.placeholder.com/150",
      color: "#f5429e",
    },
    {
      name: "Fastfood",
      image: "https://via.placeholder.com/150",
      color: "#f5d142",
    },
  ];

  useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <FontAwesome name="map-marker" size={20} color="grey" />
          <View style={styles.locationTextContainer}>
            <Text style={styles.deliveryText}>Delivery to</Text>
            <Text style={styles.locationText}>36-B South Florida, USA</Text>
          </View>
        </View>
        <View style={styles.profileContainer}>
          <View>
            <Text style={styles.greetingText}>Hi, Anis,</Text>
            <Text style={styles.subGreetingText}>Good Evening!</Text>
          </View>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={24} color="grey" />
          <TextInput
            placeholder="Search for foods"
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.activeButton]}>
          <Text style={styles.buttonText}>Foods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Reservation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delivery</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.offerContainer}>
        <Text style={styles.offerText}>BIG OFFER!</Text>
        <Text style={styles.offerSubText}>Get 20% Off On All Foods</Text>
        <Text style={styles.offerExpiryText}>
          Offer Expires On 31st December
        </Text>
      </View>
      <Text style={styles.categoryTitle}>Food Categories</Text>
      <View style={styles.categoryContainer}>
        {images.map((category, index) => (
          <View
            key={index}
            style={[styles.categoryBox, { backgroundColor: category.color }]}
          >
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    backgroundColor: 'white',
    elevation: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTextContainer: {
    marginLeft: wp(2),
  },
  deliveryText: {
    color: 'grey',
    fontSize: wp(3.5),
    fontWeight: 'bold',
  },
  locationText: {
    color: 'grey',
    fontSize: wp(3.5),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingText: {
    color: 'grey',
    fontSize: wp(4),
  },
  subGreetingText: {
    color: 'grey',
    fontSize: wp(3.5),
  },
  profileImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginLeft: wp(2),
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: wp(4),
    backgroundColor: "white",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    flex: 1,
    marginRight: wp(2),
  },
  searchInput: {
    marginLeft: wp(2),
    flex: 1,
    fontSize: wp(4),
  },
  filterButton: {
    backgroundColor: "#ffad60",
    padding: wp(3),
    borderRadius: wp(2),
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp(4),
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: wp(2),
    borderRadius: wp(2),
    marginHorizontal: wp(1),
    backgroundColor: "#f1f1f1",
  },
  activeButton: {
    backgroundColor: "#ffad60",
  },
  buttonText: {
    fontSize: wp(4),
    color: "white",
  },
  offerContainer: {
    backgroundColor: "#ffad60",
    padding: wp(4),
    margin: wp(4),
    borderRadius: wp(2),
    alignItems: "center",
  },
  offerText: {
    fontSize: wp(6),
    color: "white",
    fontWeight: "bold",
  },
  offerSubText: {
    fontSize: wp(4),
    color: "white",
    marginVertical: wp(2),
  },
  offerExpiryText: {
    fontSize: wp(3.5),
    color: "white",
  },
  categoryTitle: {
    marginLeft: wp(4),
    marginVertical: wp(2),
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#333",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: wp(4),
  },
  categoryBox: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(2),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(2),
  },
  categoryImage: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(1),
  },
  categoryText: {
    marginTop: wp(1),
    color: "white",
    fontSize: wp(4),
    fontWeight: "bold",
  },
});
