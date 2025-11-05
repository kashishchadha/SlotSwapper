import React, { useState, useEffect } from 'react'
import BlurText from '../../components/common/BlurText'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'

const Landing = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard')
    } else {
      navigate('/auth')
    }
  }

  const handleSignIn = () => {
    navigate('/auth', { state: { mode: 'login' } })
  }

  const handleSignUp = () => {
    navigate('/auth', { state: { mode: 'signup' } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0e7ff] via-[#ede9fe] to-[#f5f3ff]">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md border-b border-white/50 px-6 py-5 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <rect width="48" height="48" rx="8" fill="url(#logoGrad)" />
              <path d="M14 18h20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M34 18l-4 4 4 4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M34 30H14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M14 30l4-4-4-4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="text-xl font-semibold text-gray-900">SlotSwapper</span>
          </div>

          <nav className="hidden md:flex items-center gap-7">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How it works</a>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <button onClick={() => navigate('/dashboard')} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-violet-700 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                Dashboard
              </button>
            ) : (
              <>
                <button onClick={handleSignIn} className="text-gray-700 hover:text-indigo-600 px-4 py-2 font-medium transition-all duration-200 hover:scale-105">
                  Login
                </button>
                <button onClick={handleSignUp} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium hover:from-indigo-700 hover:to-violet-700 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Floating background shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200/30 to-violet-200/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-indigo-200/20 rounded-full blur-3xl"
        />
      </div>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <BlurText
            text="Swap shifts with your team in seconds"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-5 justify-center leading-tight"
          />
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Trade calendar slots with teammates effortlessly. No more email chains or spreadsheets—just simple, instant swaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <button onClick={handleGetStarted} className="px-7 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-700 hover:to-violet-700 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Start for free
            </button>
            <button className="px-7 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 text-gray-700 font-medium hover:bg-white hover:border-indigo-300 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
              Watch demo
            </button>
          </div>

          {/* Simple visual element */}
          <div className="glass-card rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Your shift</div>
                <div className="font-semibold text-gray-900">Mon 9AM - 5PM</div>
              </div>
              <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01" />
              </svg>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Their shift</div>
                <div className="font-semibold text-gray-900">Tue 2PM - 10PM</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            How it works
          </h2>
          <p className="text-lg text-gray-700">
            Three simple steps to trade your time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-7 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M3 10h18M8 2v4M16 2v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Connect calendar</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Link your calendar in seconds. We'll show all your shifts in one place.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-7 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Find a swap</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Browse available shifts from your teammates and pick one that fits your schedule.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-7 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:rotate-6 transition-transform duration-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Confirm swap</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Both parties confirm, and your calendars update automatically. Done.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for teams who value flexibility
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Whether you're managing hospital shifts, retail schedules, or office hours—SlotSwapper makes it easy to trade time with your colleagues.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Real-time notifications when swap requests come in</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Automatic calendar updates—no manual entry</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Works with Google Calendar, Outlook, and more</span>
              </li>
            </ul>
          </div>
          <div className="glass-card rounded-2xl p-8 shadow-xl">
            <div className="space-y-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                    <div className="text-xs text-gray-600">Wants to swap: Fri 9AM - 5PM</div>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs rounded-lg hover:from-indigo-700 hover:to-violet-700 transition shadow-md">Accept</button>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Mike Chen</div>
                    <div className="text-xs text-gray-600">Wants to swap: Sat 2PM - 10PM</div>
                  </div>
                  <button className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs rounded-lg hover:from-indigo-700 hover:to-violet-700 transition shadow-md">Accept</button>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 opacity-60 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">Emma Davis</div>
                    <div className="text-xs text-gray-600">Swap completed ✓</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section 
        className="max-w-4xl mx-auto px-6 py-20 relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="glass-card rounded-3xl p-12 text-center shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to simplify your schedule?
          </motion.h2>
          <motion.p 
            className="text-gray-700 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join teams already using SlotSwapper to manage their time better.
          </motion.p>
          <motion.button 
            onClick={handleGetStarted} 
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium hover:from-indigo-700 hover:to-violet-700 hover:scale-110 transition-all duration-200 shadow-xl hover:shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get started free
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/30 px-6 py-8 bg-white/40 backdrop-blur-sm shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © 2025 SlotSwapper. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-600 hover:scale-110 transition-all duration-200">Privacy</a>
            <a href="#" className="hover:text-indigo-600 hover:scale-110 transition-all duration-200">Terms</a>
            <a href="#" className="hover:text-indigo-600 hover:scale-110 transition-all duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing