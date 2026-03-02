import { useState } from "react";
import CommentItem from "./commentIten";

export default function CommentSection() {
  const [comments, setComments] = useState([
    {
      user:"user123",
        id: 1,
      text: "First comment",
      rating: 4,
      replies: [],
    },
  ]);

  const addReply = (parentId, text) => {
    const newComment = {
      user:"user1",
      id: Date.now(),
      text,
      replies: [],
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