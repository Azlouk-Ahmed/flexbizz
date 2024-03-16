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

function Chat() {
    const { socket } = useSocketContext();
    const { chats, dispatch, isTyping } = useChatsContext();
    const { auth } = useAuthContext();
    const [selectedChat, setSelectedChat] = useState(null);
    const [onlineusers, setOnlineUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const { data: fetchedChats, loading: fetchingChats, error: fetchChatsError } = useFetchData('http://localhost:5000/chat/');

    useEffect(() => {
        if (fetchedChats) {
            dispatch({ type: 'SET_CHATS', payload: fetchedChats });
        }
    }, [fetchedChats, dispatch]);

    useEffect(() => {
        if (fetchChatsError) {
            console.error('Error fetching chats:', fetchChatsError);
        }
    }, [fetchChatsError]);

    useEffect(() => {
        if (socket) {
            socket.emit("new-user-add", auth?.user._id);
            socket.on("get-users", (users) => {
                const filteredUsers = users.filter(user => user.userId !== auth?.user._id);
                setOnlineUsers(filteredUsers);
            });
        }
    }, [auth, socket]);
    
    useEffect(() => {
        if (sendMessage!==null && socket) {
            socket.emit("send-message", sendMessage);
        }
    }, [sendMessage, socket]);
    
    useEffect(() => {
        if (socket) {
            socket.on("recieve-message", (data) => {
                console.log("recice");
                dispatch({ type: "CREATE_MESSAGE", payload: data });
            });
        }
    }, [dispatch, socket]);

    const createChat = async (userId) => {
        if(auth) {
            try {
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
            }
        }
    };

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
            {!fetchingChats &&<div className="chats">
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
            {fetchingChats &&<Loading />}
            {fetchChatsError &&
            <Error error={fetchChatsError} />
            }
            </div>
            <div className="message-box">
                {selectedChat &&<MessagesComponent setSendMessage={setSendMessage}  chat={selectedChat} onlineusers={onlineusers} receivedMessage={receivedMessage} />}
                {!selectedChat && <div className='select-chat'>please select a chat</div>}
            </div>
        </div>
    );
}

export default Chat;
