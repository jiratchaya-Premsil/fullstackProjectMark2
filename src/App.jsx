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

import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminSettings from './pages/AdminSettings'

function App() {


  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Foodspage />} />
           <Route path="/login" element={<Login />} />
          <Route path="profile" element={ <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Profile />
            </ProtectedRoute>}/>
          <Route path="/recipy/:id" element={<FoodinFo />} />
          <Route path="task-test" element={<TaskOrchestrator/>}/>

          <Route path="register" element={<FormLayout />}>
            <Route path="step-1" element={<Step1 />} />
            <Route path="step-2" element={<Step2 />} />
            <Route path="review" element={<Review  />} />

         </Route>



         <Route
          path="/admin-settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        </Route>

      </Routes>
    </ThemeProvider>
  )
}

export default App
