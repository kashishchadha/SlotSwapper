import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Field = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <label className="block text-sm text-gray-600">
    <div className="mb-2 font-medium">{label}</div>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </label>
)

const Login = () => {
  const [mode, setMode] = useState('login') 
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    if (mode === 'login') {
      const result = await login(form.email, form.password)
      if (result.success) {
        navigate('/dashboard')
      }
    } else {
      if (form.password !== form.confirm) {
        toast.error('Passwords do not match')
        setLoading(false)
        return
      }
      const result = await register(form.name, form.email, form.password)
      if (result.success) {
        navigate('/dashboard')
      }
    }
    
    setLoading(false)
  }

  return (
    <div className="flex justify-center  px-6 mt-12">
      <div className="w-full max-w-md">
        <div className="mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-extrabold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create your SlotSwapper account'}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {mode === 'login'
                ? 'Sign in to access your SlotSwapper account.'
                : 'Welcome! Please enter your details.'}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'signup' && (
              <Field
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            )}

            <Field
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-700">Password</div>
                {mode === 'login' && (
                  <button type="button" className="text-sm cursor-pointer text-indigo-600">Forgot Password?</button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={mode === 'login' ? 'Enter your password' : 'Enter 8+ characters'}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <div className="text-sm text-gray-600 mb-2">Confirm Password</div>
                <input
                  type="password"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 cursor-pointer text-white py-3 rounded-full font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </div>

            <div className="text-center text-sm text-gray-500">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button type="button" className="text-indigo-600 cursor-pointer font-medium" onClick={() => setMode('signup')}>
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button type="button" className="text-indigo-600 cursor-pointer font-medium" onClick={() => setMode('login')}>
                    Sign In
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
