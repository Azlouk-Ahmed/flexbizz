import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNotificationContext } from "./useNotificationContext";
import { useSocketContext } from "./useSocketContext";
import { useChatsContext } from "./useChatsContext";
import messageSound from "../notification/notification.wav"
import { useFetchData } from "./useFetchData";
import axios from "axios";
import { useOffersContext } from "./useOffersContext";

export const useFetchNotification = () => {
    const [receivedNotification, setReceivedNotification] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const { auth } = useAuthContext();
    const { socket } = useSocketContext();
    const { dispatch: dispatchNotifications, notifications} = useNotificationContext();
    const { dispatch: dispatchChats } = useChatsContext();
    const { dispatch: dispatchModal, sendMessageModal} = useOffersContext();

    useEffect(() => {
        if (socket) {
          socket.emit("new-user-add", auth?.user._id);
          socket.on("get-users", (users) => {
            console.log(users);
            const filteredUsers = users.filter(user => user.userId !== auth?.user._id);
            console.log(filteredUsers);
            dispatchChats({ type: "SET_ONLINE_USERS", payload: filteredUsers });
          });
          const handleReceiveNotification = (notificationData) => {
            setReceivedNotification(notificationData);
          };
    
          socket.on("receive-notification", handleReceiveNotification);
    
          return () => {
            socket.off("receive-notification", handleReceiveNotification);
          };
        }
    }, [auth, socket , dispatchChats]);
    
    useEffect(() => {
        if (
          receivedNotification &&
          !notifications.some(
            (notification) =>
              notification.elementId === receivedNotification.elementId &&
              notification.fromId === receivedNotification.fromId
          )
        ) {dispatchNotifications({
            type: "ADD_NOTIFICATION",
            payload: receivedNotification,
          });
        }
    }, [receivedNotification, dispatchNotifications]);

    useEffect(() => {
      if (socket) {
          const handleMessage = (data) => {
              setReceivedMessage(data);
          };
  
          socket.on("recieve-message", handleMessage);
  
          return () => {
              socket.off("recieve-message", handleMessage);
          };
      }
  }, [socket]);

    useEffect(() => {
      const fetchData = async () => {
          if (receivedMessage !== null) {
              try {
                  dispatchNotifications({
                      type: "ADD_MESSAGE_NOTIFICATION",
                      payload: receivedMessage,
                  });
                  if(!sendMessageModal){
                    const response = await axios.get(`http://localhost:5000/chat/find/${receivedMessage.senderId}`, {
                        headers: {
                            'Authorization': `Bearer ${auth?.token}`
                        }
                    });
                    dispatchChats({
                      type: "SET_CHAT",
                      payload: response.data,
                    });
  
                    dispatchModal({ type: "OPEN_MESSAGE_MODAL", payload: receivedMessage.senderId });
                  }

                  const sound = new Audio(messageSound);
                  sound.play();

              } catch (error) {
                  console.error(error);
              }
          }
      };

      fetchData();
  }, [receivedMessage, auth, dispatchNotifications]);
}
