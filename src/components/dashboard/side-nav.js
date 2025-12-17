'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '../../app/utils/authcontext'
import NotificationPopup from './dashboard-new/notification-popup'

const mainNavigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '/assets/dashbaord/dashboard.svg',
    pattern: /^\/dashboard$/
  },
  {
    name: 'Patients',
    href: '/dashboard/patients',
    icon: '/assets/dashbaord/patients.svg',
    pattern: /^\/dashboard\/patients/
  },
  {
    name: 'Appointments',
    href: '/dashboard/appointments',
    icon: '/assets/dashbaord/calendar.svg',
    pattern: /^\/dashboard\/appointments/
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: '/assets/dashbaord/reports.svg',
    pattern: /^\/dashboard\/reports/
  }
]

const bottomNavigation = [
  {
    name: 'Notification',
    href: '#',
    icon: '/assets/dashbaord/notification1.svg',
    isNotification: true
  },
  {
    name: 'Support',
    href: '#',
    icon: '/assets/dashbaord/support.svg'
  },
  {
    name: 'Settings',
    href: '#',
    icon: '/assets/dashbaord/setting.svg'
  }
]

export default function SideNav({ onClose = () => {}, onCollapseChange }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showNotificationPopup, setShowNotificationPopup] = useState(false)

  const toggleCollapse = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    if (onCollapseChange) {
      onCollapseChange(newState)
    }
  }

  return (
    <>
      <aside
        className={`flex flex-col border-r border-gray-200 fixed left-0 top-0 transition-all duration-300 z-[9998] ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', height: '100vh' }}
      >
        <div className="flex items-center justify-center py-6 px-6">
          {isCollapsed ? (
            <div 
              className="w-10 h-10"
              style={{
                WebkitMask: 'url(/logo2.png) center / contain no-repeat',
                mask: 'url(/logo2.png) center / contain no-repeat',
                backgroundColor: 'rgba(75, 75, 75, 1)'
              }}
            />
          ) : (
            <Image 
              src="/Logo1.svg" 
              alt="Immortigen logo" 
              width={150} 
              height={40} 
              priority 
            />
          )}
        </div>

      <nav className="px-4 space-y-2">
        {mainNavigation.map((item) => {
          const isActive = item.pattern ? item.pattern.test(pathname) : pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-sm font-medium transition-all ${
                isActive ? '' : ''
              } ${
                isActive ? 'text-white' : 'text-[rgba(75,75,75,1)]'
              }`}
              style={
                isActive
                  ? { backgroundColor: 'rgba(85, 92, 245, 1)', borderRadius: '6px' }
                  : {}
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'rgba(85, 92, 245, 0.08)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
              title={isCollapsed ? item.name : ''}
            >
              <span
                className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`}
                style={{
                  WebkitMask: `url(${item.icon}) center / contain no-repeat`,
                  mask: `url(${item.icon}) center / contain no-repeat`,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(75, 75, 75, 1)'
                }}
              />
              {!isCollapsed && item.name}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-4 pb-6 space-y-2">
        {bottomNavigation.map((item) => (
          item.isNotification ? (
            <button
              key={item.name}
              onClick={() => setShowNotificationPopup(true)}
              className={`group flex items-center w-full ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-sm font-medium text-[rgba(75,75,75,1)] rounded-md transition-all relative`}
              style={{}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(85, 92, 245, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              title={isCollapsed ? item.name : ''}
            >
              <span
                className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`}
                style={{
                  WebkitMask: `url(${item.icon}) center / contain no-repeat`,
                  mask: `url(${item.icon}) center / contain no-repeat`,
                  backgroundColor: 'rgba(75, 75, 75, 1)'
                }}
              />
              {!isCollapsed && item.name}
              {!isCollapsed && (
                <span className="absolute top-2 left-7 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
              {isCollapsed && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </button>
          ) : (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            className={`group flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} py-3 text-sm font-medium text-[rgba(75,75,75,1)] rounded-md transition-all relative`}
            style={{}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(85, 92, 245, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
            title={isCollapsed ? item.name : ''}
          >
            <span
              className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`}
              style={{
                WebkitMask: `url(${item.icon}) center / contain no-repeat`,
                mask: `url(${item.icon}) center / contain no-repeat`,
                backgroundColor: 'rgba(75, 75, 75, 1)'
              }}
            />
            {!isCollapsed && item.name}
          </Link>
          )
        ))}

        {/* Divider Line */}
        <div className="pt-3 -mx-4">
          <div className="border-t border-gray-300"></div>
        </div>

        {/* User Profile Section */}
        {!isCollapsed ? (
          <div className="pt-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">
                    {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.full_name || 'John Wick'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.company_name || 'Immortigen'}
                  </p>
                </div>
              </div>
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="pt-3 flex justify-center">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
          </div>
        )}
      </div>
      </aside>

      {/* Collapse Toggle Button - Outside Sidebar */}
      <button
        onClick={toggleCollapse}
        className={`fixed top-6 z-[9998] py-3 px-1 transition-all duration-300 ${
          isCollapsed ? 'left-[80px]' : 'left-[256px]'
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'all 0.3s ease-in-out',
          borderTopRightRadius: '0.375rem',
          borderBottomRightRadius: '0.375rem',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0'
        }}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-4 h-4 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Notification Popup */}
      <NotificationPopup 
        isOpen={showNotificationPopup} 
        onClose={() => setShowNotificationPopup(false)} 
      />
    </>
  )
}
