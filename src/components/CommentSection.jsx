import { useState } from "react";
import CommentItem from "./commentIten";
import { useAuthStore } from "../store/useAuthStore";
import StarRating from "./StarRating";
import { set } from "react-hook-form";
export default function CommentSection() {
   const {user , logout} = useAuthStore()
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [rating, setRating] = useState(0)
  const addComment = (text) => {
  const newComment = {
    user: user.username,
    id: Date.now(),
    text,
    rating: rating,
    replies: [],
  };
setComments((prev) => [...prev, newComment]);


};
  const addReply = (parentId, text) => {
  const newReply = {
    user: user.username,
    id: Date.now(),
    text,
    replies: [],
  };

  const updateComments = (commentsList) => {
    return commentsList.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }

      return {
        ...comment,
        replies: updateComments(comment.replies),
      };
    });
  };

  setComments((prev) => updateComments(prev));
};



  const updateRating = (commentId, ratingValue) => {
  const updateComments = (commentsList) => {
    return commentsList.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          rating: ratingValue, // no mutation
        };
      }

      return {
        ...comment,
        replies: updateComments(comment.replies),
      };
    });
  };

  setComments((prev) => updateComments(prev));
};

  return (
    <div>
  <div className="mb-4">
    <StarRating rating={rating} setRating={setRating}/>
    <input
      type="text"
      placeholder="Write a comment..."
      value={newCommentText}
      onChange={(e) => setNewCommentText(e.target.value)}
      className="border p-2 mr-2 dark:bg-gray-800"
    />

    <button
      onClick={() => {
        if (!newCommentText.trim()) return;
        addComment(newCommentText);
        setNewCommentText("");
        setRating(0);
      }}
      className="bg-primary/90 transition-all duration-300 hover:bg-primary dark:bg-primary-dark/90 dark:hover:bg-primary-dark text-white px-3 py-1 rounded"
    >
      Create Comment
    </button>
  </div>

  {comments.map((comment) => (
    <CommentItem
      key={comment.id}
      comment={comment}
      addReply={addReply}
      updateRating={updateRating}
    />
  ))}
</div>
  );
}