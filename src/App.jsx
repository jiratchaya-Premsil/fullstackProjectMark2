import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

import MainLayout from "./layouts/MainLayout";
import Foodspage from './pages/Foodspage'
import Profile from './pages/profile'
import FoodinFo from "./pages/foodInfo";
import TaskOrchestrator from "./pages/TaskOrchestrator";
import FormLayout from "./layouts/FormLayout";
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Review from './pages/Review'
import { useState,useEffect } from "react";




function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    console.log("logged!");
  };
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout isLoggedIn={isLoggedIn} />}>
          <Route index element={<Foodspage />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="/recipy/:id" element={<FoodinFo />} />
          <Route path="task-test" element={<TaskOrchestrator/>}/>

          <Route path="apply" element={<FormLayout />}>
            <Route path="step-1" element={<Step1 />} />
            <Route path="step-2" element={<Step2 />} />
            <Route path="review" element={<Review  login={login} />} />
         </Route>

        </Route>

      </Routes>
    </ThemeProvider>
  )
}

export default App
