import { useState } from "react";
import CommentItem from "./commentIten";
import { useAuthStore } from "../store/useAuthStore";

export default function CommentSection() {
   const {user , logout} = useAuthStore()
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const addReply = (parentId, text) => {
    const newComment = {
      user:user,
      id: Date.now(),
      text,
      replies: [],
    };

    const addComment = (text) => {
  const newComment = {
    user: user,
    id: Date.now(),
    text,
    rating: 0,
    replies: [],
  };

  setComments((prev) => [...prev, newComment]);
};

    const updateComments = (commentsList) => {
      return commentsList.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newComment], // NO MUTATION
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
    <input
      type="text"
      placeholder="Write a comment..."
      value={newCommentText}
      onChange={(e) => setNewCommentText(e.target.value)}
      className="border p-2 mr-2"
    />

    <button
      onClick={() => {
        if (!newCommentText.trim()) return;
        addComment(newCommentText);
        setNewCommentText("");
      }}
      className="bg-blue-500 text-white px-3 py-1 rounded"
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