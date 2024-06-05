import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFetchData } from "../../hooks/useFetchData";
import UserHeader from "../../components/userheader/UserHeader";
import Stats from "../../components/stats/Stats";
import UserPortfolio from "../../components/userPortfolio/UserPortfolio";
import Empty from "../../components/error/Empty";
import Offer from "../../components/offer/Offer";
import { PDFExport } from "@progress/kendo-react-pdf";
import { HiOutlineDownload } from "react-icons/hi";
import { MdReportGmailerrorred } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import "./profile.css";
import MessageModal from "../../components/messageModal/MessageModal";
import { useOffersContext } from "../../hooks/useOffersContext";
import { IoPersonRemove } from "react-icons/io5";
import { useAuthContext } from "../../hooks/useAuthContext";
import MyResponsiveBar from "../admindashboard/resopnsiveBar/MyResponsiveBar";
import Donut from "../../components/charts/Donut";
import ReportModal from "../../components/reportModal/ReportModal";
import Slider from "../../slider/Slider";
import CurrentProject from "../../components/cuurentProject/CurrentProject";
import Rating from "../../components/ratingform/Rating";
import "../userPage/userpage.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const { auth } = useAuthContext();
  const { sendMessageModal, dispatch, offers, reportModal } = useOffersContext();
  let { id } = useParams();
  const navigate = useNavigate();
  const exportPDF = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  const pdfExportComponent = useRef(null);
  const { data: freelancerRating } = useFetchData(
    "http://localhost:5000/achievements/freelancer/" + id
  );
  const { data: offersData } = useFetchData(
    "http://localhost:5000/announcement/createdby/" + id
  );

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (!auth) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch({ type: "SET_OFFERS", payload: offersData });
  }, [offersData, dispatch]);

  const { data } = useFetchData("http://localhost:5000/user/" + id);
  const { data: currentProjects } = useFetchData(
    "http://localhost:5000/projects/user/" + id
  );
  const { data: userPortfolio } = useFetchData(
    "http://localhost:5000/portfolio/getuserportfolio/" + id
  );
  const [open, setopen] = useState(false);
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (auth && auth.user) {
      setConnections(auth.user.connections);
    }
  }, [auth]);

  // Axios methods for connection requests
  const sendConnectionRequest = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/user/connection/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Connection request sent successfully");
      toast.success('request sent successfully');
      // Update local state
      setConnections((prev) => [...prev, { userId, status: 'pending' }]);
    } catch (error) {
      toast.error('Failed to send connection request');
      console.error("Failed to send connection request:", error);
    }
  };
  
  const removeConnection = async (userId) => {
    try {
      await axios.post(
        `http://localhost:5000/user/connections/remove/${userId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      toast.success('removed successfully');
      // Update local state
      setConnections((prev) => prev.filter((connection) => connection.userId !== userId));
    } catch (error) {
      console.error("Failed to remove connection:", error);
      toast.error('Failed to send connection request');
    }
  };

  return (
    <div className="page-gap">
      {open && <Rating setopen={setopen} project={open} />}
      {sendMessageModal && <MessageModal />}
      {reportModal && id && <ReportModal reportedObject={reportModal} against={id} type="profile" />}
      <div className="page--header">
      <ToastContainer />
        {data && (
          <div className="actions-wrapper">
            <UserHeader user={data} />
            <div className="df-c user-actions">
              <MdReportGmailerrorred
                onClick={() => {
                  dispatch({ type: "OPEN_REPORT_MODAL", payload: data });
                }}
              />
              {connections.some((connection) => connection.userId === id) ? (
                <IoPersonRemove onClick={() => removeConnection(id)} className="sentreq" />
              ) : (
                <IoIosPersonAdd onClick={() => sendConnectionRequest(id)} />
              )}
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
        )}
        <div className="df">
          <MyResponsiveBar />
          <Donut />
        </div>
        <Stats id={id} />
      </div>
      <div className="one">
        <h1>portfolio</h1>
      </div>
      <div className="portfolio">
        {userPortfolio?.portfolio != null && (
          <div className="pdf--view">
            <div onClick={exportPDF} className="danger-btn">
              download <HiOutlineDownload />
            </div>
            <PDFExport
              ref={pdfExportComponent}
              fileName="portfolio.pdf"
              margin={{
                top: "20mm",
                right: "20mm",
                bottom: "20mm",
                left: "20mm",
              }}
            >
              <UserPortfolio data={userPortfolio?.portfolio} userId={id} />
            </PDFExport>
          </div>
        )}
        {userPortfolio?.portfolio == null && <Empty />}
      </div>
      <div className="one">
        <h1>currently working on</h1>
      </div>
      {currentProjects?.length > 0 ? (
        currentProjects.map((project) => {
          return (
            <CurrentProject key={project._id} setopen={setopen} project={project} />
          );
        })
      ) : (
        <Empty />
      )}

      <div className="one">
        <h1>client ratings</h1>
      </div>
      {freelancerRating && freelancerRating.achievements.length > 0 && (
        <Slider data={freelancerRating.achievements} />
      )}
      {freelancerRating && freelancerRating.achievements.length == 0 && (
        <Empty />
      )}
      <div className="one">
        <h1>announcements as client</h1>
      </div>
      {offers && (
        <div className="offers">
          {offers?.map((offer) => (
            <Offer key={offer._id} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
