import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNotificationContext } from "./useNotificationContext";
import { useSocketContext } from "./useSocketContext";

export const useFetchNotification = () => {
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
    useEffect(() => {
      console.log(likes);
    }, [likes])
    
}
