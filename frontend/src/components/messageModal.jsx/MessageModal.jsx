import React, { useRef, useState, useEffect } from 'react'
import "./modal.css"
import { motion } from "framer-motion"
import { BsSend } from "react-icons/bs";
import InputEmoji from 'react-input-emoji';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { IoAttachOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useChatsContext } from '../../hooks/useChatsContext';
import MessageComponent from '../chatComponent/MessageComponent';
import Loading from '../loading/Loading';
import { useOffersContext } from '../../hooks/useOffersContext';

function MessageModal({offer}) {
    const fileRef = useRef();
    const { dispatch : dispatchModal} = useOffersContext();
    const { auth } = useAuthContext();
    const { messages, dispatch} = useChatsContext();
    const [loading, setLoading] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [message, setSentMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [createdChatId, setCreatedChatId] = useState(null);
    console.log(offer.createdBy._id);
    const sendMessage = async () => {
        if ((messageText !== "" || selectedFile) && createdChatId) {
            const formData = new FormData();
            formData.append('text', messageText);
            formData.append('chatId', createdChatId);
            if(selectedFile) {
                formData.append('_file', selectedFile);
            }
            if(selectedFile){
                formData.append('file', selectedFile?.name); 
            }
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
                console.log("sending msg response",response);
                dispatch({ type: "CREATE_MESSAGE", payload: response.data });
                setMessageText("");
                setSelectedFile(null);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); 
    };
    
    useEffect(() => {
        setLoading(true);
        
        const fetchMessages = async () => {
          let createdChat; // Define createdChat variable here
    
          try {
            createdChat = await axios.post(
                `http://localhost:5000/chat/${offer?.createdBy._id}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            setCreatedChatId(createdChat.data._id); // Update createdChatId
          } catch (error) {
            console.error("Error creating chat:", error);
            setLoading(false);
            return; // Exit early if there's an error
          }
    
          try {
            const response = await axios.get(`http://localhost:5000/message/${createdChat.data._id}`, {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
              },
            });
            dispatch({ type: "SET_MESSAGES", payload: response.data });
          } catch (error) {
            console.error("Error fetching messages:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchMessages();
    }, [offer?.createdBy._id, auth?.token, dispatch]);
    
    
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);
  return (
    <div className='overlay'>
        <motion.div 
        initial={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="message-container"
      >
        <div className="subject">
            you are sending a message to  <span>{offer.createdBy.familyName}</span> about the <span>{offer.title}</span> offer <hr /><p>Please ensure that your messages adhere to our platform's guidelines, as sending inappropriate content may result in a ban. Thank you for your cooperation in maintaining a positive environment for all users. </p>
        </div>
        <hr />
        <div className="messages-container">
        {!loading && (
          <div className="messages-wrapper popup">
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
        <div className="input-message-box b-0">
            {selectedFile && <div className='selected-file'>
            <MdOutlineCancel onClick={()=>setSelectedFile(null)} />
                {selectedFile.name}</div>}
            <div onClick={() => fileRef.current.click()} style={{ cursor: "pointer", fontSize: "19px", color: "var(--orange)" }}><IoAttachOutline /></div>
            <InputEmoji
                value={messageText}
                style={{ minWidth: '200px', minHeight: '40px' }}
                onChange={setMessageText}
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
                <BsSend className="send"  />
            </div>
        </div>
        <MdOutlineCancel className='cancel' onClick={
                    () => {
                       dispatchModal({type:"OPEN_MESSAGE_MODAL", payload: false}) ;
                    }
                }/>
      </motion.div>
    </div>
  )
}

export default MessageModal