import React from "react";

export default function Account() {
  return (
    <div   className="max-w-4xl mx-auto p-8 font-sans text-gray-900 overflow-hidden"
  style={{ height: 'calc(100vh - 80px)' }}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="md:w-1/4 md:pr-6 md:border-r flex flex-col justify-between  md:border-gray-200 mb-8 md:mb-0">
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full mb-3 bg-gray-200" />
          <p className="font-semibold text-center mb-4">Profile Info</p>
          <button className="text-blue-600 text-sm w-full mb-8 hover:underline focus:outline-none">
            Change Password
          </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            
             <button className="bg-red-600 text-white rounded py-2 px-3 cursor-pointer">Logout</button>
          </div>
          
         
        </aside>

        {/* Main content */}
        <main className="flex-1 md:pl-8 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

          <label className="block text-sm font-medium mb-1" htmlFor="name">
           Full Name
          </label>
          <input
            id="name"
            placeholder="Enter your full name"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            placeholder="Enter your email"
            type="email"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <label className="block text-sm font-medium mb-1" htmlFor="bio">
            Bio
          </label>
          <textarea
            id="bio"
            placeholder="Bio"
            rows="2"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              id="email-notifications"
            />
            <label htmlFor="email-notifications" className="ml-3 text-sm font-medium">
              Enable email notifications
            </label>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              id="dark-mode"
            />
            <label htmlFor="dark-mode" className="ml-3 text-sm font-medium">
              Dark mode
            </label>
          </div>

          <input
            type="text"
            placeholder="Enter your parmanent address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md focus:outline-none">
              Save Changes
            </button>
            <button className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 focus:outline-none">
              Delete Account
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
