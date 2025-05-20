import React from "react";
import "./css/StepCounter.css";
import iconMinus from "/assets/images/icon-minus.svg";
import iconPlus from "/assets/images/icon-plus.svg";
import { useDispatch, useSelector } from "react-redux";
import { manipulateScore } from "../reducers/rootReducer";

const StepCounter = (props) => {
  const dispatch = useDispatch();

  const { commentId, replyId, isReply } = props;
  const score = useSelector((state) => {
    let cId = state.comment.comments.filter((ele) => ele.id === commentId);
    if (Array.isArray(cId) && cId.length > 0) {
      if (isReply) {
        let reply = cId[0] && cId[0].replies.filter((repEle) => repEle.id === replyId);
        if (Array.isArray(reply) && reply.length > 0) {
          return reply[0].score;
        }
      } else return cId[0].score;
    }
  });

  const handleScoreIncrease = () => {
    dispatch(
      manipulateScore({
        operation: "+",
        commentId: commentId,
        replyId: replyId,
        isReply: isReply,
      })
    );
  };

  const handleScoreDecrease = () => {
    dispatch(
      manipulateScore({
        operation: "-",
        commentId: commentId,
        replyId: replyId,
        isReply: isReply,
      })
    );
  };
  return (
    <div className="stepCounterDiv">
      <button className="operationIcons" onClick={handleScoreIncrease}>
        <img src={iconPlus}></img>
      </button>
      <div className="score">{score}</div>
      <button
        className="operationIcons"
        onClick={handleScoreDecrease}
        disabled={score <= 0 ? true : false}
      >
        <img src={iconMinus}></img>
      </button>
    </div>
  );
};

export default StepCounter;
