import React, { useEffect } from "react";
import axios from "axios";
import "./offers.css";
import Loading from "../loading/Loading";
import InlineUserInfo from "../inlineuserinfo/InlineUserInfo";
import { MdOutlineAttachMoney } from "react-icons/md";import { FcViewDetails } from "react-icons/fc";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { GoReport } from "react-icons/go";
import { useOffersContext } from "../../hooks/useOffersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Comments from "../comments/Comments";
import MessageModal from "../messageModal/MessageModal";
import ReportModal from "../reportModal/ReportModal";
import { useSocketContext } from "../../hooks/useSocketContext";
import { GiSuitcase } from "react-icons/gi";
import { differenceInDays } from "date-fns";
import { FaClock } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
function Offers() {
  const { auth } = useAuthContext();
  const { socket } = useSocketContext();
  const { dispatch, offers, commentsOpened, sendMessageModal, reportModal } =
    useOffersContext();

  const createNotification = async (
    receiverId,
    elementId,
    notificationType,
    username
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/notification",
        {
          receiverId,
          elementId,
          notificationType,
          username,
        },
        config
      );

      console.log("Notification created successfully:", response.data);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

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
        auth.user.name
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

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/announcement");
        dispatch({ type: "SET_OFFERS", payload: response.data });
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [dispatch]);

  return (
    <div className="offers-container">
      {offers ? (
        <div className="offers">
          {offers.map((offer) => (
            <div className="offer" key={offer?._id}>
              <InlineUserInfo user={offer?.createdBy} />
              <hr />
              <h4>{offer?.title}</h4>
              <div className="technologies">
                {offer?.skillsRequired?.map((item, index) => (
                  <div className="skill" key={index}>
                    {item}
                  </div>
                ))}
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                aperiam nulla quaerat adipisci obcaecati ipsam molestias
                exercitationem reprehenderit earum, error, aliquam dicta
                voluptates repudiandae voluptas atque eius maiores facilis
                consequuntur!
              </p>
              <div className="info--container">
                <span>
                    <GiSuitcase /> 
                    {offer?.jobType}
                </span>
                <span>
                    <MdOutlineAttachMoney /> 
                    {offer?.budgetRange}
                </span>
                <span>
                    <IoLocation /> 
                    jakarta
                </span>
              </div>
              {offer?.additionalDetails && (
                <div>
                  <div className="offer-description">
                  <IoMdAttach /> 
                    {offer?.additionalDetails}
                  </div>
                </div>
              )}
              <hr />
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
                <div
                  className="chat"
                  onClick={() => {
                    dispatch({
                      type: "OPEN_MESSAGE_MODAL",
                      payload: offer?.createdBy._id,
                    });
                  }}
                >
                  <LuSend />
                </div>
                <div
                  className="report"
                  onClick={() => {
                    dispatch({ type: "OPEN_REPORT_MODAL", payload: true });
                  }}
                >
                  <GoReport />
                </div>
                <div
                  className={`deadline ${
                    differenceInDays(offer?.deadline, new Date()) <= 0
                      ? "expired"
                      : null
                  }`}
                >
                  <FaClock />
                  {" "}
                  {differenceInDays(offer?.deadline, new Date()) > 0 ? (
                    <span>{differenceInDays(offer?.deadline, new Date())} d</span>
                  ) : (
                    <span>expired !</span>
                  )}
                </div>
              </div>
              {reportModal && (
                <ReportModal reportedObject={offer} type="announcement" />
              )}
            </div>
          ))}
          {commentsOpened && <Comments />}
          {sendMessageModal && <MessageModal />}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Offers;
