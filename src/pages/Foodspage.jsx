import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import RecipyThumbnail from '../components/recipyThumbnailCard';
const recipeDictionary = [
  "Classic Margherita Pizza",
  "Chicken Biryani",
  "Beef and Broccoli Stir-Fry",
  "Chocolate Chip Cookies",
  "Chicken Alfredo Pasta",
  "Vegetable Stir-Fry",
  "Garlic Butter Shrimp Pasta",
  "Quinoa Salad with Avocado",
  "Caprese Salad",
  "Tomato Basil Bruschetta",
  "Chicken Tikka Masala",
  "Spaghetti Bolognese",
  "Beef Tacos",
  "Shrimp Fried Rice",
  "Pad Thai",
  "Chicken Caesar Salad",
  "Mushroom Risotto",
  "Pancakes",
  "French Toast",
  "Banana Bread",
  "Apple Pie",
  "Chocolate Cake",
  "Vanilla Cupcakes",
  "Greek Salad",
  "Grilled Cheese Sandwich"
];
const Foodspage= () => {
    const [foods, setFoods] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchQuery = searchParams.get("search") || "";
    const [showSuggestions, setShowSuggestions] = useState(false);
    const handleSearch = (e) => {
  e.preventDefault();

  setSearchParams(
    searchTerm ? { search: searchTerm } : {}
  );
   setShowSuggestions(false);
};
    const [debouncedSearch, setDebouncedSearch] = useState("");
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

    // ⏳ Debounce effect (wait 500ms after typing stops)
    useEffect(() => {
        const timer = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);
    const suggestions =
  debouncedSearch.length > 0
    ? recipeDictionary
        .filter((word) =>
          word.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
        .slice(0, 7)
    : [];
    // Filter using debounced value
    const filteredFoods = foods.filter((food) =>
  food.name.toLowerCase().includes(searchQuery.toLowerCase())
);
    return (
        <div className={
      ` w-full h-full`} >
         <div className="sticky top-[65px] z-20 flex justify-center ">
           <form onSubmit={handleSearch } className={
      `w-full md:w-1/2 pb-2 `
      }>
  <input
    type="text"
    placeholder="Search food..."
    className="border p-2 rounded w-full dark:bg-gray-900"
    value={searchTerm}
    onChange={(e) => {
        setShowSuggestions(true);
      setSearchTerm(e.target.value)}}
  />

  {showSuggestions && suggestions.length > 0 && (
    <ul className="absolute bg-white dark:bg-gray-900 border w-full md:w-1/2 rounded shadow">
      {suggestions.map((word, index) => (
        <li
          key={index}
          className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex gap-4 w-full md:w-1/2"
          onClick={() => {
            setSearchTerm(word);
            setSearchParams({ search: word });
            setShowSuggestions(false);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

          {word}
        </li>
      ))}
    </ul>
  )}
</form>
        </div>

      <div className = "">


      {/* ⏳ Loading */}
      {loading && <p className="">Loading...</p>}

      {/* ❌ Error */}
      {error && <p className="text-red-500">{String(error)}</p>}

      {/* 🚫 No Results */}
      {!loading && filteredFoods.length === 0 && (
        <p>No results found for "{searchTerm}"</p>
      )}
             <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
        {!loading &&
          filteredFoods.length > 0 &&
          filteredFoods.map((item) => (
            <RecipyThumbnail key={item.id} data={item} />
          ))}
          </div>
        </div>
      </div>

    );
};

export default Foodspage;