import React, { useEffect } from "react";
import data from "/public/assets/data";
import { useDispatch, useSelector } from "react-redux";
import { saveInitialState, toggleLoading } from "../reducers/rootReducer";
import UserComment from "./UserComment";
import CommentComp from "./CommentComp";

const MainComponent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.comment.currentUser);
  const comments = useSelector((state) => state.comment.comments);
  const loading = useSelector((state) => state.comment.loading);

  useEffect(() => {
    setTimeout(() => {
      dispatch(saveInitialState(data));
      dispatch(toggleLoading(false));
    }, 2000);
  }, []);
  return (
    <div className="layoutDiv">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <CommentComp comments={comments} />
          <div className="userCommentDiv">
            <UserComment currentUser={currentUser} buttonText = {"SEND"}/>
          </div>
        </>
      )}
    </div>
  );
};

export default MainComponent;
