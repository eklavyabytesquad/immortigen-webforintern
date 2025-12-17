'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../app/utils/authcontext'
import Image from 'next/image'

export default function PatientContent() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatients, setSelectedPatients] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = 10

  // Patient data with realistic diverse information
  const patientsData = [
    {
      id: '0000001',
      name: 'Anika Joshi',
      age: 28,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '2h ago',
      avatar: null
    },
    {
      id: '0000002',
      name: 'Priya Sharma',
      age: 34,
      gender: 'Female',
      healthRisk: 'Moderate',
      lastUpdate: '5h ago',
      avatar: null
    },
    {
      id: '0000003',
      name: 'Rohan Kumar',
      age: 42,
      gender: 'Male',
      healthRisk: 'High',
      lastUpdate: '1d ago',
      avatar: null
    },
    {
      id: '0000004',
      name: 'Divya Patel',
      age: 31,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '1d ago',
      avatar: null
    },
    {
      id: '0000005',
      name: 'Raj Malhotra',
      age: 56,
      gender: 'Male',
      healthRisk: 'Moderate',
      lastUpdate: '2d ago',
      avatar: null
    },
    {
      id: '0000006',
      name: 'Sneha Kapoor',
      age: 29,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '2d ago',
      avatar: null
    },
    {
      id: '0000007',
      name: 'Arjun Reddy',
      age: 38,
      gender: 'Male',
      healthRisk: 'Low',
      lastUpdate: '3d ago',
      avatar: null
    },
    {
      id: '0000008',
      name: 'Meera Desai',
      age: 45,
      gender: 'Female',
      healthRisk: 'Moderate',
      lastUpdate: '3d ago',
      avatar: null
    },
    {
      id: '0000009',
      name: 'Vikram Singh',
      age: 51,
      gender: 'Male',
      healthRisk: 'High',
      lastUpdate: '4d ago',
      avatar: null
    },
    {
      id: '0000010',
      name: 'Kavya Menon',
      age: 26,
      gender: 'Female',
      healthRisk: 'Low',
      lastUpdate: '4d ago',
      avatar: null
    }
  ]

  // Statistics
  const stats = {
    totalPatient: 48,
    activeTracking: 36,
    highRisk: 8,
    moderateRisk: 30,
    lowRisk: 10
  }

  // Get health risk badge color
  const getHealthRiskColor = (risk) => {
    switch (risk) {
      case 'Low':
        return { backgroundColor: 'rgba(21, 182, 108, 1)' }
      case 'Moderate':
        return { backgroundColor: 'rgba(246, 155, 27, 1)' }
      case 'High':
        return { backgroundColor: 'rgba(220, 38, 38, 1)' }
      default:
        return { backgroundColor: 'rgba(107, 114, 128, 1)' }
    }
  }

  // Filter patients based on search
  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  )

  // Paginate filtered patients
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex)

  // Toggle patient selection
  const togglePatientSelection = (patientId) => {
    setSelectedPatients(prev =>
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    )
  }

  // Toggle all patients selection
  const toggleAllSelection = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([])
    } else {
      setSelectedPatients(filteredPatients.map(p => p.id))
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mt-3" style={{ color: 'rgba(142, 142, 142, 1)' }}>
        <span className="mx-2">Immortigen</span>
        <span>/</span>
        <span className="mx-2" style={{ color: 'rgba(0, 0, 0, 1)' }}>Patients</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Patients</h1>
        <div className="flex items-center gap-3" style={{ color: 'rgba(142, 142, 142, 1)' }}>
          <span className="text-sm cursor-pointer hover:opacity-70">Export CSV</span>
          <div className="h-4 w-px" style={{ backgroundColor: 'rgba(142, 142, 142, 0.3)' }}></div>
          <span className="text-sm cursor-pointer hover:opacity-70">Export PDF</span>
        </div>
      </div>

      {/* Statistics Cards - Single Container */}
      <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="grid grid-cols-5 gap-0">
          <div className="px-4">
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(75, 75, 75, 1)' }}></div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Total Patient</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(75, 75, 75, 1)' }}>{stats.totalPatient}</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}></div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Active Tracking</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(85, 92, 245, 1)' }}>{stats.activeTracking}</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(255, 79, 69, 1)' }}></div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>High Risk Patient</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(255, 79, 69, 1)' }}>{stats.highRisk}</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(246, 155, 27, 1)' }}></div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Moderate Risk Patient</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(246, 155, 27, 1)' }}>{stats.moderateRisk}</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(21, 182, 108, 1)' }}></div>
              <p className="text-sm mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Low Risk Patient</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(21, 182, 108, 1)' }}>{stats.lowRisk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table with Search */}
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        {/* Search Bar */}
        <div className="p-6 flex justify-end">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Image
                src="/assets/dashbaord/Search.png"
                alt="Search"
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              placeholder="Find a patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-0 text-sm focus:outline-none focus:ring-0"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50px',
                color: 'rgba(0, 0, 0, 1)'
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                    onChange={toggleAllSelection}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    style={{ borderColor: 'rgba(142, 142, 142, 1)' }}
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    ID
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Patient Name
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Age
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Gender
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Health Risk
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Last Update
                    <Image
                      src="/assets/dashbaord/filter.png"
                      alt="Filter"
                      width={16}
                      height={16}
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
              {paginatedPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/dashboard/patients/${patient.id}`)}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => togglePatientSelection(patient.id)}
                      className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      style={{ borderColor: 'rgba(142, 142, 142, 1)' }}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {patient.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="ml-3 text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="inline-flex px-3 py-1 text-xs font-medium text-white"
                      style={{
                        ...getHealthRiskColor(patient.healthRisk),
                        borderRadius: '3px'
                      }}
                    >
                      {patient.healthRisk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {patient.lastUpdate}
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <button style={{ color: 'rgba(142, 142, 142, 1)' }} className="hover:opacity-70">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3 mt-6 mb-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center"
              style={{
                boxSizing: 'border-box',
                width: '32px',
                height: '32px',
                background: '#555CF5',
                borderRadius: '100px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
                border: 'none',
                padding: 0
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: 'rgba(75, 75, 75, 1)' }}>
                {currentPage}
              </span>
              <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                of {totalPages} pages
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center"
              style={{
                boxSizing: 'border-box',
                width: '32px',
                height: '32px',
                background: '#555CF5',
                borderRadius: '100px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
                border: 'none',
                padding: 0
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}