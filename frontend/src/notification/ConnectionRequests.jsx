import React from "react";
import { MdDone } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { MdClose } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { MdConnectWithoutContact } from "react-icons/md";
import { motion } from "framer-motion";

function ConnectionRequests({ setreqOpened, data }) {
  return (
    <motion.div
      className="notifications"
      initial={{ opacity: 0, translateX: 100 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="notification-header">
        <IoCloseOutline
          className="notification-close"
          onClick={() => setreqOpened(false)}
        />
      </div>
      <div className="connections">
        {data?.length > 0 ? (
          data?.map((user) => (
            <div className="profile-container" key={user?._id}>
              <div className="wrapper">
                <div className="notification-media">
                  <img
                    src={user?.img}
                    alt=""
                    className="notification-user-avatar"
                  />
                </div>
                <div className="user-info">
                  <span>
                    {user?.name} {user?.familyName}
                  </span>
                  <span>
                    <MdConnectWithoutContact /> {user?.connections?.length} •{" "}
                    <FcApproval /> {user?.badges?.length}
                  </span>
                  <span className="notification-timer">
                    {formatDistanceToNow(new Date(user?.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div className="operations">
                <MdDone />
                <MdClose />
              </div>
            </div>
          ))
        ) : (
          <p>no requests</p>
        )}
      </div>
    </motion.div>
  );
}

export default ConnectionRequests;
