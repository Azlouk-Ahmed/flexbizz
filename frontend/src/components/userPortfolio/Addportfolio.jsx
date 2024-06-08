import React, { useState } from 'react'
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import "./userporfolio.css"
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { CiUser } from 'react-icons/ci';
import { MdDescription } from 'react-icons/md';
import { FaCity } from 'react-icons/fa6';
import { BsFlag, BsPostage } from 'react-icons/bs';
import { GiDoubleQuaver, GiWebSpit } from 'react-icons/gi';
import { BiImages } from 'react-icons/bi';

function Addportfolio({setaddportfolio}) {
    const {auth } = useAuthContext();
    const [inputValue, setInputValue] = useState('');
    const [projects, setProjects] = useState([]);
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [projectImage, setProjectImage] = useState('');
    const [skills, setSkills] = useState([]);
    const [award, setaward] = useState('');
    const [awards, setawards] = useState([]);
    const [mediaName, setMediaName] = useState('');
    const [mediaLink, setMediaLink] = useState('');
    const [socialMedia, setSocialMedia] = useState([]);
    const [name, setName] = useState('');
    const [descriptionp, setDescriptionp] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [gouvernorate, setGouvernorate] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [image, setImage] = useState('');
    const handleProjectImageChange = (e) => {
        setProjectImage(e.target.value);

    };

    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };

    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    };

    const handleProjectLinkChange = (e) => {
        setProjectLink(e.target.value);
    };
    const handleAddProject = () => {
        if (projectImage.trim() !== '' && projectTitle.trim() !== '' && projectDescription.trim() !== '' && projectLink.trim() !== '') {
            setProjects([...projects, {
                image: projectImage.trim(),
                title: projectTitle.trim(),
                description: projectDescription.trim(),
                link: projectLink.trim()
            }]);
            // Reset project fields after adding
            setProjectImage('');
            setProjectTitle('');
            setProjectDescription('');
            setProjectLink('');
        }
    };

    const handleRemoveProject = (index) => {
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChangep = (e) => {
        setDescriptionp(e.target.value);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    const handleawardChange = (e) => {
        setaward(e.target.value);
    };

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
    };

    const handleGouvernorateChange = (e) => {
        setGouvernorate(e.target.value);
    };

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value);
    };
    const handleMediaNameChange = (e) => {
        setMediaName(e.target.value);
    };

    const handleMediaLinkChange = (e) => {
        setMediaLink(e.target.value);
    };

    const handleAddSocialMedia = () => {
        if (mediaName.trim() !== '' && mediaLink.trim() !== '') {
            setSocialMedia([...socialMedia, { name: mediaName.trim(), link: mediaLink.trim() }]);
            setMediaName('');
            setMediaLink('');
        }
    };

    const handleRemoveSocialMedia = (index) => {
        const newSocialMedia = [...socialMedia];
        newSocialMedia.splice(index, 1);
        setSocialMedia(newSocialMedia);
    };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddSkill = () => {
    if (inputValue.trim() !== '') {
      setSkills([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleAddaward = () => {
    if (award.trim() !== '') {
      setawards([...awards, award.trim()]);
      setaward('');
    }
  };


  const handleAwardremove = (index) => {
    const newAward = [...awards];
    newAward.splice(index, 1);
    setSkills(newAward);
  };
  const handleRemoveSkill = (index) => {
    const newSkill = [...skills];
    newSkill.splice(index, 1);
    setSkills(newSkill);
  };



  const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [website, setwebsite] = useState('');
    const [experiences, setExperiences] = useState([]);

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAddExperience = () => {
        if (company.trim() !== '' && role.trim() !== '' && startDate.trim() !== '' && endDate.trim() !== '' && description.trim() !== '') {
            setExperiences([...experiences, {
                company: company.trim(),
                role: role.trim(),
                startDate: startDate.trim(),
                endDate: endDate.trim(),
                description: description.trim()
            }]);
            setCompany('');
            setRole('');
            setStartDate('');
            setEndDate('');
            setDescription('');
        }
    };

    const handleRemoveExperience = (index) => {
        const newExperiences = [...experiences];
        newExperiences.splice(index, 1);
        setExperiences(newExperiences);
    };
  const [institution, setinstitution] = useState('');
    const [degree, setdegree] = useState('');
    const [startDate2, setStartDate2] = useState('');
    const [endDate2, setEndDate2] = useState('');
    const [education, seteducation] = useState([]);

    const handleinstitutionChange = (e) => {
        setinstitution(e.target.value);
    };

    const handlewebsiteChange = (e) => {
        setwebsite(e.target.value);
    };

    const handledegreeChange = (e) => {
        setdegree(e.target.value);
    };

    const handleStartDateChange2 = (e) => {
        setStartDate2(e.target.value);
    };

    const handleEndDateChange2 = (e) => {
        setEndDate2(e.target.value);
    };

    const handleEducation = () => {
        if (institution.trim() !== '' && degree.trim() !== '' && startDate2.trim() !== '' && endDate2.trim() !== '') {
            seteducation([...education, {
                institution: institution.trim(),
                degree: degree.trim(),
                startDate2: startDate2.trim(),
                endDate2: endDate2.trim(),
            }]);
            setinstitution('');
            setdegree('');
            setStartDate2('');
            setEndDate2('');
        }
    };

    const handleRemoveEducation = (index) => {
        const neweducations = [...education];
        neweducations.splice(index, 1);
        setExperiences(neweducations);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(auth) {

        
        const portfolioData = {
          name,
          description: descriptionp,
          city,
          country,
          gouvernorate,
          postalCode,
          image,
          website,
          socialMedia,
          skills,
          awards,
          experiences,
          education,
        };
    
        try {
          const response = await axios.post('http://localhost:5000/portfolio', portfolioData, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.status === 201) {
            window.location.reload(); 
          }
        } catch (error) {
          console.error('There was an error!', error);
          alert('Error: Unable to submit portfolio');
        }
    }
      };
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
      className="addportfolio"
    >
      <form className="formcontent" onSubmit={handleSubmit}>
        <div className="notification-header">
        <IoCloseOutline
          className="notification-close"
          onClick={() => {
            setaddportfolio(false);
          }}
        />
      </div>
        <div className="row">
        <h4>Basic Details</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                        <div className="input-icon"><CiUser className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Description" value={descriptionp} onChange={handleDescriptionChangep} />
                        <div className="input-icon"><MdDescription className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="City" value={city} onChange={handleCityChange} />
                        <div className="input-icon"><FaCity className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Country" value={country} onChange={handleCountryChange} />
                        <div className="input-icon"><BsFlag className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Gouvernorate" value={gouvernorate} onChange={handleGouvernorateChange} />
                        <div className="input-icon"><GiDoubleQuaver className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="website" value={website} onChange={handlewebsiteChange} />
                        <div className="input-icon"><GiWebSpit className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Postal Code" value={postalCode} onChange={handlePostalCodeChange} />
                        <div className="input-icon"><BsPostage className="fa fa-user"/></div>
                    </div>
                    <div className="input-group input-group-icon df-c">
                        <label htmlFor="img">Image</label>
                        <input type="file" id='img' placeholder="Image" value={image} onChange={handleImageChange} />
                        <div className="input-icon"><BiImages className="fa fa-user"/></div>
                    </div>
        <div className="input-group input-group-icon df-c">
            <h4>skills</h4>
            <div className="df">

                <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter skill"
            />
            <div className="primary-btn" onClick={handleAddSkill}>Add</div>
            </div>
      <div className="df">
        {skills.map((skill, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <div className="df addskill">
              {skill}
              <span onClick={() => handleRemoveSkill(index)}>X</span>
            </div>
          </div>
        ))}
      </div>
        </div>
        <div className="input-group input-group-icon df-c">
            <h4>awards</h4>
            <div className="df">
                <CiUser className="fa fa-user"/>

                <input
                type="text"
                value={award}
                onChange={handleawardChange}
                placeholder="Enter award"
            />
            <div className="primary-btn" onClick={handleAddaward}>Add</div>
            </div>
      <div className="df">
        {awards.map((aw, index) => (
          <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
            <div className="df addskill">
              {aw}
              <span onClick={() => handleAwardremove(index)}>X</span>
            </div>
          </div>
        ))}
      </div>
        </div>
        <div className="input-group input-group-icon df-c">
        <h4>media</h4>
                        <div className="df">
                            <input
                                type="text"
                                value={mediaName}
                                onChange={handleMediaNameChange}
                                placeholder="Enter media name"
                            />
                            <input
                                type="text"
                                value={mediaLink}
                                onChange={handleMediaLinkChange}
                                placeholder="Enter media link"
                            />
                            <div className="primary-btn" onClick={handleAddSocialMedia}>Add</div>
                        </div>
                        <div className="df">
                            {socialMedia.map((media, index) => (
                                <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
                                    <div className="df addskill">
                                        {media.name}: {media.link}
                                        <span onClick={() => handleRemoveSocialMedia(index)}>X</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
        <div className="input-group input-group-icon df-c">
        <h4>porjects</h4>
                        <div className="df">
                            <input
                                type="text"
                                value={projectTitle}
                                onChange={handleProjectTitleChange}
                                placeholder="Enter project title"
                            />
                            <input
                                type="TEXT"
                                value={projectImage}
                                onChange={handleProjectImageChange}
                                placeholder="Enter mimage"
                            />
                            <input
                                type="text"
                                value={projectDescription}
                                onChange={handleProjectDescriptionChange}
                                placeholder="Enter image"
                            />
                            <input
                                type="text"
                                value={projectLink}
                                onChange={handleProjectLinkChange}
                                placeholder="Enter project link"
                            />
                            <div className="primary-btn" onClick={handleAddProject}>Add</div>
                        </div>
                        <div className="df">
                            {projects.map((project, index) => (
                                <div key={index} style={{ display: 'inline-block', marginRight: '5px' }}>
                                    <div className="df addskill">
                                        {project.name}: {project.link}
                                        <span onClick={() => handleRemoveSocialMedia(index)}>X</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="input-group input-group-icon df-c">
                    <h4>experience</h4>
                        <div className="df">
                            <input
                                type="text"
                                value={company}
                                onChange={handleCompanyChange}
                                placeholder="Enter company"
                            />
                            <input
                                type="text"
                                value={role}
                                onChange={handleRoleChange}
                                placeholder="Enter role"
                            />
                            <input
                                type="text"
                                value={startDate}
                                onChange={handleStartDateChange}
                                placeholder="Enter start date"
                            />
                            <input
                                type="text"
                                value={endDate}
                                onChange={handleEndDateChange}
                                placeholder="Enter end date"
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description"
                            />
                            <div className="primary-btn" onClick={handleAddExperience}>Add</div>
                        </div>
                        <div className="df">
                            {experiences.map((experience, index) => (
                                <div key={index} className="addskill df-c">
                                    <div>company :{experience.company}</div>
                                    <div>role : {experience.role}</div>
                                    <div>{experience.startDate} - {experience.endDate}</div>
                                    <div>desc : {experience.description}</div>
                                    <span className="danger-btn" onClick={() => handleRemoveExperience(index)}>Remove</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="input-group input-group-icon df-c">
                    <h4>education</h4>
                    <div className="df">
    <input
        type="text"
        value={institution}
        onChange={handleinstitutionChange}
        placeholder="Enter institution"
    />
    <input
        type="text"
        value={degree}
        onChange={handledegreeChange}
        placeholder="Enter degree"
    />
    <input
        type="text"
        value={startDate2}
        onChange={handleStartDateChange2}
        placeholder="Enter start date"
    />
    <input
        type="text"
        value={endDate2}
        onChange={handleEndDateChange2}
        placeholder="Enter end date"
    />
    <div className="primary-btn" onClick={handleEducation}>Add</div>
</div>

                        <div className="df">
                            {education.map((education, index) => (
                                <div key={index} className="addskill df-c">
                                    <div>institution :{education.institution}</div>
                                    <div>degree : {education.degree}</div>
                                    <div>{education.startDate2} - {education.endDate2}</div>
                                    <span className="danger-btn" onClick={() => handleRemoveEducation(index)}>Remove</span>
                                </div>
                            ))}
                        </div>
                    </div>
        
        </div>
        <div className="row">
        </div>
        <button className="primay-btn">submit</button>
    </form>
    </motion.div>
  )
}

export default Addportfolio