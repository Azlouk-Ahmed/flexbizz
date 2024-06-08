import React, { useState } from 'react';
import axios from 'axios';
import "../messageModal/modal.css";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { useOffersContext } from '../../hooks/useOffersContext';
import { useAuthContext } from '../../hooks/useAuthContext';

function ReportModal({ reportedObject, type, against }) {
    const { auth } = useAuthContext();
    const { dispatch: dispatchModal } = useOffersContext();
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `http://localhost:5000/report/${against}`,
                { description: reason, about:type,elementReported: reportedObject },
                {
                    headers: {
                        'Authorization': `Bearer ${auth.token}`
                    }
                }
            );
            setResponse(response.data.message);
        } catch (error) {
            console.error('Error submitting report:', error);
            setError(error.response.data.error);
            // Optionally, you can handle error response here
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='overlay'>
            <motion.div
                initial={{ opacity: 0, translateY: -100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
                className="message-container report-container notifications"
            >
                <div>
                    You are about to send a report against {reportedObject?._id}, can you please tell us what's the reason?
                    <hr />
                </div>
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    cols="30"
                    rows="10"
                ></textarea>
                {error && <div className="error-message">{error}</div>}
                {!response &&<button className='primary-btn mt' onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>}
                {response && <div>{response}</div> }

                <MdOutlineCancel className='cancel' onClick={() => dispatchModal({ type: "OPEN_REPORT_MODAL", payload: false })} />
            </motion.div>
        </div>
    );
}

export default ReportModal;
