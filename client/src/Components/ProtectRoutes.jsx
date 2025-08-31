// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token"); // check token
//   if (!token) {
//     // Agar login nahi hai, login page pe bhej do
//     return (<Navigate to="/login" replace />);
    
//   }
//   return children;
// };

// export default ProtectedRoute;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(!token);

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate("/login");
  };

  if (token) return children;

  return showModal ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-blue-200 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4">Login Required</h2>
        <p className="mb-4">Please login first to access this page.</p>
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
        >
          Okay
        </button>
      </div>
    </div>
  ) : null;
};

export default ProtectedRoute;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children, roles = [] }) => {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role;

//   const hasAccess = token && (roles.length === 0 || roles.includes(role));

//   const navigate = useNavigate();
//   const [showModal, setShowModal] = useState(!hasAccess);

//   const handleLoginRedirect = () => {
//     setShowModal(false);
//     navigate("/login");
//   };

//   if (hasAccess) return children;

//   return showModal ? (
//     <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-blue-200 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
//         <h2 className="text-xl font-bold mb-4">Access Denied</h2>
//         <p className="mb-4">
//           {token ? "You don't have permission to access this page." : "Please login first to access this page."}
//         </p>
//         <button
//           onClick={handleLoginRedirect}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
//         >
//           Okay
//         </button>
//       </div>
//     </div>
//   ) : null;
// };

// export default ProtectedRoute;
