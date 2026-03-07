import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import RecipyThumbnail from '../components/recipyThumbnailCard';
const Foodspage= () => {
     const [foods, setFoods] = useState([]);
const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const searchQuery = searchParams.get("search") || "";
    const handleSearch = (e) => {
  e.preventDefault();

  setSearchParams(
    searchTerm ? { search: searchTerm } : {}
  );
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

    // Filter using debounced value
    const filteredFoods = foods.filter((food) =>
  food.name.toLowerCase().includes(searchQuery.toLowerCase())
);
    return (
        <div className=" w-full h-full">
            <form onSubmit={handleSearch}>
  <input
    type="text"
    placeholder="Search food..."
    className="border p-2 rounded w-full mb-6"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</form>

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

    );
};

export default Foodspage;