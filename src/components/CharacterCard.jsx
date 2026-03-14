import React from 'react';
import { useState } from 'react';
const CharacterCard = ({ name }) => {
    const tablerandom = [
  { color: "#eb6ade", category: "sweets" },
  { color: "#60b8eb", category: "snacks" },
  { color: "#f0bc9e", category: "oatmeals" },
  { color: "#a29bfe", category: "smoothies" },
  { color: "#55efc4", category: "salads" },
  {color:"#d69636", category:"pancakes"},
  {color:"#eb8e79", category:"soups"},
  {color:"#81ecec", category:"sandwiches"},
  {color:"#fd79a8", category:"desserts"},
  {color:"#74b9ff", category:"drinks"},
  {color:"#e17055", category:"pastas"},
  {color:"#00cec9", category:"rice bowls"},
  {color:"#85b3c7", category:"breakfasts"},
  {color:"#636e72", category:"grills"},
  {color:"#7bbedb", category:"healthy meals"},
  {color:"#ff7675", category:"bbq"},
  {color:"#fdcb6e", category:"brunch"},
  {color:"#00b894", category:"vegan dishes"},
  {color:"#6c5ce7", category:"baked goods"},
  {color:"#0984e3", category:"seafood"}
];
const [random, setRandom] = useState(0);

  const randomfunc = () => {
    const randomIndex = Math.floor(Math.random() * tablerandom.length);
    setRandom(randomIndex);
  };

    return (
        <div className="flex flex-col gap-2 items-center justify-center"  >
            <h2 className='font-bold'>{name}</h2>

            <p > random recipy:</p>
            <p className= "px-3 py-1  w-fit rounded-sm font-bold transition-all duration-300"
             style = {{color: tablerandom[random].color}}>
             {tablerandom[random].category}
             </p>
            <button onClick={randomfunc}
            className = "rounded-md bg-primary px-4 py-2 text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 "> random pick</button>
        </div>
    );
};

export default CharacterCard;