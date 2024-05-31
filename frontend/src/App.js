import "./App.css";
import "../src/pages/chat/chat.css"

import "../src/pages/homepage/home.css"
import "../src/pages/landing/landing.css"
import "../src/pages/loginpage/login.css"
import "../src/pages/proflie/profile.css"
import "../src/pages/propositions/proposition.css"
import "../src/pages/userPage/userpage.css"
import "../src/components/joboffers/offers.css"
import "../src/components/search/search.css"

import React, { lazy, Suspense } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import { useFetchNotification } from "./hooks/useFetchNotification";
import SearchPage from "./pages/searchpage/SearchPage";

const Landing = lazy(() => import("./pages/landing/Landing"));
const Home = lazy(() => import("./pages/homepage/Home"));
const Login = lazy(() => import("./pages/loginpage/Login"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const ClientServicePage = lazy(() => import("./pages/client service page/ClientServicePage"));
const PropositionsPage = lazy(() =>
  import("./pages/propositions/PropositionsPage")
);
const ProfilePage = lazy(() => import("./pages/proflie/ProfilePage"));
const UserPage = lazy(() => import("./pages/userPage/UserPage"));
const PaymentRedirect = lazy(() =>
  import("./components/payment/PaymentRedirect")
);
const PaymentRedirectError = lazy(() =>
  import("./components/payment/PaymentRedirectError")
);

function App() {
  const { dispatch, auth } = useAuthContext();
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

  return (
    <div className="App">
      <BrowserRouter>
        
        <Navbar user={auth?.user} />
        <Suspense fallback={<p>loading page data ...</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route path="/landing" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/propositions" element={<PropositionsPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/payment/success" element={<PaymentRedirect />} />
            <Route path="/payment/fail" element={<PaymentRedirectError />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/client-service" element={<ClientServicePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
