import React from 'react';
import { useState } from 'react';
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
                      <p  key={item.id} className = "text-sm px-2 py-1 rounded-md border-2 border-red-500 bg-red-50 dark:text-white dark:bg-red-950 transition-colors duration-300" >{item}</p>
                    ))}

        </div>
  <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-bold text-sm">
    View
  </button>
</div>
    </div>
    );
};

export default RecipyThumbnail;