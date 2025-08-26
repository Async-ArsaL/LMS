import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import AdminDashBoard from "./pages/AdminDashBoard";
import ProtectedRoute from "./Components/ProtectRoutes";
import "./App.css";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/courses" element={<ProtectedRoute> <CourseList /> </ProtectedRoute>} />
            <Route path="/pricing" element={<ProtectedRoute> <Pricing/> </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
             <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
            <Route path="/signup" element={ <SignUp/>}/>
            <Route path="/courseDetails" element={<ProtectedRoute> <CourseDetails/> </ProtectedRoute>} />
            <Route path="/adminDashboard" element={<ProtectedRoute> <AdminDashBoard/> </ProtectedRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
