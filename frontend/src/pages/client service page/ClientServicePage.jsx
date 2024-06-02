import React, { useEffect, useState } from 'react';
import UserAct from './UserAct';
import { useFetchData } from '../../hooks/useFetchData';
import { useActContext } from '../../hooks/useActContext';
import axios from 'axios';
import Activities from './Activities';
import Reports from './Reports';

function ClientServicePage() {
  const { users, dispatch } = useActContext();
  const { data: userData, error: userError } = useFetchData("http://localhost:5000/user/");
  const { data: activities, loading: actLoading, error: actError } = useFetchData("http://localhost:5000/activities/activities");
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  useEffect(() => {
    if (userData) {
      dispatch({ type: "SET_USERS", payload: userData });
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (activities) {
      dispatch({ type: "SET_ACTIVITIES", payload: activities });
    }
  }, [activities, dispatch]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/user/search", { name: searchQuery });
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserAct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/activities/activities/${id}`);
      dispatch({ type: "SET_ACTIVITIES", payload: response.data });
    } catch (error) {
      console.error("Error fetching user activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUserId(prevUserId => prevUserId === userId ? null : userId);
  };

  return (
    <div className='client service'>
      <div className="df">
        <div className="members df-c">
          <div className="title1">Members</div>
          <div className="input df sb">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <div className="primary-btn" onClick={handleSearch}>Search</div>
          </div>
          <div className="df sb menu">
            <span>memebers ({users?.length})</span>
            <span>Activities</span>
          </div>
          <div className="df-c memberscontainer">
            {users && users.map((user, index) => (
              <UserAct 
                key={user._id} 
                index={index} 
                user={user} 
                isChecked={selectedUserId === user._id}
                onCheckboxChange={() => handleCheckboxChange(user._id)}
              />
            ))}
          </div>
          <div className={`primary-btn w-100 ${loading ? "err" : ""}`} onClick={() => getUserAct(selectedUserId)}>Search Activities</div>
        </div>
        <Activities loading={actLoading} />
      </div>
      {userError && <div className="error">Error fetching users: {userError.message}</div>}
      {actError && <div className="error">Error fetching activities: {actError.message}</div>}
      <h1>reports</h1>
      <Reports />
    </div>
  );
}

export default ClientServicePage;
