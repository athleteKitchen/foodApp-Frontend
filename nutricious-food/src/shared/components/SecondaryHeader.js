import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import PoppinsText from "./PoppinsText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Octicons } from "@expo/vector-icons";

const SecondaryHeader = ({ navigation, name, color, style }) => {
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
    if(!isLiked) setIsLiked(true);
    else setIsLiked(false);
    //Perform logic for adding to wishlist
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: wp(5),
          marginTop: hp(3),
          paddingHorizontal: wp(6),
        },
        style,
      ]}
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
      <TouchableOpacity onPress={() => handleLike()} onLongPress={() => setIsLiked(false)}>
        <Octicons
          name={isLiked ? "heart-fill" : "heart"}
          size={26}
          color={color ? color : "#100f0f"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryHeader;
