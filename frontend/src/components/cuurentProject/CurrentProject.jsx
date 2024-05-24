import React, { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import "./currentProject.css"
import { IoLocation } from "react-icons/io5";
import { GiSuitcase } from "react-icons/gi";
import { SlWallet } from "react-icons/sl";
import { useAuthContext } from '../../hooks/useAuthContext';
import ReportModal from '../reportModal/ReportModal';
import { useOffersContext } from '../../hooks/useOffersContext';
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProjectChart from './ProjectChart';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 

function CurrentProject({ project, setopen }) {
  const { dispatch } = useOffersContext();
  const { auth } = useAuthContext();
  const { data: freelancer } = useFetchData("http://localhost:5000/user/" + project.freelancer);
  const { data: client } = useFetchData("http://localhost:5000/user/" + project.client);
  const { data: announcement } = useFetchData("http://localhost:5000/announcement/" + project.announcement);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('content', file.name); // Append filename
      formData.append('file', file); // Append file without specifying name
      console.log(formData);
  
      const response = await axios.post(`http://localhost:5000/projects/${project._id}/work-version`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      toast.success('File uploaded successfully');
  
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };
  
  return (
    <>
    <ToastContainer />
        {client && freelancer && announcement && <div className="df-c">
    <div className="current--project df">
    
        <div className="collabs">
            <div className="df">
                <img src={freelancer.img} className="client--img" />
                <img src={client.img} className="freelancer--img" />
            </div>
            <div className="df">
            <span>{freelancer.name} {freelancer.familyName}</span>
            <span>{client.name} {client.familyName}</span>
            </div>

        </div>
        <div className="df-c">
        <div className="title">{announcement.position}</div>
        <div className="info--container df-c">
    <span>
      <GiSuitcase />
      {announcement?.jobType}
    </span>
    <span>
      <IoLocation />
      {announcement?.workingEnvironnement}
    </span>
  </div>
    </div>
    <div className="box money">
                <div className="df">
                    <span> <SlWallet />+</span> worth
                </div>
                <div>
                    <h1>{announcement.budgetMax} DT</h1>
                </div>
    </div>
    <div className="project--date df-c">
        <div className="month">april</div>
        <h1>28</h1>

    </div>
    
    <div className="df-c project--date version" style={{width:"15rem"}}>

<ProjectChart projectDone={project.workVersions.length * 30} />
<span className="sucess b0 right">
  <div className="df">{project.workVersions.length * 30}% completed</div>
</span>
</div>
    
  {(auth?.user._id === freelancer._id || auth?.user._id === client._id) && (
  <>
    <div className={`df-c project--date version ${project.workVersions[0]?.confirmed === false ? "pending" : ""}`}>
      <div className="versioncontent">
        {project.workVersions[0]?.content ? (
          <>
            {project.workVersions[0].content}
            {auth?.user._id === client._id && project.workVersions[0]?.confirmed === false && (
              <div className="df">
                <div className="primary-btn">confirm</div>
              </div>
            )}
          </>
        ) : (
          auth?.user._id === project.freelancer && (
            <>
              <label htmlFor="doc0">
                <AiOutlineCloudUpload />
                <div>
                  <h4>Upload a file</h4>
                </div>
                <input type="file" id="doc0" name="doc" hidden />
              </label>
              <div className="df">
                <div className="primary-btn">confirm</div>
                <div className="danger-btn">cancel</div>
              </div>
            </>
          )
        )}
        {project.workVersions[0]?.confirmed === false && project.freelancer === auth?.user._id && (
          <span className="waitting">waiting to be confirmed</span>
        )}
        {project.workVersions[0]?.confirmed === true && (
          <span className="confirmedspan">confirmed</span>
        )}
      </div>
    </div>

    <div className={`df-c project--date version ${project.workVersions[1]?.confirmed === false ? "pending" : ""}`}>
      <div className="versioncontent">
        {project.workVersions[1]?.content ? (
          <>
            {project.workVersions[1].content}
            {auth?.user._id === client._id && project.workVersions[1]?.confirmed === false && (
              <div className="df">
                <div className="primary-btn b0">confirm</div>
              </div>
            )}
          </>
        ) : (
          auth?.user._id === project.freelancer && (
            <>
              <label htmlFor="doc1">
                <AiOutlineCloudUpload />
                <div>
                  <h4>Upload a file</h4>
                </div>
                <input type="file" id="doc1" name="doc" hidden />
              </label>
              <div className="df">
                <div className="primary-btn">confirm</div>
                <div className="danger-btn">cancel</div>
              </div>
            </>
          )
        )}
        {project.workVersions[1]?.confirmed === false && project.freelancer === auth?.user._id && (
          <span className="waitting">waiting to be confirmed</span>
        )}
        {project.workVersions[1]?.confirmed === true && (
          <span className="confirmedspan">confirmed</span>
        )}
      </div>
    </div>

    <div className={`df-c project--date version ${project.workVersions[2]?.confirmed === false ? "pending" : ""}`}>
      <div className="versioncontent">
        {project.workVersions[2]?.content ? (
          <>
            {project.workVersions[2].content}
            {auth?.user._id === client._id && project.workVersions[2]?.confirmed === false && (
              <div className="df">
                <div className="primary-btn">confirm</div>
              </div>
            )}
          </>
        ) : (
          auth?.user._id === project.freelancer && (
            <>
              <label htmlFor="doc2">
                <AiOutlineCloudUpload />
                <div>
                  <h4>Upload a file</h4>
                </div>
                <input type="file" id="doc2" onChange={handleFileChange} name="doc" hidden />
              </label>
              <div className="df">
                <div className="primary-btn" onClick={handleFileUpload}>confirm</div>
                <div className="danger-btn">cancel</div>
              </div>
            </>
          )
        )}
        {project.workVersions[2]?.confirmed === false && project.freelancer === auth?.user._id && (
          <span className="waitting">waiting to be confirmed</span>
        )}
        {project.workVersions[2]?.confirmed === true && (
          <span className="confirmedspan">confirmed</span>
        )}
        
      </div>
      
    </div>
      
  </>
)}
{
      auth?.user._id === client._id && 
      <div className="df-c project--date dfcenter version">  
        <div className="danger-btn w-100"
        onClick={() => {
          dispatch({ type: "OPEN_REPORT_MODAL", payload: project });
        }}
        >reclamation</div>
        <div className={`primary-btn w-100${(project.workVersions.length < 3) ? " err" : ""}`}>
payer</div>
        {
          auth.user._id === project.client && <span>to pay user , the three version of work should be accepted</span>
        }

      </div>
    }
{
      auth?.user._id === freelancer._id && 
      <div className="df-c project--date dfcenter">
        <div className="danger-btn"
        onClick={() => {
          dispatch({ type: "OPEN_REPORT_MODAL", payload: project });
        }}
        >report</div>

      </div>
    }

    </div>
        </div>
    }
    </>
  )
}

export default CurrentProject