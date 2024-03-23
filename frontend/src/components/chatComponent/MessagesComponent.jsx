import React, { useEffect, useRef, useState } from "react";
import HorizontalProfile from "../horizontalimg/HorizontalProfile";
import { useChatsContext } from "../../hooks/useChatsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import MessageComponent from "./MessageComponent";
import Loading from "../loading/Loading";
import axios from "axios";
import SendMessageComponent from "./SendMessageComponent";
import Typing from "../typing/Typing";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useFetchData } from "../../hooks/useFetchData";
import Error from "../error/Error";

function MessagesComponent({ onlineusers }) {
  const { auth } = useAuthContext();
  const { messages, dispatch, isTyping,selectedChat : chat } = useChatsContext();
  const [istyping, setIsTyping] = useState(false);
  const {socket} = useSocketContext();
  const {error,data,loading} = useFetchData(`http://localhost:5000/message/${chat._id}`);

  useEffect(() => {
        if (socket) {
            socket.on("typing", (data) => {
                setIsTyping({...data, typing: true});
            });
            
            socket.on("stop_typing", (data) => {
                setIsTyping({...data, typing: false});
            });

            return () => {
                socket.off("typing");
                socket.off("stop_typing");
            };
        }
    }, [socket]);

    useEffect(() => {
      dispatch({ type: "SET_TYPING", payload: istyping })
    
    }, [istyping, dispatch])

  useEffect(() => {
    dispatch({ type: "SET_MESSAGES", payload: data });
  }, [data]);


  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    {chat &&<div className="chat--wrapper">

      <div className="upper-info">
        <HorizontalProfile user={auth?.user._id === chat?.members[0] ? chat?.members[1] : chat?.members[0]} onlineusers={onlineusers} />
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
      {isTyping.chatId === chat._id && isTyping.typing && <Typing />}
        <SendMessageComponent
          chatId={chat._id}
          receiver={auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0]}
        />
      </div>
    </div>}
    {error && <Error error={error}/>}
    </>
  );
}

export default MessagesComponent;
