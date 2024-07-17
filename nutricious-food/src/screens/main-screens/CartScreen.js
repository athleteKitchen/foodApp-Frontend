import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../../shared/components/Header";
import { cartItems } from "../../shared/constants/Constants";
import PoppinsText from "../../shared/components/PoppinsText";
import CartItem from "./Components/CartItem";

const CartScreen = () => {
  const [promoCode, setPromoCode] = useState("");

  const handleTextChange = (text) => {
    const filteredText = text.replace(/[^A-Z0-9]/g, "");
    setPromoCode(filteredText);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const coupon = 0;
  const delivery = 3.5;
  const total = subtotal + delivery - coupon;

  return (
    <View style={styles.container}>
      <Header
        name={"Cart"}
        isCartIconShown={false}
        isBackIconShown={false}
        style={styles.header}
      />
      <PoppinsText weight={700} style={styles.subHeading}>
        Total {cartItems.length} Items
      </PoppinsText>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cartList}
        style={styles.cartListContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Promo Code"
            value={promoCode}
            onChangeText={handleTextChange}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>₹ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Coupon</Text>
            <Text style={styles.summaryText}>₹ {coupon.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery</Text>
            <Text style={styles.summaryText}>₹ {delivery.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalText}>Total</Text>
            <Text style={styles.summaryTotalText}>₹ {total.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <View style={styles.gradient}>
            <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0eeee",
  },
  subHeading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
    marginTop: -15,
  },
  header: {
    fontSize: 24,
  },
  cartList: {
    padding: 20,
  },
  cartListContainer: {
    flex: 1,
    marginTop: -10,
  },
  bottomContainer: {
    paddingBottom: 140,
    flex: 0.8,
    padding: 20,
    backgroundColor: "rgb(253, 250, 224)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 10,
  },
  promoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  promoInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    elevation: 3,
    paddingHorizontal: 20,
  },
  applyButton: {
    backgroundColor: "#FF5252",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 3,
  },
  applyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: "#333",
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "#388E3C",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;