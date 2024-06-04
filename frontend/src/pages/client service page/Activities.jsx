import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import UserObj from './UserObj';
import { IoLogIn } from 'react-icons/io5';
import { useActContext } from '../../hooks/useActContext';
import Loading from "../../components/loading/Loading"
import { FcLike } from "react-icons/fc";
import { FcBrokenLink } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { TbStar } from "react-icons/tb";
import { TbStarFilled } from "react-icons/tb";
import { HiOutlineUsers } from "react-icons/hi2";

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

function Activities({loading}) {
    const {activities} = useActContext();

  const renderActivityMessage = (activity) => {
    const { userId, action, details, timestamp } = activity;

    switch (action) {
      case ActionTypes.CONSULTED_USER:
        if(userId == details.params.freelancerId) {
          return null;
        }
        return (
          <div className="userobjj">
            <span><UserObj id={userId}/> </span>&nbsp; visited &nbsp;<span> <UserObj id={details.params.freelancerId}/> </span>&nbsp; &nbsp;profile
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.SEND_MESSAGE:
        return (
          <div className="userobjj">
            <span><UserObj id={userId}/></span> sent a message:&nbsp; &nbsp;<span className='actmsg'>{details.body.text}</span>
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.CREATE_COMMENT:
        return (
          <div className="df-c">
            <span className='userobjj'><UserObj id={userId}/>&nbsp; commented : </span>
            <div className="evaluation">
              {details?.body?.content}
            </div>
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.LOGIN:
        
        return (
          <div className="userobjj">
            <UserObj id={userId}/> logged in &nbsp; <FcBrokenLink />
            <div className="time">
                {timestamp && formatDistanceToNow(new Date(timestamp), {
                addSuffix: true,
                })}

            </div>
          </div>
        );
      case ActionTypes.HIRE:
        
        return (
          <div className="userobjj ">
            <div className="collabs-img df">
            <UserObj id={userId} collabs={true}/> 
            <UserObj id={details.params.freelancerId} collabs={true}/> 

            </div>
            <div>are now collaborated in a new project <HiOutlineUsers /></div>
            
          </div>
        );
      case ActionTypes.LOGOUT:
        return (
          <div className="userobjj">
            <span><UserObj id={userId}/></span> logged out
          </div>
        );
      case ActionTypes.EVALUATE:
        const stars = Array.from({ length: 5 }, (_, index) =>
          index < details.body.clientRating ? <TbStarFilled /> : <TbStar />
        );
        return (
          <div className="df-c">
            <span className='df'><UserObj id={userId}/> created an evaluation : </span>
            <div className="evaluation df-c">
              <p className="p ">
                comment : {details.body.clientComment}
              </p>
              <div>{stars} , spent {details.body.budget} DT</div>
              <div className='df'>rated user : <UserObj id={details.params.id}/></div>
            </div>
          </div>
        );
      case ActionTypes.ADD_VERSION:
        return (
          <div className="df-c">
            <span className='df'><UserObj id={userId}/> pushed a version : </span>
            <div className="evaluation df-c">
              <p className="p ">
                file : {details.body.content}
              </p>
            </div>
          </div>
        );
      case ActionTypes.CONFIRM_VERSION:
        return (

           <span className='userobjj'><UserObj id={userId}/>&nbsp; confirmed a version&nbsp;  <FcOk /></span>
 
        );
      case ActionTypes.LIKE_ANNOUNCEMENT:
        return (
            <span className='userobjj'><UserObj id={userId}/>&nbsp;  liked &nbsp; <FcLike />&nbsp;  an annoouncement </span>
        );
      default:
        return (
          <div className="userobjj">
            <span>{userId}</span> performed action: <span>{action}</span>
          </div>
        );
    }
  };

  return (
    <div className='activities'>
      {!loading && <div className="df-c">
        {activities?.map(activity => (
          <>
            {renderActivityMessage(activity)}
          </>
        ))}
      </div>}
      {
        loading && <Loading />
      }
    </div>
  );
}

export default Activities;
