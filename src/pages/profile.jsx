import React, { useState } from 'react';
import { useEffect } from 'react';
import RecipyThumbnail from '../components/recipyThumbnailCard';
import CharacterCard from '../components/CharacterCard';
import { useTheme } from '../context/ThemeContext';
import ColorPicker from '../components/ColorPicker';
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const {darkMode, toggleTheme} = useTheme();
 const {user , logout, likedPosts, myPost } = useAuthStore()
  const [currentpage, setCurrentPage] = useState("MyRecipy")
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);

        const handlelogout = () => {
       logout();
        navigate('/');
    }
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
    <div className="gap-2 fixed flex flex-col items-center flex-shrink-0 w-56 px-4 py-8">
      <img
        src="/defaultProfile.jpg"
        className="rounded-full h-48 w-48 object-cover"
      />
      <h2 className="mt-4 text-xl font-semibold">
        {user.username}
      </h2>
      <CharacterCard/>
      <ColorPicker/>

                    <button
  onClick={toggleTheme}
  className="flex px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>
{user?.role === 'admin' && (<Link to = "/admin-settings"
className = "p-2 bg-primary dark:bg-primary-dark rounded-md font-bold text-white">
      <button>
        Go to adminDashboard
      </button>
</Link>)}

<button onClick= {handlelogout}
className = "border border-primary border-2 hover:bg-primary/5 transition-all duration-300 p-2 py-1 rounded-md">Log out</button>
    </div>

    {/* RIGHT SIDE */}
    <div className="ml-60 flex-1">
      <div className="flex flex-row  mb-4 ">
        <button  className={
      `w-full text-center p-2 rounded transition  ${
        currentpage== "likePage"
          ? "bg-primary/40 "
          : "hover:bg-primary/10"
      }`
    }  onClick={() => setCurrentPage("likePage")}>Liked recipe</button>
        <button className={
      `w-full text-center p-2 rounded  transition  ${
        currentpage== "MyRecipy"
       ? "bg-primary/40 "
          : "hover:bg-primary/10"
      }`
    }
     onClick={() => setCurrentPage("MyRecipy")}>My recipe</button>
      </div>


      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{String(error)}</p>}
      {!loading && foods.length === 0 && (
        <p>No results found</p>
      )}
        {!loading &&
          likedPosts.length > 0 &&currentpage == "likePage"  &&
          likedPosts.map((item) => (
            <RecipyThumbnail key={item.id} data={item} />
          ))}
      </div>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{String(error)}</p>}
      {!loading && foods.length === 0 && (
        <p>No results found</p>
      )}
        {!loading &&
          myPost.length > 0 &&currentpage == "MyRecipy"  &&
          myPost.map((item) => (
            <RecipyThumbnail key={item.id} data={item} />
          ))}
      </div>
    </div>

  </div>
    );
}