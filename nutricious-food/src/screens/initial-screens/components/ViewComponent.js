import {
  StyleSheet,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn } from "react-native-reanimated";
import ImageComponent from "./ImageComponent";
import { FadeInLeft, FadeInRight } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";

const ViewComponent = ({ data }) => {
  const {
    imageUri,
    imageDim,
    text1,
    text2,
    text3,
    naviScreen,
    visited,
    text1Size,
    text2Size,
    text3Size,
  } = data;

  const navigation = useNavigation();
  const onPreviousButton = () => {
    if (visited == 1) {
      navigation.navigate("Welcome");
    } else {
      navigation.goBack();
    }
  };
  const onNextButton = () => {
    navigation.navigate(naviScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {visited == 1 ? (
          <ImageComponent imageUri={imageUri} />
        ) : (
          <Image
            style={[
              styles.image,
              {
                width: imageDim ? wp(imageDim) : wp(73),
                marginLeft: imageDim ? 60 : 50,
              },
            ]}
            source={imageUri}
            resizeMode="contain"
            accessibilityLabel={"food-container-freepik"}
          />
        )}
        <View style={styles.textContainer}>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(300)}
            style={[
              styles.planText,
              {
                fontSize: text1Size ? text1Size : hp(5),
                paddingHorizontal: imageDim ? wp(5) : wp(8),
              },
            ]}
          >
            {text1}
          </Animated.Text>
          <Animated.Text
            entering={FadeInRight.duration(400).delay(300)}
            style={[
              styles.planText,
              styles.fitnessMealText,
              {
                fontSize: text2Size ? text2Size : hp(4.8),
                paddingHorizontal: imageDim ? wp(5) : wp(8),
              },
            ]}
          >
            {text2}
          </Animated.Text>
          <Animated.Text
            entering={FadeInLeft.duration(400).delay(300)}
            style={[
              styles.planText,
              styles.greaterText,
              {
                fontSize: text3Size ? text3Size : hp(4),
                paddingHorizontal: imageDim ? wp(5) : wp(8),
              },
            ]}
          >
            {text3}
          </Animated.Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 0.1,
            paddingHorizontal: imageDim ? wp(7) : wp(8),
            marginHorizontal: wp(4),
          }}
        >
          <View
            style={[
              styles.unVisited,
              visited == 1 || visited == 2 || visited == 3 || visited == 4
                ? styles.visited
                : { color: "grey" },
            ]}
          ></View>
          <View
            style={[
              styles.unVisited,
              visited == 2 || visited == 3 || visited == 4
                ? styles.visited
                : { color: "grey" },
            ]}
          ></View>
          <View
            style={[
              styles.unVisited,
              visited == 3 || visited == 4 ? styles.visited : { color: "grey" },
            ]}
          ></View>
          <View
            style={[
              styles.unVisited,
              visited == 4 ? styles.visited : { color: "grey" },
            ]}
          ></View>
        </View>
        <Animated.View
          entering={FadeIn.duration(500).delay(500)}
          style={[
            styles.actionContainer,
            { marginHorizontal: wp(1) },
          ]}
        >
          <Pressable onPress={onPreviousButton}>
            {visited == 1 ? (
              <Text style={styles.skipButton}>Skip</Text>
            ) : (
              <Icon name="arrow-back-ios" size={30} color="#100f0f" />
            )}
          </Pressable>
          <Pressable onPress={onNextButton} style={styles.button}>
            <Text style={styles.text}>
              {visited != 4 ? `Next >` : "Finish"}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 3,
    height: hp(85),
    margin: 50,
  },
  textContainer: {
    flexDirection: "column",
    flex: 2,
    margin: 20,
  },
  planText: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(13),
  },
  fitnessMealText: {
    color: "#2ECC71",
    fontWeight: "bold",
  },
  greaterText: {
    color: "#8F8F8F",
  },
  actionContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(13),
    marginHorizontal: wp(5),
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2ECC71",
    borderRadius: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  skipButton: {
    color: "#2ECC71",
    fontSize: 15,
    fontWeight: "bold",
  },
  visited: {
    backgroundColor: "#2ECC71",
  },
  unVisited: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "grey",
    width: wp(3),
    height: hp(1.3),
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ViewComponent;