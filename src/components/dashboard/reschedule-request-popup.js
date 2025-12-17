'use client'

import { useState } from 'react'

export default function RescheduleRequestPopup({ isOpen, onClose, appointmentId, userId }) {
  const [rescheduleNote, setRescheduleNote] = useState('')

  if (!isOpen) return null

  const handleSendRequest = () => {
    // Save to localStorage
    const rescheduleRequests = JSON.parse(localStorage.getItem('rescheduleRequests') || '[]')
    const newRequest = {
      userId: userId,
      appointmentId: appointmentId,
      note: rescheduleNote,
      timestamp: new Date().toISOString(),
      status: 'requested'
    }
    rescheduleRequests.push(newRequest)
    localStorage.setItem('rescheduleRequests', JSON.stringify(rescheduleRequests))
    
    // Close the popup
    onClose(true) // Pass true to indicate request was sent
  }

  const handleCancel = () => {
    setRescheduleNote('')
    onClose(false)
  }

  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 w-full h-screen z-[10001]"
        style={{ 
          backdropFilter: 'blur(20px)', 
          backgroundColor: 'rgba(228, 233, 243, 0.5)',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        onClick={handleCancel}
      />
      
      {/* Popup panel */}
      <div 
        className="fixed top-0 right-0 h-screen z-[10002] shadow-2xl"
        style={{ 
          width: '627px',
          background: 'rgba(228, 233, 243, 1)',
          backdropFilter: 'blur(40px)',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        <style jsx>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>

        <div className="p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={handleCancel}
              className="mr-3 w-8 h-8 flex items-center justify-center hover:bg-white/30 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
              Request to reschedule
            </h2>
          </div>

          {/* Textarea */}
          <div className="flex-1 mb-6">
            <textarea
              value={rescheduleNote}
              onChange={(e) => setRescheduleNote(e.target.value)}
              placeholder="Type reason to reschedule"
              className="w-full h-48 p-4 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 1)',
                border: '1px solid rgba(229, 231, 235, 1)',
                color: 'rgba(0, 0, 0, 1)'
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleCancel}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-indigo-50"
              style={{
                border: '1px solid rgba(85, 92, 245, 1)',
                color: 'rgba(85, 92, 245, 1)',
                backgroundColor: 'transparent'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSendRequest}
              disabled={!rescheduleNote.trim()}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(85, 92, 245, 1)',
                color: 'white',
                border: 'none'
              }}
            >
              Send request
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
