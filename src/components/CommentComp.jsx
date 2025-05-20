import React from "react";
import "./css/CommentComp.css";
import CommentStructure from "./CommentStructure";
import { useSelector } from "react-redux";
import UserComment from "./UserComment";

const CommentComp = (props) => {
  const { comments } = props;
  const isReplyButtonClicked = useSelector(
    (state) => state.buttonActions.isReplyButtonClicked
  );
  const clickedCommentDetails = useSelector(state => state.buttonActions.clickedCommentDetails);
// console.log("comments : " , clickedCommentDetails, isReplyButtonClicked )
  const getComments = comments.map((comment, index) => {
    if (!comment.isDeleted) {
      return (
        <div className="replyDiv" key={"CommentsDiv:" + index}>
          <CommentStructure
            content={comment.content}
            commentId={comment.id}
            comment={comment}
            isReply={false}
            isUserComment={comment.isUserComment === undefined ? false : true}
            repliedTo = {false}
          />
          <div
            // style={{
            //   paddingLeft: "5rem",
            //   borderLeft: "0.1rem solid hsl(223, 19%, 93%)",
            // }}
            className="repliesDiv"
          >
            {comment.replies.length > 0 &&
              comment.replies.map((reply, index) => {
                if (!reply.isDeleted) {
                  return (
                    <div
                      key={"ReplyComment:" + index}
                      className="replyStructure"
                    >
                      <CommentStructure
                        content={reply.content}
                        commentId={comment.id}
                        replyId={reply.id}
                        isReply={true}
                        comment={reply}
                        isUserComment={
                          reply.isUserComment === undefined ? false : true
                        }
                        repliedTo = {reply.replyingTo}
                      />
                    </div>
                  );
                }
              })}
            {isReplyButtonClicked && comment.id === clickedCommentDetails.commentId && (
              <>
                <UserComment buttonText={'REPLY'} username = {clickedCommentDetails.isReply ? comment.replies.filter(reply => reply.id === clickedCommentDetails.replyId)[0].user.username : comment.user.username} commentId = {comment.id}/>
              </>
            )}
          </div>
        </div>
      );
    }
  });

  return <div className="commentsDiv">{getComments}</div>;
};

export default CommentComp;
