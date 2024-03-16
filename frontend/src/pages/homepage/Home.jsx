import React, { useEffect, useState } from "react";
import "./home.css";
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";
import Offers from "../../components/joboffers/Offers";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSocketContext } from "../../hooks/useSocketContext";
import { useNotificationContext } from "../../hooks/useNotificationContext";

function Home() {
  const [notification, setNotification] = useState(null);
  const [receivedNotification, setReceivedNotification] = useState(null);
  const { auth } = useAuthContext();
  const { socket } = useSocketContext();
  const { dispatch, likes } = useNotificationContext();

  useEffect(() => {
    if (socket) {
      socket.emit("new-user-add", auth?.user._id);

      const handleReceiveNotification = (notificationData) => {
        setReceivedNotification(notificationData);
      };

      socket.on("receive-notification", handleReceiveNotification);

      return () => {
        socket.off("receive-notification", handleReceiveNotification);
      };
    }
  }, [auth, socket, likes]);

  useEffect(() => {
    if (notification && socket) {
      socket.emit("send-notification", notification);
    }
  }, [notification, socket]);

  useEffect(() => {
    console.log(receivedNotification);
    if (
      receivedNotification &&
      receivedNotification.notificationType === "like" &&
      !likes.some(
        (like) =>
          like.elementId === receivedNotification.elementId &&
          like.fromId === receivedNotification.fromId
      )
    ) {
      dispatch({
        type: "ADD_LIKE_NOTIFICATION",
        payload: receivedNotification,
      });
    }
  }, [receivedNotification, likes, dispatch]);

  return (
    <div className="home--page">
      <PortfolioComponent />
      <Offers setSendNotification={setNotification} />
      <Allusers />
    </div>
  );
}

export default Home;
