import React from "react";
import { useNavigate } from "react-router-dom";
import CourseList from "../pages/CourseList";

const Hero = () => {


    const navigate = useNavigate();

    const goToHome = ()=>{
        navigate("/courses")
    }

  return (
    <div className=" w-full h-[calc(100vh-65px)]   bg-gradient-to-br from-white to-blue-200 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className=" text-5xl md:text-6xl font-bold tracking-tight  mb-8 bg-gradient-to-br from-gray-900 to-blue-500    bg-clip-text text-transparent">
            Learn Anywhere.
            <br />
            <span className="bg-gradient-to-br from-gray-900 to-blue-500   bg-clip-text text-transparent">
              Anytime.
            </span>
          </h1>
          <p className="mt-3 text-xl text-gray-600 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5">
            Thousands of expert-led courses to boost your career.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium cursor-pointer">
              Get Started for Free
            </button>
            <button onClick={goToHome} className="border-2 border-gray-800 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-800 hover:text-white font-medium cursor-pointer">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
