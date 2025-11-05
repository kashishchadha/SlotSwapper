import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import API from '../../api/axios'
import { toast } from 'react-toastify'

const RequestCard = ({ request, type, onAccept, onReject, onCancel }) => {
  const formatDate = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const isIncoming = type === 'incoming'
  const otherUser = isIncoming ? request.requester : request.receiver
  const yourSlot = isIncoming ? request.receiverSlot : request.requesterSlot
  const theirSlot = isIncoming ? request.requesterSlot : request.receiverSlot

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center text-2xl">
          {otherUser?.avatar || '👤'}
        </div>
        <div className="flex-1">
          <div className="font-bold text-gray-900 mb-1">
            {isIncoming ? `Request from ${otherUser?.fullName}` : `Request to ${otherUser?.fullName}`}
          </div>
          <div className="text-xs text-gray-500 mb-3">
            {formatDate(request.createdAt)}
          </div>

          <div className="space-y-2 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700 mb-1">Your Slot:</div>
              <div className="text-gray-900">{yourSlot?.title}</div>
              <div className="text-gray-600">{formatDate(yourSlot?.date)} • {yourSlot?.startTime} - {yourSlot?.endTime}</div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="font-medium text-gray-700 mb-1">Their Slot:</div>
              <div className="text-gray-900">{theirSlot?.title}</div>
              <div className="text-gray-600">{formatDate(theirSlot?.date)} • {theirSlot?.startTime} - {theirSlot?.endTime}</div>
            </div>

            {request.message && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-700 mb-1">Message:</div>
                <div className="text-gray-600">{request.message}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        {isIncoming && request.status === 'pending' && (
          <>
            <button
              onClick={() => onAccept(request._id)}
              className="flex-1 px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors text-sm"
            >
              Accept
            </button>
            <button
              onClick={() => onReject(request._id)}
              className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors text-sm"
            >
              Reject
            </button>
          </>
        )}
        
        {!isIncoming && request.status === 'pending' && (
          <button
            onClick={() => onCancel(request._id)}
            className="flex-1 px-4 py-2.5 rounded-full bg-red-100 hover:bg-red-200 text-red-700 font-medium transition-colors text-sm"
          >
            Cancel Request
          </button>
        )}

        {request.status !== 'pending' && (
          <div className="flex-1 text-center py-2 text-sm font-medium capitalize">
            {request.status === 'accepted' && <span className="text-green-600">✓ Accepted</span>}
            {request.status === 'rejected' && <span className="text-red-600">✗ Rejected</span>}
            {request.status === 'cancelled' && <span className="text-gray-600">Cancelled</span>}
          </div>
        )}
      </div>
    </div>
  )
}

const Request = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('incoming')
  const [incomingRequests, setIncomingRequests] = useState([])
  const [outgoingRequests, setOutgoingRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const [incoming, outgoing] = await Promise.all([
        API.get('/swaps/incoming'),
        API.get('/swaps/outgoing')
      ])
      setIncomingRequests(incoming.data.requests || [])
      setOutgoingRequests(outgoing.data.requests || [])
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch requests')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleAccept = async (requestId) => {
    try {
      await API.put(`/swaps/${requestId}/accept`)
      toast.success('Swap request accepted!')
      fetchRequests()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to accept request')
    }
  }

  const handleReject = async (requestId) => {
    try {
      await API.put(`/swaps/${requestId}/reject`)
      toast.success('Swap request rejected')
      fetchRequests()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reject request')
    }
  }

  const handleCancel = async (requestId) => {
    if (window.confirm('Are you sure you want to cancel this request?')) {
      try {
        await API.delete(`/swaps/${requestId}`)
        toast.success('Swap request cancelled')
        fetchRequests()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel request')
      }
    }
  }

  const currentRequests = activeTab === 'incoming' ? incomingRequests : outgoingRequests

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
          <h1 className="text-2xl sm:text-3xl font-extrabold">Swap Requests</h1>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-6 py-2.5 rounded-full font-medium transition ${
              activeTab === 'incoming'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Incoming ({incomingRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`px-6 py-2.5 rounded-full font-medium transition ${
              activeTab === 'outgoing'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Outgoing ({outgoingRequests.length})
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : currentRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {activeTab === 'incoming'
                ? 'No incoming swap requests'
                : 'No outgoing swap requests'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentRequests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
                type={activeTab}
                onAccept={handleAccept}
                onReject={handleReject}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Request
