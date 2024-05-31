import React from "react";
import { MdConnectWithoutContact, MdWhatsapp } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { RiTwitterXLine } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { useFetchData } from "../../hooks/useFetchData";
import "./userporfolio.css";

const platformIcons = {
  linkedin: <MdConnectWithoutContact style={{ fill: "black" }} />,
  facebook: <FcApproval style={{ fill: "black" }} />,
  instagram: <FaInstagram style={{ fill: "black" }} />,
  twitter: <RiTwitterXLine style={{ fill: "black" }} />,
  github: <VscGithubAlt style={{ fill: "black" }} />,
  whatsapp: <MdWhatsapp style={{ fill: "black" }} />,
  mail: <IoMailOutline style={{ fill: "black" }} />,
};

function UserPortfolio({ data, userId }) {
  const { data: userData } = useFetchData(
    `http://localhost:5000/user/`+userId
  );
  
  return (
    <>
      {data && (
        <div className="user-portfolio">
          <div className="portfolioData">
            <div className="portfolio-name">
              <h1>{data.name}</h1>
            </div>
            <div className="content">
              <div className="about-user">
                <h4>About Me</h4>
                <p>{data.description}</p>
              </div>
              <div className="education-section">
                <h4>Education</h4>
                <div className="education">
                  <ul>
                    {data.education?.map((element, index) => (
                      <li key={index}>
                        <div className="data-date">
                          from <span>{element.startDate2}</span> to <span>{element.endDate2}</span>:
                        </div>
                        <div className="desc">
                          Obtained a Bachelor’s degree in {element.degree} from {element.institution}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="experience-section">
                <h4>Experience</h4>
                <div className="experience">
                  <ul>
                    {data.experiences?.map((element, index) => (
                      <li key={index}>
                        <h5>{element.role} in {element.company}</h5>
                        <div className="desc">
                          from <span>{element.startDate}</span> to <span>{element.endDate}</span>, {element.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="projects-section">
                <h4>Projects</h4>
                <ul>
                  {data.projects?.map((project, index) => (
                    <li className="project-container" key={index}>
                      <span>{project.name}</span>
                      <img
                        src={`http://localhost:5000/uploads/image/${project.img}`}
                        alt={project.name}
                      />
                      <div className="desc">{project.description} using {project.technologies.join(", ")}</div>
                      <a href={project.link}>
                        <VscGithubAlt style={{ fill: "black" }} /> project link
                      </a>
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {userData &&  (
            <div className="portfolio-user-info">
              <div className="portfolio-img">
                <div className="img-cont">
                  <img
                    src={userData?.img}
                    className="portfolio--img"
                    alt="user"
                  />
                </div>
              </div>
              <h5>{userData?.name} {userData?.familyName}</h5>
              <div className="living">
                <GoHome style={{ fill: "black" }} /> {data?.country ? `${data?.country}, ${data?.gouvernorate}, ${data?.city}, ${data?.postalCode}` : "Set country"}
              </div>
              {data?.website && (
                <div>
                  <GoHome style={{ fill: "black" }} /> Website: {data?.website}
                </div>
              )}
              
              {data.contact && <div className="contacts">
                {data?.contact.map((contactItem, index) => {
                  const platform = Object?.keys(contactItem)[0];
                  const contactData = contactItem[platform];

                  return (
                    <div key={index}>
                      {platformIcons[platform.toLowerCase()]} : {contactData}
                    </div>
                  );
                })}
              </div>}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserPortfolio;
