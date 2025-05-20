import React, { useRef } from "react";
import "./css/UserInfoComp.css";
import ReplyButton from "./ReplyButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const UserInfoComp = (props) => {
  const {
    isUserComment,
    user,
    createdAt,
    replyId,
    isReply,
    commentId,
  } = props;

  return (
    <div className="userInfoDiv">
      <div
        // style={{
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   gap: "0.5rem"
        // }}
        className="userInfoDivStyle"
      >
        <img
          className="commentAvatars"
          src={user.image && user.image.png}
        ></img>
        <div style={{ fontWeight: "bold", color: "hsl(212, 24%, 26%)" }}>
          {user.username}
        </div>
        <div>{createdAt}</div>
      </div>
      <div>
        {isUserComment ? (
          <div style={{ display: "flex", gap : '0.5rem' }}>
            <DeleteButton
              commentId={commentId}
              isReply={isReply}
              replyId={replyId}
            />
            <EditButton
              commentId={commentId}
              isReply={isReply}
              replyId={replyId}
              setIsEdited={props.setIsEdited}
            />
          </div>
        ) : (
          <ReplyButton
            commentId={commentId}
            isReply={isReply}
            replyId={replyId}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoComp;
