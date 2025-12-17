'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../utils/authcontext'
import DashboardLayout from '../../../components/dashboard/layout'
import NotificationContent from '../../../components/dashboard/notification-content'

export default function Notification() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Show notification panel when component mounts
    setShowNotification(true)
  }, [])

  const handleClose = () => {
    setShowNotification(false)
    // Navigate back to previous page or dashboard
    router.back()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout>
      {showNotification && <NotificationContent onClose={handleClose} />}
    </DashboardLayout>
  )
}
