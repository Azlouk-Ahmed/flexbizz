import React, { createContext, useReducer } from "react";

export const ActContext = createContext();

export const actReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.payload };
        case "SET_ACTIVITIES":
            return { ...state, activities: action.payload };
        case "SET_REPORTS":
            return { ...state, reports: action.payload };
        case "UPDATE_REPORTS":
            return {
                ...state,
                reports: state.reports.map((report) =>
                    report._id === action.payload._id ? action.payload : report
                )
            }
        default:
            return state;
    }
};

export const ActContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actReducer, { users: [], activities: [], reports: [] });

    return (
        <ActContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ActContext.Provider>
    );
};
