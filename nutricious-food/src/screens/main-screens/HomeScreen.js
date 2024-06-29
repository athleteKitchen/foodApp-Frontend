import { StyleSheet, Text, View, Platform } from "react-native";
import { getIsLoggedIn, getTokens } from "../../shared/configs/AxiosConfig";
import { useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../shared/helpers/AuthContext";
import PressableButton from "../../shared/components/PressableButton";
import LoadingModal from "../../shared/components/LoadingModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = getIsLoggedIn();
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, []);

  const onLogoutPress = () => {
    setLoading(true);
    logout();
    setLoading(false);
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PressableButton
        onHandlePress={onLogoutPress}
        title={"Logout"}
        height={40}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});
