import React, { useRef, useState, useEffect } from "react";
import "./modal.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { MdOutlineCancel } from "react-icons/md";
import { useChatsContext } from "../../hooks/useChatsContext";
import MessageComponent from "../chatComponent/MessageComponent";
import Loading from "../loading/Loading";
import { useOffersContext } from "../../hooks/useOffersContext";
import HorizontalProfile from "../horizontalimg/HorizontalProfile";
import SendMessageComponent from "../chatComponent/SendMessageComponent";
import { useSocketContext } from "../../hooks/useSocketContext";

function MessageModal() {
  const { dispatch: dispatchModal, sendMessageModal } = useOffersContext();
  const { auth } = useAuthContext();
  const {
    messages,
    dispatch,
    isTyping,
    selectedChat: chat,
  } = useChatsContext();
  const [loading, setLoading] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const { socket } = useSocketContext();
  const [commingMsg, setcommingMsg] = useState(null);

  useEffect(() => {
    setLoading(true);

    const fetchMessages = async () => {
      let createdChat;

      try {
        createdChat = await axios.post(
          `http://localhost:5000/chat/${sendMessageModal}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        dispatch({
          type: "SET_CHAT",
          payload: createdChat.data,
        });
      } catch (error) {
        console.error("Error creating chat:", error);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/message/${createdChat.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        dispatch({ type: "SET_MESSAGES", payload: response.data });
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [sendMessageModal, auth?.token, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("typing", (data) => {
        setIsTyping({ ...data, typing: true });
      });

      socket.on("stop_typing", (data) => {
        setIsTyping({ ...data, typing: false });
      });

      return () => {
        socket.off("typing");
        socket.off("stop_typing");
      };
    }
  }, [socket]);

  useEffect(() => {
    dispatch({ type: "SET_TYPING", payload: istyping });
  }, [istyping, dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on("recieve-message", (data) => {
        setcommingMsg(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (chat?._id === commingMsg?.chatId) {
      dispatch({ type: "CREATE_MESSAGE", payload: commingMsg });
    }
  }, [commingMsg, chat, dispatch]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
      className="overlay"
    >
      <div className="message-container">
        <HorizontalProfile user={sendMessageModal} />
        <hr />
        <div className="messages-container">
          {!loading && (
            <div className="messages-wrapper popup">
              {messages?.length > 0 ? (
                messages?.map((message, index) => (
                  <MessageComponent key={index} message={message} />
                ))
              ) : (
                <span> start a conversation</span>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
          {loading && <Loading />}
        </div>
        {isTyping.chatId === chat._id && isTyping.typing && (
          <div>typing...</div>
        )}
        <SendMessageComponent receiver={sendMessageModal} />
        <MdOutlineCancel
          className="cancel"
          onClick={() => {
            dispatchModal({ type: "OPEN_MESSAGE_MODAL", payload: false });
          }}
        />
      </div>
    </motion.div>
  );
}

export default MessageModal;
