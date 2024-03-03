import React, { createContext, useReducer } from "react";

export const OffersContext = createContext();

export const OffersReducer = (state, action) => {
  switch (action.type) {
    case "SET_OFFERS":
      return {
        ...state,
        offers: action.payload,
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== action.payload._id),
      };
    case "LIKE_OFFER":
      return {
        ...state,
        offers: state.offers.map((offer) =>
          offer._id === action.payload._id ? action.payload : offer
        ),
      };
    case "OPEN_COMMENTS_MODAL":
      return {
        ...state,
        commentsOpened: action.payload,
    };
    case "OPEN_MESSAGE_MODAL":
      return {
        ...state,
        sendMessageModal: action.payload,
    };
    case "OPEN_REPORT_MODAL":
      return {
        ...state,
        reportModal: action.payload,
    };
    default:
      return state;
  }
};


export const OfferContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(OffersReducer, {
    offers: [],
    comments: [],
    commentsOpened: false,
    sendMessageModal: false,
    reportModal: false,
  });

  return (
    <OffersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OffersContext.Provider>
  );
};
