import React from "react";
import CourseList from "./pages/CourseList";
import AdminDashBoard from "./pages/AdminDashBoard";
import Header from "./pages/Header";

const App = () => {
  return (
    <div>
      <Header />
      <CourseList  />
      {/* <AdminDashBoard/> */}
    </div>
  );
};

export default App;
