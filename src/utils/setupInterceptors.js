import { logoutLocal } from "../authSlice";

export const setupInterceptors = (axiosClient, store) => {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const authErrors = [
        "Token not found",
        "Invalid token",
        "Invalid or expired token",
        "Session expired. Logged in from another device.",
        "Token is blocked, userMiddleware",
      ];

      if (
        error.response?.status === 401 &&
        authErrors.includes(error.response.data?.message)
      ) {
        store.dispatch(logoutLocal());

        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }

      return Promise.reject(error);
    }
  );
};