import React from "react";
import "./home.css";
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";
import Offers from "../../components/joboffers/Offers";
import Search from "../../components/search/Search";

function Home() {
  return (
    <div className="home--page">
      <Search />
      <Offers />
      <PortfolioComponent />
    </div>
  );
}

export default Home;
