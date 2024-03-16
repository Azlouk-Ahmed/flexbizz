import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './offers.css';
import Loading from '../loading/Loading';
import InlineUserInfo from '../inlineuserinfo/InlineUserInfo';
import { MdOutlineWorkOutline } from "react-icons/md";
import { FcWorkflow } from "react-icons/fc";
import { FcAlarmClock } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { GoReport } from "react-icons/go";
import { useOffersContext } from '../../hooks/useOffersContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import Comments from '../comments/Comments';
import MessageModal from '../messageModal/MessageModal';
import ReportModal from '../reportModal/ReportModal';

function Offers({setSendNotification}) {
  const { auth } = useAuthContext();
  const { dispatch, offers, commentsOpened, sendMessageModal, reportModal } = useOffersContext();

  const likeOffer = async (id,likesLength) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      };
      const response = await axios.put(`http://localhost:5000/announcement/like/${id}`, {}, config);
      dispatch({ type: "LIKE_OFFER", payload: response.data });
      if(likesLength < response.data.likes.length){
        setSendNotification({
          receiverId: response.data.createdBy._id,
          fromId: auth?.user._id,
          elementId: response.data._id,
          notificationType: 'like',
          username: auth.user.name,
        })
      }
    } catch (error) {
      console.error('Error liking offer:', error);
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcement');
        dispatch({ type: "SET_OFFERS", payload: response.data });
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="offers-container">
      {offers ? (
        <div className="offers">
          {offers.map(offer => (
            <div className="offer" key={offer._id}>
              <InlineUserInfo user={offer.createdBy} />
              <hr />
              <h2>{offer.title}</h2>
              <p className='offer-description'>{offer.description}</p>
              <p><strong><MdOutlineWorkOutline /> Job Type:</strong> {offer.jobType}</p>
              <p><strong><FcWorkflow /> Skills Required:</strong> </p>
              <div className="technologies">
                {offer.skillsRequired.map((item, index) => (
                  <div className="skill" key={index}>
                    {item}
                  </div>
                ))}
              </div>
              <p><strong><FcCurrencyExchange /> Budget Range:</strong> {offer.budgetRange}</p>
              <p><strong><FcAlarmClock /> Deadline:</strong> {new Date(offer.deadline).toLocaleDateString()}</p>
              {offer.additionalDetails && (
                <>
                  <strong><FcViewDetails /> Additional Details:</strong>
                  <p className="offer-description">
                    {offer.additionalDetails}
                  </p>
                </>
              )}
              <hr />
              <div className="actions">
                <div className={`like ${offer.likes.includes(auth?.user._id) ? "liked" : null}`} onClick={() => likeOffer(offer._id,offer.likes.length)}><SlLike /> {offer.likes.length}</div>
                <div onClick={()=>dispatch({type:"OPEN_COMMENTS_MODAL",payload:true})}><FaRegComment /> {offer?.comments?.length}</div>
                <div className='chat' onClick={
                    () => {
                       dispatch({type:"OPEN_MESSAGE_MODAL", payload: true}) ;
                    }
                }><LuSend /></div>
                <div className='report' onClick={
                    () => {
                       dispatch({type:"OPEN_REPORT_MODAL", payload: true}) ;
                    }
                }><GoReport /></div>
              </div>
              {commentsOpened&&<Comments announcementId={offer._id}/>}
              {sendMessageModal && <MessageModal offer={offer} />}
              {reportModal && <ReportModal reportedObject={offer} type="announcement" />}
            </div>
          ))}
        </div>
      ) : (<Loading />)}
    </div>
  );
}

export default Offers;
