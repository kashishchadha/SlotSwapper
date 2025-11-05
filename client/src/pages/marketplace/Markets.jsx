import React, { useState, useEffect, useCallback } from 'react'
import API from '../../api/axios'
import { toast } from 'react-toastify'
import Sidebar from '../../components/layout/Sidebar'

const SlotCard = ({ slot, onRequestSwap }) => {
  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-2xl hover:scale-110 transition-transform duration-200">
          {slot.user?.avatar || '👤'}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{slot.user?.fullName || 'User'}</div>
          <div className="text-sm text-gray-500">{slot.category}</div>
        </div>
      </div>

      <div className="font-bold text-gray-900 mb-1">{slot.title}</div>
      <div className="text-sm text-gray-500 mb-2">{formatDate(slot.date)}</div>
      <div className="text-sm text-gray-600 mb-2">{slot.startTime} - {slot.endTime}</div>
      {slot.location && <div className="text-sm text-gray-600 mb-2">📍 {slot.location}</div>}
      {slot.description && <div className="text-sm text-gray-500 mb-4">{slot.description}</div>}

      <button 
        onClick={() => onRequestSwap(slot)}
        className="w-full bg-indigo-500 hover:bg-indigo-700 hover:scale-105 text-white py-2.5 rounded-full font-medium transition-all duration-200 text-sm shadow-md hover:shadow-lg"
      >
        Request Swap
      </button>
    </div>
  )
}

const SwapRequestModal = ({ isOpen, onClose, targetSlot, userSlots }) => {
  const [selectedSlotId, setSelectedSlotId] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedSlotId) {
      toast.error('Please select a slot to offer')
      return
    }

    setLoading(true)
    try {
      await API.post('/swaps', {
        requesterSlotId: selectedSlotId,
        receiverSlotId: targetSlot._id,
        message
      })
      toast.success('Swap request sent successfully!')
      onClose()
      setSelectedSlotId('')
      setMessage('')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create swap request')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const swappableSlots = userSlots.filter(s => s.status === 'SWAPPABLE')

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Request Swap</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {swappableSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any swappable slots. Create a slot and mark it as swappable first.</p>
              <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Slot</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">{targetSlot?.title}</div>
                  <div className="text-sm text-gray-600">{targetSlot?.startTime} - {targetSlot?.endTime}</div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Slot to Offer *</label>
                <select
                  required
                  value={selectedSlotId}
                  onChange={(e) => setSelectedSlotId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a slot...</option>
                  {swappableSlots.map(slot => (
                    <option key={slot._id} value={slot._id}>
                      {slot.title} - {slot.startTime} to {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                  placeholder="Why do you want to swap..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const Markets = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [slots, setSlots] = useState([])
  const [userSlots, setUserSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const fetchMarketplaceSlots = useCallback(async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (category && category !== 'All') params.category = category

      const { data } = await API.get('/slots/marketplace', { params })
      setSlots(data.slots || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch marketplace slots')
    } finally {
      setLoading(false)
    }
  }, [searchQuery, category])

  const fetchUserSlots = async () => {
    try {
      const { data } = await API.get('/slots')
      setUserSlots(data.slots || [])
    } catch (error) {
      console.error('Failed to fetch user slots:', error)
    }
  }

  useEffect(() => {
    fetchMarketplaceSlots()
    fetchUserSlots()
  }, [fetchMarketplaceSlots])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMarketplaceSlots()
    }, 500)
    return () => clearTimeout(timer)
  }, [fetchMarketplaceSlots])

  const handleRequestSwap = (slot) => {
    setSelectedSlot(slot)
    setModalOpen(true)
  }

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
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
            <h1 className="text-2xl sm:text-3xl font-extrabold">Marketplace</h1>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for slots by title or user..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Categories</option>
              <option value="Meeting">Meeting</option>
              <option value="Shift">Shift</option>
              <option value="Class">Class</option>
              <option value="Event">Event</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No swappable slots available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {slots.map(slot => (
              <SlotCard key={slot._id} slot={slot} onRequestSwap={handleRequestSwap} />
            ))}
          </div>
        )}
      </main>

      <SwapRequestModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedSlot(null)
        }}
        targetSlot={selectedSlot}
        userSlots={userSlots}
      />
    </div>
  )
}

export default Markets
