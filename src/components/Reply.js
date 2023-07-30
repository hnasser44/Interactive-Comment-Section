import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReply } from "../features/comment";

const Reply = ({ comment, setIsReplying }) => {
  const [replyContent, setReplyContent] = useState("");
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

  const handleReplyToReply = () => {
    const id = Math.floor(Math.random() * 1000000);
    const date = new Date();
    const reply = {
      id,
      content: replyContent,
      createdAt: getTimeDifferenceString(date),
      score: 0,
      replyingTo: comment.user.username,
      user: currentUser,
      replies: [],
    };
    dispatch(addReply({ commentId: comment.id, reply }));
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <div className="animate-fade-down rounded-lg shadow-2xl p-5 bg-white flex flex-col gap-4">
      <div className="flex gap-2">
        <img src={currentUser.image.png} alt="" className="w-10 h-10" />
        <input
          type="text"
          placeholder="Join the conversation"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          className="w-full bg-lightGray rounded-md px-5 py-2 pb-14"
        />
      </div>
      <button
        onClick={handleReplyToReply}
        className="bg-moderateBlue text-white rounded-lg px-4 py-2 w-min mx-auto"
      >
        REPLY
      </button>
    </div>
  );
};

export default Reply;
