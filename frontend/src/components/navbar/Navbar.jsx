import React, { useState } from 'react'
import "./navbar.css"
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { CiViewTimeline } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { useAuthContext } from '../../hooks/useAuthContext';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNotificationContext } from '../../hooks/useNotificationContext';

function Navbar({user}) {
    const {likes, comments} = useNotificationContext();
    const [opened, setOpened] = useState(false);
    const {dispatch} = useAuthContext();
    const logout = () => {
        console.log("logged out")
        localStorage.removeItem("auth");
        dispatch({type:"LOGOUT"})
        window.open("http://localhost:5000/auth/logout", "_self");
    }
    
  return (
    <div className="nav-bar-container">
    <div className='logocontainer'>
      <img src={require("../../img/logo.png")} alt="" className='logo'/>
      <span>lexBizz</span>
    </div>
    {user && <div className="links">

      <NavLink to="/">
        <CiViewTimeline />
        <span>Timeline</span>
      </NavLink>

      <NavLink to="/chat">
        <TbMessageCircle />
        <span>chats</span>
      </NavLink>

      <NavLink to="/profile">
        <FiUser />
        <span>profile</span>
      </NavLink>
    </div>}

    <div className="nav--actions">
    <div>
        <IoIosNotificationsOutline />
        {likes.length>0 &&<pre>{likes.length}</pre>}
      </div>
    {user &&<div className="user">
        {user && (
            <div className="profile-menu">
                <div className="profile-img" onClick={()=>setOpened(!opened)} >
                    <img src={user.img} alt="" className='profilpic' />
                </div>
                <ul className={(opened)? "show" : ""} >
                    <li>
                        <div className="profile-window">
                        <IoIosArrowDown className='arrow' />
                            <div className="profile-container">
                                <div className="profile-img" >
                                    <img src={user.img} alt="" className='profilpic' />
                                </div>
                                <div className="user-info">
                                    <span>{user.name} {user.familyName}</span>
                                    <span>institus superier des etudes tech mahdia</span>
                                </div>
                            </div>
                            <div>
                                <button className='primary-btn'>view profile</button>
                            </div>
                            <hr />
                        </div>
                    </li>
                    <li className='logout' onClick={logout}> <IoLogOutOutline /> Log out</li>
                </ul>
            </div>
        )}
    </div>}

    </div>
    
  </div>
  )
}

export default Navbar