import React, { useState } from 'react'

const NavBar = () => (
  <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradProfile" x1="0" x2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#logoGradProfile)" />
          <path d="M14 18h20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 18l-4 4 4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M34 30H14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 30l4-4-4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div className="text-lg font-semibold">SlotSwapper</div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm">
        <button className="text-gray-600 hover:text-gray-800">Dashboard</button>
        <button className="text-gray-600 hover:text-gray-800">My Schedule</button>
        <button className="text-gray-600 hover:text-gray-800">Requests</button>
        <button className="text-indigo-600 font-medium">Profile</button>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex w-8 h-8 items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
)

const Profile = () => {
  const [fullName, setFullName] = useState('Alex Doe')
  const [email, setEmail] = useState('alex.doe@example.com')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] via-[#ede9fe] to-[#faf5ff]">
      <NavBar />

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl">
                  👤
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Alex Doe</h2>
            <p className="text-sm text-gray-500">alex.doe@example.com</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Notification Toggle */}
          <div className="flex items-center justify-between py-4 px-2 mb-6">
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Receive swap notifications</span>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium transition-colors">
              Save Changes
            </button>
            <button className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
