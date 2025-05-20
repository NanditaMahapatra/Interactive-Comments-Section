import React from 'react';
import replyIcon from '/assets/images/icon-reply.svg'
import { useDispatch, useSelector } from 'react-redux';
import {toggleReplyButton, toggleDeleteButton} from '../reducers/rootReducer'
import clsx from 'clsx';

const ReplyButton = (props) => {
  const dispatch = useDispatch();
  const isReplyButtonClicked = useSelector(state => state.buttonActions.isReplyButtonClicked);
  const {replyId, commentId, isReply} = props;
  const handleReplyButtonClick = () => {
    dispatch(toggleReplyButton({
      clicked : true,
      replyId : replyId,
      isReply : isReply,
      commentId : commentId
    }));
    dispatch(toggleDeleteButton(true))
  }
  return (
    <div className='userInfoChild'>
      <button className={isReplyButtonClicked ? clsx('buttons','disableButtons') : clsx('buttons','replyButton')} onClick={handleReplyButtonClick}
      disabled={isReplyButtonClicked}><img style={{
        marginRight:'0.5rem'
      }} src={replyIcon} alt="reply-icon" />Reply</button>
    </div>
  )
}

export default ReplyButton
