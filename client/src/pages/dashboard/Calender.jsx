import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'

const sampleEvents = [
  { id: 1, time: '9:00 AM - 10:00 AM', title: 'Team Stand-up', status: 'SWAPPABLE' },
  { id: 2, time: '10:00 AM - 11:30 AM', title: 'Project Sync-Up', status: 'BUSY' },
  { id: 3, time: '1:00 PM - 2:00 PM', title: 'Design Review', status: 'SWAP_PENDING' },
  { id: 4, time: '3:00 PM - 3:30 PM', title: '1-on-1 with Manager', status: 'BUSY' },
]

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

// Sidebar moved to components/layout/Sidebar.jsx

const EventCard = ({ event }) => (
  <div className="glass-card p-4">
    <div className="text-sm text-gray-500 mb-2">{event.time}</div>
    <div className="font-semibold text-lg mb-3">{event.title}</div>
    <div className="h-36 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-amber-200 via-rose-100 to-emerald-100" />
    <div className="flex items-center justify-between">
      <StatusBadge status={event.status} />
      {event.status === 'BUSY' && <button className="text-sm bg-gray-100 px-3 py-1 rounded-full">Make Swappable</button>}
    </div>
  </div>
)

const Calender = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

          <button className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-full">Add New Event</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.map(ev => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Calender
