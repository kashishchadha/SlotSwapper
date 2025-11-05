import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const StatusBadge = ({ status }) => {
  const map = {
    BUSY: 'bg-gray-200 text-gray-700',
    SWAPPABLE: 'bg-green-100 text-green-700',
    SWAP_PENDING: 'bg-amber-100 text-amber-700',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${map[status] || map.BUSY}`}>
      {status === 'SWAPPABLE' ? 'Swappable' : status === 'SWAP_PENDING' ? 'Swap Pending' : 'Busy'}
    </span>
  )
}

const EventCard = ({ event, onStatusChange, onDelete }) => {
  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleMakeSwappable = async () => {
    try {
      await API.put(`/slots/${event._id}`, { status: 'SWAPPABLE' })
      toast.success('Slot is now swappable!')
      onStatusChange()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update slot')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        await API.delete(`/slots/${event._id}`)
        toast.success('Slot deleted successfully')
        onDelete()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete slot')
      }
    }
  }

  return (
    <div className="glass-card p-4 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
      <div className="text-sm text-gray-500 mb-2">{formatDate(event.date)}</div>
      <div className="text-xs text-gray-400 mb-1">{event.startTime} - {event.endTime}</div>
      <div className="font-semibold text-lg mb-2">{event.title}</div>
      {event.location && <div className="text-sm text-gray-600 mb-2">📍 {event.location}</div>}
      {event.description && <div className="text-sm text-gray-600 mb-3">{event.description}</div>}
      <div className="flex items-center justify-between mt-4">
        <StatusBadge status={event.status} />
        <div className="flex gap-2">
          {event.status === 'BUSY' && (
            <button 
              onClick={handleMakeSwappable}
              className="text-sm bg-green-100 hover:bg-green-200 hover:scale-105 text-green-700 px-3 py-1 rounded-full transition-all duration-200"
            >
              Make Swappable
            </button>
          )}
          <button 
            onClick={handleDelete}
            className="text-sm bg-red-100 hover:bg-red-200 hover:scale-105 text-red-700 px-3 py-1 rounded-full transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

const CreateSlotModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    category: 'Other',
    status: 'BUSY',
    description: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await API.post('/slots', formData)
      toast.success('Slot created successfully!')
      onSuccess()
      onClose()
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        category: 'Other',
        status: 'BUSY',
        description: ''
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create slot')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Create New Slot</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Team Meeting"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Conference Room A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Meeting">Meeting</option>
                <option value="Shift">Shift</option>
                <option value="Class">Class</option>
                <option value="Event">Event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="BUSY">Busy</option>
                <option value="SWAPPABLE">Swappable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Additional details..."
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
                {loading ? 'Creating...' : 'Create Slot'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const Calender = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSlots = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/slots')
      setSlots(data.slots || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch slots')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots()
  }, [])

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
            <h1 className="text-2xl sm:text-3xl font-extrabold">My Calendar</h1>
          </div>

          <button 
            onClick={() => setModalOpen(true)}
            className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Add New Event
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : slots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No slots yet. Create your first slot!</p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
            >
              Create Slot
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map(slot => (
              <EventCard 
                key={slot._id} 
                event={slot} 
                onStatusChange={fetchSlots}
                onDelete={fetchSlots}
              />
            ))}
          </div>
        )}
      </main>

      <CreateSlotModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSuccess={fetchSlots}
      />
    </div>
  )
}

export default Calender
