import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import UserHeader from '../../components/userheader/UserHeader';
import Stats from '../../components/stats/Stats';
import UserPortfolio from '../../components/userPortfolio/UserPortfolio';
import Empty from '../../components/error/Empty';
import Offer from '../../components/offer/Offer';
import { PDFExport } from '@progress/kendo-react-pdf';
import { HiOutlineDownload } from "react-icons/hi";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import "./profile.css"
import MessageModal from '../../components/messageModal/MessageModal';
import { useOffersContext } from '../../hooks/useOffersContext';
import { IoPersonRemove } from "react-icons/io5";
import { useAuthContext } from '../../hooks/useAuthContext';
import { ResponsivePie } from '@nivo/pie';
import { mockUserStats } from '../../data/mockdata';
import MyResponsiveBar from '../admindashboard/resopnsiveBar/MyResponsiveBar';
import Donut from "../../components/charts/Donut"
import ReportModal from '../../components/reportModal/ReportModal';
import Slider from '../../slider/Slider';



function ProfilePage() {
    const {auth} = useAuthContext();
    const {  sendMessageModal, dispatch , offers, reportModal } = useOffersContext();
    let { id } = useParams();
    const navigate = useNavigate();
    const exportPDF = () => {
        if(pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };
    const pdfExportComponent = useRef(null);
    const {data: freelancerRating} = useFetchData("http://localhost:5000/achievements/freelancer/"+id);
    console.log("freelancer", freelancerRating);
  const { data :offersData} = useFetchData("http://localhost:5000/announcement/createdby/"+id)

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    
    dispatch({ type: "SET_OFFERS", payload:offersData });
    
  }, [offersData, dispatch]);
  

  const {data} = useFetchData("http://localhost:5000/user/"+id);
  const { data: userPorfolio } = useFetchData("http://localhost:5000/portfolio/getuserportfolio/"+id);
  console.log(userPorfolio);
  
  return (
      <div className="page-gap">
    {sendMessageModal && <MessageModal />}
    {reportModal && (
        <ReportModal reportedObject={data} type="profile" />
    )}
    <div className="page--header">
    {
        data && <div className="actions-wrapper">
            <UserHeader user = {data} />
            <div className="df-c user-actions">
                <MdReportGmailerrorred

                onClick={() => {
                    dispatch({ type: "OPEN_REPORT_MODAL", payload: data });
                }}
                
                />
                {
                    auth.user.connections.some(connection => connection.userId === id) ? (
                    <IoPersonRemove className="sentreq" />
                    ) : (
                    <IoIosPersonAdd />
                    )
                }
                <AiOutlineMessage 
                onClick={() => {
                    dispatch({
                      type: "OPEN_MESSAGE_MODAL",
                      payload: id,
                    });
                }}
                />
            </div>
        </div>
    }
    <div className="df">
    <MyResponsiveBar />
    <Donut />
    </div>
    <Stats id = {id}/>
    
    </div>
    <div className="one">
        <h1>portfolio</h1>
    </div>
    <div className="portfolio">
        {
            userPorfolio?.portfolio != null && 
            <div className="pdf--view">
                    <div onClick={exportPDF} className="danger-btn">dowload <HiOutlineDownload  /></div>
                    
                    <PDFExport ref={pdfExportComponent} fileName="portfolio.pdf" margin={{ top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }}>
                        <UserPortfolio data= {userPorfolio?.portfolio} /> 
                    </PDFExport>
                </div>
        }
        {
            userPorfolio?.portfolio == null && <Empty />
        }

         

    </div>
    <div className="one">
        <h1>
            client ratings
        </h1>
    </div>
    {
        freelancerRating && freelancerRating.achievements.length > 0 && <Slider data = {freelancerRating.achievements} />

    }
    {
        freelancerRating && freelancerRating.achievements.length == 0 && <Empty />
    }
    <div className="one">
            <h1>anouncements as client</h1>
    </div>
        {offers &&
            <div className="offers">
            {offers.map((offer) => (
                <Offer offer={offer} />
            ))}
        </div>}
    </div>
  );
}

export default ProfilePage;
