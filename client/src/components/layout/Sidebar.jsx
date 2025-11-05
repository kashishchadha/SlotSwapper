import React from 'react'

export default function Sidebar({ open = false, onClose = () => {} }) {
  return (
    <>
    <aside className="w-64 hidden h-screen lg:flex flex-col justify-between  bg-white/95 border-r border-gray-100 shadow-sm rounded-l-lg">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 mt-3 ml-3 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold">SS</div>
          <div className="text-lg font-extrabold">SlotSwapper</div>
        </div>

        <nav className="space-y-3">
          <button className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium">My Calendar</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Marketplace</button>
          <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Requests</button>
        </nav>
      </div>

      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 ml-3 h-10 rounded-full bg-amber-100" />
          <div>
            <div className="font-medium">Dana Scully</div>
            <div className="text-sm text-gray-500">dana.scully@example.com</div>
          </div>
        </div>
        <button className="mt-4 ml-3 mb-2 cursor-pointer text-sm text-gray-600 flex items-center gap-2 hover:text-gray-800">
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold">SS</div>
              <div className="text-lg font-extrabold">SlotSwapper</div>
            </div>
            <button onClick={onClose} className="text-gray-500">✕</button>
          </div>

          <nav className="space-y-3">
            <button className="w-full text-left px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 font-medium">My Calendar</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Marketplace</button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Requests</button>
          </nav>

          <div className="pt-6 border-t border-gray-100 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 ml-3 h-10 rounded-full bg-amber-100" />
              <div>
                <div className="font-medium">Dana Scully</div>
                <div className="text-sm text-gray-500">dana.scully@example.com</div>
              </div>
            </div>
            <button className="mt-4 cursor-pointer text-sm text-gray-600 flex items-center gap-2 hover:text-gray-800">
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
