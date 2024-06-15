import React,{useEffect, useRef, useState} from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import "./userpage.css"
import Donut from "../../components/charts/Donut"
import UserPortfolio from '../../components/userPortfolio/UserPortfolio';
import { useFetchData } from '../../hooks/useFetchData';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import { PDFExport } from '@progress/kendo-react-pdf';
import { HiOutlineDownload } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import UserHeader from '../../components/userheader/UserHeader';
import Stats from '../../components/stats/Stats';
import Empty from "../../components/error/Empty";
import Addportfolio from '../../components/userPortfolio/Addportfolio';
import MyResponsiveBar from '../admindashboard/resopnsiveBar/MyResponsiveBar';
import CurrentProject from '../../components/cuurentProject/CurrentProject';
import { useOffersContext } from '../../hooks/useOffersContext';
import Offer from '../../components/offer/Offer';
import Comments from "../../components/comments/Comments"
import ReportModal from '../../components/reportModal/ReportModal';
import Rating from '../../components/ratingform/Rating';
import axios from 'axios';
import EditPortfolio from '../../components/userPortfolio/EditPortfolio';


function UserPage() {
    const { auth } = useAuthContext();
    const { loading, data, error } = useFetchData("http://localhost:5000/portfolio/user");
    const { data: incodata } = useFetchData("http://localhost:5000/achievements/finances/"+auth?.user?._id);
    console.log("inc",incodata);
    const pdfExportComponent = useRef(null);
    const { currentProjects,commentsOpened, dispatch, offers, reportModal } =
    useOffersContext();
    const navigate = useNavigate();
    const authLocal = JSON.parse(localStorage.getItem('auth'));
    const [addportfolio, setaddportfolio] = useState(false);
    const [editportfolio, setEditPortfolio] = useState(false);
    const { data: offersData } = useFetchData(
        "http://localhost:5000/announcement/createdby/" + auth?.user._id
      );

      useEffect(() => {
        dispatch({ type: "SET_OFFERS", payload: offersData });
      }, [offersData, dispatch]);

    useEffect(() => {
        if (!authLocal) {
            navigate("/landing");
        }
    }, [authLocal, navigate]);

    const exportPDF = () => {
        if(pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    const { data: currentProjectsData } = useFetchData(
        "http://localhost:5000/projects/user/" + auth?.user._id
      );

      useEffect(() => {
        dispatch({ type: "CURRENT_PROJECTS", payload: currentProjectsData });
      

      }, [dispatch, currentProjectsData])
      
      const [open, setopen] = useState(false);
      const handleDelete = async () => {
        try {
            await axios.delete('http://localhost:5000/portfolio', {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting portfolio', error);
            alert('Failed to delete portfolio');
        }
    };
  return (
      <div className="profile ">
        {open && <Rating setOpen={setopen} project={open}/>}
        {reportModal && <ReportModal reportedObject={reportModal} against={reportModal.client} type={"reclamation"} />}
        {commentsOpened && <Comments />}
        {auth &&<div className="user-details">
            <div className="user--container">

             <UserHeader user={auth?.user} />
            </div>
            <Stats className="center" id={auth?.user._id}/>
            <div className="df center">
          <MyResponsiveBar />
          <Donut data={incodata} />
        </div>
            <div className="">
                <div className="one">
                    <h1>your portfolio</h1>
                </div>
                {data &&
                
                <div className="pdf--view">
                    <div className="df-c">
                    <div className="primary-btn w-100" onClick={exportPDF}>
                        download <HiOutlineDownload />

                    </div>
                    <div className="primary-btn w-100" onClick={handleDelete}>
                        delete

                    </div>
                    <div className="primary-btn w-100" onClick={()=>{setEditPortfolio(true); console.log(editportfolio)}}>
                        edit

                    </div>

                    </div>
                    <PDFExport ref={pdfExportComponent} fileName="portfolio.pdf" margin={{ top: '20mm', right: '90mm', bottom: '20mm', left: '90mm' }}>
                        <UserPortfolio data={data.portfolio} userId={auth.user._id} />
                    </PDFExport>
                    {editportfolio && <EditPortfolio  setEditPortfolio={setEditPortfolio} data={data?.portfolio} />}
                </div>
                }
                {
                loading && <Loading />
                }

                {
                error && 
                <div className="df-c">
                    <Empty/>
                    <div className="primary-btn center" onClick={()=>setaddportfolio(true)}>Add your portfolio</div>
                    {addportfolio && <Addportfolio  setaddportfolio={setaddportfolio} />}
                </div>
                }
            </div>

            <div className="one">
        <h1>currently working on</h1>
        </div>
        {currentProjects?.length > 0 ? (
    currentProjects.filter(project => !project.isDone).map((project) => (
                <CurrentProject key={project._id} setopen={setopen} project={project} />
            ))
        ) : (
            <Empty />
        )}
        <div className="one">
                <h1>anouncements as client</h1>
            </div>
        {offers && (
                <div className="offers center">
                {offers.map((offer) => (
                    <Offer offer={offer} />
                ))}
        </div>
      )}


        </div>}
        {!authLocal && <Error error={"please try to log in"} />}
    </div>
  )
}

export default UserPage