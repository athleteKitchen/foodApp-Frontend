import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Image } from "react-native";
import LoadingModal from "../../shared/components/LoadingModal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PressableButton from "../../shared/components/PressableButton";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ForgotImage from '../../../assets/forgot-screen-1.png'

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigation = useNavigation();

  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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

  const handleSendEmail = () => {
    setIsLoading(true);
    // Simulate sending email to backend
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000); // Simulated delay
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    // Simulate verifying OTP with backend
    setTimeout(() => {
      setIsLoading(false);
      alert("OTP Verified");
      // You can navigate to the reset password screen or perform other actions
    }, 2000); // Simulated delay
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
      <View style={styles.header}>
        <Pressable onPress={navigation.goBack} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={30} color="#100f0f" />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
          <Image source={ForgotImage} style={styles.image} />
      </View>
      {!isEmailSent ? (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: hp(3), marginVertical: hp(3)}}>Enter your Registered Email !</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <PressableButton
            onHandlePress={handleSendEmail}
            title="Continue"
            height={60}
            style={styles.signInButton}
          />
        </View>
      ) : (
        <View>
          <Text style={{fontWeight: 'bold', fontSize: hp(3), paddingHorizontal: wp(10)}}>Enter the OTP Sent</Text>
          <Text style={{paddingHorizontal: wp(10), marginBottom: hp(3), marginHorizontal: wp(5)}}>to stejas2002@gmail.com</Text>
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

          <PressableButton
            onHandlePress={handleVerifyOtp}
            title="Reset Password"
            height={60}
            style={styles.signInButton}
          />
        </View>
      )}
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    position: "absolute",
    top: hp(4.5),
    left: wp(8),
    zIndex: 1,
  },
  input: {
    height: hp(7),
    borderColor: "#fedca6",
    borderWidth: 1,
    marginBottom: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    backgroundColor: "#fedca6",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInButton: {
    marginBottom: hp(2),
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
  }
});
