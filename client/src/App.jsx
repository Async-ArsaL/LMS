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
import EmailVerify from "./Components/EmailVerify";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          {/* <EmailVerify /> */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/courses" element={<ProtectedRoute> <CourseList /> </ProtectedRoute>} />
            <Route path="/pricing" element={<ProtectedRoute> <Pricing/> </ProtectedRoute>} />
             <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
            <Route path="/courseDetails" element={<ProtectedRoute> <CourseDetails/> </ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute> <Profile/> </ProtectedRoute>} />
            <Route path="/adminDashboard" element={<ProtectedRoute> <AdminDashBoard/> </ProtectedRoute>} />
            <Route path="/studentDashBoard" element={<StudentDashBoard/>} />
            <Route path="/adminControl" element={<AdminControl/>} />
            <Route path="/CreateCourse" element={<CreateCourse/>} />
            <Route path="/EmailVerify" element={<EmailVerify/>} />


    
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
