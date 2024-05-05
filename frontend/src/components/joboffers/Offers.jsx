import React, { useEffect, useState } from "react";
import "./offers.css";
import Loading from "../loading/Loading";
import { useOffersContext } from "../../hooks/useOffersContext";
import Comments from "../comments/Comments";
import MessageModal from "../messageModal/MessageModal";
import { useFetchData } from "../../hooks/useFetchData";
import OfferForm from "../add offer component/OfferForm";
import Offer from "../offer/Offer";
import ReportModal from "../reportModal/ReportModal";
function Offers() {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { dispatch, offers, commentsOpened, sendMessageModal,reportModal } = useOffersContext();
  const {loading, data} = useFetchData("http://localhost:5000/announcement")
  

 

  useEffect(() => {
    
    dispatch({ type: "SET_OFFERS", payload:data });
    
  }, [data, dispatch]);

  
  

  return (
    <div className="offers-container">
      {isOpenForm&& <OfferForm setIsOpenForm={setIsOpenForm}/>}
      <div className="add--offer " onClick={()=>setIsOpenForm(true)}>
        <div className="primary-btn">+</div>
      </div>
      {offers &&
        <div className="offers">
          {offers.map((offer) => (
            <Offer offer={offer} />
          ))}
          {commentsOpened && <Comments />}
          {sendMessageModal && <MessageModal />}
          {reportModal && (
        <ReportModal reportedObject={reportModal} type="announcement" />
      )}
        </div>}
        {loading && <><div><Loading /></div></>}
    </div>
  );
}

export default Offers;
