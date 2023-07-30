import { useState } from "react";
import MinusImage from "../images/icon-minus.svg";
import PlusImage from "../images/icon-plus.svg";
import ReplyImage from "../images/icon-reply.svg";
import Reply from "./Reply";
import DeleteIcon from "../images/icon-delete.svg";
import EditIcon from "../images/icon-edit.svg";
import { useSelector, useDispatch } from "react-redux";
import Replies from "./Replies";
import {
  setIsModalOpen,
  setCommentToDelete,
  updateComment,
} from "../features/comment";

function Comment({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const currentUser = useSelector((state) => state.comment.currentUser);
  const isAuthor = currentUser.username === comment.user.username;
  const dispatch = useDispatch();

  return (
    <>
      <div className="space-y-4">
        <div className="rounded-lg shadow-2xl p-5 bg-white flex flex-col gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <img src={comment.user.image.png} alt="" className="w-10 h-10" />
              <h1 className="text-darkBlue font-bold">
                {comment.user.username}
              </h1>
              <h2 className="text-grayishBlue">{comment.createdAt}</h2>
            </div>
            {!isEditing && (
              <p className="text-grayishBlue">
                {comment.replyingTo && (
                  <span className="text-moderateBlue font-semibold">
                    @{comment.replyingTo} &nbsp;
                  </span>
                )}

                {comment.content}
              </p>
            )}
            {isEditing && (
              <div className=" rounded-lg shadow-2xl p-5 bg-white flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Join the conversation"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-lightGray rounded-md px-5 py-2 pb-14"
                  />
                </div>
                <button
                  onClick={() => {
                    dispatch(
                      updateComment({
                        commentId: comment.id,
                        commentContent: editContent,
                      })
                    );
                    setIsEditing(false);
                  }}
                  className="bg-moderateBlue text-white rounded-lg px-4 py-2 w-min mx-auto"
                >
                  UPDATE
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="px-2 py-1 flex items-center justify-center gap-5 bg-lightGray rounded-md">
              <button>
                <img src={MinusImage} alt="" />
              </button>
              <span className="text-moderateBlue font-semibold">
                {comment.score}
              </span>
              <button>
                <img src={PlusImage} alt="" />
              </button>
            </div>
            {!isAuthor && (
              <button
                className="flex items-center gap-3"
                onClick={() => setIsReplying(!isReplying)}
              >
                <img src={ReplyImage} alt="" />
                <span className="text-moderateBlue font-semibold">Reply</span>
              </button>
            )}
            {isAuthor && (
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    dispatch(setCommentToDelete(comment.id));
                    dispatch(setIsModalOpen(true));
                  }}
                  className="flex items-center gap-3"
                >
                  <img src={DeleteIcon} alt="" />
                  <span className="text-softRed  font-semibold">Delete</span>
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-3"
                >
                  <img src={EditIcon} alt="" />
                  <span className="text-moderateBlue font-semibold">Edit</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <Replies replies={comment.replies} />

        {isReplying && (
          <Reply comment={comment} setIsReplying={setIsReplying} />
        )}
      </div>
    </>
  );
}

export default Comment;
