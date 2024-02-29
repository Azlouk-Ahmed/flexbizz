import React from "react";
import { MdConnectWithoutContact } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function InlineUserInfo({user, showDate}) {
  return (
    <div className="profile-container al-i-center" key={user._id}>
      <div className="profile-img addjust-img">
        <img src={user.img} alt="" className="profilpic" />
      </div>
      <div className="user-info">
        <span>
          {user.name} {user.familyName}
        </span>
        {!showDate &&<span>
          <MdConnectWithoutContact /> {user.connections.length} • <FcApproval />{" "}
          {user.badges.length}
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
