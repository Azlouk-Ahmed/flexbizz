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
import Empty from "../error/Empty";
function Offers({admin}) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { dispatch, offers, commentsOpened, sendMessageModal,reportModal } = useOffersContext();
  const {loading, data} = useFetchData(process.env.REACT_APP_API_URL+"/announcement")
  

 

  useEffect(() => {
    
    dispatch({ type: "SET_OFFERS", payload:data });
    
  }, [data, dispatch]);

  
  if(offers) {
    console.log("offer before serch",offers[0]);

  }
  

  return (
    <div className="offers-container">
      {isOpenForm&& <OfferForm setIsOpenForm={setIsOpenForm}/>}
      {offers?.length>0 &&
        <div className="offers">
          {offers?.map((offer) => (
                admin === true && offer.status === false && <Offer key={offer.id} offer={offer} admin={admin} />
            ))}
          {offers?.map((offer) => (
                admin !== true && offer.status === true && <Offer key={offer.id} offer={offer} />
            ))}
          {commentsOpened && <Comments />}
          {sendMessageModal && <MessageModal />}
          {reportModal && (
        <ReportModal reportedObject={reportModal} type="announcement" />
      )}
        </div>}
        {
          offers?.length == 0 && <Empty className="annoucemnet-w" msg="no announcements found" />
        }
        {loading && <><div><Loading /></div></>}
    </div>
  );
}

export default Offers;
