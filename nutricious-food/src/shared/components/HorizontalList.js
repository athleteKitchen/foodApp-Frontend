import { StyleSheet, View, VirtualizedList, Image, TouchableOpacity } from "react-native";
import PoppinsText from "./PoppinsText";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const HorizontalList = ({ data, navigation }) => {
  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryBox} onPress={() => navigation.navigate("FitItems", { "category": item })}>
      <Image source={item.image} style={styles.categoryImage} />
      <PoppinsText weight="600" style={styles.categoryText}>
        {item.name}
      </PoppinsText>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <VirtualizedList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        initialNumToRender={4}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(3),
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: wp(4),
  },
  categoryBox: {
    width: wp(28),
    height: wp(28),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: wp(2),
    marginRight: wp(4),
    backgroundColor: "rgb(255, 253, 239)",
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryImage: {
    width: wp(24),
    height: wp(18),
    borderRadius: wp(4),
  },
  categoryText: {
    marginTop: wp(1),
    color: "#5c5b5b",
    fontSize: wp(3.5),
    lineHeight: 22,
  },
});
