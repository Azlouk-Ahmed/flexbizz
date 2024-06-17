import React, { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFetchData";
import Loading from "../../components/loading/Loading";
import "./proposition.css";
import Popup from "../../components/popup/Popup";
import Error from "../../components/error/Error";
import MessageModal from "../../components/messageModal/MessageModal";
import { useOffersContext } from "../../hooks/useOffersContext";
import Row from "../../components/propositioncomponent/Row";
import Empty from "../../components/error/Empty";
import { useNavigate } from "react-router-dom";

function PropositionsPage() {
  const [selectedpropositions, setselectedPropositions] = useState(false);
  const { data, loading, error } = useFetchData(
    process.env.REACT_APP_API_URL+"/proposition"
  );
  const { sendMessageModal, dispatch, propositions } = useOffersContext();
  const navigate = useNavigate(); 
  const authLocal = JSON.parse(localStorage.getItem('auth'));

  useEffect(() => {
    if (!authLocal) {
        navigate("/login");
    }
  }, [authLocal, navigate]);
  useEffect(() => {
    dispatch({ type: "SET_PROPOSITIONS", payload: data });
  }, [data]);
  return (
    <div className="propositions">
      {selectedpropositions && (
        <Popup
          selectedpropositions={selectedpropositions}
          setselectedPropositions={setselectedPropositions}
        />
      )}
      {loading && <Loading />}
      {error && <Error error={error} />}
      {sendMessageModal && <MessageModal />}
      {propositions?.length === 0 && <Empty />}

      {propositions?.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>image</th>
              <th>full name</th>
              <th>Status</th>
              <th>rating</th>
              <th>position applied</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {propositions?.map((proposition) => (
              <Row
                setselectedPropositions={setselectedPropositions}
                proposition={proposition}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PropositionsPage;
