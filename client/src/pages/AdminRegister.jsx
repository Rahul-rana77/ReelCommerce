import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'

const AdminRegister = () => {
  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault()
    const businessName = e.target.business.value
    const contactName = e.target.contact.value
    const phone = e.target.phone.value
    const email = e.target.email.value
    const address = e.target.address.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value

    const response = await axios.post("http://localhost:8000/api/auth/admin/register",{
        businessName,
        contactName,
        phone,
        email,
        address,
        password,
        confirm
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
          <h2 className="auth-title">Admin sign up form</h2>
          <p className="auth-sub">Register an admin or partner account</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="role">Account type</label>
            <select
              id="role"
              className="input"
              defaultValue="admin"
              onChange={(e) => navigate(e.target.value === 'admin' ? '/admin/register' : '/user/register')}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="business">Business name</label>
            <input id="business" className="input" type="text" placeholder="Company Ltd" />
          </div>

          <div className="form-row pair">
            <div className="form-col">
              <label htmlFor="contact">Contact name</label>
              <input id="contact" className="input" type="text" placeholder="John Doe" />
            </div>
            <div className="form-col">
              <label htmlFor="phone">Phone</label>
              <input id="phone" className="input" type="tel" placeholder="+1 555 123 4567" />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="admin@company.com" />
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

          <div className="form-row">
            <label htmlFor="address">Address</label>
            <input id="address" className="input" type="text" placeholder="123 Market Street" />
          </div>

          <div className="actions">
            <button className="btn-primary btn-block">Create Partner Account</button>
          </div>

          <div className="form-row">
            <a className="small-note" href="/admin/login">Already registered? Sign in</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister
