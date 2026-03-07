import { useState } from "react";
const PreferredRecipeCard = ({ item, isSelected, showonly }) => {
  return (
    <div
      className={`rounded-md flex flex-col gap-2 ${
        isSelected ? "border-2 border-primary" : "border border-gray-400"
      } ${showonly ? "" : "cursor-pointer"}`}
    >
      <img
        className="h-24 w-36 object-cover"
        src={item.image}
        alt={item.name}
      />

      <span className="flex justify-end font-bold p-2 pt-0">
        {item.name}
      </span>
    </div>
  );
};
export default PreferredRecipeCard;