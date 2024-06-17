import React from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { Link } from 'react-router-dom';

function UserAct({ user, index, isChecked, onCheckboxChange, count }) {
  const { data: countact } = useFetchData(`${process.env.REACT_APP_API_URL}/activities/activities/count/${user._id}`);

  const handleChange = () => {
    onCheckboxChange(user._id);
  };

  return (
    <div className="df actuser">
      <div className='df'>
        {onCheckboxChange && <input 
          id={`selectuser${index}`} 
          className="inp-cbx" 
          type="checkbox" 
          style={{ display: "none" }} 
          checked={isChecked}
          onChange={handleChange}
        />}
        <label className="cbx df" htmlFor={`selectuser${index}`}>
          {onCheckboxChange && <span>
            <svg width="12px" height="10px" viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>}
          <div className='df'>
            <div className="actimg df">
              <img src={user.img} alt="" />
            </div>
            <Link to={`/profile/${user._id}`}>{user.name} {user.familyName}</Link>
          </div>
        </label>
      </div>
      <span className="count">{(count)? count : countact?.count}</span>
    </div>
  );
}

export default UserAct;
