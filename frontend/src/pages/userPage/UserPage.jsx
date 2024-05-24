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


function UserPage() {
    const { auth } = useAuthContext();
    const { loading, data, error } = useFetchData("http://localhost:5000/portfolio/user");
    
    const pdfExportComponent = useRef(null);
    const { sendMessageModal,commentsOpened, dispatch, offers, reportModal } =
    useOffersContext();
    const navigate = useNavigate();
    const authLocal = JSON.parse(localStorage.getItem('auth'));
    const [addportfolio, setaddportfolio] = useState(false);
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
    const { data: currentProjects } = useFetchData(
        "http://localhost:5000/projects/user/" + auth?.user._id
      );
      console.log("report modal",reportModal);
      const [open, setopen] = useState(false);
  return (
      <div className="profile ">
        {open && <Rating setopen={setopen}/>}
        {reportModal && <ReportModal reportedObject={reportModal} against={reportModal.freelancer} type={"reclamation"} />}
        {commentsOpened && <Comments />}
        {auth &&<div className="user-details">
            <div className="user--container">

             <UserHeader user={auth?.user} />
            </div>
            <Stats className="center" id={auth?.user._id}/>
            <div className="df center">
          <MyResponsiveBar />
          <Donut />
        </div>
            <div className="">
                <div className="one">
                    <h1>your portfolio</h1>
                </div>
                {data &&
                
                <div className="pdf--view">
                    <HiOutlineDownload onClick={exportPDF} />
                    <PDFExport ref={pdfExportComponent} fileName="portfolio.pdf" margin={{ top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }}>
                        <UserPortfolio data={data.portfolio} />
                    </PDFExport>
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
            currentProjects.map((project) => {
            return <CurrentProject key={project._id} setopen={setopen} project={project} />;
            })
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