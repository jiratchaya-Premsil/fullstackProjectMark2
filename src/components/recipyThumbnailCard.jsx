import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const RecipyThumbnail = ({ data }) => {


    return (
        <div className="break-inside-avoid  overflow-hidden ">
      <img src={data.image} alt="" className="w-full rounded-xl" />
      <div className="p-3">
        <p className="font-semibold">{data.name}</p>
      </div>
      <div className="w-full flex justify-between gap-4 items-start">
        <div className= "flex flex-wrap gap-2">
          {
                   data.tags && data.tags.length > 0 &&
                     data.tags.map((item) => (
                      <p  key={item.id} className = "text-sm px-2 py-1 rounded-md border-2 border-primary bg-primary/10 dark:text-white dark:bg-primary/50 transition-colors duration-300" >{item}</p>
                    ))}

        </div>
        <Link to={`/recipy/${data.id}`}>
 <button className="text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md font-bold text-sm transition-colors duration-300">
    View
  </button>

        </Link>

</div>
    </div>
    );
};

export default RecipyThumbnail;