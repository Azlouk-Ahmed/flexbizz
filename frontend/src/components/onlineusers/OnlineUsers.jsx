import "./onlineusers.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OnlineUsers({userId}) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData(); 
  }, [userId]); 

  return (
    <div className='online-user'>
        <div className="profile-img" >
            <img src={userData?.img} alt="" className='profilpic' />
            <div className="dot"></div>
        </div> 
        <span>{userData?.name+" "+userData?.familyName}</span>
    </div>
  )
}

export default OnlineUsers