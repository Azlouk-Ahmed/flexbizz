import React from 'react'
import UserHeader from '../userheader/UserHeader'
import UserPortfolio from '../userPortfolio/UserPortfolio'
import { Link } from 'react-router-dom';
import { useOffersContext } from '../../hooks/useOffersContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

function Proposition({proposition, setselectedPropositions}) {
  const {auth} = useAuthContext();
  async function deleteElement(id) {
    if(auth) {
      try {
          const response = await axios.delete(`http://localhost:5000/proposition/${id}`, {
              headers: {
                  'Authorization': `Bearer ${auth.token}`
              }
          });
          console.log('Element deleted successfully');
          return response.data;
      } catch (error) {
          console.error('Error deleting element:', error.response ? error.response.data : error.message);
          throw error;
      }

    }
}
  const { dispatch } = useOffersContext();
  return (
    <div className="proposition">
        <h5><Link> {proposition.freelancer.name} </Link> asked you to hire him about your {proposition.announcementId.position} announcement</h5>
        <UserHeader user={proposition.freelancer}/>
        <div className="client-actions">
          <div className="primary-btn w-fc" onClick={()=>{setselectedPropositions(proposition)}}>hire</div>
          <div className="danger-btn w-fc" onClick={() => {
              dispatch({
                type: "DELETE_PROPOSITION",
                payload: proposition,
              });
              deleteElement(proposition._id);
            }}>remove</div>
          <div className="warning-btn w-fc" onClick={() => {
              dispatch({
                type: "OPEN_MESSAGE_MODAL",
                payload: proposition.freelancer._id,
              });
            }} >contact</div>
        </div>
        {proposition.portfolio && <UserPortfolio data={proposition.portfolio} />}
        {!proposition.portfolio && <div>this user have no portfolio</div>}
    </div>
  )
}

export default Proposition