'use client'

import { useState } from 'react'
import { useAuth } from '../../app/utils/authcontext'
import Image from 'next/image'
import AppointmentDetailsPopup from './appointment-details-popup'

export default function AppointmentContent() {
  const { user, loading } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [packageFilter, setPackageFilter] = useState('All')
  const [showDropdown, setShowDropdown] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [showDetailsPopup, setShowDetailsPopup] = useState(false)
  const itemsPerPage = 10
  const totalPages = 10

  // Test Orders dummy data matching the UI
  const ordersData = [
    {
      id: '0000001',
      patientName: 'Anika Joshi',
      email: 'anika.joshi@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0000002',
      patientName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0000003',
      patientName: 'Rohan Kumar',
      email: 'rohan.kumar@example.com',
      packageType: 'Advanced Precision Longevity',
      createdOn: '4 Jan 25',
      status: 'Test booked',
      statusProgress: 25
    },
    {
      id: '0000004',
      patientName: 'Divya Patel',
      email: 'divya.patel@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0000005',
      patientName: 'Raj Malhotra',
      email: 'raj.malhotra@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0000006',
      patientName: 'Sneha Kapoor',
      email: 'sneha.kapoor@example.com',
      packageType: 'Advanced Precision Longevity',
      createdOn: '4 Jan 25',
      status: 'Test booked',
      statusProgress: 25
    },
    {
      id: '0000007',
      patientName: 'Arjun Reddy',
      email: 'arjun.reddy@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      status: 'Sample Collected',
      statusProgress: 75
    },
    {
      id: '0000001',
      patientName: 'Anika Joshi',
      email: 'anika.joshi@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      status: 'Sample Collected',
      statusProgress: 75
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
    } else if (packageType.includes('Advanced')) {
      return { 
        backgroundColor: 'rgba(182, 148, 90, 0.8)', 
        color: 'rgba(182, 148, 90, 1)'
      }
    }
    return { 
      backgroundColor: 'rgba(243, 244, 246, 1)', 
      color: 'rgba(75, 85, 99, 1)'
    }
  }

  // Filter orders based on search and filters
  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = 
      order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    const matchesPackage = packageFilter === 'All' || order.packageType === packageFilter

    return matchesSearch && matchesStatus && matchesPackage
  })

  // Paginate filtered orders
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  const handleRowClick = (order) => {
    setSelectedAppointment(order)
    setShowDetailsPopup(true)
  }

  const handleMoreAction = (orderId, action) => {
    console.log(`Action ${action} for order ${orderId}`)
    setShowDropdown(null)
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
        <span className="mx-2" style={{ color: 'rgba(0, 0, 0, 1)' }}>Appointment</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Test Orders</h1>
        <div className="flex items-center gap-3" style={{ color: 'rgba(142, 142, 142, 1)' }}>
          <span className="text-sm cursor-pointer hover:opacity-70">Export CSV</span>
          <div className="h-4 w-px" style={{ backgroundColor: 'rgba(142, 142, 142, 0.3)' }}></div>
          <span className="text-sm cursor-pointer hover:opacity-70">Export PDF</span>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px' }}>
        <div className="flex items-center gap-4">
          {/* Package Type Filter */}
          <div className="relative">
            <select
              value={packageFilter}
              onChange={(e) => setPackageFilter(e.target.value)}
              className="pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-0 appearance-none cursor-pointer"
              style={{ 
                backgroundColor: 'transparent',
                border: '1px solid rgba(202, 202, 202, 1)',
                borderRadius: '50px',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: '180px'
              }}
            >
              <option value="All">Package Type: All</option>
              <option value="Foundational Longevity">Foundational Longevity</option>
              <option value="Premium Longevity">Premium Longevity</option>
              <option value="Advanced Precision Longevity">Advanced Precision Longevity</option>
              <option value="Precision Longevity">Precision Longevity</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Test Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-0 appearance-none cursor-pointer"
              style={{ 
                backgroundColor: 'transparent',
                border: '1px solid rgba(202, 202, 202, 1)',
                borderRadius: '50px',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: '160px'
              }}
            >
              <option value="All">Test status: All</option>
              <option value="Test booked">Test booked</option>
              <option value="Sample Collected">Sample Collected</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-end">
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
                placeholder="Find a order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 text-sm focus:outline-none focus:ring-0"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(202, 202, 202, 1)',
                  borderRadius: '50px',
                  color: 'rgba(0, 0, 0, 1)'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  <div className="flex items-center gap-2">
                    Order ID
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
                    Patient Details
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
                    Package Type
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
                    Created on
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
                    Test status
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
              {paginatedOrders.map((order, index) => (
                <tr 
                  key={`${order.id}-${index}`} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                        {order.patientName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                          {order.patientName}
                        </div>
                        <div className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                          {order.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
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
                  <td className="px-6 py-4 text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {order.createdOn}
                  </td>
                  <td className="px-6 py-4" style={{ minWidth: '200px' }}>
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
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDropdown(showDropdown === `${order.id}-${index}` ? null : `${order.id}-${index}`)
                      }}
                      style={{ color: 'rgba(142, 142, 142, 1)' }}
                      className="hover:opacity-70"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>

                    {showDropdown === `${order.id}-${index}` && (
                      <div 
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMoreAction(order.id, 'view')
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            View Details
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMoreAction(order.id, 'edit')
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit Order
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMoreAction(order.id, 'contact')
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Contact Patient
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMoreAction(order.id, 'cancel')
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    )}
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Backdrop to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(null)}
        />
      )}

      {/* Appointment Details Popup */}
      <AppointmentDetailsPopup 
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        appointment={selectedAppointment}
      />
    </div>
  )
}

