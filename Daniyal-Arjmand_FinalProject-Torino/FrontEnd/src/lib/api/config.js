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
  return api.post('/order', bookingData);
};

export const addToBasket = (tourId) => {
  return api.put(`/basket/${tourId}`);
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
