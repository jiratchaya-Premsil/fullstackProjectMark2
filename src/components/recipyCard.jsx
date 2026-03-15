import React, {useState} from 'react';

export default function RecipeCard({ item, removecardFunc }) {
   const [open, setOpen] = useState(false);
const ingredientCount = item.product.ingredients?.length || 0;
  const calculatedHeight = ingredientCount * 24 + 40;
  const [checked, setChecked] = useState([]);

  const toggleIngredient = (ingredient) => {
    if (checked.includes(ingredient)) {
      setChecked(checked.filter((i) => i !== ingredient));
    } else {
      setChecked([...checked, ingredient]);
    }
  };

  const allChecked =
    checked.length === item.product.ingredients?.length;
  return (
        <div

        className = "w-full border-b-2 border-primary/50">
            <div className="flex items-center pr-4 flex justify-between hover:bg-primary/10 transition-all duration-300 "
             >
        <button className=" gap-2 flex w-full  px-4 py-3"
        onClick={() => setOpen(!open)}
       >
             <span className ="text-left">{allChecked && "✅ "}
{item.product.name}</span>
                <span>x{item.quantity}</span>
        </button>


      <button
          onClick={removecardFunc}
        className="text-primary hover:text-white hover:bg-primary p-1 rounded-md border border-primary transition-all duration-300 "
      >
        Remove
      </button>

    </div>
    <div
    style={{
          maxHeight: open ? `${calculatedHeight}px` : "0px",
        }}
        className={`
          overflow-hidden transition-all duration-300
        ${open ? "m-4 mt-0" : ""}
        `}
      >
        <p className="font-semibold mb-2">Ingredients</p>

        <ul className="list-disc pl-6 text-sm space-y-1">
          {item.product.ingredients?.map((ingredient, index) => (
            <li key={index} className ="flex gap-2">
                <input
              type="checkbox"
              checked={checked.includes(ingredient)}
              onChange={() => toggleIngredient(ingredient)}
            />

                {ingredient}
                </li>
          ))}
        </ul>
      </div>

        </div>

  );
}