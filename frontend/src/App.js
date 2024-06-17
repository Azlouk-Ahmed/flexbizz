import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import { useFetchNotification } from "./hooks/useFetchNotification";
import SearchPage from "./pages/searchpage/SearchPage";
import "./App.css";
import "../src/components/ratingform/rating.css"
import "../src/pages/chat/chat.css";
import "../src/pages/homepage/home.css";
import "../src/pages/landing/landing.css";
import "../src/pages/loginpage/login.css";
import "../src/pages/proflie/profile.css";
import "../src/pages/propositions/proposition.css";
import "../src/pages/userPage/userpage.css";
import "../src/components/joboffers/offers.css";
import "../src/components/search/search.css";
import "../src/components/userPortfolio/userporfolio.css";
import "../src/pages/client service page/clientservice.css";
import "../src/pages/client service page/reports.css";
import "../src/pages/signup/signup.css"
import Banned from "./pages/Banned";
import SignUp from "./pages/signup/SignUp";
import Invoices from "./pages/invoice/Invoices";

const Landing = lazy(() => import("./pages/landing/Landing"));
const Home = lazy(() => import("./pages/homepage/Home"));
const Login = lazy(() => import("./pages/loginpage/Login"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const ClientServicePage = lazy(() => import("./pages/client service page/ClientServicePage"));
const PropositionsPage = lazy(() => import("./pages/propositions/PropositionsPage"));
const ProfilePage = lazy(() => import("./pages/proflie/ProfilePage"));
const UserPage = lazy(() => import("./pages/userPage/UserPage"));
const PaymentRedirect = lazy(() => import("./components/payment/PaymentRedirect"));
const PaymentRedirectError = lazy(() => import("./components/payment/PaymentRedirectError"));
const Dashboard = lazy(() => import("./pages/admindashboard/Dashboard"));


function App() {
  const { dispatch, auth } = useAuthContext();
  const location = useLocation(); // Get the current route

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
          dispatch({ type: "LOGIN", payload: resObject.auth });
          localStorage.setItem("auth", JSON.stringify(resObject.auth));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (!localStorage.getItem("auth")) {
      getUser();
    }
  }, [dispatch]);

  useFetchNotification();

  const mainViewClass = location.pathname === '/' ? 'main-view df-c no-scroll' : 'main-view df-c';

 
  if (auth && auth.user && auth.user.banned) {
    return (
      <div className="App">
        <div className="main--container">
          <div className={mainViewClass}>
            <Banned />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
        <div className="main--container">
          {auth && <Navbar user={auth?.user} />}
          <div className={mainViewClass}>
            {auth && !auth.user.banned &&<div className="header df">
              Siège: AV. Hssine Farhat, 5180 Salakta, Mahdia Tél: 00 216 92 025 942
              <img src={require("../src/img/wego.jpg")} alt="wego"/>
            </div>}

            <Suspense fallback={<div className="loading"></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
                <Route path="/profile" element={<UserPage />} />
                <Route path="/propositions" element={<PropositionsPage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/payment/success" element={<PaymentRedirect />} />
                <Route path="/payment/fail" element={<PaymentRedirectError />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/client-service" element={<ClientServicePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/signup" element={<SignUp />} />

              </Routes>
            </Suspense>
          </div>
        </div>
    </div>
  );
}

export default App;
