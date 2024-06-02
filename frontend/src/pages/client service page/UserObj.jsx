import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

function UserObj({ id, collabs}) {
  const { data: user } = useFetchData(
    `http://localhost:5000/user/${id}`
  );
  return (
    <div className="userobjj">
      <div className="actimg df">
        <img src={user?.img} alt="" srcset="" />
      </div>
      {!collabs && <Link to={"/profile/" + user?._id}>
      &nbsp; &nbsp; &nbsp; 
        {user?.name} {user?.familyName}{" "}
      </Link>}
    </div>
  );
}

export default UserObj;
