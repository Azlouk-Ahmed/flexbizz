import React, { useState, useEffect } from "react";
import axios from "axios";
import "./comments.css";
import Loading from "../loading/Loading";
import { IoIosCloseCircleOutline } from "react-icons/io";
import InlineUserInfo from "../inlineuserinfo/InlineUserInfo";
import { motion } from "framer-motion"
import { useOffersContext } from "../../hooks/useOffersContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import { GoReport } from "react-icons/go";

function Comments() {
  const [loading, setLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const { dispatch, comments, commentsOpened } = useOffersContext();
  const { auth } = useAuthContext();
  console.log(commentsOpened);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/comment/announcement/${commentsOpened}`
        );
        dispatch({ type: "SET_COMMENTS", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };
    if(commentsOpened){
      fetchComments();
    }
  }, [commentsOpened, dispatch]);

  const addComment = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      };
      const response = await axios.post(
        `http://localhost:5000/comment/announcement/${commentsOpened}`,
        { content: commentContent },
        config
      );
      setCommentContent(""); 
      dispatch({ type: "ADD_COMMENT", payload: response.data });
    } catch (error) {
      console.error("Error adding comment:", error);
      setLoading(false);
    }
  };
  
  const deleteComment = async (commentId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth?.token}`
        }
      };
      const response = await axios.delete(
        `http://localhost:5000/comment/announcement/${commentsOpened}/${commentId}`,
        config
        );
        console.log(response.data);
        dispatch({ type: "DELETE_COMMENT", payload: response.data });
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
  };

  return (
    <div className="comments">
      <motion.div 
        initial={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5 }}
        className="comments-container"
      >
        <IoIosCloseCircleOutline onClick={() => dispatch({ type: "OPEN_COMMENTS_MODAL", payload: false })} className="close-modal" />
        {!loading && (
          <div className="comment">
            {comments.map((comment) => (
              <div key={comment._id}>
                <InlineUserInfo
                  user={comment.createdBy}
                  showDate={comment.createdAt}
                />
                <p>
                  {comment.content}
                  <div className="actions op">
                    {auth?.user._id === comment.createdBy._id && <AiOutlineDelete onClick={() => deleteComment(comment._id)} />}
                    <GoReport />
                  </div>
                </p>
              </div>
            ))}
            <div className="add-comment">
              <input
                type="text"
                name=""
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button className="primary-btn fc" onClick={addComment}>add comment</button>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </motion.div>
    </div>
  );
}

export default Comments;
