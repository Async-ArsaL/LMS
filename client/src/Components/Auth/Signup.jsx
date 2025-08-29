// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Signup = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState("Student"); // default role
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:4000/api/v1/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: fullName, email, password, role }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(data.message);
//         //alert("User SignUp Successfully");
//          alert("OTP sent to your email. Please verify.");
//         console.log("Userdata submitted:", { fullName, email, password, role });
//         //navigate("/login")
//        navigate("/otpVerification", { state: { email } });



//       } else {
//         setMessage(data.message || "Signup Failed");
//         alert("Signup Failed: " + (data.message || "Try again"));
//       }

//       // Clear fields after submission
//       setFullName("");
//       setEmail("");
//       setPassword("");
//       setRole("Student"); // reset role to default
//     } catch (err) {
//       console.log(err);
//       setMessage("Server Error");
//       alert("Server Error");
//     }
//   };

//   return (
//     <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-gradient-to-br from-white to-blue-100 p-6 rounded-lg border-2 border-blue-100 shadow-md">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Join the Learning Revolution
//           </h2>
//           <p className="text-base text-gray-600 mb-6">
//             Create your account and start your first course today.
//           </p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             id="fullName"
//             name="fullName"
//             autoComplete="fullname"
//             type="text"
//             required
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
//             placeholder="Full Name"
//           />

//           <input
//             id="email"
//             name="email"
//             autoComplete="email"
//             type="email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
//             placeholder="Email Address"
//           />

//           <input
//             id="password"
//             name="password"
//             autoComplete="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
//             placeholder="Create Password"
//           />

//           {/* Role selection dropdown */}
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="Student">Student</option> 
//             {/* <option value="Instructor">Instructor</option>
//             <option value="Admin">Admin</option> */}
//           </select>

//           <button
//             type="submit"
//             className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             Sign Up
//           </button>

//           <p className="text-center text-sm text-gray-600 mt-2">
//             By signing up, you agree to our{' '}
//             <Link className="text-blue-600 hover:text-blue-500">Terms</Link> &{' '}
//             <Link className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>.
//           </p>

//           <div className="text-center text-sm mt-2">
//             <span className="text-gray-600">Already have an account?</span>
//             <Link to="/login" className="ml-1 text-blue-600 hover:text-blue-500 font-medium">
//               Log in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup



import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // default role
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ STEP 1: Call sendOTP API
      const otpRes = await fetch("http://localhost:4000/api/v1/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        alert("Error sending OTP: " + (otpData.message || "Try again"));
        return;
      }

      alert("OTP sent to your email. Please verify.");
      console.log("OTP Response:", otpData);

      // ✅ STEP 2: Redirect to OTP verification page with user details
      navigate("/otpVerification", {
        state: { fullName, email, password, role },
      });

      // ✅ Clear form after submit
      setFullName("");
      setEmail("");
      setPassword("");
      setRole("Student");
    } catch (err) {
      console.error(err);
      setMessage("Server Error");
      alert("Server Error");
    }
  };

  return (
    <div className="h-[calc(100vh-65px)] bg-gradient-to-br from-white to-blue-200 flex items-center justify-center px-4">
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
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Full Name"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Email Address"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-lg block w-full px-3 py-2.5 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
            placeholder="Create Password"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Student">Student</option>
            {/* <option value="Instructor">Instructor</option>
            <option value="Admin">Admin</option> */}
          </select>

          <button
            type="submit"
            className="w-full cursor-pointer flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <div className="text-center text-sm mt-2">
            <span className="text-gray-600">Already have an account?</span>
            <Link
              to="/login"
              className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
