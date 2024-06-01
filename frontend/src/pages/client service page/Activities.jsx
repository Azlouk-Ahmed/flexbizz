import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import UserObj from './UserObj';
import { IoLogIn } from 'react-icons/io5';
import { useActContext } from '../../hooks/useActContext';

const ActionTypes = Object.freeze({
  SEND_MESSAGE: 'SEND_MESSAGE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_ANNOUNCEMENT: 'CREATE_ANNOUNCEMENT',
  LIKE_ANNOUNCEMENT: 'LIKE_ANNOUNCEMENT',
  CREATE_REPORT: 'CREATE_REPORT',
  DELETE_REPORT: 'DELETE_REPORT',
  UPDATE_REPORT_STATUS: 'UPDATE_REPORT_STATUS',
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  SEND_CONNECTION_REQUEST: 'SEND_CONNECTION_REQUEST',
  DECLINE_CONNECTION_REQUEST: 'DECLINE_CONNECTION_REQUEST',
  DECLINE_PROPOSITION_REQUEST: 'DECLINE_PROPOSITION_REQUEST',
  SEND_PROPOSITIONS_REQUEST: 'SEND_PROPOSITIONS_REQUEST',
  CREATE_COMMENT: 'CREATE_COMMENT',
  CONSULTED_USER: 'CONSULTED_USER',
  CREATED_PORTFOLIO: 'CREATED_PORTFOLIO',
  ADD_VERSION: 'ADD_VERSION',
  DELETE_COMMENT: 'DELETE_COMMENT',
  UPDATE_VERSION: 'UPDATE_VERSION',
  CONFIRM_VERSION: 'CONFIRM_VERSION',
  EVALUATE: 'EVALUATE',
  PAY_SYSTEM: 'PAY_SYSTEM',
  HIRE: 'HIRE',
});

function Activities() {
    const {activities} = useActContext();

  const renderActivityMessage = (activity) => {
    const { userId, action, details, timestamp } = activity;

    switch (action) {
      case ActionTypes.CONSULTED_USER:
        return (
          <div className="df">
            <span><UserObj id={userId}/></span> visited <span><UserObj id={details.params.freelancerId}/> </span>profile
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.SEND_MESSAGE:
        return (
          <div className="df">
            <span><UserObj id={userId}/></span> sent a message: <span className='actmsg'>{details.body.text}</span>
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      // Add more cases as needed for other action types
      case ActionTypes.LOGIN:
        return (
          <div className="df">
            <UserObj id={userId}/> logged in <IoLogIn />
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.LOGOUT:
        return (
          <div className="df">
            <span>{userId}</span> logged out
          </div>
        );
      default:
        return (
          <div className="df">
            <span>{userId}</span> performed action: <span>{action}</span>
          </div>
        );
    }
  };

  return (
    <div className='activities'>
      <h1>Activities</h1>
      <div className="df-c">
        {activities?.map(activity => (
          <div key={activity._id}>
            {renderActivityMessage(activity)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
