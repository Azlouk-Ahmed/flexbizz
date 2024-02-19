import React, { useState, useEffect } from "react";
import axios from "axios";
import "./allusers.css";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { CiSearch } from "react-icons/ci";

function Allusers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/");
        setUsers(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.name} ${user.familyName}`.toLowerCase();
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
      {filteredUsers.length > 0 && (
        <div className="connections">
          {filteredUsers.map((user) => (
            <div className="profile-container" key={user._id}>
              <div className="profile-img">
                <img src={user.img} alt="" className="profilpic" />
              </div>
              <div className="user-info">
                <span>{user.name} {user.familyName}</span>
                <span><MdConnectWithoutContact /> {user.connections.length} • <FcApproval /> {user.badges.length}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
      {filteredUsers.length === 0 && <p>No users found.</p>}
    </div>
  );
}

export default Allusers;
