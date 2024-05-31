import React, { useRef, useState } from 'react';
import { motion } from "framer-motion";
import { IoCloseOutline, IoAttachOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import "../search/search.css";
import postRequest from '../../API/API';
import { useAuthContext } from '../../hooks/useAuthContext';
import Error from '../error/Error';
import { useOffersContext } from '../../hooks/useOffersContext';

function OfferForm({ setIsOpenForm }) {
    const {auth} = useAuthContext();
    const {dispatch} = useOffersContext();
    const fileRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [jobType, setJobType] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [budgetMin, setbudgetMin] = useState(0);
    const [budgetMax, setbudgetMax] = useState(0);
    const [error, setError] = useState('');
    const [errorReq, setErrorReq] = useState(null);
    const [location, setLocation] = useState(""); 
    const [government, setGovernment] = useState('');

    const validateForm = () => {
        if (!position) return "Please enter position.";
        if (!description) return "Please enter description.";
        if (budgetMin <= 0 || budgetMax <= 0)
          return "Budget values should be greater than 0.";
        if (budgetMin >= budgetMax)
          return "Minimum budget should be less than maximum budget.";
        if (location === "onSite" && government ==="")
          return "select a gouvernment";
        if (!deadline || new Date(deadline) <= new Date())
          return "Please enter a valid deadline.";
        if (!jobType) return "Please select job type.";
        if (!skillsRequired) return "Please enter required skills.";
        const skillsRegex = /^[\w\s]+(,[\w\s]+)*$/;
        if (!skillsRegex.test(skillsRequired))
          return "Skills must be comma-separated.";
        return "";
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formError = validateForm();
        if (formError) {
            setError(formError);
            setLoading(false);
            return;
        }
        const workingEnvironment = location === "onPlatform" ? "onPlatform" : government;
        const formData = new FormData();
        formData.append('position', position);
        formData.append('description', description);
        formData.append('jobType', jobType);
        formData.append('skillsRequired', skillsRequired);
        formData.append('budgetMin', budgetMin);
        formData.append('budgetMax', budgetMax);
        formData.append('deadline', deadline);
        formData.append('workingEnvironnement', workingEnvironment);
        if (selectedFile) {
            formData.append('_file', selectedFile);
            formData.append('attachment', selectedFile.name); 
        }
        
        for (let [key, value] of formData.entries()) {
            console.log(key," : ", value);
        }
        
        const {data, error} = await postRequest("http://localhost:5000/announcement",formData,auth?.token);
        if(data) {
            setLoading(false);
            setErrorReq(false)
            setError(false);
            console.log(data);
            dispatch({type:"ADD_OFFER", payload : data});
            setIsOpenForm(false);   
        }
        if(error) {
            setErrorReq(error);
            setLoading(false);
        }
        console.log(data);
    };
    
    

    const handlePositionChange = (e) => {
        setPosition(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlebudgetMinChange = (e) => {
        setbudgetMin(e.target.value, 10);
    };

    const handlebudgetMaxChange = (e) => {
        setbudgetMax(e.target.value, 10);
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    };

    const handleSkillsRequiredChange = (e) => {
        setSkillsRequired(e.target.value.split(","));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
    };
    
      const handleGovernmentChange = (e) => {
        setGovernment(e.target.value);
      };

    return (
        <div className="offer--form">
            <div className="search--container">
                <motion.div
                    initial={{ opacity: 0, translateX: 100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ duration: 0.5 }}
                    className="notifications"
                >
                    <div className="notification-header">
                        <IoCloseOutline
                            onClick={() => setIsOpenForm(false)}
                            className="notification-close"
                        />
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="posted-by">
                            position <input type="text" placeholder="enter position" onChange={handlePositionChange} value={position} />
                        </div>
                        <div className="description">
                            description <textarea onChange={handleDescriptionChange} value={description} placeholder="offer description" cols="30" rows="10"></textarea>
                        </div>
                        <div className="input">
    <input
        type="radio"
        name="loc"
        id="formloc"
        value="onPlatform"
        onChange={handleLocationChange}
        checked={location === "onPlatform"}
    />
    <div className="checkmark"></div>
    <label htmlFor="formloc">on platform</label>
        </div>
        <div className="input">
            <input
                type="radio"
                name="loc"
                id="formloc2"
                value="onSite"
                onChange={handleLocationChange}
                checked={location === "onSite"}
            />
            <div className="checkmark"></div>
            <label htmlFor="formloc2">on site</label>
        </div>

                        {location === "onSite"&& <div className="input">
                            <label htmlFor="formloc3">government</label>
                            <select className="custom-select" id="formloc3" onChange={handleGovernmentChange} value={government}>
                            <option value="government1">government1</option>
                            <option value="government2">government2</option>
                            <option value="government3">government3</option>
                            </select>
                        </div>}
                        <div className="salary">
                            <div className="input">
                                <label htmlFor="min">min</label>
                                <input type="number" id="min" onChange={handlebudgetMinChange} value={budgetMin} />
                            </div>
                            <div className="input">
                                <label htmlFor="max">max</label>
                                <input type="number" id="max" onChange={handlebudgetMaxChange} value={budgetMax} />
                            </div>
                        </div>
                        <div className="offer-status">
                            deadline : <input type="date" onChange={handleDeadlineChange} value={deadline} />
                        </div>
                        <div className="input">
                            <label htmlFor="jobtype">job type</label>
                            <select className="custom-select" id="jobtype" onChange={handleJobTypeChange} value={jobType}>
                                <option value="">Select Job Type</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Freelance">Freelance</option>
                                <option value="On-Site">On-Site</option>
                            </select>
                        </div>
                        <div className="skills">
                            required skills(separated by commas) <input type="text" placeholder="Enter skills separated by commas" onChange={handleSkillsRequiredChange} value={skillsRequired} />
                        </div>
                        <div className="attachments">
                            <div>add an attachement : </div>
                            {selectedFile && <div className='selected-file'>
                                <MdOutlineCancel onClick={() => setSelectedFile(null)} />
                                {selectedFile.name}
                            </div>}
                            <div onClick={() => fileRef.current.click()} style={{ cursor: "pointer", fontSize: "19px", color: "var(--primary)" }}><IoAttachOutline /></div>
                            <input
                                type="file"
                                name="file"
                                id="file"
                                style={{ display: "none" }}
                                ref={fileRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        {errorReq && (<Error error = {errorReq} />)}
                        {error && <p className="error">{error}</p>}
                        <button className={`primary-btn ${loading ? "err" : ""}`}>
                            Submit
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default OfferForm;
