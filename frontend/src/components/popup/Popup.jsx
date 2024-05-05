import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";

function Popup({ selectedpropositions, setselectedPropositions }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const ammount = selectedpropositions.announcementId.budgetMax * 1000;
  
  const handlePayment = async() => {
    try{
        setLoading(true);
        const response =await axios.post("http://localhost:5000/api/payer",{"amount":ammount});
        window.open(response.data.result.link, "_blank");
        setLoading(false);
    }
    catch(error){
        console.log(error);
        setLoading(false);
    }
  }

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
  };
  console.log(selectedpropositions);
  return (
    <motion.div
      className="proposition--popup notifications"
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="notification-header">
        <IoCloseOutline
          className="notification-close"
          onClick={() => {
            setselectedPropositions(false);
          }}
        />
      </div>
      <h4 className="title">
        {selectedpropositions.freelancer.name} sent you a proposition ti hire him to your "{selectedpropositions.announcementId.position}"
      </h4>
      <ul>
        <li>Choose payment method.</li>
        <li>{selectedpropositions.announcementId.budgetMax}DT will be transfered to our system.</li>
        <li>Your money remains safe; you can proceed or cancel the transaction.</li>
        <li>Track your project with a new link in the navigation bar.</li>
        <li>Stay updated with the freelancer's progress.</li>
        <li>Pay the freelancer upon satisfaction.</li>
        <li>Unsatisfied? Request a refund; our client service will handle it.</li>
        <li>Completed projects are visible on your profile for financial transparency.</li>
      </ul>
      <div className="df">
        <input type="checkbox" name="conditions" id="conditions" />
        <div className="checkmark"></div>
        <label htmlFor="conditions">I agree with those steps</label>
      </div>
      <div className=" spacer">
        <div className="df">

        <label htmlFor="payment">
          <div className={`center box--payment ${selectedPayment === "flouci" ? "checked" : ""}`}>
            <input
              type="radio"
              onChange={() => handlePaymentChange("flouci")}
              checked={selectedPayment === "flouci"}
              name="payment"
              id="payment"
            />
            <div className="df">
            <img src={require("../../img/flouci.png")} alt="" />
            <h4 className="center-text">flouci</h4>

            </div>
          </div>
        </label>
        <label htmlFor="paymentposte">
          <div className={`center box--payment ${selectedPayment === "poste" ? "checked" : ""}`}>
            <input
              type="radio"
              onChange={() => handlePaymentChange("poste")}
              checked={selectedPayment === "poste"}
              name="payment"
              id="paymentposte"
            />
            <div className="df">
            <img src={require("../../img/poste.jpg")} alt="" />
            <h4 className="center-text">poste</h4>

            </div>
          </div>
        </label>
        </div>
        <div className="df spacer">
            <div className={`primary-btn ${loading ? "err" : ""}`} onClick={handlePayment}>payer</div>
            <div className="danger-btn">cancel</div>

        </div>
      </div>
    </motion.div>
  );
}

export default Popup;
