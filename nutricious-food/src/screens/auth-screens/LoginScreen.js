import {
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LoginImage from "../../../assets/login-screen-1.png";
import { AuthContext } from "../../shared/helpers/AuthContext";
import PressableButton from "../../shared/components/PressableButton";
import Toast from "react-native-toast-message";
import GoogleLogo from "../../../assets/Google1.png";
import LoadingModal from "../../shared/components/LoadingModal";

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      const result = await login({ email, password });
      if (result.isLoggedIn === "true") {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged In Successfully",
        });
        navigation.navigate("Home");
      } else {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "An error occurred",
        });
        setEmail("");
        setPassword("");
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter email and password",
      });
    }
  };

  const handleForgotPassword = async () => {
    navigation.navigate("ForgotPassword");
  };

  const handleNoAccount = () => [navigation.navigate("Register")];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingModal loading={loading} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={navigation.goBack} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={30} color="#100f0f" />
        </Pressable>
      </View>

      <View style={styles.imageContainer}>
        <Image source={LoginImage} style={styles.image} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Have an Account? Let's Sign In!</Text>

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
          placeholder="Enter password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Pressable onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Your Password?</Text>
        </Pressable>

        <PressableButton
          onHandlePress={handleLogin}
          title="Sign In"
          height={60}
          style={styles.signInButton}
        />

        <Pressable onPress={handleNoAccount}>
          <Text style={[styles.forgotPasswordText, styles.noAccountText]}>
            Don't have an Account? Sign Up
          </Text>
        </Pressable>

        {/* <View style={styles.horizontalLineContainer}>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.orText}>or</Text>
            <View style={styles.horizontalLine}></View>
          </View> */}

        {/* <View style={styles.socialLoginButtons}>
            <Pressable
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
            >
              <Image source={GoogleLogo} style={styles.socialButtonIcon} />
            </Pressable>
            <Pressable
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookSignIn}
            >
              <Image source={FacebookLogo} style={styles.socialButtonIcon} />
            </Pressable>
          </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: hp(2),
    left: wp(2),
    zIndex: 1,
  },
  backButton: {
    padding: wp(5),
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: hp(10),
  },
  image: {
    width: wp(70),
    height: hp(30),
    resizeMode: "contain",
  },
  formContainer: {
    flex: 3,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  formHeader: {
    fontSize: wp(5.5),
    fontWeight: "bold",
    marginBottom: hp(2),
    textAlign: "center",
  },
  input: {
    height: hp(7),
    borderColor: "#fedca6",
    borderWidth: 1,
    marginBottom: hp(2),
    paddingHorizontal: wp(4),
    borderRadius: wp(5),
    backgroundColor: "#fedca6",
  },
  forgotPasswordText: {
    textAlign: "center",
    marginBottom: hp(2),
    color: "#6f6f71",
  },
  noAccountText: {
    marginTop: hp(2),
    fontSize: wp(5),
    fontWeight: "bold",
  },
  signInButton: {
    marginBottom: hp(2),
  },
  horizontalLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp(2),
    paddingHorizontal: wp(3),
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: "grey",
  },
  orText: {
    marginHorizontal: wp(5),
    fontSize: wp(5),
    color: "grey",
  },
  socialLoginButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    columnGap: wp(5),
  },
  socialButton: {
    width: wp(42),
    height: hp(6),
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  googleButton: {
    backgroundColor: "#fff",
  },
  facebookButton: {
    backgroundColor: "#fff",
  },
  socialButtonIcon: {
    width: wp(24),
    height: hp(19),
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
