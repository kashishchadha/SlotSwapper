import React, { useState } from 'react'

const sampleIncoming = [
  { id: 1, name: 'Sarah Day', avatar: '👩', forYou: 'Tue, Oct 29, 2-4 PM', offers: 'Mon, Oct 28, 9-11 AM' },
  { id: 2, name: 'Mark Chen', avatar: '👨', forYou: 'Wed, Oct 30, 10-12 PM', offers: 'Thu, Oct 31, 3-5 PM' },
  { id: 3, name: 'Emily Rodriguez', avatar: '👩', forYou: 'Fri, Nov 1, 9-11 AM', offers: 'Fri, Nov 1, 1-3 PM' },
]

const NavBar = () => (
  <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradReq" x1="0" x2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#logoGradReq)" />
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
        <button className="text-indigo-600 font-medium">Requests</button>
        <button className="text-gray-600 hover:text-gray-800">Profile</button>
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

const RequestCard = ({ request }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
        {request.avatar}
      </div>
      <div>
        <div className="font-bold text-gray-900 mb-2">Request from {request.name}</div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">For your:</span> {request.forYou}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Offers:</span> {request.offers}
        </div>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button className="px-6 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors text-sm">
        Reject
      </button>
      <button className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors text-sm">
        Accept
      </button>
    </div>
  </div>
)

const Request = () => {
  const [activeTab, setActiveTab] = useState('incoming')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6eefc] via-[#eef4ff] to-[#fbfdff]">
      <NavBar />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Manage Your Swap Requests</h1>
          <p className="text-gray-600">Review, accept, or reject time-slot swap requests from your peers.</p>
        </div>

        <div className="flex items-center gap-8 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`pb-3 font-medium text-sm relative ${
              activeTab === 'incoming' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            Incoming Requests
            <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold">3</span>
            {activeTab === 'incoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`pb-3 font-medium text-sm relative ${
              activeTab === 'outgoing' ? 'text-indigo-600' : 'text-gray-600'
            }`}
          >
            Outgoing Requests
            {activeTab === 'outgoing' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'incoming' ? (
            sampleIncoming.map(req => (
              <RequestCard key={req.id} request={req} />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No outgoing requests yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Request
