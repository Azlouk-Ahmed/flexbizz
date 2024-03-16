import React, { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    if (action.type === "LOGIN") {
        return { auth: action.payload };
    } else if (action.type === "LOGOUT") {
        return { auth: null };
    } else {
        return state; 
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { auth: null });
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        if (auth) {
          dispatch({ type: 'LOGIN', payload: auth }) 
        }
    }, [])
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
