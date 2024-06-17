import React from "react";
import { VscGithubAlt } from "react-icons/vsc";
import { useFetchData } from "../../hooks/useFetchData";
import "./userporfolio.css";




function UserPortfolio({ data, userId }) {
  const { data: userData } = useFetchData(
    `${process.env.REACT_APP_API_URL}/user/` + userId
  );
  console.log("from pro",data);

  return (
    <>
      {data && (
        <div className="container1">
          <div className="left-container">
            <div className="profileText">
              <div className="profileImg">
                <img src={userData?.img} alt="Profile" />
              </div>
              <h2 className="df-c">
                {data.name} <span>web dev{data.jobTitle}</span>
              </h2>
            </div>
            <div className="contactInfo df-c">
              <h3 className="title1">Contact Info</h3>

                {data.contact?.map((contactItem, index) => {

                  return (
                    <span className="df g0" key={index}>
                      <span>
                        {contactItem?.media} :
                      </span>
                      <span>{contactItem?.value}</span>
                    </span>
                  );
                })}
            </div>
            <div className="skills">
              <h3>Skills</h3>
              <ul>
                {data.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="awards">
              <h3>Awards</h3>
              <ul>
                {data.awards?.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <div className="about">
              <h2 className="title2">About</h2>
              <p>{data.description}</p>
            </div>
            <div className="experiences">
              <h3 className="title1">Experience</h3>
              {data.experiences?.map((experience, index) => (
                <div key={index} className="box">
                  <h5>{experience.role} at {experience.company}</h5>
                  <ul>
                    <li>{experience.startDate} - {experience.endDate}</li>
                    <li>{experience.description}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div className="education">
              <h3 className="title1">Education</h3>
              <ul>
                {data.education?.map((edu, index) => (
                  <li key={index}>
                    <h5>{edu.degree}</h5>
                    <h3>{edu.institution}</h3>
                    <span>{edu.startDate2} - {edu.endDate2}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="projects-section">
              <h3 className="title1">Projects</h3>
              <ul >
                {data.projects?.map((project, index) => (
                  <li className="project-container df" key={index}>
                    <span>{project.title}</span>
                    <div>
                      {project.description}
                    </div>
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
      )}
    </>
  );
}

export default UserPortfolio;
