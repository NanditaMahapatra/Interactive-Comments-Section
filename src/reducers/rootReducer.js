import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : true,
    currentUser : {},
    comments : []
}

const htmlState = {
    isEditButtonClicked : false,
    isDeleteButtonEnabled : false,
    isReplyButtonClicked : false,
    isUpdateButtonClicked : false,
    clickedCommentDetails : {
        commentId : -1,
        isReply : false,
        replyId : -1,
        username : undefined
    }
}

const htmlButtonsSlice = createSlice({
    name : 'buttonActions',
    initialState : htmlState,
    reducers : {
        toggleEditButton(state=htmlState, action){
            let {replyId, isReply, commentId, clicked} = action.payload;
            // console.log(action.payload)
            state.isEditButtonClicked  = clicked;
            if(clicked){
                state.clickedCommentDetails = {
                    commentId : commentId,
                    replyId : replyId,
                    isReply : isReply
                }
            }            
        },
        toggleDeleteButton(state, action){
            state.isDeleteButtonEnabled  = action.payload
        },
        toggleUpdateButton(state, action){
            state.isUpdateButtonClicked = action.payload;
        },
        toggleReplyButton(state, action){
            let {replyId, isReply, commentId, clicked} = action.payload;
            // console.log(clicked)
            state.isReplyButtonClicked  = clicked;
            if(clicked){
                state.clickedCommentDetails = {
                    commentId : commentId,
                    replyId : replyId,
                    isReply : isReply
                }
            }            
        }
    }
})

const commentsSlice = createSlice({
    name : 'comment', 
    initialState,
    reducers : {
        toggleLoading(state, action) {
            state.loading = action.payload;
        },
        addComment(state, action){
            let {content, user, createdAt, isUserComment} = action.payload;
            state.comments.push({
                id : state.comments[state.comments.length -1].id + 1,
                content : content,
                createdAt : createdAt,
                replies : [],
                score : 0,
                isDeleted : false,
                isUserComment : isUserComment,
                user : {
                    username : user.username,
                    image : {
                        png : user.image.png,
                        webp : user.image.webp
                    }
                }
            })
        },
        addReplyToThread(state, action){
            let {content, user, createdAt, isUserComment, commentId, replyingTo} = action.payload;
            state.comments.map((ele, index) => {
                if(ele.id === commentId){
                    let length = state.comments[index].replies.length;
                    state.comments[index].replies.push({
                        id : length === 0 ? 1 : state.comments[index].replies[length -1].id + 1,
                        content : content,
                        createdAt : createdAt,
                        replies : [],
                        score : 0,
                        isDeleted : false,
                        replyingTo : replyingTo,
                        isUserComment : isUserComment,
                        user : {
                            username : user.username,
                            image : {
                                png : user.image.png,
                                webp : user.image.webp
                            }
                        }
                    });
                }
            });
        },
        saveInitialState(state = initialState, action){
            state.currentUser = action.payload.currentUser;
            state.comments = action.payload.comments;
        },
        manipulateScore(state, action){
            let {commentId, replyId, isReply, operation} = action.payload;
            
                state.comments.forEach((comment, index) => {
                    if(comment.id == commentId){
                        if(isReply){
                            comment.replies.forEach((reply, i) => {
                                if(reply.id === replyId){
                                    if(operation === '+')
                                        state.comments[index].replies[i].score += 1;
                                    else
                                        state.comments[index].replies[i].score -= 1; 
                                }
                            })
                        }else {
                            if(operation === '+'){
                                state.comments[index].score += 1;
                            }else state.comments[index].score -= 1;
                        }
                    }
                })
        },
        deleteComment(state, action){
            let {commentId, replyId, isReply} = action.payload;
            
            state.comments.forEach((comment, index) => {
                if(comment.id == commentId){
                    if(isReply){
                        comment.replies.forEach((reply, i) => {
                            if(reply.id === replyId){
                                state.comments[index].replies[i].isDeleted = true;
                            }
                        })
                    }else {
                        state.comments[index].isDeleted = true;
                    }
                }
            })
        },updateCommentContent(state, action){
            let {content, commentId, replyId, isReply} = action.payload;
            state.comments.forEach((comment, index) => {
                if(comment.id == commentId){
                    if(isReply){
                        comment.replies.forEach((reply, i) => {
                            if(reply.id === replyId){
                                state.comments[index].replies[i].content = content;
                            }
                        })
                    }else {
                        state.comments[index].content = content;
                    }
                }
            })
        }
    }
})

export const {saveInitialState, manipulateScore, addComment, toggleLoading, deleteComment, addReplyToThread, updateCommentContent} = commentsSlice.actions;
export const {toggleDeleteButton, toggleReplyButton, toggleEditButton, toggleUpdateButton}  = htmlButtonsSlice.actions;
export const htmlReducer = htmlButtonsSlice.reducer;
export default commentsSlice.reducer; //as only one named export possible