import React, { createContext, useReducer} from "react";

export const ActContext = createContext();

export const actReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state,users: action.payload };
        case "SET_ACTIVITIES":
            return { ...state,activities: action.payload };
    }
};

export const ActContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(actReducer, { users: [], activities : [] });

    return (
        <ActContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ActContext.Provider>
    );
};
