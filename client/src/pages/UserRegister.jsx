import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'

const UserRegister = () => {
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()

    const fullName = e.target.firstName.value + ' ' + e.target.lastName.value
    const email = e.target.email.value
    const phone = e.target.phone.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value

    const response = await axios.post("http://localhost:8000/api/auth/user/register",{
        fullName,
        email,
        phone,
        password,
        confirm
    },{
        withCredentials: true
    })

    console.log(response.data)

    localStorage.setItem("role", "user")

    
    navigate('/home')

    };
  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">User sign up Form</h2>
          <p className="auth-sub">Grow your business with our platform.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="role">Account type</label>
            <select
              id="role"
              className="input"
              defaultValue="user"
              onChange={(e) => navigate(e.target.value === 'admin' ? '/admin/register' : '/user/register')}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-row pair">
            <div className="form-col">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" className="input" type="text" placeholder="John" />
            </div>
            <div className="form-col">
              <label htmlFor="lastName">Last name</label>
              <input id="lastName" className="input" type="text" placeholder="Smith" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="phone">Phone</label>
            <input id="phone" className="input" type="tel" placeholder="+1 555 123 4567" />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="you@example.com" />
          </div>

          <div className="form-row pair">
            <div className="form-col">
              <label htmlFor="password">Password</label>
              <input id="password" className="input" type="password" placeholder="Create password" />
            </div>
            <div className="form-col">
              <label htmlFor="confirm">Confirm</label>
              <input id="confirm" className="input" type="password" placeholder="Repeat password" />
            </div>
          </div>

          <div className="actions">
            <button className="btn-primary btn-block">Create User Account</button>
            
          </div>

          <div className="form-row">
            <a className="small-note" href="/">Already have an account? Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
