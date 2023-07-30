import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addComment } from "../features/comment";

const Send = () => {
  const [commentContent, setCommentContent] = useState("");
  const currentUser = useSelector((state) => state.comment.currentUser);
  const dispatch = useDispatch();

  const getTimeDifferenceString = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = currentDate - createdDate;

    // Convert time difference to seconds, minutes, hours, days, weeks, or years
    const secondsDifference = timeDifference / 1000;
    if (secondsDifference < 60) {
      return `${Math.floor(secondsDifference)} seconds ago`;
    }

    const minutesDifference = secondsDifference / 60;
    if (minutesDifference < 60) {
      return `${Math.floor(minutesDifference)} minutes ago`;
    }

    const hoursDifference = minutesDifference / 60;
    if (hoursDifference < 24) {
      return `${Math.floor(hoursDifference)} hours ago`;
    }

    const daysDifference = hoursDifference / 24;
    if (daysDifference < 7) {
      return `${Math.floor(daysDifference)} days ago`;
    }

    const weeksDifference = daysDifference / 7;
    if (weeksDifference < 52) {
      return `${Math.floor(weeksDifference)} weeks ago`;
    }

    const yearsDifference = weeksDifference / 52;
    return `${Math.floor(yearsDifference)} years ago`;
  };

  const handleReplyToComment = () => {
    const id = Math.floor(Math.random() * 1000000);
    const date = new Date();
    const comment = {
      id,
      content: commentContent,
      createdAt: getTimeDifferenceString(date),
      scroe: 0,
      user: currentUser,
      replies: [],
    };
    dispatch(addComment(comment));
    setCommentContent("");
  };

  return (
    <div className=" rounded-lg shadow-2xl p-5 bg-white flex flex-col gap-4">
      <div className="flex gap-2">
        <img src={currentUser.image.png} alt="" className="w-10 h-10" />
        <input
          type="text"
          onChange={(e) => setCommentContent(e.target.value)}
          value={commentContent}
          placeholder="Join the conversation"
          className="w-full bg-lightGray rounded-md px-5 py-2 pb-14"
        />
      </div>
      <button
        onClick={handleReplyToComment}
        className="bg-moderateBlue text-white rounded-lg px-4 py-2 w-min mx-auto"
      >
        SEND
      </button>
    </div>
  );
};

export default Send;
