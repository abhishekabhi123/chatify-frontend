import React from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useChatStore } from "../store/useChatStore";
import ProfileTab from "../components/ProfileTab";
import ActiveTab from "../components/ActiveTab";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDEBAR */}
        <div className="w-80 bg-slate-800/50 backdrop-blur flex flex-col">
          <ProfileTab />
          <ActiveTab />
          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            {activeTab == "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* right section  */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;
