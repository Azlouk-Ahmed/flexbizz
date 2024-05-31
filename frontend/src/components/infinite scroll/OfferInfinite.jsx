import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOffersContext } from '../../hooks/useOffersContext';
import Offer from '../offer/Offer';
import ReportModal from '../reportModal/ReportModal';
import MessageModal from '../messageModal/MessageModal';
import Comments from '../comments/Comments';
import OfferForm from '../add offer component/OfferForm';

function OfferInfinite() {
    const { auth } = useAuthContext();
    const [isOpenForm, setIsOpenForm] = useState(false);
    const {  commentsOpened, sendMessageModal,reportModal, dispatch, offers } = useOffersContext();
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);
    const limit = 3;

    const fetchOffers = async () => {
        if (error) return;
        setError(null);

        try {
            const response = await axios.get(
                `http://localhost:5000/announcement/infinite?page=${page}&limit=${limit}`
            );

            if (response.data.offers.length === 0 || page >= response.data.totalPages) {
                setHasMore(false);
            } else {
                dispatch({ type: 'ADD_OFFERS', payload: response.data.offers });
                setPage((prevPage) => prevPage + 1);
            }
        } catch (err) {
            console.error('Error fetching offers:', err);
            setError('Error fetching offers');
        }
    };

    useEffect(() => {
        if(auth) {

            fetchOffers();
        }
    }, []);
    return (
        <div className='df-c'>
            {isOpenForm&& <OfferForm setIsOpenForm={setIsOpenForm}/>}
            <div className="df">
            add an announcement as client
            <div className="add--offer " onClick={()=>setIsOpenForm(true)}>
                <div className="primary-btn">+</div>
            </div>
            </div>
            {commentsOpened && <Comments />}
          {sendMessageModal && <MessageModal />}
          {reportModal && (
        <ReportModal reportedObject={reportModal} type="announcement" />)}
            {offers &&<InfiniteScroll
                dataLength={offers.length}
                next={fetchOffers}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more offers to display</p>}
            >
                {offers.map((offer) => (
                    <Offer key={offer._id} offer={offer} />
                ))}
            </InfiniteScroll>}
            {error && <p>{error}</p>}
        </div>
    );
}

export default OfferInfinite;
