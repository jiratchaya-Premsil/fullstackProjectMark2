import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function CreatePost() {
  const { createPost } = useAuthStore();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [instructions, setInstructions] = useState("");
     const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    createPost({
      name: title,
      image: image,
      tags: tags.split(",").map((t) => t.trim()),
      instructions: instructions.split("\n"),
    });

    setTitle("");
    setImage("");
    setTags("");
    setInstructions("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2"
      />
        <div className = "flex gap-2">
            Image:
            <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && <img src={image} className="w-40 rounded" />}

        </div>

      <input
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2"
      />

      <textarea
        placeholder="Instructions (one per line)"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border p-2"
      />

      <button className="bg-blue-500 text-white p-2 rounded">
        Create Post
      </button>
    </form>
  );
}