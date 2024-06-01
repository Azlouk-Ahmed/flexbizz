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
import LazyImage from '../lazyloadimg/LazyImage';
import { CiSearch } from 'react-icons/ci';
import { MdSupportAgent } from "react-icons/md";
import { RiAdminFill } from 'react-icons/ri';
import { IoIosArrowUp } from "react-icons/io";
require("./sidebar.css")

function Navbar({user}) {
    const {data} = useFetchData("http://localhost:5000/user/connections/pending");
    const {notifications, messages} = useNotificationContext();
    const [opened, setOpened] = useState(false);
    const [istoggled, setistoggled] = useState(false);
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

    const handletogglechange = () => {
      setistoggled(!istoggled);
    }

    
    
  return (
  //   <div className="nav-bar-container">
  //   <div className='logocontainer'>
  //     <img src={require("../../img/logo.png")} alt="" className='logo'/>
  //     <span>lexBizz</span>
  //   </div>
  //   {user && <div className="links">

  //     <NavLink to="/search">
  //       <CiSearch />
  //       <span>search</span>
  //     </NavLink>
  //     <NavLink to="/">
  //       <AiOutlineGlobal />
  //       <span>Timeline</span>
  //     </NavLink>

  //     <NavLink to="/chat">
  //       <TbMessageCircle />
  //       <span>chats</span>
  //       {messages.length>0 &&<pre className="notification--indicator">{messages.length}</pre>}
  //     </NavLink>

  //     <NavLink to="/profile">
  //       <FiUser />
  //       <span>profile</span>
  //     </NavLink>

      
  //     <NavLink to="/propositions">
  //       <MdWorkOutline />
  //       <span>propositions</span>
  //       {propositions?.length>0 &&<pre className="notification--indicator">{propositions?.length}</pre>}
  //     </NavLink>
  //     {user.role ==="Support" && <NavLink to="/client-service">
  //       <MdSupportAgent className="support"/>
  //       <span>client service</span>
  //     </NavLink>}
  //   </div>}
  //   {notifopened && <Notifications setnotifOpened={setnotifOpened}/>}
  //   {reqopened && data &&<ConnectionRequests setreqOpened={setreqOpened} data={data} />}

  //   {user &&<div className="nav--actions">
  //   <div>
  //       <GoPersonAdd onClick={()=>setreqOpened(!reqopened)} />
  //       {data?.length>0 &&<pre className="notification--indicator">{data?.length}</pre>}
  //   </div>

  //   <div>
  //       <IoIosNotificationsOutline onClick={()=>setnotifOpened(!notifopened)} />
  //       {notifications?.length>0 &&<pre className="notification--indicator">{notifications?.length}</pre>}
  //   </div>
    
  //   <div className="user">
  //       {user && (
  //           <div className="profile-menu">
  //               <div className="profile-img" onClick={()=>setOpened(!opened)} >
  //                   <LazyImage
  //           src={user.img}
  //           alt=""
  //           className="profilpic"
  //         />
  //               </div>
  //               <ul className={(opened)? "show" : ""} >
  //                   <li>
  //                       <div className="profile-window">
  //                           <div className="profile-container">
  //                               <div className="profile-img" >
  //                                   {/* <LazyImage
  //           src={user.img}
  //           alt=""
  //           className="profilpic"
  //         /> */}
  //         <img src={user.img} alt="" srcset="" />
  //                               </div>
  //                               <div className="user-info">
  //                                   <span>{user.name} {user.familyName}</span>
  //                                   <span>institus superier des etudes tech mahdia</span>
  //                               </div>
  //                           </div>
  //                           <div>
  //                               <button className='primary-btn'>view profile</button>
  //                           </div>
  //                           <hr />
  //                       </div>
  //                   </li>
  //                   <li className='logout' onClick={logout}> <IoLogOutOutline /> Log out</li>
  //               </ul>
  //           </div>
  //       )}
  //   </div>

  //   </div>}
    
  // </div>
  <div id="nav-bar">
  <input id="nav-toggle" checked={istoggled===true} onChange={handletogglechange} type="checkbox"/>
  <label for="nav-toggle" className={`${(!istoggled) ? "" : "rotate"}`}><span id="nav-toggle-burger" className=''></span></label>
  <div id="nav-header">
    <div className={`logocontainer ${(!istoggled) ? "" : "dnone"}`}>
      <img src={require("../../img/logo.png")} alt="" className='logo'/>
      <span>lexBizz</span>
    </div>
    <hr/>
  </div>
  <div id="nav-content">
    <div class="nav-button">
      <NavLink to="/search">
        <CiSearch className='fas'/>
        <span>search</span>
      </NavLink>
    </div>
    <div class="nav-button">
      <NavLink to="/">
        <AiOutlineGlobal className='fas'/>
        <span>Timeline</span>
      </NavLink>
    </div>
    <div class="nav-button">
      <NavLink to="/chat">
        <TbMessageCircle className='fas'/>
        <span>chats</span>
        {messages.length > 0 && <pre className="notification--indicator">{messages.length}</pre>}
      </NavLink>
    </div>
    <hr/>
    <div class="nav-button">
      <NavLink to="/profile">
        <FiUser className='fas'/>
        <span>profile</span>
      </NavLink>
    </div>
    <div class="nav-button">
      <NavLink to="/propositions">
        <MdWorkOutline className='fas'/>
        <span>propositions</span>
        {propositions?.length > 0 && <pre className="notification--indicator">{propositions?.length}</pre>}
      </NavLink>
    </div>
    <div class="nav-button">
      <NavLink to="/client-service">
        <MdSupportAgent className="fas support"/>
        <span>client service</span>
      </NavLink>
    </div>
    <div class="nav-button">
      <NavLink to="/client-service">
        <RiAdminFill className="fas"/>
        <span>dashboard</span>
      </NavLink>
    </div>
    <hr/>
    <div class="nav-button"><IoIosNotificationsOutline className='fas'/><span>notifications</span></div>
    <div class="nav-button"><GoPersonAdd className='fas'/><span>connection requests</span></div>
    <div id="nav-content-highlight"></div>
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src={user.img}/></div>
      <div id="nav-footer-titlebox">
        <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">{user.name} {user.familyName}</a>
        {user.role !== "User" && <span id="nav-footer-subtitle">{user.role}</span>}
      </div>
      <label for="nav-footer-toggle"><IoIosArrowUp className='fas'/></label>
    </div>
    <div id="nav-footer-content">
      <div className="primary-btn w-100" onClick={logout}>log out</div>
    </div>
  </div>
</div>

  )
}

export default Navbar