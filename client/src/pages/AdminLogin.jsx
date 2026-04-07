import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post("http://localhost:8000/api/auth/admin/login",{
        email,
        password
    },{
        withCredentials: true
    })

    console.log(response.data)

    localStorage.setItem("role", "admin")

    navigate('/home')
  };
  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Admin sign in</h2>
          <p className="auth-sub">Access the admin dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="admin@example.com" />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" placeholder="Enter your password" />
          </div>

          <div className="actions">
            <button className="btn-primary">Sign in</button>
            <a className="small-note" href="/admin/register">Create admin</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
