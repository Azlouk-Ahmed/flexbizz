import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./horizontal.css";

function HorizontalProfile({ user, onlineusers }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${user}`);
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData(); 
  }, [user]); 

  return (
    <div className="user-info">
      <div className='user-info-wrapper'>
        <img src={userData ? userData.img : require("../../img/defaultuser.png")} alt="User Avatar" />
        <div className='user-info'>
          <p>{userData ? userData.name+" "+userData.familyName : "Loading..."}</p>
          {onlineusers?.some(item => item.userId === user)&&<p>active now</p>}
        </div>
      </div>
    </div>
  );
}

export default HorizontalProfile;
