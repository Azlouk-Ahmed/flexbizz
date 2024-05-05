import React, { useEffect, useState } from 'react';
import "./chat.css";
import { useChatsContext } from '../../hooks/useChatsContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import OnlineUsers from '../../components/onlineusers/OnlineUsers';
import ChatComponent from '../../components/chatComponent/ChatComponent';
import MessagesComponent from '../../components/chatComponent/MessagesComponent';
import Loading from '../../components/loading/Loading';
import { useSocketContext } from '../../hooks/useSocketContext';
import { useFetchData } from '../../hooks/useFetchData';
import Error from '../../components/error/Error';
import axios from 'axios';
import { useNotificationContext } from '../../hooks/useNotificationContext';
import { useNavigate } from 'react-router-dom';

function Chat() {
    const { socket } = useSocketContext();
    const { chats, dispatch, onlineUsers, selectedChat } = useChatsContext();
    const { auth } = useAuthContext();
    const navigate = useNavigate();
    const { dispatch: dispatchNotification, messages } = useNotificationContext();
    const [commingMsg, setcommingMsg] = useState(null);
    const { data: fetchedChats, loading: fetchingChats, error: fetchChatsError } = useFetchData('http://localhost:5000/chat/');

    useEffect(() => {
        if (fetchedChats) {
            dispatch({ type: 'SET_CHATS', payload: fetchedChats });
        }
    }, [fetchedChats, dispatch]);

    useEffect(() => {
        if (!auth) {
            navigate("/landing");
        }
    }, [auth, navigate]);

    useEffect(() => {
        if (fetchChatsError) {
            console.error('Error fetching chats:', fetchChatsError);
        }
    }, [fetchChatsError]);

    useEffect(() => {
        if (socket) {
            socket.on("recieve-message", (data) => {
                setcommingMsg(data);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (selectedChat?._id === commingMsg?.chatId) {
            dispatch({ type: "CREATE_MESSAGE", payload: commingMsg });
        }
    }, [commingMsg, selectedChat, dispatch]);

    const createChat = async (userId) => {
        if (auth) {
            try {
                const response = await axios.post(`http://localhost:5000/chat/${userId}`, {}, {
                    headers: {
                        'authorization': `Bearer ${auth.token}`
                    }
                });
                if (response.status === 200) {
                    dispatch({ type: 'CREATE_CHAT', payload: response.data });
                }
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        }
    };

    return (
        <>{auth &&<div className="chat">
            <div className="chats-container">
                <div className='online-users'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={3}
                        className='swiper'
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {(onlineUsers)?.map((user) => {
                            return (
                                <SwiperSlide key={user.userId} onClick={() => createChat(user.userId)} className='center'>
                                    <OnlineUsers userId={user.userId} key={user.userId} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <hr />
                {!fetchingChats && (
                    <div className="chats">
                        {chats !== null ? (
                            chats.map(chat => {
                                const userChatId = auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0];
                                return (
                                    <div key={chat._id} onClick={() => {
                                        dispatch({
                                            type: "SET_CHAT",
                                            payload: chat
                                        });
                                        if (messages.some((message) => message.senderId === (userChatId))) {
                                            dispatchNotification({
                                                type: "REMOVE_MESSAGE_NOTIFICATION",
                                                payload: userChatId
                                            });
                                        }
                                    }}>
                                        <ChatComponent onlineusers={onlineUsers} chat={chat} />
                                    </div>
                                );
                            })
                        ) : (
                            <div>loading</div>
                        )}
                    </div>
                )}
                {fetchingChats && <Loading />}
                {fetchChatsError && <Error error={fetchChatsError} />}
            </div>
            <div className="message-box">

                {selectedChat &&<MessagesComponent onlineusers={onlineUsers} />}
                {!selectedChat && <div className='select-chat'>please select a chat</div>}
            </div>

        </div>}
        {!auth && <Error error="somthing went wrong , try to log in"/>}
        </>
    );
}

export default Chat;
