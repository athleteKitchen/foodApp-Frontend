import { StyleSheet, Text, Pressable, Platform } from "react-native";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const PressableButton = ({onHandlePress, title, height}) => {
  return (
    <Pressable onPress={onHandlePress} style={[styles.button, {height: height ? height : 50}]}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: 4,
    // elevation: 3,
    backgroundColor: "#2ECC71",
    borderRadius: 40,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  text: {
    fontSize: hp(2),
    // lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default PressableButton;
