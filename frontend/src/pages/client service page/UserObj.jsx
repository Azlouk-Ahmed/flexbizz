import React from "react";
import { useFetchData } from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

function UserObj({ id }) {
  const { data: user } = useFetchData(
    `http://localhost:5000/user/${id}`
  );
  return (
    <div className="df">
      <div className="actimg df">
        <img src={user?.img} alt="" srcset="" />
      </div>
      <Link to={"/profile/" + user?._id}>
        {" "}
        {user?.name} {user?.familyName}{" "}
      </Link>
    </div>
  );
}

export default UserObj;
