import React, { useState, useEffect } from "react";
import "./home.css"
import PortfolioComponent from "../../components/portfolio/PortfolioComponent";
import Allusers from "../../components/getallusers/Allusers";

function Home({ user }) {

  return (
    <div className="home--page">
      <PortfolioComponent />
      <div className="timeline">
        timeline
      </div>
      <Allusers />
    </div>
  );
}

export default Home;
