import React from "react";
import "./home.css";
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";
import Offers from "../../components/joboffers/Offers";

function Home() {
  return (
    <div className="home--page">
      <PortfolioComponent />
      <Offers />
      <Allusers />
    </div>
  );
}

export default Home;
