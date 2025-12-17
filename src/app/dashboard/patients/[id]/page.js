'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuth } from '../../../utils/authcontext'
import DashboardLayout from '../../../../components/dashboard/layout'
import PatientDetailsContent from '../../../../components/dashboard/patient-details-content'

export default function PatientDetails() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

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
      <PatientDetailsContent patientId={params.id} />
    </DashboardLayout>
  )
}
