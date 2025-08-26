import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // check login

  const handleLogout = () => {
    localStorage.removeItem("token"); // token delete karo
    navigate("/login"); // login page pe redirect
  };

  const goToLogin = () => {
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-white to-blue-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div onClick={goToLogin} className="flex-shrink-0 w-36 center mt-2">
            {/* <Link to="/" className="text-2xl font-bold">Logo</Link> */}
            <img
              src="https://anywhere.learn.co.th/main/wp-content/uploads/2020/01/Learncorp_Logo_Pack_2021_Learn-Anywhere-Primary-RGB.png"
              alt=""
            />
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-semibold">
            <Link to="/" className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link to="/courses" className="text-gray-800 hover:text-blue-600">
              Courses
            </Link>
            <Link to="/pricing" className="text-gray-800 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/profile" className="text-gray-800 hover:text-blue-600">
              Profile
            </Link>

            {!token ? (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-900 cursor-pointer text-white px-4 py-1 rounded-md hover:bg-red-900"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none text-2xl"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2">
            <div className="flex flex-col  h-screen space-y-2 pb-3 pt-2">
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/pricing"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/profile"
                className="text-gray-800 hover:text-blue-600 px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-base font-medium text-center mx-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
