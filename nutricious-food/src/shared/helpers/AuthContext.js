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
  const [message, setMessage] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [phone, setPhone] = useState(0);

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
      setMessage(error.response.data.error.message);
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error,
        });
      }
      setLoading(false);
      return { message: error.response.data.error.message, status: false };
    }
    return { message: message, status: false };
  };

  const login = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      const tokens = response.data;
      const { accessToken, refreshToken } = tokens;
      if (accessToken) {
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
        return { isLoggedIn: "true" };
      }
      // perform navigation from login screen to main screen
    } catch (error) {
      setMessage(error.response.data.error.message);
      if (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error,
        });
      }
      setLoading(false);
      return {
        message: error.response.data.error.message,
        isLoggedIn: "false",
      };
    }
    return { message: message, isLoggedIn: "false" };
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

  const otpVerification = async () => {};

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

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          loading,
          register,
          login,
          logout,
          refreshToken,
          userInfo,
          fetchUserInfoFromFacebook,
          fetchUserInfoFromGoogle,
          otpRequest,
          otpVerification,
          phone,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
