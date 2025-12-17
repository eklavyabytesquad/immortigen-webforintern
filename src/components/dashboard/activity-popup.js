'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ActivityPopup({ isOpen, onClose }) {
  const [selectedActivity, setSelectedActivity] = useState(null)

  if (!isOpen) return null

  const activities = [
    {
      id: 1,
      icon: '/assets/dashbaord/bloodreport.png',
      title: 'Blood test report',
      time: '3d ago',
      date: '28 Oct, 2025',
      description: 'Complete blood count (CBC) test results are now available. All values are within normal range.',
      details: `Test Results Summary:
      
White Blood Cells: 7,500 cells/mcL (Normal: 4,500-11,000)
Red Blood Cells: 5.2 million cells/mcL (Normal: 4.5-5.5)
Hemoglobin: 14.5 g/dL (Normal: 13.5-17.5)
Hematocrit: 42% (Normal: 38.3-48.6)
Platelets: 250,000 platelets/mcL (Normal: 150,000-450,000)

All test results are within normal range. Continue with regular health monitoring.`
    },
    {
      id: 2,
      icon: '/assets/dashbaord/Test.png',
      title: 'Blood test requested',
      time: '8d ago',
      date: '23 Oct, 2025',
      description: 'Blood test has been requested and scheduled for collection.',
      details: `Blood Test Request Details:

Test Type: Complete Blood Count (CBC)
Requested by: Dr. Gaurav
Request Date: 23 Oct, 2025
Scheduled Collection: 25 Oct, 2025
Status: Completed

The blood sample was collected successfully and sent to the laboratory for analysis.`
    },
    {
      id: 3,
      icon: '/assets/dashbaord/brain.png',
      title: 'Neurological test requested',
      time: '8d ago',
      date: '23 Oct, 2025',
      description: 'Neurological assessment has been requested.',
      details: `Neurological Test Request Details:

Test Type: Cognitive Function Assessment
Requested by: Dr. Gaurav
Request Date: 23 Oct, 2025
Scheduled Date: 30 Oct, 2025
Status: Pending

This test will assess memory, attention, language, and executive function. Please arrive 15 minutes early for the appointment.`
    },
    {
      id: 4,
      icon: '/assets/dashbaord/brain.png',
      title: 'Neurological test requested',
      time: '8d ago',
      date: '23 Oct, 2025',
      description: 'Neurological assessment has been requested.',
      details: `Neurological Test Request Details:

Test Type: Cognitive Function Assessment
Requested by: Dr. Gaurav
Request Date: 23 Oct, 2025
Status: Scheduled`
    },
    {
      id: 5,
      icon: '/assets/dashbaord/brain.png',
      title: 'Neurological test requested',
      time: '8d ago',
      date: '23 Oct, 2025',
      description: 'Neurological assessment has been requested.',
      details: `Neurological Test Request Details:

Test Type: Cognitive Function Assessment
Status: Scheduled`
    },
    {
      id: 6,
      icon: '/assets/dashbaord/brain.png',
      title: 'Neurological test requested',
      time: '8d ago',
      date: '23 Oct, 2025',
      description: 'Neurological assessment has been requested.',
      details: `Neurological Test Request Details:

Test Type: Cognitive Function Assessment
Status: Scheduled`
    }
  ]

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity)
  }

  const handleBack = () => {
    setSelectedActivity(null)
  }

  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 z-[9999]"
        style={{ 
          backdropFilter: 'blur(20px)', 
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
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
          background: 'rgba(239, 242, 248, 1)',
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

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={selectedActivity ? handleBack : onClose}
              className="mr-4 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
              {selectedActivity ? selectedActivity.title : 'Recent Activity'}
            </h2>
          </div>

          {/* Show activity list or detail */}
          {!selectedActivity ? (
            <>
              {/* Activity Count */}
              <p className="text-sm mb-4" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                {activities.length} activit{activities.length !== 1 ? 'ies' : 'y'}
              </p>

              {/* Activities List */}
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    onClick={() => handleActivityClick(activity)}
                    className="p-4 rounded-2xl hover:shadow-sm transition-all cursor-pointer"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid rgba(229, 231, 235, 0.5)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                        >
                          <Image
                            src={activity.icon}
                            alt={activity.title}
                            width={20}
                            height={20}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-0.5" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                            {activity.title}
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                            {activity.time}
                          </p>
                        </div>
                      </div>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="rgba(142, 142, 142, 1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Activity Detail View */
            <div className="h-[calc(100vh-120px)] flex flex-col">
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(245, 245, 245, 1)' }}
                >
                  <Image
                    src={selectedActivity.icon}
                    alt={selectedActivity.title}
                    width={24}
                    height={24}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold mb-1" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                    {selectedActivity.title}
                  </p>
                  <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {selectedActivity.date}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm mb-4" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                {selectedActivity.description}
              </p>

              {/* Details Card */}
              <div 
                className="flex-1 p-6 rounded-3xl overflow-y-auto"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  border: '1px solid rgba(226, 232, 240, 0.5)'
                }}
              >
                <div className="space-y-4">
                  {selectedActivity.details.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
