import React from 'react'
import { useFetchData } from '../../hooks/useFetchData'
import { Link } from 'react-router-dom'

function UserAct({user, index}) {
    const {data: countact} = useFetchData(`http://localhost:5000/activities/activities/count/${user._id}`)
  return (
    <div className="df actuser">
        <div className='df'>
            <input id={`selectuser${index}`} class="inp-cbx" type="checkbox" style={{display: "none"}} />
            <label class="cbx df" for={`selectuser${index}`}>
                <span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
                </span>
                
                    <div className='df'>
                    <div className="actimg df">
                    <img src={user.img} alt="" srcset="" />
                </div>
                       <Link to={"/profile/"+user._id}> {user.name} {user.familyName} </Link></div>
            </label>
        </div>

        <span className="count">{countact?.count}</span>

    </div>
  )
}

export default UserAct