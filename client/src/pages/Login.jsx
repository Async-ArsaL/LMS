import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

   const [message, setMessage] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()

     try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      alert("User Login Succesfully")
    } catch (err) {
      console.log(err);
      setMessage("Server Error");
    }
    // Handle login logic here

    setEmail("");
    setPassword("");

    // console.log("logindata:", email, password)
  }

  return (
    <div className="min- h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200  flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 mb-4">
      <div className="max-w-md w-full space-y-6 bg-gradient-to-br from-white to-blue-100 border-2 border-blue-100  p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-600">
            Log in to access your learning journey.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-lg"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full  cursor-pointer flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </button>

          <div className="flex items-center justify-between mt-4 text-base">
            <Link to="/forgot-password" className="text-gray-600 hover:text-blue-500">
              Forgot password?
            </Link>
            <div className="flex items-center">
              <span className="text-gray-600">New here?</span>
              <Link to="/signup" className="ml-2 text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
