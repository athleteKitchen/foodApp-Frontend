import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const api = axios.create({
  baseURL: "http://192.168.29.236:90",
});

const setAuthorizationHeader = async (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const setHeader = async () => {
  const token = await AsyncStorage.getItem("access-token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const setRefreshToken = async (token) => {
  await AsyncStorage.setItem("refresh-token", token);
};

const setAccessToken = async (token) => {
  await AsyncStorage.setItem("access-token", token);
};

const removeTokens = async () => {
  await AsyncStorage.removeItem("access-token");
  await AsyncStorage.removeItem("refresh-token");
  await AsyncStorage.removeItem("isMealPlanDone");
  await AsyncStorage.setItem("isLoggedIn", "false");
};

const setTokens = async (accessToken, refreshToken) => {
  await AsyncStorage.setItem("access-token", accessToken);
  await AsyncStorage.setItem("refresh-token", refreshToken);
};

const getTokens = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access-token");
    const refreshToken = await AsyncStorage.getItem("refresh-token");
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error fetching tokens from AsyncStorage:", error);
    return { accessToken: null, refreshToken: null };
  }
};

const refreshTokenApi = async (token) => {
  try {
    const response = await api.post("/auth-service/auth/refresh-token", {
      refreshToken: token,
    });
    const tokens = response.data;
    console.log(tokens);
    const { accessToken, refreshToken } = tokens;
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    await AsyncStorage.setItem("access-token", accessToken);
    await AsyncStorage.setItem("refresh-token", refreshToken);
  } catch (error) {
    console.error("This User is LoggedIn in another device:", error.message);
    Toast.show({
      type: "error",
      text1: "Error",
      text2:
        error.response.data.error.message ||
        "This User in LoggedIn in another device",
    });
  }
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    await setHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh-token");
        // console.log(refreshToken)
        // if (refreshToken && refreshToken !== "") { }
        const checkRefreshToken = await api.post(
          "/auth-service/auth/verify-refresh-token",
          {
            refreshToken: refreshToken,
          }
        );
        if (checkRefreshToken.data.success === true) {
          const response = await api.post("/auth-service/auth/refresh-token", {
            refreshToken,
          });
          if (response) {
            const { accessToken, refreshToken } = response.data;

            // Update the default headers with the new access token
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            // Save the new tokens in AsyncStorage
            await AsyncStorage.multiSet([
              ["access-token", accessToken],
              ["refresh-token", refreshToken],
            ]);

            // Update the original request with the new access token
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

            // Retry the original request
            return api(originalRequest);
          } else {
            await AsyncStorage.multiRemove(["access-token", "refresh-token"]);
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "Some Problem Occurred, Please try later...",
            });
            // return Promise.reject(error);
          }
        }
        await AsyncStorage.multiRemove(["access-token", "refresh-token"]);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "This User is LoggedIn in another device",
        });

        // If there's no valid refresh token, reject the promise
        return Promise.reject(error);
      } catch (refreshError) {
        // Handle refresh token error, e.g., logout user
        await AsyncStorage.multiRemove(["access-token", "refresh-token"]);
        console.error("Interceptor Error:", refreshError.message);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export {
  api,
  setAuthorizationHeader,
  setRefreshToken,
  setAccessToken,
  removeTokens,
  setTokens,
  getTokens,
};
