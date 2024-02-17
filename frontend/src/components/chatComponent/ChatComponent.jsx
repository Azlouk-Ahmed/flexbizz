import React from 'react'
import HorizontalProfile from '../horizontalimg/HorizontalProfile'
import { useAuthContext } from '../../hooks/useAuthContext';


function ChatComponent({chat}) {
  const {auth} = useAuthContext();
  const userID = auth?.user._id === chat.members[0] ? chat.members[1] : chat.members[0];
  return (
    <div className='single-chat'>
        <HorizontalProfile user={userID} />
    </div>
  )
}

export default ChatComponent