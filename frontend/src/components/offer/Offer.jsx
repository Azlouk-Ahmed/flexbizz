import React from "react";
import InlineUserInfo from "../inlineuserinfo/InlineUserInfo";
import { MdOutlineAttachMoney } from "react-icons/md";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { GoReport } from "react-icons/go";
import ReportModal from "../reportModal/ReportModal";
import { useSocketContext } from "../../hooks/useSocketContext";
import { GiSuitcase } from "react-icons/gi";
import { differenceInDays } from "date-fns";
import { FaClock } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { MdWorkOutline } from "react-icons/md";
import axios from "axios";
import { useOffersContext } from "../../hooks/useOffersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { createApplyRequest, createNotification } from "../../API/API";
import { Link } from "react-router-dom";

function Offer({offer}) {
    const { dispatch } = useOffersContext();
    const { auth } = useAuthContext();
    const { socket } = useSocketContext();
      const likeOffer = async (id, likesLength) => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          };
          const response = await axios.put(
            `http://localhost:5000/announcement/like/${id}`,
            {},
            config
          );
          dispatch({ type: "LIKE_OFFER", payload: response.data });
          createNotification(
            response.data.createdBy._id,
            response.data._id,
            "like",
            auth.user.name,
            auth.token
          );
          if (likesLength < response.data.likes.length && socket) {
            socket.emit("send-notification", {
              receiverId: response.data.createdBy._id,
              fromId: auth?.user._id,
              elementId: response.data._id,
              notificationType: "like",
              username: auth.user.name,
            });
          }
        } catch (error) {
          console.error("Error liking offer:", error);
        }
      };
      const apply = async (id) => {
        try{
          const response = await axios.put(`http://localhost:5000/announcement/apply/${id}`,{},{
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            }
          })
          dispatch({ type: "APPLY_OFFER", payload: response.data }); 
          createNotification(
            response.data.createdBy,
            response.data._id,
            "apply",
            auth.user.name,
            auth.token
          );
          if((response.data.applied).includes(auth?.user._id)) {
            createApplyRequest(id,auth.token);
            if ( socket) {
              socket.emit("send-notification", {
                receiverId: response.data.createdBy,
                fromId: auth?.user._id,
                elementId: response.data._id,
                notificationType: "apply",
                username: auth.user.name,
              });
          }
          }
        }catch(error) {
          console.log(error);
        }
      }
  return (
    <div className="offer" key={offer?._id}>
      <Link to={"/profile/"+offer?.createdBy}>
        <InlineUserInfo user={offer?.createdBy} />
      </Link>
      <hr />
      <h4>{offer?.position}</h4>
      <div className="technologies">
        {offer?.skillsRequired?.map((item, index) => (
          <div className="skill" key={index}>
            {item}
          </div>
        ))}
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum aperiam
        nulla quaerat adipisci obcaecati ipsam molestias exercitationem
        reprehenderit earum, error, aliquam dicta voluptates repudiandae
        voluptas atque eius maiores facilis consequuntur!
      </p>
      <div className="info--container">
        <span>
          <GiSuitcase />
          {offer?.jobType}
        </span>
        <span>
          <MdOutlineAttachMoney />
          {offer?.budgetMin} - {offer?.budgetMax} DT
        </span>
        <span>
          <IoLocation />
          {offer?.workingEnvironnement}
        </span>
      </div>
      <div>
        <div className="offer-description">
          <IoMdAttach />
          <a
            className="display-file"
            target="_blank"
            rel="noopener noreferrer"
            href={`http://localhost:5000/uploads/announcement/${offer?.attachment}`}
            download
          >
            {offer?.attachment}
          </a>
        </div>
        <hr />
      </div>
      <div className="actions">
        <div
          className={`like ${
            offer?.likes.includes(auth?.user._id) ? "liked" : null
          }`}
          onClick={() => likeOffer(offer?._id, offer?.likes.length)}
        >
          <SlLike /> {offer?.likes.length}
        </div>
        <div
          onClick={() =>
            dispatch({
              type: "OPEN_COMMENTS_MODAL",
              payload: offer?._id,
            })
          }
        >
          <FaRegComment /> {offer?.comments.length}
        </div>
        {auth?.user?._id !== offer?.createdBy && (
          <div
            className="chat"
            onClick={() => {
              dispatch({
                type: "OPEN_MESSAGE_MODAL",
                payload: offer?.createdBy,
              });
            }}
          >
            <LuSend />
          </div>
        )}
        {auth?.user._id !== offer?.createdBy && <div
          className="report"
          onClick={() => {
            dispatch({ type: "OPEN_REPORT_MODAL", payload: offer });
          }}
        >
          <GoReport />
        </div>}
        {differenceInDays(offer?.deadline, new Date()) > 0 && offer?.status && (
          <div
            onClick={() => {
              apply(offer._id);
            }}
            className={`apply ${
              offer?.applied.includes(auth?.user._id) ? "liked" : null
            }`}
          >
            <MdWorkOutline /> ({offer?.applied?.length})
          </div>
        )}
        <div
          className={`deadline ${
            differenceInDays(offer?.deadline, new Date()) <= 0
              ? "expired"
              : null
          }`}
        >
          <FaClock />{" "}
          {differenceInDays(offer?.deadline, new Date()) > 0 ? (
            <span>{differenceInDays(offer?.deadline, new Date())} d</span>
          ) : (
            <span>expired !</span>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Offer;
