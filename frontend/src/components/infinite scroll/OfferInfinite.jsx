import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOffersContext } from '../../hooks/useOffersContext';
import Offer from '../offer/Offer';
import ReportModal from '../reportModal/ReportModal';
import MessageModal from '../messageModal/MessageModal';
import Comments from '../comments/Comments';

function OfferInfinite() {
    
    const { auth } = useAuthContext();
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
                `${process.env.REACT_APP_API_URL}/announcement/infinite?page=${page}&limit=${limit}`
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
            
            {commentsOpened && <Comments />}
          {sendMessageModal && <MessageModal />}
          {reportModal && (
        <ReportModal reportedObject={reportModal} against={reportModal.createdBy} type="announcement" />)}
            {offers &&<InfiniteScroll
                dataLength={offers.length}
                next={fetchOffers}
                hasMore={hasMore}
                loader={<div class="laading"></div>}
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
