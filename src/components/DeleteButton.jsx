import React from "react";
import deleteIcon from "/assets/images/icon-delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../reducers/rootReducer";
import clsx from "clsx";

const DeleteButton = (props) => {
  const { commentId, isReply, replyId } = props;
  const dispatch = useDispatch();
  const isDeleteButtonEnabled = useSelector(
      (state) => state.buttonActions.isDeleteButtonEnabled
    );
  const handleDeleteComment = () => {
    
    dispatch(
      deleteComment({
        commentId: commentId,
        isReply: isReply,
        replyId: replyId,
      })
    );
  };
  return (
    <div>
      <button
        className={
          // isDeleteButtonEnabled
          //   ? 
            clsx("buttons", "deleteButton")
            // : clsx("buttons", "disableDeleteButtons")
        }
        onClick={handleDeleteComment}
        // disabled={!isDeleteButtonEnabled}
      >
        <img
          style={{
            marginRight: "0.5rem",
          }}
          src={deleteIcon}
          alt="delete-icon"
        />
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
