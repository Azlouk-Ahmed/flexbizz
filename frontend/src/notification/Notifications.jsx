import React from "react";
import "./notifications.css";
import { useFetchData } from "../hooks/useFetchData";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { GoThumbsup } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Loading from "../components/loading/Loading";
import Error from "../components/error/Error";

function Notifications({ setnotifOpened }) {
  const { data, error, loading } = useFetchData(
    "http://localhost:5000/notification"
  );

  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
      className="notifications"
    >
      <div className="notification-header">
        <IoCloseOutline
          onClick={() => setnotifOpened(false)}
          className="notification-close"
        />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : data?.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <div className="notifications--wrapper">
          {data?.map((notification) => (
            <div className="notification" key={notification?.id}>
              <div className="notification-container">
                <div className="notification-media">
                  <img
                    src={notification?.fromId?.img}
                    alt="User avatar"
                    className="notification-user-avatar"
                  />
                  {notification?.notificationType === "like" && (
                    <GoThumbsup className="notification-reaction" />
                  )}
                </div>
                <div className="notification-content">
                  <p className="notification-text">
                    <strong>{notification?.username} </strong>
                    liked your post
                  </p>
                  <span className="notification-timer">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <span className="notification-status"></span>
              </div>
                <hr />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Notifications;
