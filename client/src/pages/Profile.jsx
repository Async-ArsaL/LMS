import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:4000/api/v1/users/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Password changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-white to-blue-200 min-h-[calc(100vh-64px)]"
      style={{ paddingTop: "30px" }}
    >
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg border border-blue-200 shadow-md min-h-[calc(100vh-128px)] flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="md:w-1/4 bg-white rounded-lg p-6 shadow flex flex-col justify-between">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full mb-4 bg-gray-300 flex items-center justify-center text-gray-600 text-3xl font-semibold select-none">
              {name ? (
                name.charAt(0).toUpperCase()
              ) : (
                 <FontAwesomeIcon icon={faFaceSmile} className="text-gray-600 text-8xl" />
              )}
            </div>
            <p className="font-semibold text-center mb-4 text-lg">
              {name || "User"}
            </p>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-blue-600  cursor-pointer text-sm w-full  hover:underline focus:outline-none"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>

            {showPasswordForm && (
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white p-1 rounded-lg shadow-inner border border-gray-200"
              >
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  required
                  autoComplete="current-password"
                />

                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  required
                  autoComplete="new-password"
                />

                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 border-gray-300"
                  required
                  autoComplete="new-password"
                />

                <button
                  type="submit"
                  className="bg-blue-600 cursor-pointer text-white w-full py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("name");
                window.location.href = "/login";
              }}
              className="bg-red-600 cursor-pointer text-white rounded py-2 px-6 w-full hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white rounded-lg p-6 shadow overflow-auto">
          <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

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
            rows="1"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              id="email-notifications"
            />
            <label
              htmlFor="email-notifications"
              className="ml-3 text-sm font-medium"
            >
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
            placeholder="Enter your permanent address"
            className="w-full rounded-md border border-gray-300 px-3 py-2 mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded-md focus:outline-none transition-colors duration-200">
              Save Changes
            </button>
            <button className="border border-red-600 text-red-600 cursor-pointer font-semibold py-2 px-6 rounded-md hover:bg-blue-50 focus:outline-none transition-colors duration-200">
              Delete Account
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
