'use client'

import { useAuth } from '../../app/utils/authcontext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LeftCard from './dashboard-new/left-card'
import RightCard from './dashboard-new/right-card'

export default function DashboardNewContent() {
  const { user, session, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }



  // Get current date
  const getCurrentDate = () => {
    const options = { weekday: 'long', month: 'short', day: 'numeric' }
    return new Date().toLocaleDateString('en-US', options)
  }

  // Appointments data
  const appointmentsData = [
    {
      id: '0002458',
      patientName: 'Anika Sharma',
      email: 'anika.sharma@gmail.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      status: 'Report Ready',
      statusProgress: 100
    },
    {
      id: '0002439',
      patientName: 'Rajesh Kumar',
      email: 'rajesh.k@yahoo.com',
      packageType: 'Premium Longevity',
      createdOn: '5d ago',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0002401',
      patientName: 'Priya Mehta',
      email: 'priya.mehta@outlook.com',
      packageType: 'Advanced Precision Longevity',
      createdOn: '1w ago',
      status: 'Lab Processing',
      statusProgress: 50
    }
  ]

  // Get package badge color
  const getPackageBadgeColor = (packageType) => {
    if (packageType.includes('Foundational')) {
      return { 
        backgroundColor: 'rgba(124, 130, 255, 0.5)', 
        color: 'rgba(85, 92, 245, 1)'
      }
    } else if (packageType.includes('Premium')) {
      return { 
        backgroundColor: 'rgba(229, 111, 159, 0.5)', 
        color: 'rgba(229, 111, 159, 1)'
      }
    }
    return { 
      backgroundColor: 'rgba(255, 193, 7, 0.5)', 
      color: 'rgba(255, 152, 0, 1)'
    }
  }

  return (
    <div className="min-h-screen p-1">
      {/* Header with Dashboard title and Date */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Dashboard</h1>
        <div className="flex items-center gap-2" style={{ color: 'rgba(142, 142, 142, 1)' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium">{getCurrentDate()}</span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="flex gap-6">
        {/* Left Card - 50% width */}
        <div className="flex-1">
          <LeftCard />
        </div>
        
        {/* Right Card - 50% width */}
        <div className="flex-1">
          <RightCard />
        </div>
      </div>

      {/* Appointments Section */}
      <div className="mt-6 overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(40px)' }}>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 1)' }}>Appointments</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    <div className="flex items-center gap-2">
                      Order ID
                      <Image
                        src="/assets/dashbaord/filter.png"
                        alt="Filter"
                        width={14}
                        height={14}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    <div className="flex items-center gap-2">
                      Patient Details
                      <Image
                        src="/assets/dashbaord/filter.png"
                        alt="Filter"
                        width={14}
                        height={14}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    <div className="flex items-center gap-2">
                      Package Type
                      <Image
                        src="/assets/dashbaord/filter.png"
                        alt="Filter"
                        width={14}
                        height={14}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    <div className="flex items-center gap-2">
                      Created on
                      <Image
                        src="/assets/dashbaord/filter.png"
                        alt="Filter"
                        width={14}
                        height={14}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    <div className="flex items-center gap-2">
                      Test status
                      <Image
                        src="/assets/dashbaord/filter.png"
                        alt="Filter"
                        width={14}
                        height={14}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(229, 231, 235, 0.5)' }}>
                {appointmentsData.map((order, index) => (
                  <tr 
                    key={`${order.id}-${index}`} 
                    className="hover:bg-white/30 transition-colors"
                  >
                    <td className="px-4 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {order.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                          {order.patientName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                            {order.patientName}
                          </div>
                          <div className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                            {order.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span 
                        className="inline-flex px-3 py-1 text-xs font-medium"
                        style={{
                          ...getPackageBadgeColor(order.packageType),
                          borderRadius: '50px'
                        }}
                      >
                        {order.packageType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {order.createdOn}
                    </td>
                    <td className="px-4 py-4" style={{ minWidth: '180px' }}>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium" style={{ color: 'rgba(85, 92, 245, 1)' }}>
                            {order.status}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2" style={{ backgroundColor: 'rgba(229, 231, 235, 1)' }}>
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${order.statusProgress}%`,
                              backgroundColor: 'rgba(85, 92, 245, 1)'
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        style={{ color: 'rgba(142, 142, 142, 1)' }}
                        className="hover:opacity-70"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => router.push('/dashboard/appointments')}
              className="text-sm font-medium transition-colors flex items-center gap-1 hover:opacity-70" 
              style={{ color: 'rgba(142, 142, 142, 1)' }}
            >
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
