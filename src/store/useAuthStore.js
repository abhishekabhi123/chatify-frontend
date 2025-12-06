import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isAuthChecking: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfileImage: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error while checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isAuthChecking: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error while signing up", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error while logging in", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error while logging out");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfileImage: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated");
      return { success: true };
    } catch (error) {
      console.log("Full error:", error);
      if (error.code === "ERR_NETWORK" && error.message === "Network Error") {
        // Could be 413 or actual network issue - assume large file
        toast.error(
          "Upload failed. Image might be too large or network issue."
        );
      } else if (error.response?.status === 413) {
        toast.error("Image is too large. Please choose a smaller image.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check your connection.");
      } else if (error.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("Error while updating profile");
      }
    } finally {
      set({ isUpdatingProfileImage: false });
    }
  },
}));
