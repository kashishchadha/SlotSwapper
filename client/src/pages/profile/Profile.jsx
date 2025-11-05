import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const avatarOptions = ['👤', '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💻', '👨‍🎓', '👩‍🎓', '🧑‍🎓']

const Profile = () => {
  const { user, updateUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('👤')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '')
      setEmail(user.email || '')
      setAvatar(user.avatar || '👤')
      setNotificationsEnabled(user.notificationsEnabled !== false)
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await API.put('/auth/profile', {
        fullName,
        email,
        avatar,
        notificationsEnabled
      })

      if (data.success) {
        updateUser(data.user)
        toast.success('Profile updated successfully!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center mb-6">
          <button
            className="lg:hidden mr-3 p-2 rounded-md bg-white/90 shadow-sm"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H20" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18H20" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Profile Settings</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            {/* Avatar Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-4">
                <div 
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition"
                >
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl">
                    {avatar}
                  </div>
                </div>
                <button
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
                >
                  ✎
                </button>
              </div>

              {showAvatarPicker && (
                <div className="mb-4 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-600 mb-3 text-center">Choose your avatar</p>
                  <div className="grid grid-cols-6 gap-3">
                    {avatarOptions.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setAvatar(emoji)
                          setShowAvatarPicker(false)
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition ${
                          avatar === emoji
                            ? 'bg-indigo-100 ring-2 ring-indigo-500'
                            : 'bg-white hover:bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900">{user?.fullName}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Notification Toggle */}
              <div className="flex items-center justify-between py-4 px-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600">
                    <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Profile
