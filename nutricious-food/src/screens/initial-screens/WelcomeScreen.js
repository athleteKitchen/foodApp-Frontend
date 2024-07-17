import { StyleSheet, Text, View, Pressable, Platform } from "react-native";
import AnimatedImageComponent from "./components/AnimatedImages";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const onHandlePress = () => {
    navigation.navigate("Register");
  };
  const onHandleLogin = () => {
    navigation.navigate("Login");
  };
  const onHandleBack = () => {
    navigation.navigate("FTScreenFour");
  };

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={onHandleBack} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={30} color="#100f0f" />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <AnimatedImageComponent />
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.welcomeText}>IT'S TIME TO</Text>
        <Text style={styles.welcomeText}>GET YOUR</Text>
        <Text style={styles.welcomeText}>MEAL!</Text>
        <View style={styles.buttonContainer}>
          <Pressable onPress={onHandlePress}>
            <Text style={[styles.button]}>Let's Get Started</Text>
          </Pressable>
          <Pressable onPress={onHandleLogin}>
            <Text style={[styles.button]}>Sign-In                {">"}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: hp(2),
    left: wp(2),
    zIndex: 1,
  },
  backButton: {
    padding: wp(5),
  },
  imageContainer: {
    flex: 2,
    width: wp(100),
    marginTop: hp(7)
  },
  boxContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    width: wp(100),
    backgroundColor: "#38ad69",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  welcomeText: {
    fontSize: hp(5),
    textAlign: "center",
    fontWeight: "bold",
    color: "#fffffc",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    columnGap: 20,
  },
  button: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#f0b536",
    padding: 20,
    // paddingHorizontal: wp(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: hp(4),
  },
});
