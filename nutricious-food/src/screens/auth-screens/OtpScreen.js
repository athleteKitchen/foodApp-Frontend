import React, { useState, useContext, useRef } from "react";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Images from "../../shared/constants/Images";
import { AuthContext } from "../../shared/helpers/AuthContext";
import PressableButton from "../../shared/components/PressableButton";
import Toast from "react-native-toast-message";
import LoadingModal from "../../shared/components/LoadingModal";

const OtpScreen = ({ route, navigation }) => {
  const { email = null, phoneNo=null } = route.params;
  const { otpEmailVerify } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        refs[index + 1].current.focus();
      }
      if (!value && index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handleOtpVerification = async () => {
    setLoading(true);
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      // Perform your OTP verification logic here
      // console.log(parseInt(otpValue))
      if(email){
        const response = await otpEmailVerify(email, otpValue);
        if(response && response.status === true) {
          setLoading(false);
          navigation.navigate("Login");
        }
        setLoading(false);
      } else {}
    } else {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid OTP",
        text2: "Please enter a valid 4-digit OTP.",
      });
    }
  };

  const handleResendOtp = async () => {
    // navigation.navigate("Otp");
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
        keyboardVerticalOffset={100}
        style={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={navigation.goBack} style={styles.backButton}>
            <Icon name="arrow-back-ios" size={30} color="#100f0f" />
          </Pressable>
        </View>

        <View style={styles.imageContainer}>
          <Image source={Images.OtpImage} style={styles.image} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formHeader}>OTP Verification</Text>
          { phoneNo ? (<Text style={styles.formHeaderSecondary}>
            Enter the Otp sent to +91-{phoneNo ? phoneNo : ''}
          </Text>) : 
          (<Text style={styles.formHeaderSecondary}>
            Enter the Otp sent to {email ? email : ''}
          </Text>) }

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(index, value)}
                ref={refs[index]}
              />
            ))}
          </View>

          <Pressable onPress={handleResendOtp}>
            <Text style={styles.forgotPasswordText}>
              Did'nt Receive OTP?{" "}
              <Text style={{ color: "#2ECC71", fontWeight: "bold" }}>
                RESEND
              </Text>
            </Text>
          </Pressable>

          <PressableButton
            onHandlePress={handleOtpVerification}
            title="Verify & Continue"
            height={60}
            style={styles.signInButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;

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
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp(70),
    height: hp(30),
    resizeMode: "contain",
  },
  formContainer: {
    flex: 8,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
  },
  formHeader: {
    fontSize: wp(6),
    fontWeight: "bold",
    marginBottom: hp(2),
    textAlign: "center",
  },
  formHeaderSecondary: {
    fontSize: wp(4),
    color: "gray",
    textAlign: "center",
    marginBottom: hp(2),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  otpInput: {
    width: wp(15),
    height: hp(7),
    borderColor: "#fedca6",
    borderWidth: 1,
    textAlign: "center",
    fontSize: wp(5),
    borderRadius: wp(5),
    backgroundColor: "#fedca6",
  },
  forgotPasswordText: {
    textAlign: "center",
    marginBottom: hp(2),
    color: "blue",
  },
  signInButton: {
    marginBottom: hp(2),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
