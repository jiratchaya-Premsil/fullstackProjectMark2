import React from 'react';
import { Link } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
const Topbar = () => {
  return (
    <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 left-0 ">
      {/* Logo */}

      <Link to="/">
        <h1 className="text-xl font-bold">FoodBoard 🍔</h1>
      </Link>


      {/* Navigation */}
      <div className="hidden md:flex gap-6 font-medium">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">Recipes</a>
        <a href="#" className="hover:text-blue-500">About</a>
      </div>

      {/* Right Side */}
      <div className="flex">
        <ThemeToggle/>
        <Link to="/profile"
     >
       <img src="profile.png" className = " rounded-full h-10 w-10 object-cover">
       </img>
      </Link>
      </div>

    </div>
  );
};

export default Topbar;