import React, { useState } from 'react'
import "./navbar.css"
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";import { FiUser } from "react-icons/fi";
import { useAuthContext } from '../../hooks/useAuthContext';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNotificationContext } from '../../hooks/useNotificationContext';
import { MdConnectWithoutContact } from "react-icons/md";


function Navbar({user}) {
    const {likes, messages} = useNotificationContext();
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
        <AiOutlineGlobal />
        <span>Timeline</span>
      </NavLink>

      <NavLink to="/chat">
        <TbMessageCircle />
        <span>chats</span>
        {messages.length>0 &&<pre className="notification--indicator">{messages.length}</pre>}
      </NavLink>

      <NavLink to="/profile">
        <FiUser />
        <span>profile</span>
      </NavLink>

      <NavLink to="/connections">
        <MdConnectWithoutContact />
        <span>connections</span>
      </NavLink>
    </div>}

    <div className="nav--actions">
    <div>
        <IoIosNotificationsOutline />
        {likes.length>0 &&<pre className="notification--indicator">{likes.length}</pre>}
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