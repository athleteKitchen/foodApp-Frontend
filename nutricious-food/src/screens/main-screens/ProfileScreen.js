import { StyleSheet, Text, View } from 'react-native';
import { useState, useContext } from 'react';
import PressableButton from "../../shared/components/PressableButton";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../shared/helpers/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
      <View style={styles.logout}>
        <PressableButton
          onHandlePress={onLogoutPress}
          title={"Logout"}
          height={50}
        />
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});