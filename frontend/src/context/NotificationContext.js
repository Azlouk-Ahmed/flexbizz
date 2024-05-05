import React, { createContext, useReducer } from "react";
export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "ADD_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "REMOVE_NOTIFICATIONS":
      return {
        ...state,
        notifications: [],
      };
    case "REMOVE_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.senderId !== action.payload
        ),
      };
    default:
      return state;
  }
};


export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
    messages: [],
  });
  console.log(state.notifications);
  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
