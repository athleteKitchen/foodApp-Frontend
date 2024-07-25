import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../shared/helpers/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LoadingModal from "../../shared/components/LoadingModal";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { meals, sports } from "../../shared/constants/Constants";
import PoppinsText from "../../shared/components/PoppinsText";
import Images from "../../shared/constants/Images";
import { LinearGradient } from "expo-linear-gradient";
import BannerComponent from "../../shared/components/Banner";
import HorizontalList from "../../shared/components/HorizontalList";
import MatrixList from "../../shared/components/MatrixList";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";

// Reusable Header Component
const Header = ({ location, district, name }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.locationContainer}>
      <FontAwesome name="map-marker" size={33} color="#25854d" />
      <View style={styles.locationTextContainer}>
        <PoppinsText weight="600" style={[styles.deliveryText]}>
          {district}
        </PoppinsText>
        <PoppinsText weight="400" style={[styles.locationText]}>
          {location}
        </PoppinsText>
      </View>
    </TouchableOpacity>
    <Greeting name={name}/>
  </View>
);

// Reusable Greeting Component
const Greeting = ({ name }) => {
  const navigation = useNavigation();

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting;

    switch (true) {
      case currentHour >= 0 && currentHour < 12:
        greeting = 'Good Morning';
        break;
      case currentHour >= 12 && currentHour < 16:
        greeting = 'Good Afternoon';
        break;
      case currentHour >= 16 && currentHour <= 19:
        greeting = 'Good Evening';
        break;
      default:
        greeting = 'Good Evening';
        break;
    }

    return greeting;
  };

  return(
  <View style={styles.profileContainer}>
    <View>
      <PoppinsText weight="600" style={styles.greetingText}>
        Hi, {name},
      </PoppinsText>
      <PoppinsText weight="400" style={styles.subGreetingText}>
        {getGreeting()}
      </PoppinsText>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
      <Image source={Images.Profile} style={styles.profileImage} />
    </TouchableOpacity>
  </View>
)};

// Reusable SearchBar Component
const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBox}>
      <FontAwesome name="search" size={23} color="grey" paddingLeft={5} />
      <TextInput placeholder="Search your meal" style={styles.searchInput} />
    </View>
    <TouchableOpacity style={styles.filterButton}>
      <Ionicons name="filter" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

// Reusable CategoryTitle Component
const CategoryTitle = ({
  text,
  color = "#333",
  fontSize = wp(4),
  style,
  weight,
  fontFamily,
}) => (
  <PoppinsText
    weight={weight ? weight : "700"}
    style={[
      styles.categoryTitle,
      {
        color,
        fontSize,
        marginBottom: hp(2),
        fontFamily: fontFamily ? fontFamily : "Poppins_700Bold",
      },
      style,
    ]}
  >
    {text}
  </PoppinsText>
);

// Reusable ButtonGroup Component
const ButtonGroup = () => (
  <View style={styles.buttonGroup}>
    <TouchableOpacity style={[styles.button, styles.activeButton]}>
      <Text style={styles.buttonText}>Meals</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Journal</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Delivery</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(null);

  const street = useSelector((state) => state.location.street);
  const streetNumber = useSelector((state) => state.location.streetNumber);
  const district = useSelector((state) => state.location.district);
  const name = useSelector((state) => state.userDetails.name);

  const shortAddr = `${streetNumber}, ${street}`;

  useEffect(() => {
    if (street && streetNumber && district && name) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [street, streetNumber, district, name]);
  
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <LinearGradient
        colors={["#ffecd2", "#fce39f"]}
        style={styles.linearGradient}
      >
        <Header location={shortAddr} district={district} name={name} />
        <CategoryTitle
          text="Find your Nutritious Meal"
          color="#25854d"
          fontSize={wp(6)}
          weight="700"
        />
        <CategoryTitle
          text="Stay Fit & Healthy"
          color="#f1a706"
          fontSize={wp(7)}
          style={{ marginTop: -hp(3) }}
          weight="500"
          fontFamily="Poppins_500Medium"
        />
        <SearchBar />
        <ButtonGroup />
        <BannerComponent />
      </LinearGradient>
      <Text>{"\n"}</Text>
      <CategoryTitle
        text="EXPLORE MEALS"
        color="#585858"
        fontSize={wp(5)}
        fontFamily="Inter_700Bold"
      />
      <View style={styles.underLine}></View>
      <MatrixList data={meals} navigation={navigation} />
      <Text>{"\n"}</Text>
      <CategoryTitle
        text="SPORT SPECIFIC NUTRITION"
        color="#585858"
        fontSize={wp(5)}
        fontFamily="Inter_700Bold"
      />
      <View style={[styles.underLine, { backgroundColor: "#25854d" }]}></View>
      <HorizontalList data={sports} navigation={navigation} />
      <Footer />
      <View>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    marginVertical: hp(2),
    top: hp(2),
    paddingVertical: hp(1),
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTextContainer: {
    marginLeft: wp(2),
  },
  deliveryText: {
    color: "#25854d",
    fontSize: wp(4),
    lineHeight: 20,
  },
  locationText: {
    color: "grey",
    fontSize: wp(3.5),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  greetingText: {
    color: "#25854d",
    fontSize: wp(4),
    lineHeight: 20,
    textAlign: "right",
  },
  subGreetingText: {
    color: "grey",
    fontSize: wp(3.5),
  },
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    borderCurve: "continuous",
    marginLeft: wp(2),
    borderWidth: 1,
    borderColor: "#25854d",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    marginTop: -hp(2),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fccd83",
    borderRadius: wp(7),
    borderCurve: "continuous",
    paddingHorizontal: wp(3),
    flex: 1,
    marginRight: wp(2),
  },
  searchInput: {
    marginLeft: wp(4),
    flex: 1,
    fontSize: wp(5),
    paddingVertical: hp(1.2),
  },
  filterButton: {
    backgroundColor: "#faac04",
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
    borderRadius: wp(5),
    borderCurve: "continuous",
    marginHorizontal: wp(1),
    backgroundColor: "#2b9657",
  },
  activeButton: {
    backgroundColor: "#faac04",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: wp(4),
    color: "white",
  },
  categoryTitleV2: {
    marginLeft: wp(4),
    color: "#585858",
    fontSize: wp(5),
    marginVertical: hp(2),
  },
  categoryTitle: {
    marginLeft: wp(4),
    fontSize: wp(4),
    color: "#333",
  },
  underLine: {
    backgroundColor: "#faac04",
    height: 8,
    width: 50,
    marginLeft: wp(4),
    marginTop: -10,
    marginBottom: hp(1),
  },
  linearGradient: {
    flex: 1,
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
    height: hp(64),
    elevation: 7,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
