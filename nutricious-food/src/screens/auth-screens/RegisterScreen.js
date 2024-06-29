import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import RegisterImage from "../../../assets/register-screen-1.png";
import { AuthContext } from "../../shared/helpers/AuthContext";
import PressableButton from "../../shared/components/PressableButton";
import Toast from "react-native-toast-message";
import GoogleLogo from "../../../assets/Google1.png";
import FacebookLogo from "../../../assets/facebook1.png";
import LoadingModal from "../../shared/components/LoadingModal";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const onHandleBack = () => {
    navigation.goBack();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser, register, otpRequest } = useContext(AuthContext);

  const handleToLogin = async () => {
    navigation.navigate("Login");
  };

  const handleRegister = async () => {
    try{
      setLoading(true);
      const result = await register({ name, email, phone, password });
      if (result && result.status === true) {
        // setUser(true);
        const response = await otpRequest(phone);
        if(response && response.status === true){
          navigation.navigate("Otp", { phone });
        }
      } else {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message,
        });
        setEmail("");
        setName("");
        setPassword("");
        setPhone("");
      }
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={220}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={onHandleBack} style={styles.backButton}>
            <Icon name="arrow-back-ios" size={30} color="#100f0f" />
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Image source={RegisterImage} style={styles.image} />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>Don't Have Account? Let's Do!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name here"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address here"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone no here (10 digits only)"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password here"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.button}>
            <PressableButton
              onHandlePress={handleRegister}
              title={"Create Account"}
              height={60}
            />
          </View>
          {/* <View style={styles.socialLoginButtons}>
            <Pressable
              disabled={!requestGoogle}
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
            >
              <Image source={GoogleLogo} style={styles.socialButtonIcon} />
            </Pressable>
            <Pressable
              disabled={!requestFacebook}
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookSignIn}
            >
              <Image source={FacebookLogo} style={styles.socialButtonIcon} />
            </Pressable>
          </View> */}
          <Pressable onPress={handleToLogin} style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "grey",
                marginVertical: hp(1),
              }}
            >
              Have an Account, Click here!
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingVertical: hp(2),
    position: "absolute",
  },
  backButton: {
    padding: wp(10),
  },
  imageContainer: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(15),
  },
  image: {
    width: 250,
    height: 250,
  },
  formHeader: {
    fontSize: 26,
    marginBottom: hp(2),
    fontWeight: "bold",
  },
  formContainer: {
    flex: 8,
    justifyContent: "centerS",
    padding: 16,
  },
  input: {
    height: 50,
    borderColor: "#fedca6",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#fedca6",
  },
  button: {
    marginTop: hp(1),
  },
  socialLoginButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    justifyContent: "center",
  },
  googleButton: {
    backgroundColor: "#fff", // Google Red
    marginRight: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  facebookButton: {
    backgroundColor: "#fff", // Facebook Blue
    marginLeft: 9,
    borderColor: "#000",
    borderWidth: 1,
  },
  socialButtonIcon: {
    width: 100,
    height: 34,
    flex: 3,
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
