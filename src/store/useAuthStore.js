import { create } from "zustand";
export const useAuthStore = create((set) => ({
  authUser: { name: "abhi", _id: 123 },
  isLoggedIn: false,
  login: () => {
    console.log("logged in");
    set({ isLoggedIn: true });
  },
}));
