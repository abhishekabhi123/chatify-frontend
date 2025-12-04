import React from "react";
import { Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SingUpPage from "./pages/SingUpPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, isLoggedIn, login } = useAuthStore();
  console.log(isLoggedIn);

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900 relative p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />
      <div className="z-50">
        <button
          onClick={() => {
            login();
          }}
        >
          help
        </button>
      </div>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
