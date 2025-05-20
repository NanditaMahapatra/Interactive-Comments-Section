import React, { useEffect, useRef, useState } from "react";
import "./css/UserComment.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  toggleReplyButton,
  addReplyToThread,
} from "../reducers/rootReducer";
import clsx from "clsx";

const UserComment = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.comment.currentUser);
  const { buttonText, commentId, username } = props;
  const [editableSpanContent, setEditableSpan] = useState("");
  const userCommentRef = useRef(null);
  const editableSpanRef = useRef(null);

  const handleSendReplies = (e) => {
    dispatch(
      addComment({
        content: editableSpanContent,
        user: currentUser,
        createdAt: "now",
        isUserComment: true,
      })
    );
    editableSpanRef.current.innerText = "";
    setEditableSpan("");
  };

  const handleUserReplies = () => {
    dispatch(
      addReplyToThread({
        commentId: commentId,
        content: editableSpanContent,
        user: currentUser,
        isUserComment: true,
        createdAt: "now",
        replyingTo: username,
      })
    );
    dispatch(toggleReplyButton({ clicked: false }));
    editableSpanRef.current.innerText = "";
    setEditableSpan("");
  };

  const handleInput = () => {
    // console.log(editableSpanRef);
    setEditableSpan(editableSpanRef.current?.innerText);
  };

  useEffect(() => {
    userCommentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className={
        buttonText === "REPLY"
          ? clsx('userCommentBox', 'userCommentBoxDynamic')
          : "userCommentBox"
      }
      ref={userCommentRef}
    >
      {currentUser.image && (
        <div className="avatarDiv">
          <img className="avatars" src={currentUser.image.png}></img>{" "}
        </div>
      )}
      <div
        className={buttonText === 'REPLY' ? clsx("userCommentInputDynamic","userCommentInput") : "userCommentInput"}
        style={{
          // border: "0.05rem solid black",
          color: "black !important",
          fontWeight: "normal",
        }}
      >
        {buttonText === "REPLY" && (
          <span
            style={{
              color: "hsl(238, 40%, 52%)",
              fontWeight: 700,
              padding: "0.5rem",
            }}
          >
            {"@" + username + " "}
          </span>
        )}
        <span
          className={buttonText === 'REPLY' ? clsx("editableSpan", "editableSpanDynamic"): "editableSpan"}
          suppressContentEditableWarning={true}
          contentEditable={true}
          onInput={handleInput}
          ref={editableSpanRef}
        >
          {""}
        </span>
      </div>

      <button
        className="sendButton"
        onClick={buttonText === "SEND" ? handleSendReplies : handleUserReplies}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default UserComment;
