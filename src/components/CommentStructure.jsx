import React, { useEffect, useState, useRef } from "react";
import UserInfoComp from "./UserInfoComp";
import StepCounter from "./StepCounter";
import "./css/CommentStructure.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteButton,
  toggleEditButton,
  toggleUpdateButton,
  updateCommentContent,
} from "../reducers/rootReducer";
import clsx from "clsx";
const CommentStructure = (props) => {
  const {
    content,
    comment,
    commentId,
    replyId,
    isReply,
    isUserComment,
    repliedTo,
  } = props;

  const dispatch = useDispatch();
  const clickedCommentDetails = useSelector(
    (state) => state.buttonActions.clickedCommentDetails
  );

  const [isEdited, setIsEdited] = useState(false);
  const editFocusRef = useRef(null);
  const commentRef = useRef(null);

  useEffect(() => {
    if (isEdited) editFocusRef.current.focus();
  }, [isEdited]);

  useEffect(() => {
    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleEditUpdate = () => {
    let i = document.getElementById(
      "editContent-" + commentId + (isReply ? "-" + replyId : "")
    ).innerText;
    dispatch(
      updateCommentContent({
        content: i,
        commentId: commentId,
        isReply: isReply,
        replyId: replyId,
      })
    );
    dispatch(toggleUpdateButton(false));
    dispatch(toggleEditButton({ clicked: false }));
    setIsEdited(false);
  };
  return (
    <div
      className={
        isReply
          ? clsx("commentStructure", "replyBox")
          : clsx("commentStructure", "commentBox")
      }
      ref={commentRef}
    >
      <StepCounter
        score={comment && comment.score}
        commentId={commentId}
        replyId={replyId}
        isReply={isReply}
      />
      <div
        className={
          isReply
            ? clsx("commentInfoDiv", "replyInfoDiv")
            : clsx("commentInfoDiv", "commentInfoDivId")
        }
      >
        <div>
          <UserInfoComp
            user={comment.user}
            commentId={commentId}
            isReply={isReply}
            replyId={replyId}
            createdAt={comment.createdAt}
            isUserComment={isUserComment}
            comment={comment}
            setIsEdited={setIsEdited}
          />
        </div>
        <div className="contentDiv" ref={editFocusRef}>
          {isReply && (
            <span
              style={{
                color: "hsl(238, 40%, 52%)",
                // padding: "0.5rem",
                fontWeight: 700,
                // border: '1px solid black'
              }}
            >
              {"@" + repliedTo + " "}
            </span>
          )}

          <span
            contentEditable={
              isEdited &&
              (isReply
                ? clickedCommentDetails.commentId === commentId &&
                  clickedCommentDetails.replyId === replyId
                : clickedCommentDetails.commentId === commentId)
            }
            suppressContentEditableWarning={true}
            className={
              isReply
                ? clsx("editableSpan", "editableSpanForReplies")
                : clsx("editableSpan", "editableSpanComments")
            }
            id={"editContent-" + commentId + (isReply ? "-" + replyId : "")}
          >
            {content}
          </span>
        </div>
        {isEdited && (
          <button
            className={clsx("buttons", "updateButton")}
            onClick={handleEditUpdate}
          >
            UPDATE
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentStructure;
