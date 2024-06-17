import React, { useState } from "react";
import axios from "axios";
import { MdDone } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdConnectWithoutContact } from "react-icons/md";
import { motion } from "framer-motion";
import { useAuthContext } from "../hooks/useAuthContext";

function ConnectionRequests({ setreqOpened, data }) {
  const { auth } = useAuthContext();
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [declinedRequests, setDeclinedRequests] = useState([]);

  const handleAccept = async (connectionUserId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/connections/accept/${connectionUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setAcceptedRequests((prev) => [...prev, connectionUserId]);
      }
    } catch (error) {
      console.error("Failed to accept connection request:", error);
    }
  };

  const handleDecline = async (connectionUserId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/connections/remove/${connectionUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );
      if (response.status === 200) {
        setDeclinedRequests((prev) => [...prev, connectionUserId]);
      }
    } catch (error) {
      console.error("Failed to decline connection request:", error);
    }
  };

  return (
    <motion.div
      className="notifications"
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="notification-header">
        <IoCloseOutline
          className="notification-close"
          onClick={() => setreqOpened(false)}
        />
      </div>
      <div className="connections">
        {data?.length > 0 ? (
          data.map((user) => (
            <div className="profile-container" key={user?._id}>
              <div className="wrapper">
                <div className="notification-media">
                  <img
                    src={user?.img}
                    alt=""
                    className="notification-user-avatar"
                  />
                </div>
                <div className="user-info">
                  <span>
                    {user?.name} {user?.familyName}
                  </span>
                  <span>
                    <MdConnectWithoutContact /> {user?.connections?.length} •{" "}
                    <FcApproval /> {user?.badges?.length}
                  </span>
                  <span className="notification-timer">
                    {formatDistanceToNow(new Date(user?.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="operations">
                {acceptedRequests.includes(user?._id) ? (
                  <span className="fs10">Accepted</span>
                ) : declinedRequests.includes(user?._id) ? (
                  <span className="fs10">Declined</span>
                ) : (
                  <>
                    <MdDone onClick={() => handleAccept(user?._id)} />
                    <MdClose onClick={() => handleDecline(user?._id)} />
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No requests</p>
        )}
      </div>
    </motion.div>
  );
}

export default ConnectionRequests;
