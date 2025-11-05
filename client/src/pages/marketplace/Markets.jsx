import React from 'react'

const sampleSlots = [
  { id: 1, name: 'Jane D.', team: 'Marketing Team', title: 'Weekly Design Sync', date: 'Oct 26, 10:00 AM', avatar: '👩' },
  { id: 2, name: 'John S.', team: 'Engineering', title: 'Project Kick-off', date: 'Oct 26, 2:00 PM', avatar: '👨' },
  { id: 3, name: 'Emily R.', team: 'Product', title: 'Client Presentation', date: 'Oct 27, 9:00 AM', avatar: '👩' },
  { id: 4, name: 'Michael B.', team: 'Engineering', title: 'Eng Stand-up', date: 'Oct 27, 11:00 AM', avatar: '👨' },
  { id: 5, name: 'Sarah L.', team: 'Marketing Team', title: 'Marketing Brainstorm', date: 'Oct 28, 1:00 PM', avatar: '👩' },
  { id: 6, name: 'David C.', team: 'Sales', title: '1-on-1 with Manager', date: 'Oct 29, 4:00 PM', avatar: '👨' },
  { id: 7, name: 'Laura M.', team: 'Design', title: 'UX Review Session', date: 'Oct 30, 11:30 AM', avatar: '👩' },
  { id: 8, name: 'Kevin W.', team: 'Support', title: 'All-Hands Meeting', date: 'Oct 31, 3:00 PM', avatar: '👨' },
]

const NavBar = () => (
  <header className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradNav" x1="0" x2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#logoGradNav)" />
          <path d="M14 18h20" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M34 18l-4 4 4 4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M34 30H14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 30l4-4-4-4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <div className="text-lg font-semibold">SlotSwapper</div>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm">
        <button className="text-indigo-600 font-medium">Marketplace</button>
        <button className="text-gray-600 hover:text-gray-800">My Slots</button>
        <button className="text-gray-600 hover:text-gray-800">Profile</button>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:flex w-8 h-8 items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">👤</div>
      </div>
    </div>
  </header>
)

const SlotCard = ({ slot }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl">
        {slot.avatar}
      </div>
      <div>
        <div className="font-semibold text-gray-900">{slot.name}</div>
        <div className="text-sm text-gray-500">{slot.team}</div>
      </div>
    </div>

    <div className="font-bold text-gray-900 mb-1">{slot.title}</div>
    <div className="text-sm text-gray-500 mb-4">{slot.date}</div>

    <button className="w-30 bg-indigo-500 hover:bg-indigo-700 text-white py-2.5 rounded-full font-medium transition-colors text-sm">
      Request Swap
    </button>
  </div>
)

const Markets = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6eefc] via-[#eef4ff] to-[#fbfdff]">
      <NavBar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Marketplace</h1>

        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input
                type="text"
                placeholder="Search for slots by title or user..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Date
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              Category
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleSlots.map(slot => (
            <SlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Markets
