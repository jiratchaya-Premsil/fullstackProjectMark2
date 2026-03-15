import {Link, Outlet} from 'react-router-dom';
import CardDrawer from '../components/cardDrawer';
import { useState, useEffect } from 'react';
import {useAuthStore} from "../store/useAuthStore";

const MainLayout = () => {

    const {user} = useAuthStore();

    return (
        <div className = " min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center border-b
bg-white dark:bg-gray-900
dark:border-gray-700 transition-colors duration-300">

                <div className= "w-full space-x-4 flex items-center">
                    <Link to="/">
        <h1 className="text-xl font-bold w-max">FoodBoard 🍔</h1>
      </Link>


 <div className="flex w-full justify-end gap-2">
{user && (<Link to='/create'>
<button
       className = "px-4 py-2 bg-primary dark:bg-primary-dark rounded-md text-white">
        Create
        </button>
</Link>)}
{!user ?  (<Link to='/login'>
<button
       className = "px-4 py-2 bg-primary dark:bg-primary-dark rounded-md text-white">
        Login
        </button>
</Link>
):( <Link to="/profile"
     >
       <img src="/defaultProfile.jpg" className = " rounded-full h-10 w-10 object-cover">
       </img>
      </Link>)}



      </div>
                </div>

            </nav>
            <main className= "p-4 pt-20"> <Outlet /></main>
            {user && ( <CardDrawer/>)}

        </div>
    )
}

export default MainLayout;