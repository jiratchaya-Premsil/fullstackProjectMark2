import {useState , useRef, useEffect} from "react";

export default function CommentItem({comment,addReply,updateRating, depth =0}) {
    const replyRef = useRef(null);
    const [showInput ,setShowInput] = useState(false);
    const [replyText, setreplyText] = useState("");
    const handleReply = () => {
    if (!replyText.trim()) return;

    addReply(comment.id, replyText);
    setreplyText("");
    setShowInput(false);
  };
  useEffect(() => {
  const handleClickOutside = (event) => {
    if (replyRef.current && !replyRef.current.contains(event.target)) {
      setShowInput(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
    return (
    <div
      className="my-2"
      style={{ marginLeft: depth * 20 }} // indentation
    >
        {depth === 0 && (
            <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map((star) => (
                <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                    comment.rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                    ★
                </span>
                ))}
            </div>
            )}
      <div className="p-3 border rounded bg-gray-100 dark:bg-gray-900">
        <p className = "font-light italic text-sm">{comment.user}</p>
        <p>{comment.text}</p>

        <button
          onClick={() => setShowInput(!showInput)}
          className="text-blue-500 text-sm mt-2"
        >
          Reply
        </button>

        {showInput && (
          <div  ref={replyRef} className="mt-2">
            <input
              value={replyText}
              onChange={(e) => setreplyText(e.target.value)}
              className="border p-1 mr-2"
            />
            <button
              onClick={handleReply}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add
            </button>
          </div>
        )}
      </div>

      {/* 🔥 RECURSION HAPPENS HERE */}
      {comment.replies.map((child) => (
        <CommentItem
          key={child.id}
          comment={child}
          addReply={addReply}
          updateRating={updateRating}
          depth={depth + 1}
        />
      ))}
    </div>
  );


}