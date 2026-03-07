import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import RecipeCard from './recipyCard';
const CardDrawer = () => {
    const [open, setOpen] = useState(false);
    const cart = useCartStore((state) => state.cart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const totalIngredients = cart.reduce((total, item) => {
  const ingredientCount = item.product.ingredients?.length || 0;
  return total + ingredientCount * item.quantity;
}, 0);
    return (
        <div
        className = "fixed z-50 transition-all duration-300 bottom-0 left-0 w-full sm:bottom-6 sm:right-6 sm:left-auto sm:w-80 bg-white rounded-md dark:bg-gray-800 dark:text-white border border-gray-200">
            <div
          className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 rounded-md
            ${open ? "border-b dark:border-gray-900" : ""}
            }`}
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium">Drawer</span>
          <div className = "flex gap-4">
            <span className="text-sm">Ingrident Count: {totalIngredients}</span>
          <button className="text-sm text-primary">
            {open ? "▼" : "▲"}
          </button>
          </div>

        </div>


          <div
            className={`bg-white  transition-all duration-300 dark:bg-gray-800 dark:text-white overflow-y-scroll overflow-hidden
            ${open ? "h-80" : "translate-y-0 h-0"}`}
          >
          {cart.map((item) => (
                  <div key={item.product.id} className="flex ">
                    <RecipeCard
                      item={item}
                      removecardFunc={() => removeFromCart(item.product.id)}
                    />
                  </div>
                ))}
            </div>

        </div>
    );
};

export default CardDrawer;