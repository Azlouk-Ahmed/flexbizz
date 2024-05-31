import React from 'react'
import { MdVerified } from "react-icons/md";
import { useFetchData } from '../../hooks/useFetchData';
import { TbStar } from "react-icons/tb";
import { TbStarFilled } from "react-icons/tb";


function UserHeader({user}) {
    const {data} = useFetchData("http://localhost:5000/achievements/freelancer/rate/"+user._id);
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < data?.avgRating ? <TbStarFilled /> : <TbStar />
    );
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
                        arverage rating : <span>{stars}</span>
                    </div>
                </div>
            </div>
  )
}

export default UserHeader