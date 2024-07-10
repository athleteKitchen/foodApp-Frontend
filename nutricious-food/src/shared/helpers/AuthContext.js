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

export const AuthContext = createContext();

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

  const register = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      const tokens = response.data;
      const { accessToken } = tokens;
      if (accessToken) {
        await AsyncStorage.setItem("isLoggedIn", "false");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "User registered successfully",
        });
        setLoading(false);
        return { status: true };
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred");
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error.message);
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
      return { message: message, isLoggedIn: false };
    }
  };

  const login = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const tokens = response.data;
      const { accessToken, refreshToken } = tokens;
      if (response && accessToken) {
        await setTokens(accessToken, refreshToken);
        await setAuthorizationHeader();
        setUser(true);
        await AsyncStorage.setItem("isLoggedIn", "true");
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged-In Successfully",
        });
        setLoading(false);
        return { message: "Logged-In Successfully", isLoggedIn: "true" };
      }
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred");
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data.error.message);
      }
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
      return { message: message, isLoggedIn: false };
    }
  };

  const logout = async () => {
    try {
      const tokens = await getTokens();
      const { refreshToken } = tokens;

      if (tokens != null) {
        await api.delete("/auth/logout", { data: { refreshToken } });
        removeTokens();
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged-Out Successfully",
        });
        setUser(null); // Update user state
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No refresh token found",
        });
      }
    } catch (err) {
      console.log("Logout error:", err);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message || "An error occurred",
      });
    }
  };

  const otpRequest = async (number) => {
    setPhone(number);
    console.log(number);
    try {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "OTP sent successfully",
      });
      return { status: true };
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to send OTP, please try later...",
      });
      return { status: false };
    }
  };

  const updatePassword = async (data) => {
    try {
      const response = await api.post("/auth/email/update/password", data);
      const { message } = response.data;
      if (message) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: message,
        });
        setEmail("");
        return { status: "success" };
      }
      // return { status: "failed" };
    } catch (error) {
      setMessage(error.response.data.error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response.data.error.message || message || "An error occurred",
      });
      return { status: "failed" };
    }
  };

  const forgotPasswordRequest = async (email) => {
    try {
      setEmail(email);
      const response = await api.post("/auth/email/request/password", {
        email: email,
      });
      const { message } = response.data;
      if (message) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: message,
        });
        return { status: "success" };
      }
      return { status: "failed" };
    } catch (error) {
      setMessage(error.response.data.error.message);
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
        });
      }
      setLoading(false);
      return {
        message: error.response.data.error.message,
      };
    }
  };

  const forgotPasswordVerify = async (data) => {
    try {
      // setEmail(email);
      const response = await api.post("/auth/email/verify/password", data);
      const { message } = response.data;
      if (message) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: message,
        });
        return { status: "success" };
      }
      return { status: "failed" };
    } catch (error) {
      setMessage(error.response.data.error.message);
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: message,
        });
      }
      setLoading(false);
      return {
        message: error.response.data.error.message,
      };
    }
  };

  const refreshToken = async () => {
    try {
      const oldRefreshToken = await AsyncStorage.getItem("refresh-token");

      const response = await api.post("/auth/refresh-token", {
        oldRefreshToken,
      });
      const tokens = response.data;
      const { accessToken, refreshToken } = tokens;

      await removeTokens();
      await setTokens(accessToken, refreshToken);
      await setAuthorizationHeader();
    } catch (error) {
      console.error("Refresh token error:", error.message);
    }
  };

  const otpVerification = async () => {}

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
          updatePassword
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
