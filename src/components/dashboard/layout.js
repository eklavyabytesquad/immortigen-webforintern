'use client'

import { useState } from 'react'
import { AuthProvider } from '../../app/utils/authcontext'
import SideNav from './side-nav'

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <AuthProvider>
      <div className="min-h-screen flex" style={{ backgroundColor: 'rgba(228, 233, 243, 1)' }}>
        <SideNav onCollapseChange={setIsCollapsed} />

        <div 
          className="flex-1 overflow-auto transition-all duration-300"
          style={{ marginLeft: isCollapsed ? '80px' : '256px' }}
        >
          <main className="py-6 px-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}