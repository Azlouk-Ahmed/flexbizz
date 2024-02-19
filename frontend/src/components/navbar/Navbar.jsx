import React, { useState } from 'react'
import "./navbar.css"
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';

function Navbar({user}) {
    const [opened, setOpened] = useState(false);
    const {dispatch} = useAuthContext();
    const logout = () => {
        axios.get("http://localhost:5000/auth/logout")
        .then((response)=>{
            console.log("logged out")
            localStorage.removeItem("auth");
            dispatch({type:"LOGOUT"})
        })
        .catch((error)=>console.log("error", error));
    }
  return (
    <div className="nav-bar-container">
    <div className='logocontainer'>
    <Link to="/">
      <img src={require("../../img/logo.png")} alt="" className='logo'/>
    </Link>
    </div>
    <div className="links">


      <Link to="/chat">
        <TbMessageCircle />
        <span>chats</span>
      </Link>
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
                        <IoIosArrowDown className='arrow' />
                            <div className="profile-container">
                                <div className="profile-img" >
                                    <img src={user.img} alt="" className='profilpic' />
                                </div>
                                <div className="user-info">
                                    <span>ahmed azlouk</span>
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
  </div>
  )
}

export default Navbar