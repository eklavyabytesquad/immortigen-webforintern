'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotificationContent({ onClose }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('All')

  const notificationsData = [
    {
      id: 1,
      type: 'Changes in treatments',
      title: 'Changes in treatments',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '✦',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: false
    },
    {
      id: 2,
      type: 'Clinic',
      title: 'Clinic',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '⊕',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: false
    },
    {
      id: 3,
      type: 'Clinic',
      title: 'Clinic',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '⊕',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: false
    },
    {
      id: 4,
      type: 'Clinic',
      title: 'Clinic',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '⊕',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: false
    },
    {
      id: 5,
      type: 'Clinic',
      title: 'Clinic',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '⊕',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: true
    },
    {
      id: 6,
      type: 'Clinic',
      title: 'Clinic',
      message: 'Updated database will be on October 24-25, this may lead to a slight slowdown in the program.',
      time: '2d ago',
      icon: '⊕',
      iconBg: 'rgba(124, 130, 255, 0.2)',
      iconColor: 'rgba(85, 92, 245, 1)',
      isRead: true
    },
  ]

  const filteredNotifications = notificationsData.filter(notification => {
    if (activeTab === 'All') return true
    if (activeTab === 'Unread') return !notification.isRead
    if (activeTab === 'Read') return notification.isRead
    return true
  })

  return (
    <>
      {/* Backdrop/Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Notification Sliding Panel */}
      <div 
        className="fixed top-0 right-0 h-full z-50 shadow-2xl"
        style={{ 
          width: '40%',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          animation: 'slideInRight 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="hover:opacity-70 transition-opacity"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path 
                    d="M15 5L5 15M5 5L15 15" 
                    stroke="rgba(0, 0, 0, 1)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                Notification
              </h2>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {['All', 'Unread', 'Read'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab ? 'rgba(85, 92, 245, 1)' : 'rgba(243, 244, 246, 1)',
                  color: activeTab === tab ? 'rgba(255, 255, 255, 1)' : 'rgba(142, 142, 142, 1)',
                  borderRadius: '20px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notification Count */}
          <div className="mt-3">
            <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className="p-6 border-b hover:bg-gray-50 transition-colors cursor-pointer"
              style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div 
                  className="flex-shrink-0 flex items-center justify-center font-bold text-lg"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: notification.iconBg,
                    color: notification.iconColor
                  }}
                >
                  {notification.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-sm font-medium"
                        style={{ color: 'rgba(85, 92, 245, 1)' }}
                      >
                        {notification.title}
                      </span>
                      {!notification.isRead && (
                        <div 
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(85, 92, 245, 1)'
                          }}
                        ></div>
                      )}
                    </div>
                    <span className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(0, 0, 0, 1)', lineHeight: '1.5' }}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline Styles for Animation */}
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
    </>
  )
}
