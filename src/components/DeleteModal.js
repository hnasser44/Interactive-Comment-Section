import { useSelector, useDispatch } from "react-redux";
import { setIsModalOpen, deleteComment } from "../features/comment";

const DeleteModal = () => {
  const isModalOpen = useSelector((state) => state.comment.isModalOpen);
  const commentToDelete = useSelector((state) => state.comment.commentToDelete);
  const dispatch = useDispatch();
  return (
    <div
      className={`overlay fixed inset-0 ${
        isModalOpen ? "bg-black" : ""
      } bg-opacity-50 z-10`}
    >
      <dialog
        open
        className="space-y-3 fixed z-10 inset-0 overflow-y-auto w-[400px] p-6 shadow-2xl rounded-md"
      >
        <h1 className="font-bold text-xl">Delete comment</h1>
        <p className="text-grayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="space-x-5">
          <button
            onClick={() => dispatch(setIsModalOpen(false))}
            className="bg-darkBlue text-white px-4 py-3 rounded-lg"
          >
            NO, CANCEL
          </button>
          <button
            onClick={() =>
              dispatch(deleteComment({ commentId: commentToDelete }))
            }
            className="bg-softRed text-white px-4 py-3 rounded-lg"
          >
            YES, DELETE
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteModal;
