import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "./Comment";

const Comments = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comment.length > 200) {
        return;
      }
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);

        toast.success("Comment created");
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/get-post-comments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
          setCommentError(null);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="mx-auto max-w-2xl p-3 w-full">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed as:</p>
          <img
            className="w-5 h-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt=""
          />
          <Link
            className="text-cyan-600 text-xs hover:underline"
            to={`/dashboard?tab=profile`}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-3 my-5 items-center text-sm">
          <p className="text-teal-950 ">You must sign in to comment.</p>
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-sm text-gray-400">
              {200 - comment.length} characters remaining
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
