import React, { useState } from 'react';
import { useEffect } from 'react';
import RecipyThumbnail from './components/recipyThumbnailCard';
import CharacterCard from './components/CharacterCard';
import ThemeToggle from './components/ThemeToggle';
export default function Profile() {
    const [currentpage, setCurrentPage] = useState("MyRecipy")
    const [foods, setFoods] = useState([]);

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

    const fetchFoods = async () => {
        try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/recipes");
        const data = await res.json();
        setFoods(data.recipes);
        } catch (err) {
        setError("Failed to fetch data");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div className="w-full flex flex-row ">

    {/* LEFT SIDE */}
    <div className=" fixed flex flex-col items-center flex-shrink-0 w-56 px-4 py-8">
      <img
        src="profile.png"
        className="rounded-full h-48 w-48 object-cover"
      />
      <h2 className="mt-4 text-xl font-semibold">
        Jiratchaya Premsil
      </h2>
      <CharacterCard/>
      
    </div>

    {/* RIGHT SIDE */}
    <div className="flex-1 p-4 pl-58">
      <div className="flex flex-row  mb-4 ">
        <button  className={
      `w-full text-center p-2 rounded transition  ${
        currentpage== "likePage"
          ? "bg-yellow-100 "
          : "hover:bg-yellow-50"
      }`
    }  onClick={() => setCurrentPage("likePage")}>Liked recipe</button>
        <button className={
      `w-full text-center p-2 rounded  transition  ${
        currentpage== "MyRecipy"
          ? "bg-yellow-100 "
          : "hover:bg-yellow-50"
      }`
    }
     onClick={() => setCurrentPage("MyRecipy")}>My recipe</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && foods.length === 0 && (
        <p>No results found</p>
      )}

      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {!loading &&
          foods.length > 0 &&
          foods.map((item) => (
            <RecipyThumbnail key={item.id} data={item} />
          ))}
      </div>
    </div>

  </div>
    );
}