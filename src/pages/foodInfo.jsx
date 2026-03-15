import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import CommentSection from "../components/CommentSection";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import LikeButton from '../components/likeButton'
import { useAuthStore } from "../store/useAuthStore";
export default function FoodInfo() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { myPost } = useAuthStore();
 const { id } = useParams();
 const localPost = myPost.find((p) => String(p.id) === String(id));

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };
const fetchFood = async () => {
  try {
    setLoading(true);
    setError(null);



    const res = await fetch(`https://dummyjson.com/recipes/${id}`);

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();
    console.log(res)
    console.log(data)
    if (!data || data.message) {
      console.log('got data')
      setFood(null);
      setError("Recipe not found");
      return;
    }
    setFood(data);
  } catch (err) {
    console.error(err);
    setError(err.message);
    setFood(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!id) return;

  // check zustand posts first
  const localPost = myPost.find((p) => String(p.id) === String(id));

  if (localPost) {
    setFood(localPost);
    return;
  }

  // otherwise fetch from API
  fetchFood();
}, [id, myPost]);

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">something went wrong : {String(error)} </p>;
  if (!food) return <p className="p-8 text-red-500">we cant find this recipy {String(error)} </p>;

  return (
    <div className="w-full flex flex-col md:flex-row">

  {/* LEFT SIDE */}
  <div className="flex flex-col gap-4 items-start w-full p-4
                  sm:fixed sm:w-80 overflow-y-auto">

    <button
      onClick={() => {handleGoBack()}}
      className="border text-primary border-primary hover:bg-primary/10 px-4 py-2 rounded transition"
    >
      ← Back to Home
    </button>

    <img src={food.image} className="rounded-lg w-full" />
    <h2 className="text-xl font-semibold">{food.name}
      <LikeButton recipe={food}/>
    </h2>

    {food?.author !== undefined && (
  <div>{food.author}</div>
)}


    {food.userId && (<div>
      User{food.userId}
    </div>)}
    <div className="flex flex-wrap gap-2">
      {food.tags?.map((tag, index) => (
        <p
          key={index}
          className="text-sm px-2 py-1 rounded-md border-2 border-primary bg-primary/10 dark:bg-primary/50"
        >
          {tag}
        </p>
      ))}
    </div>
    <div>
<button
        onClick={() => addToCart(food)}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Add to Cart
      </button>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="w-3/4 p-2
                  sm:ml-80 sm:p-8 flex flex-col gap-4">


    <h1 className="text-2xl font-bold mb-2 w-full">Ingridents</h1>
    <div className = "flex flex-row flex-wrap gap-2 w-full">
      {food.ingredients?.map((item, index) => (
      <div key={index} >
        <p className = "w-fit p-4 pr-8 rounded-md border border-gray-500 dark:border-white ">{index + 1}. {item}</p>
      </div>
    ))}
    </div>



    <h1 className="text-2xl font-bold ">Instructions</h1>

    {food.instructions?.map((step, index) => (
      <div key={index} >
        <h2 className="font-semibold w-fit">Step {index + 1}</h2>
        <p>{step}</p>
      </div>
    ))}

    <CommentSection />
  </div>

</div>
  );
}