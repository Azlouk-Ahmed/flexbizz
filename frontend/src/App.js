
import './App.css';
import React from 'react';
import { useEffect} from "react";
import Login from './pages/loginpage/Login';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/homepage/Home';
import Chat from './pages/chat/Chat';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Landing from './pages/landing/Landing';
import UserPage from './pages/userPage/UserPage';
import { useFetchNotification } from './hooks/useFetchNotification';
import Connections from './pages/connections/Connections';
import PropositionsPage from './pages/propositions/PropositionsPage';
import ProfilePage from './pages/proflie/ProfilePage';

function App() {
  const {dispatch,auth} =  useAuthContext();
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          dispatch({type: "LOGIN",payload: resObject.auth})
          localStorage.setItem("auth",JSON.stringify(resObject.auth));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if(!localStorage.getItem("auth")){
      getUser();
    }
  }, [dispatch]);

  useFetchNotification();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar user = {auth?.user} />
      <Routes>
        <Route 
              path="/" 
              element={auth? <Home user={auth.user} /> : <Navigate to="/login" />} 
        />
        <Route 
              path="/connections" 
              element={<Connections />} 
        />
        <Route 
              path="/landing" 
              element={<Landing />} 
        />
        <Route 
              path="/chat" 
              element={<Chat />} 
        />
        <Route 
              path="/login" 
              element={!auth? <Login /> : <Navigate to="/" />} 
        />
        <Route 
              path="/profile" 
              element={<UserPage />} 
        />
        <Route 
              path="/propositions" 
              element={<PropositionsPage />} 
        />
        <Route 
              path="/profile/:id" 
              element={<ProfilePage />} 
        />
      </Routes>
      </BrowserRouter>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
