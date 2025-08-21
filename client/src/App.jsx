import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CourseList from './pages/CourseList'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/courses" element={<CourseList/>} />
          <Route path="/pricing" element={<Pricing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

