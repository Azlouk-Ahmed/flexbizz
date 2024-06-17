import React, { useState } from 'react';
import axios from 'axios';
import './rating.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchData } from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { createNotification } from '../../API/API';

function Rating({ setOpen, project }) {
  const [rating, setRating] = useState(1); 
  const [feedback, setFeedback] = useState('');
  const { auth } = useAuthContext();
  const { data: dataAnnouncement } = useFetchData(`${process.env.REACT_APP_API_URL}/announcement/${project.announcement}`);
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dataAnnouncement && auth) {
      const token = auth.token;
      const url = `${process.env.REACT_APP_API_URL}/achievements/${project.freelancer}`;
      const data = {
        announcementId: project.announcement,
        clientRating: rating,
        clientComment: feedback,
        budget: dataAnnouncement.budgetMax,
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        createNotification(
          project.freelancer,
          project._id,
          "apply",
          auth?.user.name,
          auth?.token,
          "you recieved an evaluation from "+auth?.user.name
        );
        navigate("/profile");
      } catch (err) {
        console.error('Error:', err.response ? err.response.data : err.message);
      }
    }
  };

  return (
    <div className='overlaymodal'>
      <form onSubmit={handleSubmit} className="ratingform df-c">
        <div className="title">Feedback</div>
        <div>How would you rate this freelancer?</div>
        <div className="containerrating">
          <div className="star-group">
            <input
              type="radio"
              className="star"
              id="one"
              name="star_rating"
              value="1"
              checked={rating === '1'}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              className="star"
              id="two"
              name="star_rating"
              value="2"
              checked={rating === '2'}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              className="star"
              id="three"
              name="star_rating"
              value="3"
              checked={rating === '3'}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              className="star"
              id="four"
              name="star_rating"
              value="4"
              checked={rating === '4'}
              onChange={handleRatingChange}
            />
            <input
              type="radio"
              className="star"
              id="five"
              name="star_rating"
              value="5"
              checked={rating === '5'}
              onChange={handleRatingChange}
            />
          </div>
        </div>
        <div>Your feedback</div>
        <textarea
          placeholder='Add your feedback'
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <button type="submit" className='primary-btn w-100'>Submit</button>
        <div className='danger-btn w-100' onClick={() => setOpen(false)}>Cancel</div>
      </form>
    </div>
  );
}

export default Rating;
