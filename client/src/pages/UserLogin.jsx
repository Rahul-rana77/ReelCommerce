import React from 'react'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    const response = await axios.post("http://localhost:8000/api/auth/user/login",{
        email,
        password
    },{
        withCredentials: true
    })

    console.log(response.data)

    localStorage.setItem("role", "user")

    navigate('/home')
  }
  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input id="password" className="input" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button className="btn-primary">Sign in</button>
            <a className="small-note" href="/user/register">Create account</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
