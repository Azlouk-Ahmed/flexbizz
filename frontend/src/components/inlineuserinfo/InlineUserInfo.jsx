import React from "react";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useFetchData } from "../../hooks/useFetchData";
import LazyImage from "../lazyloadimg/LazyImage";

function InlineUserInfo({user, showDate}) {

  const {data : userData } = useFetchData(`${process.env.REACT_APP_API_URL}/user/${user}`);
  
  return (
    <div className="profile-container al-i-center" key={userData?._id}>
      <div className="profile-img addjust-img">
        {/* <LazyImage
            src={userData?.img}
            alt=""
            className="notification-user-avatar"
          /> */}
          <img src={userData?.img} alt="" srcset="" />
      </div>
      <div className="user-info">
        <span>
          {userData?.name} {userData?.familyName}
        </span>
        {!showDate &&<span>
          <MdConnectWithoutContact /> {userData?.connections?.length} • <FcApproval />{" "}
          {userData?.badges?.length}
        </span>}
        {showDate &&<span className="createdat">
            {formatDistanceToNow(new Date(showDate), {
              addSuffix: true,
            })}
        </span>}
      </div>
      <hr />
    </div>
  );
}

export default InlineUserInfo;
