import Comment from "./components/Comment";
import Send from "./components/Send";
import Replies from "./components/Replies";
import DeleteModal from "./components/DeleteModal";
import { useSelector } from "react-redux";

function App() {
  const comments = useSelector((state) => state.comment.comments);
  const isModalOpen = useSelector((state) => state.comment.isModalOpen);

  return (
    <main className="p-5">
      {isModalOpen && <DeleteModal />}
      <div className="animate-flip-down flex flex-col gap-3 md:w-[600px] mx-auto">
        {comments.map((comment) => (
          <div className="space-y-4" key={comment.id}>
            <Comment comment={comment} />
            <Replies />
          </div>
        ))}
        <Send />
      </div>
    </main>
  );
}

export default App;
