import React from "react";
import HorizontalProfile from "../horizontalimg/HorizontalProfile";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";

function ChatComponent({ chat, onlineusers }) {
  const { messages } = useNotificationContext();

  const { auth } = useAuthContext();
  const userID =
    auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0];
  const messagesArrayFromNotifications = messages.filter(
    (message) => message.senderId === userID
  );
  return (
    <div className="single-chat">
      <HorizontalProfile onlineusers={onlineusers} user={userID} />
      {messagesArrayFromNotifications.length > 0 && (
        <div className="indicator">
          <pre> {messagesArrayFromNotifications.length} </pre>
        </div>
      )}
    </div>
  );
}

export default ChatComponent;
