'use client'

import { useState } from 'react'

export default function NotificationPopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedNotification, setSelectedNotification] = useState(null)

  if (!isOpen) return null

  const notifications = [
    {
      id: 1,
      type: 'Changes in treatments',
      icon: '⚕️',
      title: 'Changes in treatments',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: `Updated database will be on October 24-25, this may lead to a slight slowdown in the program.

Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.Updated database will be on October 24-25, this may lead to a slight slowdown in the program.`,
      status: 'unread'
    },
    {
      id: 2,
      type: 'Clinic',
      icon: '🏥',
      title: 'Clinic',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      status: 'read'
    },
    {
      id: 3,
      type: 'Clinic',
      icon: '🏥',
      title: 'Clinic',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      status: 'read'
    },
    {
      id: 4,
      type: 'Clinic',
      icon: '🏥',
      title: 'Clinic',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      status: 'read'
    },
    {
      id: 5,
      type: 'Clinic',
      icon: '🏥',
      title: 'Clinic',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      status: 'read'
    },
    {
      id: 6,
      type: 'Clinic',
      icon: '🏥',
      title: 'Clinic',
      date: '23 May, 12:05pm',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      fullMessage: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      status: 'read'
    }
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return notif.status === 'unread'
    if (activeTab === 'read') return notif.status === 'read'
    return true
  })

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification)
  }

  const handleBack = () => {
    setSelectedNotification(null)
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
              onClick={selectedNotification ? handleBack : onClose}
              className="mr-4 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
              {selectedNotification ? selectedNotification.title : 'Notification'}
            </h2>
          </div>

          {/* Show notification list or detail */}
          {!selectedNotification ? (
            <>
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4">
                <button 
                  onClick={() => setActiveTab('all')}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ 
                    backgroundColor: activeTab === 'all' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                    color: activeTab === 'all' ? 'white' : 'rgba(142, 142, 142, 1)',
                    border: activeTab === 'all' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
                  }}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveTab('unread')}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ 
                    backgroundColor: activeTab === 'unread' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                    color: activeTab === 'unread' ? 'white' : 'rgba(142, 142, 142, 1)',
                    border: activeTab === 'unread' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
                  }}
                >
                  Unread
                </button>
                <button 
                  onClick={() => setActiveTab('read')}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{ 
                    backgroundColor: activeTab === 'read' ? 'rgba(85, 92, 245, 1)' : 'transparent',
                    color: activeTab === 'read' ? 'white' : 'rgba(142, 142, 142, 1)',
                    border: activeTab === 'read' ? 'none' : '1px solid rgba(142, 142, 142, 0.3)'
                  }}
                >
                  Read
                </button>
              </div>

              {/* Notification Count */}
              <p className="text-sm mb-4" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
              </p>

              {/* Notifications List */}
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="p-4 rounded-2xl hover:shadow-sm transition-all cursor-pointer"
                    style={{ 
                      backgroundColor: notification.status === 'unread' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.6)',
                      border: notification.status === 'unread' ? '1px solid rgba(85, 92, 245, 0.2)' : '1px solid transparent'
                    }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ backgroundColor: 'rgba(240, 240, 255, 1)' }}
                      >
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: 'rgba(85, 92, 245, 1)' }}>
                          {notification.type}
                        </p>
                      </div>
                      <span className="text-xs whitespace-nowrap" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                        {notification.date}
                      </span>
                    </div>
                    <p className="text-sm ml-11" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Notification Detail View */
            <div className="h-[calc(100vh-120px)] flex flex-col">
              <div className="flex items-start gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: 'rgba(240, 240, 255, 1)' }}
                >
                  {selectedNotification.icon}
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold mb-1" style={{ color: 'rgba(85, 92, 245, 1)' }}>
                    {selectedNotification.type}
                  </p>
                  <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {selectedNotification.date}
                  </span>
                </div>
              </div>

              <div 
                className="flex-1 p-6 rounded-3xl text-base leading-[1.8] overflow-y-auto"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  color: 'rgba(75, 75, 75, 1)',
                  border: '1px solid rgba(226, 232, 240, 0.5)'
                }}
              >
                <div className="space-y-4">
                  {selectedNotification.fullMessage.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Delete button at bottom */}
              <div className="flex justify-center pt-6 mt-auto">
                <button 
                  className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-red-50 transition-all"
                  style={{ 
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(254, 242, 242, 1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(239, 68, 68, 1)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
