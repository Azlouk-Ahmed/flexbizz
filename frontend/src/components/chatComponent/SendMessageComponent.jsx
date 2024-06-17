import React, { useRef, useState, useEffect } from 'react';
import { BsSend } from "react-icons/bs";
import InputEmoji from 'react-input-emoji';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatsContext } from '../../hooks/useChatsContext';
import { IoAttachOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useSocketContext } from '../../hooks/useSocketContext';

function SendMessageComponent({receiver }) {
    const fileRef = useRef();
    const { auth } = useAuthContext();
    const { dispatch, selectedChat} = useChatsContext();
    const { socket } = useSocketContext(); 
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); 
    const [istyping, setIsTyping] = useState(false);
    const sendMessage = async () => {
        if (messageText !== "" || selectedFile) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const formData = new FormData();
            formData.append('text', messageText);
            formData.append('chatId', selectedChat._id);
            formData.append('file', selectedFile ? selectedFile.name : '');
            if(selectedFile) {
                formData.append('_file', selectedFile);
            }
            if (socket) {
                socket.emit("send-message", {
                    text: messageText,
                    file: selectedFile ? selectedFile.name : '', 
                    receiverId: receiver,
                    chatId: selectedChat._id,
                    senderId: auth?.user._id,
                    createdAt: formattedDate
                });
            }
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/message/`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${auth.token}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                dispatch({ type: "CREATE_MESSAGE", payload: response.data });
                setMessageText("");
                setSelectedFile(null);
                dispatch({ type: "CHAT_TO_TOP", payload: { id: selectedChat._id } });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    
    const sendTyping = () => {
        if (socket) {
            socket.emit("typing", { receiverId: receiver, chatId :selectedChat._id });
        }
    };

    const stopTyping = () => {
        if (socket) {
            socket.emit("stop_typing", { receiverId: receiver,chatId :selectedChat._id });
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };

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
    

    return (
        <div className="input-message-box">
 
            {selectedFile && <div className='selected-file'>
                <MdOutlineCancel onClick={() => setSelectedFile(null)} />
                {selectedFile.name}</div>}
            <div onClick={() => fileRef.current.click()} style={{ cursor: "pointer", fontSize: "19px", color: "var(--primary)" }}><IoAttachOutline /></div>
            <InputEmoji
                value={messageText}
                style={{ minWidth: '200px', minHeight: '40px' }}
                onChange={setMessageText}
                onFocus={sendTyping}
                onBlur={stopTyping}
                onEnter={sendMessage}
            />
            <div className="message-input">
                <input
                    type="file"
                    name="file"
                    id="file"
                    style={{ display: "none" }}
                    ref={fileRef}
                    onChange={handleFileChange}
                />
            </div>
            <div onClick={sendMessage}>
                <BsSend className="send" />
            </div>
        </div>
    );
}

export default SendMessageComponent;
