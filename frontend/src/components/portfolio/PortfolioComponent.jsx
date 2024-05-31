import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./portfolio.css";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscGithubAlt } from "react-icons/vsc";
import { useAuthContext } from '../../hooks/useAuthContext';
import {Link} from "react-router-dom"
import { useFetchData } from '../../hooks/useFetchData';
import Loading from '../loading/Loading';
import Error from '../error/Error';
import Empty from '../error/Empty';
import LazyImage from '../lazyloadimg/LazyImage';



function PortfolioComponent() {
  const [portfolioData, setPortfolioData] = useState(null);
  const { auth } = useAuthContext();
  const {data, loading, error} = useFetchData("http://localhost:5000/portfolio/user")

  useEffect(() => {
    setPortfolioData(data);
  }, [data]);

  return (
    <div className='portfolio'>
      
      {portfolioData && <div className="portfolio--data">
        <div className="user">
         
          <LazyImage
            src={portfolioData.portfolio.user?.img}
            alt=""
            className=""
          />

          <h3>{portfolioData.portfolio.user?.name} {portfolioData.portfolio.user?.familyName}</h3>
          <h5>{portfolioData.portfolio.education.length > 0 ? portfolioData.portfolio.education[0].institution : "No education yet"}</h5>
          {portfolioData.portfolio.user?.status === "hiring" &&<div className="status hiring"><div>is hiring </div><span className="hiring__circle"></span></div>}
          {portfolioData.portfolio.user?.status !== "hiring" &&<div className="status "><div>{portfolioData.portfolio.user?.status}</div><span className="status__available-circle"></span></div>}
        </div>
        <hr />
        <div className="connections">
            <div className="box--title">basic info</div>
          <ul>
            <li><MdConnectWithoutContact />  connections: {portfolioData.portfolio.user?.connections.length || 0}</li>
            <li><FcApproval />  badges: {portfolioData.portfolio.user?.badges.length || 0}</li>
            <li>
              {Object.keys(portfolioData.portfolio.socialMedia).length > 0 ? (
                Object.keys(portfolioData.portfolio.socialMedia).map((platform, index) => (
                  <div key={index}>
                    <IoShareSocialOutline /> :<a className='socials' href={portfolioData.portfolio.socialMedia[platform]}>{platform}</a> 
                  </div>
                ))
              ) : (
                "No social media yet"
              )}
            </li>
          </ul>
        </div>
        <hr />
        <div className="projects">
            <div className="box--title">projects</div>
          {portfolioData.portfolio.projects?.map((project, index) => (
            <div className="project" key={index}>
              <span>{project.name}</span>
              <span>{project.description}</span>
              <span><VscGithubAlt /> <a className="socials" href={project.link}>project link</a> </span>
              <div className="technologies">
                {project.technologies.map((tech, index) => (
                    <div className="tech" key={index}>
                    {tech}
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link to="/profile" className="primary-btn">
          Edit info
        </Link>
      </div>}
      {loading && <Loading />}
      {error && <Empty />}
    </div>
  );
}

export default PortfolioComponent;
