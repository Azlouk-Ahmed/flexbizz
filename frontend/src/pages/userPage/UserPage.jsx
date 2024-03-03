import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import "./userpage.css"

function UserPage() {
    const {auth} = useAuthContext();

  return (
    <div className="profile">
        <div className="user-details">
            <div className="user--container">

            <div className="user">
                <div className="img--container">
                    <img src={auth.user.img} alt=""/>
                </div>
                <div className="info">
                    <div className="status">available for work <img src={require("../../img/availablework.gif")} /></div>
                    <div className="education">
                        education : <span>{auth?.user.education}</span>
                    </div>
                    <div className="education">
                        connections : <span>{auth?.user.connections.length}</span>
                    </div>
                    <div className="education">
                        badges : <span>{auth?.user.badges.length}</span>
                    </div>
                </div>
            </div>
            </div>
            <div className="stats">
                <div className="box">
                    <h1>0 DT</h1>
                    <span>incomes</span>
                </div>
                <div className="box">
                    <h1>0 DT</h1>
                    <span>spendings</span>
                </div>
                <div className="box">
                    <h1>0</h1>
                    <span>projects as client</span>
                </div>
                <div className="box">
                    <h1>0</h1>
                    <span>project as freelancer</span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default UserPage