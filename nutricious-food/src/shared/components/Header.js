import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import PoppinsText from "./PoppinsText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome6 } from "@expo/vector-icons";

const Header = ({ navigation, name, color, style }) => {
  return (
    <View
      style={[{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: wp(5),
        marginTop: hp(3),
        paddingHorizontal: wp(6),
      }, style]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-ios"
          size={20}
          color={color ? color : "#100f0f"}
        />
      </TouchableOpacity>
      <PoppinsText
        weight="600"
        style={{
          fontSize: 25,
          color: color ? color : "#100f0f",
          textAlign: "center",
        }}
      >
        {name ? name : ""}
      </PoppinsText>
      <FontAwesome6 name="cart-plus" size={26} color={color ? color : "#100f0f"} />
    </View>
  );
};

export default Header;
