import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import {
  Loader,
  Loader2,
  LogOutIcon,
  Volume2Icon,
  VolumeOffIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("../../public/sounds/mouse-click.mp3");
const ProfileTab = () => {
  const { authUser, logout, updateProfile, isUpdatingProfileImage } =
    useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result;
      const result = await updateProfile({ profilePic: base64Image });
      if (result.success) {
        setSelectedImage(base64Image);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* avatar  */}
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={
                  selectedImage ||
                  authUser.profilePic ||
                  "../../public/avatar.png"
                }
                alt="avatar"
                className="size-full object-cover"
              />
              {/* Loader Overlay */}
              {isUpdatingProfileImage ? (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="size-6 text-white animate-spin" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              )}
            </button>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
            />
          </div>
          {/* username and online text */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-sm">Online</p>
          </div>
        </div>
        {/* buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio player failed", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
