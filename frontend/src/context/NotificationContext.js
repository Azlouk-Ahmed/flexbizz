import React, { createContext, useReducer } from "react";

export const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_LIKE_NOTIFICATION":
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    case "ADD_COMMENT_NOTIFICATION":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "ADD_APPLY_NOTIFICATION":
      return {
        ...state,
        apply: [...state.apply, action.payload],
      };
    case "ADD_MESSAGE_NOTIFICATION":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "REMOVE_LIKE_NOTIFICATION":
      return {
        ...state,
        likes: [],
      };
    case "REMOVE_COMMENT_NOTIFICATION":
      return {
        ...state,
        comments: [],
      };
    case "REMOVE_APPLY_NOTIFICATION":
      return {
        ...state,
        apply: [],
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
    likes: [],
    comments: [],
    apply: [],
    messages: [],
  });
  console.log(state.messages);
  return (
    <NotificationContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
