import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Add axios for HTTP requests
import "./search.css";
import { IoFilter } from "react-icons/io5";
import { useOffersContext } from '../../hooks/useOffersContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function Search() {
  const {dispatch} = useOffersContext();
  const [position, setPosition] = useState('');
  const [onPlatform, setOnPlatform] = useState(false);
  const [onSite, setOnSite] = useState(false);
  const [government, setGovernment] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [partTime, setPartTime] = useState(false);
  const [hourly, setHourly] = useState(false);
  const [contract, setContract] = useState(false);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(0);
  const [expired, setExpired] = useState(false);
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (minBudget > maxBudget) {
      setError("Min budget should be less than max budget");
    } else {
      setError("");
    }
  }, [minBudget, maxBudget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/announcement/search', {
        position,
        onPlatform,
        onSite,
        government,
        fullTime,
        partTime,
        hourly,
        contract,
        minBudget,
        maxBudget,
        expired,
        available,
      });
  
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
      toast.error(error?.response?.data?.message || 'Failed searching data');
    }
  };

  useEffect(() => {
    
    dispatch({ type: "SET_OFFERS", payload:results });
    
  }, [results, dispatch]);
  
  console.log("offer after serch",results[0]);
  return (
    <div className="search--container">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="filter">
          <span>filter</span><IoFilter />
        </div>
        <div>
          <div className="posted-by">
            position <input type="text" placeholder="enter position" id="position" onChange={(e) => setPosition(e.target.value)} value={position} />
          </div>
        </div>
        <div className="location">
          <hr />
          <div className="box--title">payment</div>
          <div className="input">
            <input type="checkbox" name="loc" id="loc1" onChange={(e) => setOnPlatform(e.target.checked)} checked={onPlatform} />
            <div className="checkmark"></div>
            <label htmlFor="loc1">on platform</label>
          </div>
          <div className="input">
            <input type="checkbox" name="loc" id="loc2" onChange={(e) => setOnSite(e.target.checked)} checked={onSite} />
            <div className="checkmark"></div>
            <label htmlFor="loc2">on site</label>
          </div>
          {onSite && (
            <div className="input">
              <label htmlFor="loc3">government</label>
              <select className="custom-select" id="loc3" onChange={(e) => setGovernment(e.target.value)} value={government}>
                <option value="government1">government1</option>
                <option value="government2">government2</option>
                <option value="government3">government3</option>
              </select>
            </div>
          )}
        </div>
        <div className="type">
          <hr />
          <div className="box--title">offer type</div>
          <div className="up">
            <div className="input">
              <input type="checkbox" name="type" id="type1" onChange={(e) => setFullTime(e.target.checked)} checked={fullTime} />
              <div className="checkmark"></div>
              <label htmlFor="type1">full-time</label>
            </div>
            <div className="input">
              <input type="checkbox" name="type" id="type2" onChange={(e) => setPartTime(e.target.checked)} checked={partTime} />
              <div className="checkmark"></div>
              <label htmlFor="type2">part-time</label>
            </div>
          </div>
          <div className="down">
            <div className="input">
              <input type="checkbox" name="type" id="type3" onChange={(e) => setHourly(e.target.checked)} checked={hourly} />
              <div className="checkmark"></div>
              <label htmlFor="type3">Hourly</label>
            </div>
            <div className="input">
              <input type="checkbox" name="type" id="type4" onChange={(e) => setContract(e.target.checked)} checked={contract} />
              <div className="checkmark"></div>
              <label htmlFor="type4">Contract</label>
            </div>
          </div>
        </div>
        <div className="salary">
          <hr />
          <div className="box--title">budget</div>
          <div className="input">
            <label htmlFor="min">min</label>
            <input type="number" id="min" className={error ? 'error' : ''} onChange={(e) => setMinBudget(parseInt(e.target.value, 10))} value={minBudget} />
          </div>
          <div className="input">
            <label htmlFor="max">max</label>
            <input type="number" id="max" className={error ? 'error' : ''} onChange={(e) => setMaxBudget(parseInt(e.target.value, 10))} value={maxBudget} />
          </div>
        </div>
        <div className="offer-status">
          <hr />
          <div className="box--title">status</div>
          <div className="input">
            <input type="checkbox" name="status" id="status1" onChange={(e) => setExpired(e.target.checked)} checked={expired} />
            <div className="checkmark"></div>
            <label htmlFor="status1">expired</label>
          </div>
          <div className="input">
            <input type="checkbox" name="status" id="status2" onChange={(e) => setAvailable(e.target.checked)} checked={available} />
            <div className="checkmark"></div>
            <label htmlFor="status2">available</label>
          </div>
        </div>
        <button type="submit" className={"primary-btn " + (error ? 'error' : '')}>
          filter
        </button>
      </form>
    </div>
  );
}

export default Search;
