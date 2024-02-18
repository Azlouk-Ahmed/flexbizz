import React, { createContext, useReducer } from "react";

export const ChatsContext = createContext();

export const chatsReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHATS":
      return {
        ...state,
        chats: action.payload,
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "CREATE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "CREATE_CHAT":
      return {
        chats: [action.payload, ...state.chats],
      };
    case "LOGOUT":
      return {
        chats: null,
        messages: null,
        isTyping: false,
      };
    case "DEL_CHAT":
      return {
        ...state,
        chats: state.chats.filter((c) => c._id !== action.payload._id),
      };
    case "SET_TYPING":
      return {
        ...state,
        isTyping: action.payload,
      };
    case "CHAT_TO_TOP": // New action type
      const { id } = action.payload;
      const updatedChats = state.chats.slice(); // Create a copy of chats array
      const chatIndex = updatedChats.findIndex((chat) => chat._id === id); // Find index of chat with given ID
      if (chatIndex !== -1) {
        const chatToMove = updatedChats.splice(chatIndex, 1)[0]; // Remove chat from its current position
        updatedChats.unshift(chatToMove); // Add chat to the beginning of the array
      }
      return {
        ...state,
        chats: updatedChats,
      };
    default:
      return state;
  }
};

export const ChatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, {
    chats: [],
    messages: [],
    isTyping: false,
  });

  return (
    <ChatsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatsContext.Provider>
  );
};
