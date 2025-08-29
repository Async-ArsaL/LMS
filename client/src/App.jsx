import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import AdminDashBoard from "./pages/AdminDashBoard";
import ProtectedRoute from "./Components/ProtectRoutes";
import StudentDashBoard from "./pages/StudentDashBoard";
import AdminControl from "./pages/AdminControl" 
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import CreateCourse from "./pages/CreateCourse";
import Payment from "./Components/Payment";
import OtpVerification from "./Components/Auth/OtpVerification";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          <Routes>
  {/* Public Routes */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Student Routes */}
  <Route 
    path="/studentDashboard" 
    element={<ProtectedRoute role="student"><StudentDashBoard /></ProtectedRoute>} 
  />
  <Route path="/courses" element={<ProtectedRoute role="student"><CourseList /></ProtectedRoute>} />
  <Route path="/pricing" element={<ProtectedRoute role="student"><Pricing/></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute role="student"><Profile/></ProtectedRoute>} />
  <Route path="/courseDetails" element={<ProtectedRoute role="student"><CourseDetails/></ProtectedRoute>} />
  <Route path="/payment" element={<ProtectedRoute role="student"><Payment/></ProtectedRoute>} />

  {/* Instructor Routes */}
  <Route 
    path="/createCourse" 
    element={<ProtectedRoute role="instructor"><CreateCourse /></ProtectedRoute>} 
  />
  <Route 
    path="/adminControl" 
    element={<ProtectedRoute role="instructor"><AdminControl /></ProtectedRoute>} 
  />

  {/* Admin Routes */}
  <Route 
    path="/adminDashboard" 
    element={<ProtectedRoute role="admin"><AdminDashBoard /></ProtectedRoute>} 
  />
  <Route 
    path="/adminControl" 
    element={<ProtectedRoute role="admin"><AdminControl /></ProtectedRoute>} 
  />


  {/* otp */}
  <Route path="/otpVerification" element={<OtpVerification/>} />
  


  {/* Unauthorized */}
  <Route path="/unauthorized" element={<h1 className="text-center mt-20 text-red-600 text-2xl">🚫 Unauthorized Access</h1>} />
</Routes>





        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
