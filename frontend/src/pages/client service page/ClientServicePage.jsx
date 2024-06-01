import React, { useEffect, useState } from 'react';
import UserAct from './UserAct';
import { useFetchData } from '../../hooks/useFetchData';
import { useActContext } from '../../hooks/useActContext';
import axios from 'axios';
import Activities from './Activities';

function ClientServicePage() {
  const { users, dispatch } = useActContext();
  const { error, data, loading } = useFetchData("http://localhost:5000/user/");
  const { data : activities} = useFetchData("http://localhost:5000/activities/activities");
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch({ type: "SET_USERS", payload: data });
  }, [data, dispatch]);
  
  useEffect(() => {
    dispatch({ type: "SET_ACTIVITIES", payload: activities });
  }, [activities, dispatch]);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/user/search", { name: searchQuery });
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  return (
    <div className='client service'>
      <div className="df">
        <div className="members df-c">
          <div className="title1">members</div>
          <div className="input df sb">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="primary-btn" onClick={handleSearch}>Search</div>
          </div>
          <div className="df sb menu">
            <span>select all({users?.length})</span>
            <span>activities</span>
          </div>
          <div className="df-c memberscontainer">
            {
              users && users.map((user, index) => (
                <UserAct key={user._id} index={index} user={user} />
              ))
            }
          </div>
          <div className="primary-btn w-100">Search Activities</div>
        </div>
        <Activities />
      </div>
    </div>
  );
}

export default ClientServicePage;
