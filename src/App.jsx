import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import MainLayout from "./layouts/MainLayout";
import Foodspage from './pages/Foodspage'
import Profile from './pages/profile'

function App() {


  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Foodspage />} />
          <Route path="profile" element={<Profile/>}/>
        </Route>

      </Routes>
    </ThemeProvider>
  )
}

export default App
