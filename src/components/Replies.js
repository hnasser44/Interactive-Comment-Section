import Comment from "./Comment";

const Replies = ({ replies }) => {
  return (
    <div className="space-y-4 border-l-2 pl-5 ml-7 border-l-lightGrayishBlue">
      {replies &&
        replies.map((reply) => <Comment comment={reply} key={reply.id} />)}
    </div>
  );
};

export default Replies;
