import {Link, Outlet} from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';



const MainLayout = () => {
    const {darkMode, toggleTheme} = useTheme();

    return (
        <div className = "min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <nav className= "p-4 flex justify-between items-center border-b dark:border-gray-700">

                <div className= "space-x-4 flex items-center">
                    <Link to="/" className="hover:text-blue-500 transition duration-300" > Home</Link>


                    <button
  onClick={toggleTheme}
  className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>
                </div>
            </nav>
            <main className= "p-8"> <Outlet /></main>
           
        </div>
    )
}

export default MainLayout;