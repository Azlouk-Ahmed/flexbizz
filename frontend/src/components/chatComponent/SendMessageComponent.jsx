import React, { useRef, useState, useEffect } from 'react';
import { BsSend } from "react-icons/bs";
import InputEmoji from 'react-input-emoji';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatsContext } from '../../hooks/useChatsContext';
import io from 'socket.io-client';
import { IoAttachOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";


const socket = io('http://localhost:8800');

function SendMessageComponent({ chatId, setSendMessage, receiver }) {
    const imageRef = useRef(); 
    const fileRef = useRef(); // Ref for file input
    const { auth } = useAuthContext();
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // State for selected file
    const { dispatch } = useChatsContext();
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async () => {
        if (messageText !== "" || selectedFile) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();
            const formData = new FormData();
            formData.append('text', messageText);
            formData.append('chatId', chatId);
            formData.append('file', selectedFile); // Ensure the file is correctly appende
            setSendMessage({
                text: messageText,
                file: selectedFile ? selectedFile.name : '', // If selectedFile exists, use its name, otherwise use an empty string
                receiverId: receiver,
                chatId: chatId,
                senderId: auth?.user._id,
                createdAt: formattedDate
            });
            formData.append('file', selectedFile?.name); // Ensure the file is correctly appende
            try {
                const response = await axios.post(
                    `http://localhost:5000/message/`,
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
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    


    const sendTyping = () => {
        socket.emit("typing", { receiverId: receiver });
    };

    const stopTyping = () => {
        socket.emit("stop_typing", { receiverId: receiver });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Update selected file state
    };

    useEffect(() => {
        socket.on("typing", () => {
            setIsTyping(true);
        });

        socket.on("stop_typing", () => {
            setIsTyping(false);
        });

        return () => {
            socket.off("typing");
            socket.off("stop_typing");
        };
    }, []);

    return (
        <div className="input-message-box">
            {isTyping && <div>Typing...</div>}
            {selectedFile && <div className='selected-file'>
            <MdOutlineCancel onClick={()=>setSelectedFile(null)} />
                {selectedFile.name}</div>}
            <div onClick={() => fileRef.current.click()} style={{ cursor: "pointer", fontSize: "19px", color: "var(--orange)" }}><IoAttachOutline /></div>
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
                    onChange={handleFileChange} // Handle file change
                />
            </div>
            <div onClick={sendMessage}>
                <BsSend className="send" />
            </div>
        </div>
    );
}

export default SendMessageComponent;
