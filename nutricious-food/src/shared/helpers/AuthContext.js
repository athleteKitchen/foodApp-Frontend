import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  api,
  setAuthorizationHeader,
  setTokens,
  removeTokens,
  getTokens,
} from "../configs/AxiosConfig";
import Toast from "react-native-toast-message";
import Urls from "../configs/ApiUrls";
import MealsApis from "./MealApi";
import { StyleSheet } from "react-native";

export const AuthContext = createContext();

const showToast = (type, text1, text2) => {
  Toast.show({
    type,
    text1,
    text2,
  });
};

const styles = StyleSheet.create({
  text2Style: {
    color: "#1d1c1c",
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadStorageData = async () => {
      await setAuthorizationHeader();
      const storedToken = await AsyncStorage.getItem("access-token");
      if (storedToken) {
        setUser(true); // Assuming you fetch user data here
      }
      setLoading(false);
    };
    loadStorageData();
  }, []);

  const fetchUserInfoFromGoogle = async (token) => {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );
    setUserInfo(response.data);
  };

  const fetchUserInfoFromFacebook = async (token) => {
    const response = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
    );
    setUserInfo(response.data);
  };

  const checkIsMealPlanDone = async () => {
    const result = await AsyncStorage.getItem("isMealPlanDone");
    if (result === "" || result === null) {
      try {
        const response = await MealsApis.checkIsMealPlanDone();
        if (typeof response.message === "boolean") {
          await AsyncStorage.setItem(
            "isMealPlanDone",
            response.message.toString()
          );
          return response.message.toString();
        }
      } catch (err) {
        showToast(
          "error",
          "Error",
          "Some Problem Occurred, Please try later..."
        );
        return;
      }
    }
    return result;
  };

  const handleLoginResponse = async (response, successMessage) => {
    const { accessToken, refreshToken } = response.data;
    if (accessToken) {
      await setTokens(accessToken, refreshToken);
      await setAuthorizationHeader();
      setUser(true);
      await AsyncStorage.setItem("isLoggedIn", "true");
      checkIsMealPlanDone();
      showToast("success", "Success", successMessage);
      setLoading(false);
      return { message: successMessage, isLoggedIn: true };
    }
  };

  const handleError = (error, fallbackMessage) => {
    const errorMessage =
      error.response?.data?.error?.message ||
      fallbackMessage ||
      "An error occurred";
    setMessage(errorMessage);
    showToast("error", "Error", errorMessage);
    setLoading(false);
    return { message: errorMessage, isLoggedIn: false };
  };

  const register = async (data) => {
    try {
      const response = await api.post(Urls.authEndpoint.register, data);
      const tokens = response.data;
      const { accessToken } = tokens;
      if (accessToken) {
        await AsyncStorage.setItem("isLoggedIn", "false");
        showToast("success", "Success", "User registered successfully");
        const otpResponse = await otpEmailRequest(data.email);
        if (otpResponse.status === true) {
          setLoading(false);
          return { status: true };
        }
      }
    } catch (error) {
      console.log(error.response.data);
      return handleError(error, "An error occurred");
    }
  };

  const login = async (data) => {
    try {
      const response = await api.post(Urls.authEndpoint.login, data);
      return await handleLoginResponse(response, "Logged-In Successfully");
    } catch (error) {
      return handleError(error, "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const tokens = await getTokens();
      const { refreshToken } = tokens;

      if (tokens) {
        await api.delete(Urls.authEndpoint.logout, { data: { refreshToken } });
        removeTokens();
        await AsyncStorage.removeItem("isMealPlanDone");
        showToast("success", "Success", "Logged-Out Successfully");
        setUser(null); // Update user state
      } else {
        showToast("error", "Error", "No refresh token found");
      }
    } catch (err) {
      console.log("Logout error:", err);
      showToast("error", "Error", err.message || "An error occurred");
    }
  };

  const otpEmailRequest = async (email) => {
    try {
      const response = await api.post(Urls.authEndpoint.sendEmailOtp, {
        email,
      });
      if (response.data.success === true) {
        showToast("success", "Success", "An OTP is sent to your E-Mail");
        return { status: true };
      }
    } catch (err) {
      showToast(
        "error",
        "Error",
        err.response?.data?.error?.message || "An error occurred"
      );
      return { status: false };
    }
  };

  const otpEmailVerify = async (email, otp) => {
    try {
      const response = await api.post(Urls.authEndpoint.verifyEmailOtp, {
        email,
        otp,
      });
      console.log(response);
      const { success, payload } = response.data;
      if (response.data.success === true) {
        showToast("success", "Success", response.data.payload.message);
        return { status: true };
      }
    } catch (err) {
      showToast(
        "error",
        "Error",
        err.response?.data?.error?.message || "An error occurred"
      );
      return { status: false };
    }
  };

  const otpRequest = async (number) => {
    setPhone(number);
    console.log(number);
    try {
      showToast("success", "Success", "OTP sent successfully");
      return { status: true };
    } catch (err) {
      showToast("error", "Error", "Failed to send OTP, please try later...");
      return { status: false };
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await api.post(Urls.authEndpoint.updatePassword, data);
      const { message } = response.data;
      if (message) {
        showToast("success", "Success", message);
        setEmail("");
        return { status: "success" };
      }
    } catch (error) {
      showToast("error", "Error", "An Error Occurred, Please try later...");
      return { status: "failed" };
    }
  };

  const forgotPasswordRequest = async (email) => {
    try {
      setEmail(email);
      const response = await api.post(Urls.authEndpoint.forgotPasswordRequest, {
        email: email,
      });
      const { message } = response.data;
      if (message) {
        showToast("success", "Success", message);
        return { status: "success" };
      }
      return { status: "failed" };
    } catch (error) {
      showToast("error", "Error", error.response.data.error.message);
      return {
        message: error.response.data.error.message,
      };
    }
  };

  const forgotPasswordVerify = async (data) => {
    try {
      // setEmail(email);
      const response = await api.post(
        Urls.authEndpoint.forgotPasswordVerify,
        data
      );
      const { message } = response.data;
      if (message) {
        showToast("success", "Success", message);
        return { status: "success" };
      }
      return { status: "failed" };
    } catch (error) {
      showToast("error", "Error", error.response.data.error.message);
      return {
        message: error.response.data.error.message,
      };
    }
  };

  const refreshToken = async () => {
    try {
      const oldRefreshToken = await AsyncStorage.getItem("refresh-token");
      const response = await api.post(Urls.authEndpoint.refreshToken, {
        oldRefreshToken,
      });
      const tokens = response.data;
      await removeTokens();
      await setTokens(tokens.accessToken, tokens.refreshToken);
      await setAuthorizationHeader();
    } catch (error) {
      console.error("Refresh token error:", error.message);
    }
  };

  const getIsLoggedIn = async () => {
    const value = await AsyncStorage.getItem("isLoggedIn");
    if (value === "true") {
      try {
        const refreshToken = await AsyncStorage.getItem("refresh-token");
        const response = await api.post(Urls.authEndpoint.verifyRefreshToken, {
          refreshToken,
        });

        if (response.data.success === true) {
          return value;
        }
      } catch (error) {
        showToast(
          "error",
          "Error",
          error.response?.data?.error?.message ||
            "This user is logged-in from another device"
        );
        return "false";
      }
    } else if (value === "" || value === null) {
      showToast("error", "Error", "Please LogIn from single device only");
      return "false";
    }
  };

  const otpVerification = async () => {};

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          loading,
          userInfo,
          phone,
          email,
          register,
          login,
          logout,
          refreshToken,
          fetchUserInfoFromFacebook,
          fetchUserInfoFromGoogle,
          otpRequest,
          otpVerification,
          forgotPasswordRequest,
          forgotPasswordVerify,
          updatePassword,
          checkIsMealPlanDone,
          getIsLoggedIn,
          otpEmailRequest,
          otpEmailVerify,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
