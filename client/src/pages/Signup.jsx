import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()

    
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({fullname: fullName, email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
      alert("User SignUp Succesfully")
    } catch (err) {
      console.log(err);
      setMessage("Server Error");
    }

    //Handle signup logic here
    setFullName("")
    setEmail("")
    setPassword("")
    console.log( "userdata", fullName, email, password);

    
  }

  return (
    <div className="h- h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center  px-4 ">
      <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg border-2 border-blue-100 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Join the Learning Revolution
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Create your account and start your first course today.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                placeholder="Full Name"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                placeholder="Email Address"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 text-base"
                placeholder="Create Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            By signing up, you agree to our{' '}
            <Link className="text-blue-600 hover:text-blue-500">
              Terms
            </Link>
            {' & '}
            <Link  className="text-blue-600 hover:text-blue-500">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="text-center text-sm mt-2">
            <span className="text-gray-600">Already have an account?</span>
            <Link to="/login" className="ml-1 text-blue-600 hover:text-blue-500 font-medium">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
