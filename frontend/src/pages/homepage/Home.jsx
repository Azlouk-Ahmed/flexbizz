import React, { useEffect } from "react";
import "./home.css";
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";
import Offers from "../../components/joboffers/Offers";
import Search from "../../components/search/Search";
import OfferInfinite from "../../components/infinite scroll/OfferInfinite";
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const authLocal = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    if (!authLocal) {
        navigate("/login");
    }
}, [authLocal, navigate]);
  return (
    <div className="home--page">
      {/* <Offers /> */}
      {<OfferInfinite />}
      <PortfolioComponent />
    </div>
  );
}

export default Home;
