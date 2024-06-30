import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import PressableButton from "../../shared/components/PressableButton";
import ForgotImage from "../../../assets/forgot-screen-1.png";
import LoadingModal from "../../shared/components/LoadingModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../shared/helpers/AuthContext";
import Toast from "react-native-toast-message";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const { email, updatePassword } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    setIsLoading(true);

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password does not match",
      });
      setIsLoading(false);
      setConfirmPassword("");
      setPassword("");
      return;
    } else {
      const result = await updatePassword({ email: email, password: password });
      if (result.status === "success") {
        setIsLoading(false);
        navigation.navigate("Login");
      } else {
        setIsLoading(false);
        setPassword("");
        setConfirmPassword("");
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={isLoading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={ForgotImage} style={styles.image} />
      </View>
      <View style={{ flex: 0.5 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: hp(3),
            marginVertical: hp(3),
            textAlign: "center",
          }}
        >
          Reset Your Password!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <PressableButton
          onHandlePress={handleChangePassword}
          title="Reset Password"
          height={60}
          style={styles.signInButton}
        />
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp(70),
    height: hp(30),
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    marginBottom: hp(2),
  },
  input: {
    height: hp(7),
    borderColor: "#fedca6",
    borderWidth: 1,
    marginBottom: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: "#fedca6",
    width: wp(80),
  },
});
