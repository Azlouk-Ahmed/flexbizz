import React, { useState, useEffect, useContext } from "react";
import "./allusers.css";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";
import { IoMdPersonAdd } from "react-icons/io";
import { useFetchData } from "../../hooks/useFetchData";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function Allusers() {
  const [users, setUsers] = useState([]);
  const { error, data, loading } = useFetchData("http://localhost:5000/user/");
  const [searchQuery, setSearchQuery] = useState('');
  const { auth } = useAuthContext();

  useEffect(() => {
    if (data) {
      const filteredData = data.filter(user =>
        user._id !== auth?.user?._id && 
        !auth?.user?.connections?.some(connection => connection.userId === user._id)
      );
      setUsers(filteredData);
    }
  }, [data, auth]);

  const filteredUsers = users?.filter(user => {
    const fullName = `${user?.name} ${user?.familyName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="connections--container">
      <div className="search">
        <input 
          type="text" 
          placeholder="Search by name or family name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> 
        <div><CiSearch /></div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {filteredUsers.length > 0 ? (
        <div className="connections">
          {filteredUsers.map((user) => (
            <div className="profile-container" key={user._id}>
              <div className="profile-img">
                <img src={user.img} alt="" className="profile-pic" />
              </div>
              <div className="user-info">
                <Link to={"/profile/"+user._id}>
                  <span>{user.name} {user.familyName}</span>
                </Link>
                <span><MdConnectWithoutContact /> {user.connections?.length} • <FcApproval /> {user.badges?.length}</span>
              </div>
              <IoMdPersonAdd />
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Allusers;
