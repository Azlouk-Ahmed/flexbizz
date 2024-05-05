import React, { useEffect, useState } from "react";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { RiTwitterXLine } from "react-icons/ri";
import { VscGithubAlt } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa6";
import "./userporfolio.css";
import { IoMailOutline } from "react-icons/io5";
import { MdWhatsapp } from "react-icons/md";
import { format } from 'date-fns';
import { useFetchData } from "../../hooks/useFetchData";
import { GoHome } from "react-icons/go";

const platformIcons = {
  linkedin: <MdConnectWithoutContact style={{ fill: "black" }} />,
  facebook: <FcApproval style={{ fill: "black" }} />,
  instagram: <FaInstagram style={{ fill: "black" }} />,
  twitter: <RiTwitterXLine style={{ fill: "black" }} />,
  gitHub: <VscGithubAlt style={{ fill: "black" }} />,
  whatsapp: <MdWhatsapp style={{ fill: "black" }} />,
  mail: <IoMailOutline style={{ fill: "black" }} />,
};
function UserPortfolio({ data }) {
  const { data: userData } = useFetchData(
    `http://localhost:5000/user/65c402ef5e30f7ba5c57f5bc`
  );
  return (
    <>
      {data && (
        <div className="user-portfolio">

          <div className="portoflioData">
            <div className="portfolio-name">
                <h1>{data.name}</h1>
            </div>
            <div className="content">

            
            <div className="about-user">
              <h4>About Me</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Velit fuga odit veniam expedita optio sequi, 
                in magni magnam natus sapiente!
                </p>
            </div>
            <div className="education-section">
              <h4>education</h4>
              <div className="education">
                <ul className="">
                  {data.education?.map((element, index) => (
                    <li className="" key={Math.random()}>
                      <div className="data-date">
                        from <span>{element.startDate.slice(0, 4)}</span> to <span>{element.endDate.slice(0, 4)}</span>  :
                      </div>
                      <div className="desc">
                      Obtained a Bachelor’s degree in {element.degree} from {element.institution} at {format(new Date(element.startDate), 'MMMM yyyy')} - {format(new Date(element.endDate), 'MMMM yyyy')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="experience-section">
              <h4>
                experience
              </h4>
              <div className="experience">
                <ul>

                
                  {data.experience?.map((element, index) => (
                    <li className="" key={Math.random()}>
                      <h5>
                        {element.role} in {element.company}
                      </h5>
                      <div className="desc">
                        from <span>{element.startDate.slice(0, 4)}</span> to <span>{element.endDate.slice(0, 4)}</span>, {element.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              </div>





            <div className="">
              <h4>projects</h4>
              <ul className="">
                {data.projects?.map((project, index) => (
                  <li className="project-container" key={Math.random()}>
                    <span>{project.name}</span>
                    <img
                      src={`http://localhost:5000/uploads/image/${project.img}`}
                      alt=""
                    />
                    <div className="desc">{project.description} using {project.technologies.join(" , ")}</div>
                    <a href={project.link}>
                      <VscGithubAlt style={{ fill: "black" }} />{" "}
                        project link
                    </a>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
            
            
            </div>
          </div>
          {userData && (
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
                  <h5>
                    {userData?.name}{" "}
                    {userData?.familyName}
                  </h5>
                  <div className="living">
                    <GoHome style={{ fill: "black" }} /> {" "}
                    {data?.country
                      ? data?.country +
                        ", " +
                        data?.governorate +
                        ", " +
                        data?.city +
                        ", " +
                        data?.postalCode
                      : "set country"}
                  </div>
                  {data?.website && (
                    <div>
                      <GoHome style={{ fill: "black" }} /> website :{" "}
                      {data?.website}
                    </div>
                  )}
              <div className="">
                <div>
                  <div>
                    {Object.keys(data.socialMedia).length > 0
                      ? Object.keys(data.socialMedia).map((platform, index) => (
                          <div className="living" key={Math.random()}>
                            {platformIcons[platform]} :<a className="" href={data.socialMedia[platform]}>
                              {data.socialMedia[platform]}
                            </a>
                            
                          </div>
                        ))
                      : "No social media yet"}
                  </div>
                </div>
              </div>
              <div className="living">
                <div>
                  {data.contact.map((contactItem, index) => {
                    const platform = Object.keys(contactItem)[0];
                    const data = contactItem[platform];

                    return (
                      <div key={Math.random()}>
                        {platformIcons[platform.toLowerCase()]} : {data}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserPortfolio;
