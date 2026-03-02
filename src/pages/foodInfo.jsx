import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
export default function FoodInfo() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFood = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await res.json();
      setFood(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;
  if (!food) return null;

  return (
    <div className="w-full flex">

      {/* LEFT SIDE */}
      <div className="fixed flex flex-col gap-4 items-start w-56 p-2 md:w-80">
        <Link to="/">
          <button className="border text-primary border-primary hover:bg-primary/10 px-4 py-2 rounded transition">
            ← Back to Home
          </button>
        </Link>

        <img src={food.image} className="rounded-lg w-full " />
        <h2 className="text-xl font-semibold">{food.name}</h2>

        <div className="flex flex-wrap gap-2">
          {food.tags?.map((tag, index) => (
            <p
              key={index}
              className="text-sm px-2 py-1 rounded-md border-2 border-primary bg-primary/10 dark:bg-primary/50 transition"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="ml-56 flex-1 p-8 md:ml-80">
        <h1 className="text-2xl font-bold mb-4">Instructions</h1>

        {food.instructions?.map((step, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold">Step {index + 1}</h2>
            <p>{step}</p>
          </div>
        ))}

        <CommentSection/>
      </div>

    </div>
  );
}