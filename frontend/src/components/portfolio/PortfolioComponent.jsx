import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./portfolio.css";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { IoShareSocialOutline } from "react-icons/io5";
import { VscGithubAlt } from "react-icons/vsc";
import { useAuthContext } from '../../hooks/useAuthContext';

function PortfolioComponent() {
  const [portfolioData, setPortfolioData] = useState(null);
  const { auth } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/portfolio/user', {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        });
        setPortfolioData(response.data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };
    if (auth) {
      fetchData();
    }
  }, [auth]); // Include auth in the dependency array

  return (
    <div className='portfolio'>
      {portfolioData && <div className="portfolio--data">
        <div className="user">
          <img src={portfolioData.portfolio.user?.img} alt="" srcSet="" />
          <h3>{portfolioData.portfolio.user?.name} {portfolioData.portfolio.user?.familyName}</h3>
          <h5>{portfolioData.portfolio.education.length > 0 ? portfolioData.portfolio.education[0].institution : "No education yet"}</h5>
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
        <div className="primary-btn">
          Edit info
        </div>
      </div>}
    </div>
  );
}

export default PortfolioComponent;
