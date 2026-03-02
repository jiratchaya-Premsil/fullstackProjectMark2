import {Link, Outlet} from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';



const MainLayout = () => {
    const {darkMode, toggleTheme} = useTheme();

    return (
        <div className = " min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <nav className="fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center border-b
bg-white dark:bg-gray-900
dark:border-gray-700 transition-colors duration-300">

                <div className= "w-full space-x-4 flex items-center">
                    <Link to="/">
        <h1 className="text-xl font-bold w-max">FoodBoard 🍔</h1>
      </Link>


 <div className="flex w-full justify-end">

        <Link to="/profile"
     >
       <img src="profile.png" className = " rounded-full h-10 w-10 object-cover">
       </img>
      </Link>
      </div>
                </div>

            </nav>
            <main className= "p-8 pt-24"> <Outlet /></main>

        </div>
    )
}

export default MainLayout;