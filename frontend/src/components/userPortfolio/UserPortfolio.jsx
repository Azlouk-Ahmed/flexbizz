import React from 'react';
import "../portfolio/portfolio.css";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { RiTwitterXLine } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import "./userporfolio.css"
import { GoHome } from "react-icons/go";
import { IoMailOutline } from "react-icons/io5";
import { MdWhatsapp } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";

const platformIcons = {
  linkedin: <MdConnectWithoutContact style={{fill: "white"}} />,
  facebook: <FcApproval style={{fill: "white"}} />,
  instagram: <FaInstagram style={{fill: "white"}} />,
  twitter: <RiTwitterXLine style={{fill: "white"}} />,
  gitHub: <VscGithubAlt style={{fill: "white"}} />,
  whatsapp: <MdWhatsapp style={{fill: "white"}} />,
  mail: <IoMailOutline style={{fill: "white"}} />
};
function UserPortfolio({data}) {
    
  
    return (
      <div className='user--portfolio' style={{backgroundColor:"#082032"}}>
        {data && <div className="portfolio--data">
          <div className="user">
            <img src={data.portfolio.user?.img} className="portfolio--img" alt='user' />
            <div className="name">
            <h3>{data.portfolio.user?.name} {data.portfolio.user?.familyName}</h3>
            <h5><GoHome style={{fill: "white"}} /> lives at : {data.portfolio.country ? data.portfolio.country+", "+data.portfolio.governorate+", "+data.portfolio.city+", "+data.portfolio.postalCode : "set country"}</h5>
            {
            data.portfolio.website
            && 
            <h5>
              <GoHome style={{fill: "white"}}/> website : {data.portfolio.website }
            </h5>
            }

            </div>
          </div>
          <hr />
          <div className="connections">
              <div className="box--title">social media</div>
            <ul>
                <li>
                {Object.keys(data.portfolio.socialMedia).length > 0 ? (
                  Object.keys(data.portfolio.socialMedia).map((platform, index) => (
                    <div key={Math.random()}>
                      {platformIcons[platform]} :<a className='socials' href={data.portfolio.socialMedia[platform]}>{data.portfolio.socialMedia[platform]}</a> 
                    </div>
                  ))
                ) : (
                  "No social media yet"
                )}
              </li>
            </ul>
          </div>
          <hr />
          <div className="contact">
            <div className="box--title">contact</div>
            <ul>
                {data.portfolio.contact.map((contactItem, index) => {
                const platform = Object.keys(contactItem)[0];
                const data = contactItem[platform];
                
                return (
                    <li key={Math.random()}>
                    {platformIcons[platform.toLowerCase()]} : {data}
                    </li>
                );
                })}
            </ul>
            </div>

          <hr />
          <div className="projects">
              <div className="box--title">projects</div>
              <div className="projects--container portfolio--view">

              {data.portfolio.projects?.map((project, index) => (
                <div className="project portfolio--view" key={Math.random()}>
                  <img src={`http://localhost:5000/uploads/image/${project.img}`} alt="" />
                  <span>{project.name}</span>
                  <span>{project.description}</span>
                  <span><VscGithubAlt style={{fill: "white"}}/> <a className="socials" href={project.link}>project link</a> </span>
                  <div className="technologies">
                    {project.technologies.map((tech, index) => (
                        <div className="tech" key={Math.random()}>
                        {tech}
                        </div>
                    ))}
                  </div>
                </div>
              ))}
              </div>
          </div>
          <hr />
          <div className="education">
              <div className="box--title">education</div>
              <div className="education--container portfolio--view">
              <div className="line"></div>
              <div className="education--container">
                {data.portfolio.education?.map((element, index) => (
                  <div className="education portfolio--view" key={Math.random()}>
                    <div className="hint">{(element.startDate).slice(0,4)} <GoArrowRight style={{fill: "white"}}/> {(element.endDate).slice(0,4)}</div>
                    <span>{element.institution}</span>
                    <span>{element.degree}</span>
                    <span>{element.startDate}</span>
                    <span>{element.endDate}</span>
                  </div>
                ))}
              </div>
              </div>
          </div>
        <hr />
        <div className="experience">
        <div className="box--title" key={Math.random()}>experience</div>
        <div className="experience--container">
        <div className="horizontal-line"></div>
          
                {data.portfolio.experience?.map((element, index) => (
                  <div className="experience-element" key={Math.random()}>
                    <div className="start"><GoArrowRight style={{fill: "white"}}/> {(element.startDate).slice(0,4)}</div>
                    <h3>{element.role} in {element.company}</h3>
                    <p>{element.description}</p>
                    <div className="end"><GoArrowRight style={{fill: "white"}}/> {(element.endDate).slice(0,4)}</div>
                  </div>
                ))}
        </div>
        </div>
        </div>}
        

      </div>
    );
}

export default UserPortfolio