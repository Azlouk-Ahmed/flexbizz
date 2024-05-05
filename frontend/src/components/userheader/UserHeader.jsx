import React from 'react'
import { MdVerified } from "react-icons/md";


function UserHeader({user}) {
  return (
    <div className="user--header">
                <div className="img--container">
                    <img src={user.img} alt=""/>
                </div>
                <div className="info">
                {user?.status === "hiring" &&<div className="status hiring"><div>is hiring </div><span className="hiring__circle"></span></div>}
                {user?.status !== "hiring" &&<div className="status "><div>{user?.status}</div><span className="status__available-circle"></span></div>}
                    <div className="name">
                        <span>{user.name} {user.familyName} 
                        {
                            user.role ==="Admin" && <MdVerified />
                        }
                        </span>
                    </div>
                    <div className="education">
                        connections : <span>{user.connections.length}</span>
                    </div>
                    <div className="badges">
                        badges : <span>{user.badges.length}</span>
                    </div>
                </div>
            </div>
  )
}

export default UserHeader