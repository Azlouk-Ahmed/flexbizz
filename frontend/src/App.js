
import './App.css';
import React from 'react';
import { useEffect} from "react";
import Login from './pages/loginpage/Login';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/homepage/Home';
import Chat from './pages/chat/Chat';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Mess from './components/infinite scroll/Mess';

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
    if(localStorage.getItem("auth")){
      dispatch({type: "LOGIN",payload: JSON.parse(localStorage.getItem("auth"))})
    } else {
      getUser();
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Mess />
      {/* <BrowserRouter>
      {auth && <Navbar user = {auth.user} />}
      <Routes>
        <Route 
              path="/" 
              element={auth? <Home user={auth.user} /> : <Navigate to="/login" />} 
        />
        <Route 
              path="/login" 
              element={!auth? <Login /> : <Navigate to="/" />} 
        />
        <Route 
              path="/chat" 
              element={auth? <Chat /> : <Navigate to="/" />} 
        />
      </Routes>
      </BrowserRouter> */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
