import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

const stats = [
  {
    title: 'Total Students',
    value: '1,552',
    icon: (
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-blue-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'Courses Published',
    value: '8',
    icon: (
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-purple-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M9 12h6" />
        <path d="M12 9v6" />
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Revenue',
    value: '$2,300',
    icon: (
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Pending Reviews',
    value: '12',
    icon: (
      <svg
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2" />
      </svg>
    ),
  },
];

const tabs = ['Dashboard', 'My Courses', 'Reviews', 'Earnings', 'Messages'];


const AdminDashBoard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); 

  const name = localStorage.getItem("name");

   const goToCreateCourse = ()=>{
    navigate("/CreateCourse")
   }

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-blue-200 ">
      <div className="bg-gradient-to-br from-white to-blue-200  rounded-xl  w-full max-w-7xl p-4 sm:p-6 md:p-8 flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-start">
          Welcome back, {name}!
        </h1>
        <p className="text-start text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
          Your teaching stats at a glance.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-gray-200 mb-6 sm:mb-12">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`pb-2 sm:pb-3 font-semibold text-sm sm:text-lg ${
                activeTab === i
                  ? 'border-b-4 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats grid */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
  {stats.map(({ title, value, icon }) => (
    <div
      key={title}
      className="bg-gray-50 rounded-lg border border-gray-200 shadow p-4 sm:p-6 flex flex-col items-center text-center"
    >
      <div>{icon}</div>
      <h3 className="mt-3 sm:mt-5 text-lg sm:text-xl font-semibold text-gray-800">
        {title}
      </h3>
      <p className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  ))}
</div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6 sm:mt-14">
          <button onClick={goToCreateCourse} className="w-full cursor-pointer sm:w-auto px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-lg text-lg sm:text-xl font-bold hover:bg-blue-700 transition">
            Create New Course
          </button>
          <button className="w-full cursor-pointer sm:w-auto px-6 py-2 sm:px-8 sm:py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg sm:text-xl font-bold hover:bg-blue-600 hover:text-white transition">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
