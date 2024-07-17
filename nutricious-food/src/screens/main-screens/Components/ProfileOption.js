import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PoppinsText from "../../../shared/components/PoppinsText";

const ProfileOption = ({ icon, text, onPress }) => {
  return (
    <View style={styles.profileOption}>
      <View style={styles.imageContainer}>{icon}</View>
      <PoppinsText style={styles.optionText}>{text}</PoppinsText>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: "#2cd874",
    borderRadius: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginHorizontal: 15,
  },
});

export default ProfileOption;