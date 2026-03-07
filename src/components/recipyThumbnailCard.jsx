import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecipyThumbnail = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="break-inside-avoid overflow-hidden">

      {/* Skeleton */}
      {!loaded && (
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
      )}

      {/* Image */}
      <img
        src={data.image}
        alt={data.name}
        onLoad={() => setLoaded(true)}
        className={`w-full rounded-xl ${loaded ? "block" : "hidden"}`}
      />

      <div className="p-3">
        <p className="font-semibold">{data.name}</p>
      </div>

      <div className="w-full flex justify-between gap-4 items-start">
        <div className="flex flex-wrap gap-2">
          {data.tags &&
            data.tags.length > 0 &&
            data.tags.map((item, index) => (
              <p
                key={index}
                className="text-sm px-2 py-1 rounded-md border-2 border-primary bg-primary/10 dark:text-white dark:bg-primary/50 transition-colors duration-300"
              >
                {item}
              </p>
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