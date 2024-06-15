import React, { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import "./currentProject.css"
import { IoLocation } from "react-icons/io5";
import { GiSuitcase } from "react-icons/gi";
import { SlWallet } from "react-icons/sl";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOffersContext } from '../../hooks/useOffersContext';
import { AiOutlineCloudUpload } from "react-icons/ai";
import ProjectChart from './ProjectChart';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; 
import LazyImage from '../lazyloadimg/LazyImage';
import { CiFileOn } from 'react-icons/ci';
function CurrentProject({ project, setopen }) {
  const { dispatch } = useOffersContext();
  const { auth } = useAuthContext();
  const { data: freelancer } = useFetchData("http://localhost:5000/user/" + project.freelancer);
  const { data: client } = useFetchData("http://localhost:5000/user/" + project.client);
  const { data: announcement } = useFetchData("http://localhost:5000/announcement/" + project.announcement);
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingFileUpload, setLoadingFileUpload] = useState(false);
const [loadingFileUpload1, setLoadingFileUpload1] = useState(false);
const [loadingFileUpload2, setLoadingFileUpload2] = useState(false);

const [loadingFileEdit, setLoadingFileEdit] = useState(false);
const [loadingFileEdit1, setLoadingFileEdit1] = useState(false);
const [loadingFileEdit2, setLoadingFileEdit2] = useState(false);

const [loadingFileConfirm1, setLoadingFileConfirm1] = useState(false);
const [loadingFileConfirm2, setLoadingFileConfirm2] = useState(false);
const [loadingFileConfirm3, setLoadingFileConfirm3] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
    console.log(file1);
  };
  const handleFileChange2 = (e) => {
    setFile2(e.target.files[0]);
    console.log(file2);
  };

  const handleFileUpload = async () => {
    setLoadingFileUpload(true);
    try {
      const formData = new FormData();
      formData.append('content', file.name);
      formData.append('file', file);
      console.log(formData);
  
      const response = await axios.post(`http://localhost:5000/projects/${project._id}/work-version`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
    } catch (error) {
      console.error('Error uploading file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error uploading file');
      setSuccess(false);
      setError(true);
    } finally {
      setLoadingFileUpload(false);
    }
  };
  
  const handleFileEdit = async () => {
    setLoadingFileEdit(true);
    try {
      const formData = new FormData();
      formData.append('content', file.name);
      formData.append('file', file);
      console.log(formData);
  
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File edited successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
    } catch (error) {
      console.error('Error editing file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error editing file');
      setSuccess(false);
      setError(true);
    } finally {
      setLoadingFileEdit(false);
    }
  };
  
  const handleFileEdit1 = async () => {
    setLoadingFileEdit1(true);
    try {
      const formData = new FormData();
      formData.append('content', file1.name);
      formData.append('file', file1);
      console.log(formData);
  
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/2`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
     
      
      
    } catch (error) {
      console.error('Error uploading file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error uploading file');
      setSuccess(false);
      setError(true);
    } finally {
      setLoadingFileEdit1(false);
    }
  };
  const handleFileEdit2 = async () => {
    setLoadingFileEdit2(true);
    try {
      const formData = new FormData();
      formData.append('content', file2.name);
      formData.append('file', file2);
      console.log(formData);
  
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
      
      
    } catch (error) {
      console.error('Error uploading file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error uploading file');
      setSuccess(false);
      setError(true);
    } finally {
      setLoadingFileEdit2(false);
    }
  };
  const handleFileUpload1 = async () => {
    setLoadingFileUpload1(true);
    try {
      const formData = new FormData();
      formData.append('content', file1.name);
      formData.append('file', file1);
      console.log(formData);
  
      const response = await axios.post(`http://localhost:5000/projects/${project._id}/work-version`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
      
      
    } catch (error) {
      console.error('Error uploading file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error uploading file');
      setSuccess(false);
      setError(true);
    }finally {
      setLoadingFileUpload1(false);
    }
  };
  const handleFileUpload2 = async () => {
    setLoadingFileUpload2(true);
    try {
      const formData = new FormData();
      formData.append('content', file2.name);
      formData.append('file', file2);
      console.log(formData);
  
      const response = await axios.post(`http://localhost:5000/projects/${project._id}/work-version`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
      
      
    } catch (error) {
      console.error('Error uploading file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error uploading file');
      setSuccess(false);
      setError(true);
    }finally {
      setLoadingFileUpload2(false);
    }
  };

  const confirmVersion1 = async () => {
    setLoadingFileConfirm1(true);
    try {
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/1/confirm`, {}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File confirmed successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
    } catch (error) {
      console.error('Error accepting file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error accepting file');
      setSuccess(false);
      setError(true);
    } finally {
      setLoadingFileConfirm1(false);
    }
  };

  const handleCurrentProjectStatusChange = async (projectId) => {
    try {
      const response = await axios.patch(`http://localhost:5000/projects/${projectId}/markAsDone`, {}, {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      });
      if (response.status === 200) {
        console.log("statuschanged");
      }
    } catch (error) {
      console.error("Error marking project as done:", error);
    }
  };
  

  const confirmVersion2 = async () => {
    setLoadingFileConfirm2(true);
    try {
  
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/2/confirm`, {}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);

      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
      
      
    } catch (error) {
      console.error('Error accepting file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error accepting file');
      setSuccess(false);
      setError(true);
    }finally {
      setLoadingFileConfirm2(false);
    }
  };

  const confirmVersion3 = async () => {
    setLoadingFileConfirm3(true);
    try {
  
      const response = await axios.put(`http://localhost:5000/projects/${project._id}/work-version/3/confirm`, {}, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${auth.token}`
        }
      });
  
      console.log('File uploaded successfully:', response.data);
      dispatch({ type: "CURRENT_PROJECT_UPDATE", payload: response.data.project });
      
      
    } catch (error) {
      console.error('Error accepting file:', error?.response?.data?.message);
      toast.error(error?.response?.data?.message || 'Error accepting file');
      setSuccess(false);
      setError(true);
    }finally {
      setLoadingFileConfirm2(false);
    }
  };
  
  return (
    <>
    <ToastContainer />
        {client && freelancer && announcement && <div className="df-c">
    <div className="current--project df">
    
        <div className="collabs">
            <div className="df">
                <LazyImage
            src={freelancer.img}
            alt=""
            className="client--img"
          />
                <LazyImage
            src={client.img}
            alt=""
            className="freelancer--img"
          />
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
      <a
                className="display-file"
                target='_blank'
                href={`http://localhost:5000/uploads/projectfiles/${project.workVersions[0].content}`}
                download
              >
                <CiFileOn /> {project.workVersions[0].content}
              </a>
        {auth?.user._id === client._id && project.workVersions[0]?.confirmed === false && (
          <div className="df">
            {!loadingFileConfirm1 &&<div className="primary-btn b0" onClick={confirmVersion1}>confirm</div>}
            {loadingFileConfirm1 && <div>processing ...</div>}
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
            <input type="file" id="doc0" onChange={handleFileChange} name="doc" hidden />
          </label>
          {file && file.name}
          <div className="df mtpx">
            {!loadingFileUpload &&<div className="primary-btn" onClick={handleFileUpload}>upload</div>}
            {loadingFileUpload &&<div>processing</div>}
            {project.workVersions[0]?.content && <div className="danger-btn">update</div>}
            {success && "success"}
          </div>
        </>
      )
    )}
    {project.workVersions[0]?.confirmed === false && project.freelancer === auth?.user._id && (
      <div className='df-c'>
        <span className="waitting">waiting to be confirmed</span>
        <label htmlFor="doc0">
            <AiOutlineCloudUpload />
            <div>
            </div>
            <input type="file" id="doc0" onChange={handleFileChange} name="doc" hidden />
          </label>
          <div className='primary-btn center p0' onClick={handleFileEdit}>update</div>
      </div>
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
                  <a
                className="display-file"
                target='_blank'
                href={`http://localhost:5000/uploads/projectfiles/${project.workVersions[1].content}`}
                download
              >
                <CiFileOn /> {project.workVersions[1].content}
              </a>
                  {auth?.user._id === client._id && project.workVersions[1]?.confirmed === false && (
                    <div className="df">
                      {!loadingFileConfirm2 &&<div className="primary-btn b0" onClick={confirmVersion2}>confirm</div>}
            {loadingFileConfirm2 && <div>processing ...</div>}
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
                      <input type="file" id="doc1" onChange={handleFileChange1} name="doc" hidden />
                    </label>
                    {file1 && file1.name}
                    <div className="df mtpx">
                    {!loadingFileUpload1 &&<div className="primary-btn" onClick={handleFileUpload1}>upload</div>}
            {loadingFileUpload1 &&<div>processing</div>}
                      {project.workVersions[1]?.content && <div className="danger-btn">update</div>}
                      {success && "success"}
                    </div>
                  </>
                )
              )}
              {project.workVersions[1]?.confirmed === false && project.freelancer === auth?.user._id && (
                <div className='df-c'>
                  <span className="waitting">waiting to be confirmed</span>
                  <label htmlFor="doc1">
                    <AiOutlineCloudUpload />
                    <div>
                    </div>
                    <input type="file" id="doc1" onChange={handleFileChange1} name="doc" hidden />
                  </label>
                  <div className='primary-btn center p0' onClick={handleFileEdit1}>update</div>
                </div>
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
                  <a
                className="display-file"
                target='_blank'
                href={`http://localhost:5000/uploads/projectfiles/${project.workVersions[2].content}`}
                download
              >
                <CiFileOn /> {project.workVersions[2].content}
              </a>
                  {auth?.user._id === client._id && project.workVersions[2]?.confirmed === false && (
                    <div className="df">
                      {!loadingFileConfirm3 &&<div className="primary-btn b0" onClick={confirmVersion3}>confirm</div>}
            {loadingFileConfirm3 && <div>processing ...</div>}
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
                      <input type="file" id="doc2" onChange={handleFileChange2} name="doc" hidden />
                    </label>
                    {file2 && file2.name}
                    <div className="df mtpx">
                    {!loadingFileUpload2 &&<div className="primary-btn" onClick={handleFileUpload2}>upload</div>}
            {loadingFileUpload2 &&<div>processing</div>}
                      {project.workVersions[2]?.content && <div className="danger-btn">update</div>}
                      {success && "success"}
                    </div>
                  </>
                )
              )}
              {project.workVersions[2]?.confirmed === false && project.freelancer === auth?.user._id && (
                <div className='df-c'>
                  <span className="waitting">waiting to be confirmed</span>
                  <label htmlFor="doc2">
                    <AiOutlineCloudUpload />
                    <div>
                    </div>
                    <input type="file" id="doc2" onChange={handleFileChange2} name="doc" hidden />
                  </label>
                  <div className='primary-btn center p0' onClick={handleFileEdit2}>update</div>
                </div>
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
        <div onClick={()=> {
          handleCurrentProjectStatusChange(project._id)
          setopen(project)
        }} className={`primary-btn w-100${(project.workVersions.length >= 3 && project.workVersions.every(version => version.confirmed)) ? "" : " err"}`}>
  payer
</div>

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