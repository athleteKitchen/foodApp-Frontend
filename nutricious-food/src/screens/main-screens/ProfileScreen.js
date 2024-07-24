import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../shared/helpers/AuthContext";
import Profile from "../../../assets/profile_icon.png";
import {
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import PoppinsText from "../../shared/components/PoppinsText";
import ProfileOption from "./Components/ProfileOption";
import { LinearGradient } from "expo-linear-gradient";
import LoadingModal from "../../shared/components/LoadingModal";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onLogoutPress = () => {
    setLoading(true);
    logout();
    setLoading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#faf5ef", "#fcf6e6"]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.profileSidebar}
    >
      <PoppinsText weight="700" style={styles.profileLabel}>
        Profile
      </PoppinsText>
      <View style={styles.profileImageContainer}>
        <Image source={Profile} style={styles.profileImage} />
      </View>
      <PoppinsText weight="700" style={styles.profileName}>
        John Doe
      </PoppinsText>
      <View style={styles.profileOptions}>
        <ProfileOption
          icon={
            <MaterialCommunityIcons
              name="account-edit"
              size={24}
              color="rgb(255, 253, 239)"
            />
          }
          text="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
        />
        <ProfileOption
          icon={
            <FontAwesome
              name="shopping-bag"
              size={24}
              color="rgb(255, 253, 239)"
            />
          }
          text="Orders"
          onPress={() => navigation.navigate("Orders")}
        />
        <ProfileOption
          icon={
            <MaterialCommunityIcons
              name="credit-card-edit"
              size={24}
              color="rgb(255, 253, 239)"
            />
          }
          text="Payment Settings"
          onPress={() => navigation.navigate("PaymentSettings")}
        />
        <ProfileOption
          icon={
            <FontAwesome
              name="address-card"
              size={24}
              color="rgb(255, 253, 239)"
            />
          }
          text="Address"
          onPress={() => navigation.navigate("Address")}
        />
        <ProfileOption
          icon={
            <AntDesign name="logout" size={24} color="rgb(255, 253, 239)" />
          }
          text="Logout"
          onPress={onLogoutPress}
        />
      </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileSidebar: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgb(255, 253, 239)",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  profileLabel: {
    paddingBottom: 10,
    fontSize: 18,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileName: {
    marginBottom: 20,
    fontSize: 20,
  },
  profileOptions: {
    width: "100%",
  },
});
