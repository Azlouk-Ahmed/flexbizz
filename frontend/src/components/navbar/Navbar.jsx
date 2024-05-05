import React, { useState } from 'react'
import "./navbar.css"
import { NavLink } from 'react-router-dom';
import { MdConnectWithoutContact } from "react-icons/md";
import { TbMessageCircle } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";import { FiUser } from "react-icons/fi";
import { useAuthContext } from '../../hooks/useAuthContext';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNotificationContext } from '../../hooks/useNotificationContext';
import { GoPersonAdd } from "react-icons/go";
import Notifications from '../../notification/Notifications';
import ConnectionRequests from '../../notification/ConnectionRequests';
import { useFetchData } from '../../hooks/useFetchData';
import { MdWorkOutline } from "react-icons/md";
import { useOffersContext } from '../../hooks/useOffersContext';

function Navbar({user}) {
    const {data} = useFetchData("http://localhost:5000/user/connections/pending");
    const {notifications, messages} = useNotificationContext();
    const [opened, setOpened] = useState(false);
    const [reqopened, setreqOpened] = useState(false);
    const [notifopened, setnotifOpened] = useState(false);
    const {dispatch} = useAuthContext();
    const {propositions} = useOffersContext();
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
      <NavLink to="/propositions">
        <MdWorkOutline />
        <span>propositions</span>
        {propositions?.length>0 &&<pre className="notification--indicator">{propositions?.length}</pre>}
      </NavLink>
    </div>}
    {notifopened && <Notifications setnotifOpened={setnotifOpened}/>}
    {reqopened && data &&<ConnectionRequests setreqOpened={setreqOpened} data={data} />}

    {user &&<div className="nav--actions">
    <div>
        <GoPersonAdd onClick={()=>setreqOpened(!reqopened)} />
        {data?.length>0 &&<pre className="notification--indicator">{data?.length}</pre>}
    </div>
    <div>
        <IoIosNotificationsOutline onClick={()=>setnotifOpened(!notifopened)} />
        {notifications?.length>0 &&<pre className="notification--indicator">{notifications?.length}</pre>}
    </div>
    <div className="user">
        {user && (
            <div className="profile-menu">
                <div className="profile-img" onClick={()=>setOpened(!opened)} >
                    <img src={user.img} alt="" className='profilpic' />
                </div>
                <ul className={(opened)? "show" : ""} >
                    <li>
                        <div className="profile-window">
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
    </div>

    </div>}
    
  </div>
  )
}

export default Navbar