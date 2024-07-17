import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ placeholder, filterShown }) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <FontAwesome name="search" size={23} color="grey" paddingLeft={5} />
        <TextInput placeholder={placeholder} style={styles.searchInput} />
      </View>
      {filterShown && (
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fde3ba",
    borderRadius: wp(7),
    borderCurve: "continuous",
    paddingHorizontal: wp(3),
    flex: 1,
    // marginRight: wp(2),
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
  }
});

export default SearchBar;
