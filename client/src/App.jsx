import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./Components/Header";
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import Payment from "./Components/Payment";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";
import AdminDashBoard from "./pages/AdminDashBoard";
import ProtectedRoute from "./Components/ProtectRoutes";
import StudentDashBoard from "./pages/StudentDashBoard";
import AdminControl from "./pages/AdminControl";
import ApprovalDashboard from "./pages/ApprovalDashboard";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import CreateCourse from "./pages/CreateCourse";
import OtpVerification from "./Components/Auth/OtpVerification";
import "./App.css";

// ⚠️ Custom component to handle auto logout on login/signup page
const AuthRedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If logged in, and accessing /login or /signup, logout first
    if (
      token &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      localStorage.clear();
      navigate("/login");
    }
  }, [location]);

  return null;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="min-h-screen bg-gray-50">
          <AuthRedirectHandler /> {/* 👈 this handles forced logout */}
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Student Routes */}
            <Route
              path="/studentDashboard"
              element={
                <ProtectedRoute role="student">
                  <StudentDashBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute role="student">
                  <CourseList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approvalDashboard"
              element={
                <ProtectedRoute role="principal">
                  <ApprovalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <ProtectedRoute role="student">
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="student">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courseDetails/:id"
              element={
                <ProtectedRoute role="student">
                  <CourseDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute role="student">
                  <Payment />
                </ProtectedRoute>
              }
            />

            {/* Instructor + Admin */}
            <Route
              path="/createCourse"
              element={
                <ProtectedRoute roles={["instructor", "admin"]}>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />

            {/* Admin Only */}
            <Route
              path="/adminControl"
              element={
                <ProtectedRoute role="admin">
                  <AdminControl />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashBoard />
                </ProtectedRoute>
              }
            />

            {/* OTP */}
            <Route path="/otpVerification" element={<OtpVerification />} />

            {/* Unauthorized */}
            <Route
              path="/unauthorized"
              element={
                <h1 className="text-center mt-20 text-red-600 text-2xl">
                  🚫 Unauthorized Access
                </h1>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
