import React, { useEffect, useRef, useState } from 'react';
import "./chat.css";
import axios from 'axios';
import { useChatsContext } from '../../hooks/useChatsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import OnlineUsers from '../../components/onlineusers/OnlineUsers';
import ChatComponent from '../../components/chatComponent/ChatComponent';

import MessagesComponent from '../../components/chatComponent/MessagesComponent';
import {io} from "socket.io-client";
import Loading from '../../components/loading/Loading';


function Chat() {
    const socket = useRef();
    const { chats, dispatch, isTyping } = useChatsContext();
    const { auth } = useAuthContext();
    const [selectedChat, setSelectedChat] = useState(null);
    const [onlineusers, setOnlineUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sendMessage, setSendMessage] = useState(null);
    const [typing, setIsTyping] = useState(false);
    const [receivedMessage, setReceivedMessage] = useState(null);
    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", auth?.user._id);
        socket.current.on("get-users", (users) => {
            const filteredUsers = users.filter(user => user.userId !== auth?.user._id);
            setOnlineUsers(filteredUsers);
        });
      }, [auth]);
    
      // Send Message to socket server
      useEffect(() => {
        if (sendMessage!==null) {
          socket.current.emit("send-message", sendMessage);}
      }, [sendMessage]);
    
    
      useEffect(() => {
        socket.current.on("recieve-message", (data) => {
            dispatch({ type: "CREATE_MESSAGE", payload: data });
        }
    
        );
      }, []);

      useEffect(() => {
        socket.current.on("typing", (data) => {
            setIsTyping(true);
        }
    
        );
      }, []);
      useEffect(() => {
        socket.current.on("stop_typing", (data) => {
            setIsTyping(false);
        }
    
        );
      }, []);

      useEffect(() => {
 
        dispatch({ type: 'SET_TYPING', payload: typing });
      }, [typing])
      

    
    
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/chat/', {
                    headers: {
                        'authorization': `Bearer ${auth.token}`
                    }
                });
                if (response.status === 200) {
                    dispatch({ type: 'SET_CHATS', payload: response.data });
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };

        if (auth) {
            fetchChats();
        }
    }, [auth, dispatch]);

    const createChat =async (userId) => {
        if(auth)
        {try {
            setLoading(true);
            const response = await axios.post(`http://localhost:5000/chat/${userId}`, {}, {
                headers: {
                    'authorization': `Bearer ${auth.token}`
                }
            });
            if (response.status === 200) {
                dispatch({ type: 'CREATE_CHAT', payload: response.data });
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            setLoading(false);
        }}
    }

    return (
        <div className="chat">

            <div className="chats-container">
            <div className='online-users'>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={3}
                    className='swiper'
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    >
                        {
                            (onlineusers)?.map((user)=>{
                                return (
                                    <SwiperSlide onClick={()=>createChat(user.userId)} className='center'>
                                        <OnlineUsers userId={user.userId} key={user.userId} />
                                    </SwiperSlide>
                                )
                            })  
                        }
                </Swiper>
            </div>
            <hr />
            {!loading &&<div className="chats">
                {
                    chats !== null ?
                    chats.map(chat => {
                        return(
                            <div onClick={()=>setSelectedChat(chat)}>
                                <ChatComponent onlineusers={onlineusers}  chat={chat} />
                            </div>
                        )
                    }) :
                    <div>loading</div>
                }
            </div>}
            {loading &&<Loading />}
            </div>
            <div className="message-box">
                {selectedChat &&<MessagesComponent setSendMessage={setSendMessage}  chat={selectedChat} onlineusers={onlineusers} receivedMessage={receivedMessage} />}
                {!selectedChat && <div className='select-chat'>please select a chat</div>}
            </div>
        </div>
    );
}

export default Chat;
