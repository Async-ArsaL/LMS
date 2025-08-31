import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Render links based on role
  const renderLinks = () => {
    if (!token) {
      return (
        <>
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Courses
          </Link>
          <Link
            to="/pricing"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Pricing
          </Link>
          <Link
            to="/login"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={handleLinkClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </>
      );
    }

    if (role === "student") {
      return (
        <>
          <Link
            to="/studentDashboard"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to="/courses"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Courses
          </Link>
          <Link
            to="/pricing"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Pricing
          </Link>
          <Link
            to="/profile"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    if (role === "instructor") {
      return (
        <>
          <Link
            to="/createCourse"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Create Course
          </Link>
          <Link
            to="/adminControl"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Manage Courses
          </Link>
          <Link
            to="/profile"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    if (role === "admin") {
      return (
        <>
          <Link
            to="/adminDashboard"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/adminControl"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Admin Control
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    if (role === "principal") {
      return (
        <>
          {/* All links */}
          
          <Link
            to="/courses"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Courses
          </Link>
          <Link
            to="/pricing"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Pricing
          </Link>
          <Link
            to="/profile"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Profile
          </Link>
          <Link
            to="/createCourse"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Create Course
          </Link>
          <Link
            to="/adminDashboard"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Admin Dashboard
          </Link>
          <Link
            to="/adminControl"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Admin Control
          </Link>
          <Link
            to="/approvalDashboard"
            onClick={handleLinkClick}
            className="text-gray-800 hover:text-blue-600"
          >
            Approval Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <nav className="bg-gradient-to-br from-white to-blue-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex-shrink-0 w-36 mt-2 cursor-pointer"
          >
            <img
              src="https://anywhere.learn.co.th/main/wp-content/uploads/2020/01/Learncorp_Logo_Pack_2021_Learn-Anywhere-Primary-RGB.png"
              alt="Logo"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-semibold">
            {renderLinks()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none text-2xl"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gradient-to-br from-white to-blue-200 shadow-lg h-[calc(100vh-65px)] mt-[65px] flex flex-col p-3 py-8 font-semibold space-y-6 text-2xl z-40">
            {renderLinks()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
