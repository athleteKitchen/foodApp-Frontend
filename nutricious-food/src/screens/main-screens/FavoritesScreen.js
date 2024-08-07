import { StyleSheet, Text, View } from "react-native";
import PoppinsText from "../../shared/components/PoppinsText";
import Header from "../../shared/components/Header";
import MenuCategory from "../../shared/components/MenuCategory";
import { menuItems } from "../../shared/constants/Constants";

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Header
        name={"Wishlist"}
        isCartIconShown={false}
        isBackIconShown={false}
      />
      <PoppinsText weight="700" style={{ textAlign :"center", fontSize: 25 }}>Total {menuItems.length} items...</PoppinsText>
      <MenuCategory items={menuItems} isLikeIconShown={false} />
    </View>
  );  
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
});
