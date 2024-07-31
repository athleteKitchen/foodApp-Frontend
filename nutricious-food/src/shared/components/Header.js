import { View, TouchableOpacity, Text, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PoppinsText from "./PoppinsText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome6 } from "@expo/vector-icons";

const Header = ({ navigation, name, color, style, isCartIconShown, isBackIconShown }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: wp(5),
          marginTop: Platform.OS === 'android' ? hp(2) : hp(3),
          paddingHorizontal: wp(6),
        },
        style
      ]}
    >
      {isBackIconShown ? (<TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="arrow-back-ios"
          size={20}
          color={color ? color : "#100f0f"}
        />
      </TouchableOpacity>) : <Text>    </Text>}
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
      {isCartIconShown ? (
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <FontAwesome6
            name="cart-plus"
            size={26}
            color={color ? color : "#100f0f"}
          />
        </TouchableOpacity>
      ) : <Text>    </Text>}
    </View>
  );
};

export default Header;
