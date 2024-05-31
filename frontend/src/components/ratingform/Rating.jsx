import React, { useState } from 'react';
import axios from 'axios';
import './rating.css';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFetchData } from '../../hooks/useFetchData';

function Rating({ setOpen, project }) {
  const [rating, setRating] = useState(1); 
  const [feedback, setFeedback] = useState('');
  const {auth } = useAuthContext();
  const {data: dataAnnoucement} = useFetchData("http://localhost:5000/announcement/"+project.announcement)

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  console.log(project);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(dataAnnoucement && auth) {

        const token = auth.token;
        const url = `http://localhost:5000/achievements/${project.freelancer}`;
        
        const data = {
            announcementId: project.announcement,
            clientRating: rating,
            clientComment: feedback,
            budget: dataAnnoucement.budgetMax, 
        };
        
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    console.log('Response:', response.data);
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
              checked={rating == '1'}
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
