import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const LikeButton = ({ recipe }) => {
  const { user, toggleLikePost, isPostLiked } = useAuthStore();
  const navigate = useNavigate()
  const liked = isPostLiked(recipe.id);

  return (
    <button
      onClick={() => {
        if (!user) {
        navigate("/login");
        return;
      }
      toggleLikePost(recipe);
        }}
      className="text-xl"
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
};

export default LikeButton;