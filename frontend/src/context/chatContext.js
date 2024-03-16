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
        ...state,
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
    case "CHAT_TO_TOP": 
      const { id } = action.payload;
      const updatedChats = state.chats.slice(); 
      const chatIndex = updatedChats.findIndex((chat) => chat._id === id); 
      if (chatIndex !== -1) {
        const chatToMove = updatedChats.splice(chatIndex, 1)[0];
        updatedChats.unshift(chatToMove); 
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
