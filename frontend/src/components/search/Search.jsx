import React, { useEffect, useState } from 'react';
import "./search.css";
import { IoFilter } from "react-icons/io5";

function Search() {
  // State variables to store form values
  const [postedBy, setPostedBy] = useState('');
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


  // Event handlers for input fields
  const handlePostedByChange = (e) => {
    setPostedBy(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleOnPlatformChange = (e) => {
    setOnPlatform(e.target.checked);
  };

  const handleOnSiteChange = (e) => {
    setOnSite(e.target.checked);
  };

  const handleGovernmentChange = (e) => {
    setGovernment(e.target.value);
  };

  const handleFullTimeChange = (e) => {
    setFullTime(e.target.checked);
  };

  const handlePartTimeChange = (e) => {
    setPartTime(e.target.checked);
  };

  const handleHourlyChange = (e) => {
    setHourly(e.target.checked);
  };

  const handleContractChange = (e) => {
    setContract(e.target.checked);
  };

  const handleMinBudgetChange = (e) => {
    setMinBudget(parseInt(e.target.value, 10));
  };

  const handleMaxBudgetChange = (e) => {
    setMaxBudget(parseInt(e.target.value, 10)); 
  };

  useEffect(() => {
    if(minBudget > maxBudget) {
        setError("err");
    }
    if(minBudget < maxBudget) {
        setError("");
    }


  }, [minBudget,maxBudget])
  

  const handleExpiredChange = (e) => {
    setExpired(e.target.checked);
  };

  const handleAvailableChange = (e) => {
    setAvailable(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Posted by:", postedBy);
    console.log("Position:", position);
    console.log("Min Budget:", minBudget);
    console.log("Max Budget:", maxBudget);
    
  };

  return (
    <div className="search--container">
      <form onSubmit={handleSubmit}>
        <div className="filter">
          <span>filter</span><IoFilter />
        </div>
        <div>
          <div className="posted-by">
            posted by <input type="text" placeholder="enter username" id="postedBy" onChange={handlePostedByChange} value={postedBy} />
          </div>
          <div className="posted-by">
            position <input type="text" placeholder="enter position" id="position" onChange={handlePositionChange} value={position} />
          </div>

        </div>
        <div className="location">
          <hr />
          <div className="box--title">payment</div>
          <div className="input">
            <input type="checkbox" name="loc" id="loc1" onChange={handleOnPlatformChange} checked={onPlatform} />
            <div className="checkmark"></div>
            <label htmlFor="loc1">on platform</label>
          </div>
          <div className="input">
            <input type="checkbox" name="loc" id="loc2" onChange={handleOnSiteChange} checked={onSite} />
            <div className="checkmark"></div>
            <label htmlFor="loc2">on site</label>
          </div>
          {onSite && <div className="input">
            <label htmlFor="loc3">government</label>
            <select className="custom-select" id="loc3" onChange={handleGovernmentChange} value={government}>
              <option value="government1">government1</option>
              <option value="government2">government2</option>
              <option value="government3">government3</option>
            </select>
          </div>}
        </div>
        <div className="type">
          <hr />
          <div className="box--title">offer type</div>
          <div className="up">
            <div className="input">
              <input type="checkbox" name="type" id="type1" onChange={handleFullTimeChange} checked={fullTime} />
              <div className="checkmark"></div>
              <label htmlFor="type1">full-time</label>
            </div>
            <div className="input">
              <input type="checkbox" name="type" id="type2" onChange={handlePartTimeChange} checked={partTime} />
              <div className="checkmark"></div>
              <label htmlFor="type2">part-time</label>
            </div>
          </div>
          <div className="down">
            <div className="input">
              <input type="checkbox" name="type" id="type3" onChange={handleHourlyChange} checked={hourly} />
              <div className="checkmark"></div>
              <label htmlFor="type3">Hourly</label>
            </div>
            <div className="input">
              <input type="checkbox" name="type" id="type4" onChange={handleContractChange} checked={contract} />
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
            <input type="number" id="min" className={error} onChange={handleMinBudgetChange} value={minBudget} />
          </div>
          <div className="input">
            <label htmlFor="max">max</label>
            <input type="number" id="max" className={error} onChange={handleMaxBudgetChange} value={maxBudget} />
          </div>
        </div>
        <div className="offer-status">
          <hr />
          <div className="box--title">status</div>
          <div className="input">
            <input type="checkbox" name="status" id="status1" onChange={handleExpiredChange} checked={expired} />
            <div className="checkmark"></div>
            <label htmlFor="status1">expired</label>
          </div>
          <div className="input">
            <input type="checkbox" name="status" id="status2" onChange={handleAvailableChange} checked={available} />
            <div className="checkmark"></div>
            <label htmlFor="status2">available</label>
          </div>
        </div>
        <button className={"primary-btn "+error}>
          filter
        </button>
      </form>
    </div>
  );
}

export default Search;
