'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ClinicalActionsPopup({ isOpen, onClose }) {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('All')

  if (!isOpen) return null

  const allClinicalActions = [
    {
      id: 1,
      patientId: '0000003',
      patientName: 'Rohan Kumar',
      icon: '❤️',
      iconBg: 'rgba(254, 226, 226, 1)',
      text: 'Irregular heartbeat detected',
      time: 'Today, 2:30 pm',
      status: 'unread'
    },
    {
      id: 2,
      patientId: '0000002',
      patientName: 'Priya Sharma',
      icon: '🫁',
      iconBg: 'rgba(219, 234, 254, 1)',
      text: 'Oxygen saturation below normal range',
      time: 'Today, 10:15 am',
      status: 'unread'
    },
    {
      id: 3,
      patientId: '0000001',
      patientName: 'Anika Joshi',
      icon: '🩸',
      iconBg: 'rgba(243, 232, 255, 1)',
      text: 'Abnormal blood glucose levels detected',
      time: 'Yesterday, 6:45 pm',
      status: 'unread'
    },
    {
      id: 4,
      patientId: '0000005',
      patientName: 'Raj Malhotra',
      icon: '🩺',
      iconBg: 'rgba(255, 237, 213, 1)',
      text: 'Blood pressure elevated - requires attention',
      time: 'Yesterday, 3:20 pm',
      status: 'read'
    },
    {
      id: 5,
      patientId: '0000004',
      patientName: 'Divya Patel',
      icon: '🧪',
      iconBg: 'rgba(220, 252, 231, 1)',
      text: 'Liver function test results abnormal',
      time: 'Yesterday, 11:00 am',
      status: 'read'
    },
    {
      id: 6,
      patientId: '0000006',
      patientName: 'Sneha Kapoor',
      icon: '🌡️',
      iconBg: 'rgba(254, 243, 199, 1)',
      text: 'Body temperature elevated - monitor closely',
      time: '2 days ago',
      status: 'read'
    },
    {
      id: 7,
      patientId: '0000007',
      patientName: 'Arjun Reddy',
      icon: '💊',
      iconBg: 'rgba(254, 215, 226, 1)',
      text: 'Medication adherence alert - missed doses',
      time: '2 days ago',
      status: 'read'
    },
    {
      id: 8,
      patientId: '0000003',
      patientName: 'Rohan Kumar',
      icon: '🏃',
      iconBg: 'rgba(191, 219, 254, 1)',
      text: 'Activity levels significantly below target',
      time: '3 days ago',
      status: 'read'
    },
    {
      id: 9,
      patientId: '0000002',
      patientName: 'Priya Sharma',
      icon: '😴',
      iconBg: 'rgba(221, 214, 254, 1)',
      text: 'Poor sleep quality detected - consecutive nights',
      time: '3 days ago',
      status: 'read'
    },
    {
      id: 10,
      patientId: '0000001',
      patientName: 'Anika Joshi',
      icon: '⚖️',
      iconBg: 'rgba(254, 240, 138, 1)',
      text: 'Sudden weight change detected',
      time: '4 days ago',
      status: 'read'
    }
  ]

  const filteredActions = allClinicalActions.filter(action => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Unread') return action.status === 'unread'
    if (activeFilter === 'Read') return action.status === 'read'
    return true
  })

  const unreadCount = allClinicalActions.filter(a => a.status === 'unread').length

  const handleActionClick = (patientId) => {
    router.push(`/dashboard/patients/${patientId}`)
    onClose()
  }

  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 z-[9999]"
        style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        onClick={onClose}
      />
      
      {/* Popup panel */}
      <div 
        className="fixed top-0 right-0 h-full z-[10000] shadow-2xl overflow-y-auto"
        style={{ 
          width: '627px',
          background: 'rgba(245, 247, 250, 1)',
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

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button 
              onClick={onClose}
              className="mr-4 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Clinical actions</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setActiveFilter('All')}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{ 
                backgroundColor: activeFilter === 'All' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                color: activeFilter === 'All' ? 'white' : 'rgba(142, 142, 142, 1)',
                border: activeFilter === 'All' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
              }}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('Unread')}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2"
              style={{ 
                backgroundColor: activeFilter === 'Unread' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                color: activeFilter === 'Unread' ? 'white' : 'rgba(142, 142, 142, 1)',
                border: activeFilter === 'Unread' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
              }}
            >
              Unread
              {unreadCount > 0 && (
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ 
                    backgroundColor: activeFilter === 'Unread' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(85, 92, 245, 0.15)',
                    color: activeFilter === 'Unread' ? 'white' : 'rgba(85, 92, 245, 1)'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveFilter('Read')}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{ 
                backgroundColor: activeFilter === 'Read' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                color: activeFilter === 'Read' ? 'white' : 'rgba(142, 142, 142, 1)',
                border: activeFilter === 'Read' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
              }}
            >
              Read
            </button>
          </div>

          {/* Action Count */}
          <p className="text-sm mb-4" style={{ color: 'rgba(142, 142, 142, 1)' }}>
            {filteredActions.length} {filteredActions.length === 1 ? 'action' : 'actions'}
          </p>

          {/* Actions List */}
          <div className="space-y-3">
            {filteredActions.map((action, index) => (
              <div
                key={action.id}
                onClick={() => handleActionClick(action.patientId)}
                className="flex items-center justify-between p-4 rounded-2xl hover:shadow-md transition-all duration-200 cursor-pointer group"
                style={{ 
                  backgroundColor: action.status === 'unread' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)',
                  border: action.status === 'unread' ? '1px solid rgba(85, 92, 245, 0.2)' : '1px solid transparent',
                  position: 'relative'
                }}
              >
                {action.status === 'unread' && (
                  <div 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r"
                    style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}
                  />
                )}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ backgroundColor: action.iconBg }}
                  >
                    {action.icon}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span 
                        className={`text-sm ${action.status === 'unread' ? 'font-semibold' : 'font-medium'} truncate`}
                        style={{ color: 'rgba(0, 0, 0, 1)' }}
                      >
                        {action.text}
                      </span>
                      {action.status === 'unread' && (
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      <span className="font-medium">{action.patientName}</span>
                      <span style={{ color: 'rgba(142, 142, 142, 0.6)' }}>•</span>
                      <span>{action.time}</span>
                    </div>
                  </div>
                </div>
                <svg 
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  style={{ color: 'rgba(142, 142, 142, 1)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
