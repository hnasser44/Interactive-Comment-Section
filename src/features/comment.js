import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: data.comments,
    currentUser: data.currentUser,
    isModalOpen: false,
    commentToDelete: null,
  },
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    addReply: (state, action) => {
      const { commentId, reply } = action.payload;

      // Function to add a reply recursively
      const addReplyToComment = (commentId, comments, replyToAdd) => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: [...comment.replies, replyToAdd],
            };
          } else if (comment.replies && comment.replies.length > 0) {
            // Search for the comment in the replies recursively
            const newReplies = addReplyToComment(
              commentId,
              comment.replies,
              replyToAdd
            );
            return { ...comment, replies: newReplies };
          }
          return comment;
        });
      };

      // Search for the comment to add the reply
      const newComments = addReplyToComment(commentId, state.comments, reply);
      state.comments = newComments;
    },
    deleteComment: (state, action) => {
      const { commentId } = action.payload;

      // Function to delete a comment recursively
      const deleteCommentById = (commentId, comments) => {
        return comments.filter((comment) => {
          if (comment.id === commentId) {
            // Found the comment to delete, exclude it from the result
            return false;
          } else if (comment.replies && comment.replies.length > 0) {
            // Search for the comment in the replies recursively
            const newReplies = deleteCommentById(commentId, comment.replies);
            comment.replies = newReplies;
          }
          return true;
        });
      };

      // Delete the comment
      const newComments = deleteCommentById(commentId, state.comments);
      state.comments = newComments;
      state.isModalOpen = false;
    },
    updateComment: (state, action) => {
      const { commentId, commentContent } = action.payload;
      // Function to update a comment recursively
      const updateCommentById = (commentId, comments, commentContent) => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              content: commentContent,
            };
          } else if (comment.replies && comment.replies.length > 0) {
            // Search for the comment in the replies recursively
            const newReplies = updateCommentById(
              commentId,
              comment.replies,
              commentContent
            );
            return { ...comment, replies: newReplies };
          }
          return comment;
        });
      };
      // Update the comment
      const newComments = updateCommentById(
        commentId,
        state.comments,
        commentContent
      );
      state.comments = newComments;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setCommentToDelete: (state, action) => {
      state.commentToDelete = action.payload;
    },
  },
});

export const {
  addComment,
  addReply,
  deleteComment,
  setIsModalOpen,
  setCommentToDelete,
  updateComment,
} = commentSlice.actions;

export default commentSlice.reducer;
