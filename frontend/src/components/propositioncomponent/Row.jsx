import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useOffersContext } from '../../hooks/useOffersContext';
import { TbStar } from "react-icons/tb";
import { TbStarFilled } from "react-icons/tb";
import { useFetchData } from '../../hooks/useFetchData';

function Row({proposition, setselectedPropositions}) {
    const { dispatch } = useOffersContext();
    const {auth} = useAuthContext();
    const {data} = useFetchData("http://localhost:5000/achievements/freelancer/rate/"+proposition.freelancer._id);
    const stars = Array.from({ length: 5 }, (_, index) =>
        index < data?.avgRating ? <TbStarFilled /> : <TbStar />
    );
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
  return (
    <tr>
        <td><img src={proposition.freelancer.img} /></td>
        <td><Link to={"/profile/"+proposition.freelancer._id}>{proposition.freelancer.name} {proposition.freelancer.familyName} </Link></td>
        <td>
        {proposition.freelancer?.status === "hiring" &&<div className="status hiring"><div>is hiring </div><span className="hiring__circle"></span></div>}
                {proposition.freelancer?.status !== "hiring" &&<div className="status "><div>{proposition.freelancer?.status}</div><span className="status__available-circle"></span></div>}
        </td>
        <td>
        {
          stars
        }
        </td>
        <td>
            {proposition.announcementId.position} 
        </td>
        <td >
        <div className="df">
        <svg onClick={()=>{setselectedPropositions(proposition)}} className='cp' width="2rem" height="2rem" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 12.714C18.5 15.081 15.366 17 11.5 17C7.634 17 4.5 15.081 4.5 12.714C4.5 10.347 7.634 8.42896 11.5 8.42896C15.366 8.42896 18.5 10.347 18.5 12.714Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2501 12.714C13.2647 13.4249 12.8477 14.074 12.1951 14.3562C11.5424 14.6384 10.7839 14.4977 10.2759 14.0002C9.76792 13.5027 9.61148 12.7472 9.8801 12.0889C10.1487 11.4305 10.789 11.0001 11.5001 11C11.9594 10.9952 12.4019 11.1731 12.7301 11.4945C13.0583 11.816 13.2453 12.2546 13.2501 12.714V12.714Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.75 8.429C10.75 8.84321 11.0858 9.179 11.5 9.179C11.9142 9.179 12.25 8.84321 12.25 8.429H10.75ZM12.25 5C12.25 4.58579 11.9142 4.25 11.5 4.25C11.0858 4.25 10.75 4.58579 10.75 5H12.25ZM18.2931 7.05471C18.4813 6.68571 18.3347 6.23403 17.9657 6.04586C17.5967 5.85769 17.145 6.00428 16.9569 6.37329L18.2931 7.05471ZM15.5199 9.19129C15.3317 9.5603 15.4783 10.012 15.8473 10.2001C16.2163 10.3883 16.668 10.2417 16.8561 9.87271L15.5199 9.19129ZM6.04314 6.37329C5.85497 6.00428 5.40329 5.85769 5.03429 6.04586C4.66528 6.23403 4.51869 6.68571 4.70686 7.05471L6.04314 6.37329ZM6.14386 9.87271C6.33203 10.2417 6.78371 10.3883 7.15271 10.2001C7.52172 10.012 7.66831 9.5603 7.48014 9.19129L6.14386 9.87271ZM12.25 8.429V5H10.75V8.429H12.25ZM16.9569 6.37329L15.5199 9.19129L16.8561 9.87271L18.2931 7.05471L16.9569 6.37329ZM4.70686 7.05471L6.14386 9.87271L7.48014 9.19129L6.04314 6.37329L4.70686 7.05471Z" fill="#000000"/>
</svg>
            <svg onClick={() => {
              dispatch({
                type: "DELETE_PROPOSITION",
                payload: proposition,
              });
              deleteElement(proposition._id);
            }} width="1.5rem" className='cp' height="1.5rem" viewBox="0 0 24 24" fill="red"  xmlns="http://www.w3.org/2000/svg">
    <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg 
    onClick={() => {
        dispatch({
          type: "OPEN_MESSAGE_MODAL",
          payload: proposition.freelancer._id,
        });
    }
}
    width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M18 8L15.8411 9.79908C14.0045 11.3296 13.0861 12.0949 12 12.0949C11.3507 12.0949 10.7614 11.8214 10 11.2744M6 8L6.9 8.75L7.8 9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

        </div>
        </td>
    </tr>
  )
}

export default Row