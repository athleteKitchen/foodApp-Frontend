import { StyleSheet, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useEffect } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const ImageComponent = ({ imageUri }) => {
  const ring1Dims = useSharedValue(0);
  const ring2Dims = useSharedValue(0);

  useEffect(() => {
    ring1Dims.value = 0;
    ring2Dims.value = 0;
    setTimeout(() => ring1Dims.value = withSpring(ring1Dims.value + wp(75)), 300)
    setTimeout(() => ring2Dims.value = withSpring(ring2Dims.value + wp(65)), 700)
  }, [])
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.outerCircle, { width: ring1Dims, height: ring1Dims }]}
      >
        <Animated.View
          style={[styles.innerCircle, { width: ring2Dims, height: ring2Dims }]}
        >
          <Image
            style={[
              styles.image,
              {
                width: wp(55),
              },
            ]}
            source={imageUri}
            resizeMode="contain"
            accessibilityLabel={"food-container-freepik"}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ImageComponent;

const styles = StyleSheet.create({
  container: {
    flex: 3.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(5),
  },
  outerCircle: {
    backgroundColor: "#8bc48b",
    padding: wp(1),
    borderRadius: wp(75) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    backgroundColor: "#f3f37c",
    borderRadius: wp(65) / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    height: hp(85),
    alignItems: "center",
    justifyContent: "center",
  },
});
