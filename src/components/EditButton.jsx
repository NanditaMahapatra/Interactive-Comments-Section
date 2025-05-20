import editIcon from "/assets/images/icon-edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditButton } from "../reducers/rootReducer";
import clsx from "clsx";

const EditButton = (props) => {
  const dispatch = useDispatch();
  const isEditButtonClicked = useSelector(
    (state) => state.buttonActions.isEditButtonClicked
  );
  const { commentId, isReply, replyId } = props;
  const handleEditReplies = () => {
    dispatch(
      toggleEditButton({
        clicked: true,
        commentId: commentId,
        isReply: isReply,
        replyId: replyId,
      })
    );
    props.setIsEdited(true);
  };
  return (
    <div>
      <button
        className={
          !isEditButtonClicked
            ? clsx("buttons", "editButton")
            : clsx("buttons", "disableButtons")
        }
        disabled={isEditButtonClicked}
        onClick={handleEditReplies}
      >
        <img
          style={{
            marginRight: "0.5rem",
          }}
          src={editIcon}
          alt="edit-icon"
        />
        Edit
      </button>
    </div>
  );
};

export default EditButton;
