import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogin from '../pages/UserLogin'
import UserRegister from '../pages/UserRegister'
import AdminLogin from '../pages/AdminLogin'
import AdminRegister from '../pages/AdminRegister'
import CreateReel from '../pages/admin/CreateReel'
import Home from '../pages/Home'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/author/:authorId" element={<div>Author page - coming soon</div>} />
        <Route path="/admin/create-reel" element={<CreateReel />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes