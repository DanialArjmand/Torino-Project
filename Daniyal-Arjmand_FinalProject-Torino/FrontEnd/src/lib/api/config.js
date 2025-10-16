import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:6500",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendOtp = (mobile) => {
  return api.post("/auth/send-otp", { mobile });
};

export const checkOtp = (mobile, code) => {
  return api.post("/auth/check-otp", { mobile, code });
};

export const refreshToken = (refreshTokenValue) => {
  return api.post("/auth/refresh-token", { refreshToken: refreshTokenValue });
};

export const createOrder = (bookingData) => {
  return api.post("/order", bookingData);
};

export const addToBasket = (tourId) => {
  return api.put(`/basket/${tourId}`);
};

export const updateUserProfile = (profileData) => {
  return api.put("/user/profile", profileData);
};

export const getPurchasedTours = () => {
  return api.get("/user/tours");
};

export const getBasket = () => {
  return api.get("/basket");
};

export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          const res = await axios.post(
            "http://localhost:6500/auth/refresh-token",
            {
              refreshToken,
            }
          );

          const newAccessToken = res.data.accessToken;
          Cookies.set("accessToken", newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
