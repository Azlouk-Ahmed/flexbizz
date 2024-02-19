import React from 'react'
import HorizontalProfile from '../horizontalimg/HorizontalProfile'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useChatsContext } from '../../hooks/useChatsContext';
import Typing from '../typing/Typing';



function ChatComponent({chat, onlineusers}) {
  const {isTyping} = useChatsContext();
  const {auth} = useAuthContext();
  const userID = auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0];
  return (
    <div className='single-chat'>
        <HorizontalProfile onlineusers={onlineusers} user={userID} />
    </div>
  )
}

export default ChatComponent