import React from 'react';
import { useState } from 'react';
const RecipyThumbnail = ({ data }) => {


    return (
        <div className="break-inside-avoid  overflow-hidden ">
      <img src={data.image} alt="" className="w-full rounded-xl" />
      <div className="p-3">
        <p className="font-semibold">{data.name}</p>
      </div>
      <div className="w-full flex justify-end">
  <button className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-sm font-bold text-sm">
    View
  </button>
</div>
    </div>
    );
};

export default RecipyThumbnail;