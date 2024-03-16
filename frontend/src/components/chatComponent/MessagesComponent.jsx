import React, { useEffect, useRef, useState } from "react";
import HorizontalProfile from "../horizontalimg/HorizontalProfile";
import { useChatsContext } from "../../hooks/useChatsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import MessageComponent from "./MessageComponent";
import Loading from "../loading/Loading";
import axios from "axios";
import SendMessageComponent from "./SendMessageComponent";
import Typing from "../typing/Typing";

function MessagesComponent({ chat, setSendMessage, onlineusers }) {
  const { auth } = useAuthContext();
  const { messages, dispatch, isTyping } = useChatsContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/message/${chat._id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        dispatch({ type: "SET_MESSAGES", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };
    fetchMessages();
  }, [chat, auth?.token, dispatch]);


  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="upper-info">
        <HorizontalProfile user={auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0]} onlineusers={onlineusers} />
        <hr />
      </div>
      <div className="messages-container">
        {!loading && (
          <div className="messages-wrapper">
            {messages?.length > 0 ? (
              messages?.map((message, index) => <MessageComponent key={index} message={message} />)
            ) : (
              <span> start a conversation</span>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        {loading && <Loading />}
      </div>
      <div className="lower-info">
      {isTyping && <Typing />}
        <SendMessageComponent
          chatId={chat._id}
          receiver={auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0]}
          setSendMessage={setSendMessage}
        />
      </div>
    </>
  );
}

export default MessagesComponent;
