import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NotificationBell = () => {
  const { notifications } = useAuth()
  const navigate = useNavigate()

  if (notifications === 0) return null

  return (
    <button
      onClick={() => navigate('/request')}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full p-4 shadow-2xl hover:shadow-violet-500/50 hover:scale-110 transition-all duration-300 z-50 animate-bounce"
      aria-label="View notifications"
    >
      <div className="relative">
        <svg 
          className="w-6 h-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {notifications > 9 ? '9+' : notifications}
        </span>
      </div>
    </button>
  )
}

export default NotificationBell
