'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import RescheduleRequestPopup from './reschedule-request-popup'
import CancelConfirmationPopup from './cancel-confirmation-popup'

export default function AppointmentDetailsPopup({ isOpen, onClose, appointment }) {
  const [showReschedulePopup, setShowReschedulePopup] = useState(false)
  const [hasRescheduleRequest, setHasRescheduleRequest] = useState(false)
  const [rescheduleNote, setRescheduleNote] = useState('')
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [showRescheduleDropdown, setShowRescheduleDropdown] = useState(false)

  useEffect(() => {
    if (appointment) {
      // Check if there's already a reschedule request for this appointment
      const rescheduleRequests = JSON.parse(localStorage.getItem('rescheduleRequests') || '[]')
      const request = rescheduleRequests.find(req => 
        req.appointmentId === appointment.id && req.status === 'requested'
      )
      if (request) {
        setHasRescheduleRequest(true)
        setRescheduleNote(request.note)
      } else {
        setHasRescheduleRequest(false)
        setRescheduleNote('')
      }
    }
  }, [appointment])

  if (!isOpen || !appointment) return null

  const bookingProgress = [
    {
      id: 1,
      title: 'Booked',
      subtitle: `(Oder ID #${appointment.id})`,
      date: 'Fri, Nov 10 08:00 pm',
      completed: true,
      showCopy: true
    },
    {
      id: 2,
      title: 'Sample collected',
      subtitle: 'Collected by Mohit Sharma (Orange Health) on Sat, Nov 11 09:20 pm',
      date: '',
      completed: true,
      showCopy: false
    },
    ...(hasRescheduleRequest ? [{
      id: 3,
      title: 'Requested to reschedule',
      subtitle: '',
      date: '',
      completed: false,
      showCopy: false,
      isReschedule: true
    }] : [
      {
        id: 3,
        title: 'Sent to Lab',
        subtitle: '-',
        date: '',
        completed: false,
        showCopy: false
      },
      {
        id: 4,
        title: 'Report generated',
        subtitle: '',
        date: '',
        completed: false,
        showCopy: false
      }
    ])
  ]

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    // You can add a toast notification here
  }

  const handleRescheduleRequest = () => {
    setShowReschedulePopup(true)
  }

  const handleRescheduleClose = (requestSent) => {
    setShowReschedulePopup(false)
    if (requestSent) {
      // Re-fetch the request to get the note
      const rescheduleRequests = JSON.parse(localStorage.getItem('rescheduleRequests') || '[]')
      const request = rescheduleRequests.find(req => 
        req.appointmentId === appointment.id && req.status === 'requested'
      )
      if (request) {
        setHasRescheduleRequest(true)
        setRescheduleNote(request.note)
      }
    }
  }

  const handleCancelRequest = () => {
    setShowCancelConfirmation(true)
  }

  const handleConfirmCancel = () => {
    // Remove reschedule request from localStorage
    const rescheduleRequests = JSON.parse(localStorage.getItem('rescheduleRequests') || '[]')
    const updatedRequests = rescheduleRequests.filter(req => 
      !(req.appointmentId === appointment.id && req.status === 'requested')
    )
    localStorage.setItem('rescheduleRequests', JSON.stringify(updatedRequests))
    setHasRescheduleRequest(false)
    setRescheduleNote('')
    setShowCancelConfirmation(false)
  }

  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 w-full h-screen z-[9999]"
        style={{ 
          backdropFilter: 'blur(20px)', 
          backgroundColor: 'rgba(228, 233, 243, 0.5)',
          minHeight: '100vh',
          minWidth: '100vw'
        }}
        onClick={onClose}
      />
      
      {/* Popup panel */}
      <div 
        className="fixed top-0 right-0 h-screen z-[10000] shadow-2xl overflow-y-auto"
        style={{ 
          width: '627px',
          background: 'rgba(228, 233, 243, 1)',
          backdropFilter: 'blur(40px)',
          animation: 'slideInRight 0.3s ease-out',
          maxHeight: '100vh'
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

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center mb-4">
            <button 
              onClick={onClose}
              className="mr-3 w-8 h-8 flex items-center justify-center hover:bg-white/30 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
              Appointment Details
            </h2>
          </div>

          {/* Patient Information Card */}
          <div 
            className="rounded-3xl p-4 mb-4"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px)'
            }}
          >
            {/* Patient Name with Avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                {appointment.patientName.charAt(0)}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Patient name</p>
                <p className="text-sm font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                  {appointment.patientName}
                </p>
              </div>
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Phone Number */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Phone Number</p>
                  <p className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    +91 1234567890
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Address</p>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    123, Vardhman Apartment, Mahatma Gandhi Road, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                <p className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                  {appointment.email}
                </p>
              </div>
            </div>

            {/* Test Package and Date */}
            <div className="grid grid-cols-2 gap-4">
              {/* Test Package */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Test Package</p>
                  <p className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    {appointment.packageType}
                  </p>
                </div>
              </div>

              {/* Date and Time */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Date and Time of Booking</p>
                  <p className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    Fri, Nov 10 08:00 pm
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Progress Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'rgba(0, 0, 0, 1)' }}>
              Booking Progress
            </h3>

            <div className="relative">
              {bookingProgress.map((milestone, index) => (
                <div key={milestone.id} className="flex gap-3 pb-5 last:pb-0">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    {/* Circle */}
                    <div 
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                      style={{ 
                        backgroundColor: milestone.completed ? 'rgba(85, 92, 245, 1)' : 'rgba(255, 255, 255, 1)',
                        border: milestone.completed ? 'none' : '2px solid rgba(202, 202, 202, 1)'
                      }}
                    >
                      {milestone.completed && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {/* Vertical Line */}
                    {index < bookingProgress.length - 1 && (
                      <div 
                        className="w-0.5 flex-1 mt-1"
                        style={{ 
                          backgroundColor: milestone.completed ? 'rgba(85, 92, 245, 1)' : 'rgba(202, 202, 202, 1)',
                          minHeight: '30px'
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0">
                    <div className="flex items-start justify-between mb-0.5">
                      <div className="flex items-center gap-2 flex-1">
                        <h4 
                          className="text-xs font-semibold"
                          style={{ color: milestone.completed ? 'rgba(0, 0, 0, 1)' : 'rgba(142, 142, 142, 1)' }}
                        >
                          {milestone.title}
                        </h4>
                        {milestone.showCopy && (
                          <button 
                            onClick={() => handleCopy(appointment.id)}
                            className="hover:opacity-70 transition-opacity"
                          >
                            <Image 
                              src="/downloads/copy.svg" 
                              alt="Copy" 
                              width={14} 
                              height={14}
                            />
                          </button>
                        )}
                        {milestone.isReschedule && (
                          <button 
                            onClick={() => setShowRescheduleDropdown(!showRescheduleDropdown)}
                            className="ml-auto transition-transform"
                            style={{ 
                              transform: showRescheduleDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(85, 92, 245, 1)' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {milestone.subtitle && (
                      <p 
                        className="text-xs mb-0.5 leading-tight"
                        style={{ color: 'rgba(142, 142, 142, 1)' }}
                      >
                        {milestone.subtitle}
                      </p>
                    )}
                    {milestone.date && (
                      <p 
                        className="text-xs leading-tight"
                        style={{ color: 'rgba(142, 142, 142, 1)' }}
                      >
                        {milestone.date}
                      </p>
                    )}
                    {milestone.isReschedule && showRescheduleDropdown && rescheduleNote && (
                      <div 
                        className="mt-2 p-3 rounded-xl text-xs leading-relaxed"
                        style={{ 
                          backgroundColor: 'rgba(233, 236, 248, 1)',
                          color: 'rgba(75, 75, 75, 1)',
                          border: '1px solid rgba(85, 92, 245, 0.3)'
                        }}
                      >
                        {rescheduleNote}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Request Reschedule Button or Cancel Request Button */}
            {!hasRescheduleRequest ? (
              <button 
                onClick={handleRescheduleRequest}
                className="mt-4 px-5 py-2 rounded-full text-xs font-medium transition-all hover:bg-gray-100"
                style={{ 
                  border: '1px solid rgba(202, 202, 202, 1)',
                  color: 'rgba(142, 142, 142, 1)',
                  backgroundColor: 'transparent'
                }}
              >
                Request reschedule
              </button>
            ) : (
              <button 
                onClick={handleCancelRequest}
                className="mt-4 px-5 py-2 rounded-full text-xs font-medium transition-all hover:bg-red-50"
                style={{ 
                  border: '1px solid rgba(237, 70, 61, 1)',
                  color: 'rgba(237, 70, 61, 1)',
                  backgroundColor: 'transparent'
                }}
              >
                Cancel request
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reschedule Request Popup */}
      <RescheduleRequestPopup
        isOpen={showReschedulePopup}
        onClose={handleRescheduleClose}
        appointmentId={appointment.id}
        userId={appointment.patientName} // You can replace this with actual user ID if available
      />

      {/* Cancel Confirmation Popup */}
      <CancelConfirmationPopup
        isOpen={showCancelConfirmation}
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelConfirmation(false)}
      />
    </>
  )
}
