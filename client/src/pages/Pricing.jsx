// import React from "react";

// const Pricing = () => {
//   const plans = [
//     {
//       name: "Platinum",
//       price: 999,
//       color: "platinum",
//       features: [
//         "Access to basic courses",
//         "Email support",
//         "Certificate of completion",
//       ],
//       extra: "Beginner-friendly plan",
//     },
//     {
//       name: "Silver",
//       price: 1999,
//       color: "silver",
//       popular: true,
//       features: [
//         "Access to most courses",
//         "Standard support",
//         "Certificate of completion",
//         "Webinar access",
//       ],
//       extra: "Most popular choice",
//     },
//     {
//       name: "Gold",
//       price: 2999,
//       color: "gold",
//       features: [
//         "Access to all courses",
//         "Priority support",
//         "Certificate of completion",
//         "Exclusive webinars & resources",
//       ],
//       extra: "Premium plan for advanced learners",
//     },
//   ];

//   const colorClasses = {
//     platinum: "from-gray-200 to-gray-400 text-gray-900",
//     silver: "from-gray-300 to-gray-500 text-gray-900",
//     gold: "from-yellow-400 to-yellow-600 text-white",
//   };

//   return (
//     <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 overflow-auto">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
//         {plans.map((plan, index) => (
//           <div
//             key={index}
//             className={`relative rounded-2xl shadow-lg p-8 flex flex-col justify-between transform transition duration-300 hover:scale-105 bg-gradient-to-r ${colorClasses[plan.color]} min-h-[500px]`}
//           >
//             {plan.popular && (
//               <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                 Popular
//               </div>
//             )}
//             <h2 className="text-2xl font-bold mb-4 text-center">{plan.name}</h2>
//             <p className="text-center text-4xl font-extrabold mb-6">₹{plan.price}</p>
//             <ul className="mb-6 space-y-2">
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className="flex items-center gap-2 text-sm sm:text-base">
//                   <span className="font-bold">✓</span> {feature}
//                 </li>
//               ))}
//             </ul>
//             <p className="text-center italic mb-6 text-sm sm:text-base">{plan.extra}</p>
//             <button className="bg-white text-gray-900 rounded-xl py-3 px-4 font-medium hover:bg-gray-100 transition duration-300">
//               Choose Plan
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import React from 'react'

const Pricing = () => {
  return (
    <div>Pricing</div>
  )
}

export default Pricing