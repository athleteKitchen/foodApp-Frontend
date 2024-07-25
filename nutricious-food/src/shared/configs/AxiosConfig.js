import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const api = axios.create({
  baseURL: "http://192.168.29.236:90",
});

const setAuthorizationHeader = async () => {
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
  await AsyncStorage.removeItem("isLoggedIn");
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
}

const refreshTokenApi = async (token) => {
  try {
    const response = await api.post("/auth-service/auth/refresh-token", { token });
    const tokens = response.data
    const { accessToken, newRefreshToken } = tokens;

    await removeTokens();
    await setTokens(accessToken, newRefreshToken);

    await setAuthorizationHeader();
  } catch (error) {
    console.error("This User is LoggedIn in another device:", error.message);
    await AsyncStorage.removeItem('isLoggedIn');
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.response.data.error.message || "This User in LoggedIn in another device"
    })
  }
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    await setAuthorizationHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await AsyncStorage.getItem("refresh-token");
      if (refreshToken) {
        try {
          await refreshTokenApi(refreshToken);
          // originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Interceptor Refresh token error:", refreshError);
          // Handle refresh token error (e.g., logout user)
        }
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
