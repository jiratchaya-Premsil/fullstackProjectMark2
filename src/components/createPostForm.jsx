import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function CreatePost() {
  const { createPost } = useAuthStore();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngridents] = useState("")
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

    createPost({
      name: title,
      image: image,
      tags: tags.split(",").map((t) => t.trim()),
      instructions: instructions.split("\n"),
      ingredients:  ingredients.split(",").map((t) => t.trim())
    });

    setTitle("");
    setImage("");
    setTags("");
    setInstructions("");
    setIngridents("")
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 ">
      <p className ="font-bold">Title</p>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 dark:bg-gray-900"
      />

            <p className ="font-bold">Image</p>
            <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {image && (<img src={image} className="w-40 rounded" />)}


<p className ="font-bold">Tags (comma separated)</p>
      <input
        placeholder="cake, fluffy"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="border p-2 dark:bg-gray-900"
      />
      <p className ="font-bold">Ingridents (comma separated)</p>
      <input
        placeholder="2 eggs, 100ml of milk..."
        value={ingredients}
        onChange={(e) => setIngridents(e.target.value)}
        className="border p-2 dark:bg-gray-900"
      />
      <p className ="font-bold">Instructions (one per line)</p>
      <textarea
        placeholder="mix eggs, flour and milk"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        className="border p-2 dark:bg-gray-900"
      />

      <button className="bg-primary text-white p-2 rounded">
        Create Post
      </button>
    </form>
  );
}