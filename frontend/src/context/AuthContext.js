import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { auth: action.payload };
        case "LOGOUT":
            return { auth: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { auth: null });
    console.log(state.auth);
    useEffect(() => {
        const checkAuthStatus = async () => {
            const auth = JSON.parse(localStorage.getItem('auth'));
            if (auth) {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${auth.user._id}`);
                    console.log("response", response.data );
                    if (response.data) {
                        dispatch({ type: 'LOGIN', payload: { ...auth, user: response.data} });
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        checkAuthStatus();
    }, []); 

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
