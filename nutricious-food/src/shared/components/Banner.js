import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { banners } from "../../shared/constants/Constants"; // Adjust the import path as needed
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const BannerComponent = ({}) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner, index) => (
          <View key={index} style={styles.offerContainer}>
            <ImageBackground
              style={styles.offerImageBackground}
              source={banner.image}
            >
              <Text style={styles.offerText}>{banner.primaryText}</Text>
              <Text style={styles.offerSubText}>{banner.primarySubText}</Text>
              <Text style={styles.offerExpiryText}>{banner.secondaryText}</Text>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BannerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    paddingHorizontal: wp(3)
  },
  scrollView: {
    flexDirection: "row",
  },
  scrollContent: {
    alignItems: "center",
  },
  offerContainer: {
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: wp(7),
    overflow: "hidden",
    width: wp(87),
    height: hp(21),
  },
  offerImageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  offerText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  offerSubText: {
    fontSize: 16,
    color: "white",
    marginVertical: 10,
  },
  offerExpiryText: {
    fontSize: 14,
    color: "white",
  },
});