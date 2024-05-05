    import React, { useEffect, useState } from 'react'
    import { useFetchData } from '../../hooks/useFetchData'
    import Loading from '../../components/loading/Loading';
    import Proposition from '../../components/propositioncomponent/Proposition';
    import "./proposition.css"
import Popup from '../../components/popup/Popup';
import Error from '../../components/error/Error';
import MessageModal from '../../components/messageModal/MessageModal';
import { useOffersContext } from '../../hooks/useOffersContext';
import Row from '../../components/propositioncomponent/Row';
import Empty from '../../components/error/Empty';


    function PropositionsPage() {
        const [selectedpropositions, setselectedPropositions] = useState(false);
        const {data, loading, error} = useFetchData("http://localhost:5000/proposition");
        const {  sendMessageModal, dispatch, propositions } = useOffersContext();
        
        useEffect(()=>{
            dispatch({ type: "SET_PROPOSITIONS", payload:data });
        },[data])
    return (
        <div className="propositions">
                {selectedpropositions &&<Popup selectedpropositions={selectedpropositions} setselectedPropositions={setselectedPropositions}/>}
            {
                loading && <Loading />
            }
            {
                error && <Error error={error} />
            }
            {sendMessageModal && <MessageModal />}
            {
                propositions?.length === 0 && <Empty />
            }

            {
                propositions?.length > 0 && <table>
                <thead>
                  <tr>
                    <th>image</th>
                    <th>full name</th>
                    <th>Status</th>
                    <th>potfolio</th>
                    <th>position</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    propositions?.map((proposition) =>(
                        <Row setselectedPropositions={setselectedPropositions} proposition={proposition}/>
                    ))
                }
                </tbody>
              </table>
            }
            
        </div>
    )
    }

    export default PropositionsPage