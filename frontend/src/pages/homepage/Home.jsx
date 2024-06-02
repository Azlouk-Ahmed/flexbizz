import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./home.css";
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";
import Offers from "../../components/joboffers/Offers";
import Search from "../../components/search/Search";
import OfferInfinite from "../../components/infinite scroll/OfferInfinite";

function Home() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const authLocal = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    if (!authLocal) {
        navigate("/login");
    }
  }, [authLocal, navigate]);

  const containerClass = location.pathname === '/' ? 'home--page no-scroll' : 'home--page';

  return (
    <div id="home--page">
      {<OfferInfinite />}
    </div>
  );
}

export default Home;
