import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Sidebar({ open = false, onClose = () => {} }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleNavigation = (path) => {
    navigate(path)
    onClose() // Close mobile drawer after navigation
  }

  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
    <aside className="w-64 hidden h-screen lg:flex flex-col justify-between  bg-white/95 border-r border-gray-100 shadow-sm rounded-l-lg">
      <div>
        <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 mt-3">
            <defs>
              <linearGradient id="sidebarGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <rect width="48" height="48" rx="10" fill="url(#sidebarGrad)" />
            <path d="M14 18h20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M34 18l-4 4 4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M34 30H14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14 30l4-4-4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <div className="text-lg font-extrabold">SlotSwapper</div>
        </div>

        <nav className="space-y-3 px-3">
          <button 
            onClick={() => handleNavigation('/dashboard')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 hover:scale-105 text-gray-700'}`}
          >
            📅 My Calendar
          </button>
          <button 
            onClick={() => handleNavigation('/market')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${isActive('/market') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 hover:scale-105 text-gray-700'}`}
          >
            🏪 Marketplace
          </button>
          <button 
            onClick={() => handleNavigation('/request')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${isActive('/request') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 hover:scale-105 text-gray-700'}`}
          >
            🔄 Requests
          </button>
          <button 
            onClick={() => handleNavigation('/profile')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${isActive('/profile') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 hover:scale-105 text-gray-700'}`}
          >
            👤 Profile
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100 px-3">
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-all duration-200 hover:scale-105" onClick={() => handleNavigation('/profile')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200">
            {user?.avatar || '👤'}
          </div>
          <div>
            <div className="font-medium text-sm">{user?.fullName || 'User'}</div>
            <div className="text-xs text-gray-500 truncate max-w-[140px]">{user?.email || 'user@example.com'}</div>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="mt-4 mb-2 cursor-pointer text-sm text-gray-600 flex items-center gap-2 hover:text-red-600 hover:scale-105 transition-all duration-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 19H7A2 2 0 0 1 5 17V7A2 2 0 0 1 7 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
        <aside className={`absolute left-0 top-0 bottom-0 w-72 bg-white/95 p-6 transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="sidebarMobileGrad" x1="0" x2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <rect width="48" height="48" rx="10" fill="url(#sidebarMobileGrad)" />
                <path d="M14 18h20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34 18l-4 4 4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M34 30H14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 30l4-4-4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div className="text-lg font-extrabold">SlotSwapper</div>
            </div>
            <button onClick={onClose} className="text-gray-500 text-xl">✕</button>
          </div>

          <nav className="space-y-3">
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className={`w-full text-left px-3 py-2 rounded-lg ${isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              📅 My Calendar
            </button>
            <button 
              onClick={() => handleNavigation('/market')}
              className={`w-full text-left px-3 py-2 rounded-lg ${isActive('/market') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              🏪 Marketplace
            </button>
            <button 
              onClick={() => handleNavigation('/request')}
              className={`w-full text-left px-3 py-2 rounded-lg ${isActive('/request') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              🔄 Requests
            </button>
            <button 
              onClick={() => handleNavigation('/profile')}
              className={`w-full text-left px-3 py-2 rounded-lg ${isActive('/profile') ? 'bg-indigo-50 text-indigo-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`}
            >
              👤 Profile
            </button>
          </nav>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavigation('/profile')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl">
                {user?.avatar || '👤'}
              </div>
              <div>
                <div className="font-medium text-sm">{user?.fullName || 'User'}</div>
                <div className="text-xs text-gray-500 truncate max-w-[140px]">{user?.email || 'user@example.com'}</div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="mt-4 cursor-pointer text-sm text-gray-600 flex items-center gap-2 hover:text-red-600 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 19H7A2 2 0 0 1 5 17V7A2 2 0 0 1 7 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
