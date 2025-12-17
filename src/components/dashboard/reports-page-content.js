'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ReportsContent({ patient }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [packageFilter, setPackageFilter] = useState('All')
  const [showPackageDropdown, setShowPackageDropdown] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = 10

  const reportsData = [
    {
      id: '0000001',
      patientName: 'Anika Joshi',
      email: 'anika.joshi@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      avatar: '/assets/dashbaord/avatar-1.png',
      downloadPath: '/downloads/360-report.pdf'
    },
    {
      id: '0000002',
      patientName: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      avatar: '/assets/dashbaord/avatar-1.png',
      downloadPath: '/downloads/360-report.pdf'
    },
    {
      id: '0000003',
      patientName: 'Rohan Kumar',
      email: 'rohan.kumar@example.com',
      packageType: 'Advanced Precision Longevity',
      createdOn: '4 Jan 25',
      avatar: '/assets/dashbaord/avatar-1.png',
      downloadPath: '/downloads/360-report.pdf'
    },
    {
      id: '0000004',
      patientName: 'Divya Patel',
      email: 'divya.patel@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      avatar: '/assets/dashbaord/avatar-1.png'
    },
    {
      id: '0000005',
      patientName: 'Raj Malhotra',
      email: 'raj.malhotra@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      avatar: '/assets/dashbaord/avatar-1.png'
    },
    {
      id: '0000006',
      patientName: 'Sneha Kapoor',
      email: 'sneha.kapoor@example.com',
      packageType: 'Advanced Precision Longevity',
      createdOn: '4 Jan 25',
      avatar: '/assets/dashbaord/avatar-1.png'
    },
    {
      id: '0000007',
      patientName: 'Arjun Reddy',
      email: 'arjun.reddy@example.com',
      packageType: 'Foundational Longevity',
      createdOn: '2d ago',
      avatar: '/assets/dashbaord/avatar-1.png'
    },
    {
      id: '0000001',
      patientName: 'Anika Joshi',
      email: 'anika.joshi@example.com',
      packageType: 'Premium Longevity',
      createdOn: '8 Feb 25',
      avatar: '/assets/dashbaord/avatar-1.png'
    },
  ]

  const handleDownload = (report) => {
    if (report.downloadPath) {
      const link = document.createElement('a')
      link.href = report.downloadPath
      link.download = `${report.patientName}-report.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const getPackageBadgeColor = (packageType) => {
    const colors = {
      'Foundational Longevity': {
        backgroundColor: 'rgba(124, 130, 255, 0.5)',
        color: 'rgba(85, 92, 245, 1)'
      },
      'Premium Longevity': {
        backgroundColor: 'rgba(229, 111, 159, 0.5)',
        color: 'rgba(229, 111, 159, 1)'
      },
      'Advanced Precision Longevity': {
        backgroundColor: 'rgba(182, 148, 90, 0.8)',
        color: 'rgba(182, 148, 90, 1)'
      }
    }
    return colors[packageType] || colors['Foundational Longevity']
  }

  const filteredReports = reportsData.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPackage = packageFilter === 'All' || report.packageType === packageFilter
    return matchesSearch && matchesPackage
  })

  // Paginate filtered reports
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReports = filteredReports.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="p-6">
      {/* Breadcrumb */}
      <div className="mb-6">
        <span style={{ color: 'rgba(142, 142, 142, 1)', fontSize: '14px' }}>
          Immortigen / <span style={{ color: 'rgba(0, 0, 0, 1)' }}>Report</span>
        </span>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>
          Reports
        </h1>
        <div className="flex items-center gap-4">
          <button 
            className="px-4 py-2 text-sm font-medium"
            style={{ color: 'rgba(142, 142, 142, 1)' }}
          >
            Export CSV
          </button>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'rgba(202, 202, 202, 1)' }}></div>
          <button 
            className="px-4 py-2 text-sm font-medium"
            style={{ color: 'rgba(142, 142, 142, 1)' }}
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Main Content Container - Filters, Search and Table */}
      <div className="p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px' }}>
        {/* Filters and Search Section */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            {/* Package Type Dropdown */}
            <div className="relative">
            <button
              onClick={() => setShowPackageDropdown(!showPackageDropdown)}
              className="px-4 py-2 text-sm flex items-center gap-2"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(202, 202, 202, 1)',
                borderRadius: '50px',
                color: 'rgba(0, 0, 0, 1)',
                minWidth: '200px'
              }}
            >
              <span>Package Type: {packageFilter}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="rgba(0, 0, 0, 1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showPackageDropdown && (
              <div 
                className="absolute top-full left-0 mt-2 py-2 z-50"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  border: '1px solid rgba(202, 202, 202, 1)',
                  borderRadius: '8px',
                  minWidth: '250px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              >
                {['All', 'Foundational Longevity', 'Premium Longevity', 'Advanced Precision Longevity'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setPackageFilter(type)
                      setShowPackageDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    style={{ color: 'rgba(0, 0, 0, 1)' }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Image
              src="/assets/dashbaord/Search.png"
              alt="Search"
              width={18}
              height={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="Find report..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-12 text-sm outline-none"
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

        {/* Table Section */}
        <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'transparent' }}>
          {/* Table Header */}
        <div className="grid gap-4 px-6 py-4" style={{ gridTemplateColumns: '100px 1fr 200px 150px 80px', borderBottom: '1px solid rgba(229, 231, 235, 0.5)' }}>
          <div className="flex items-center">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Report ID
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Patient Details
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Package Type
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Created on
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60"
            />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Actions
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div>
          {paginatedReports.map((report, index) => (
            <div
              key={`${report.id}-${index}`}
              className="grid gap-4 px-6 py-4"
              style={{ 
                gridTemplateColumns: '100px 1fr 200px 150px 80px',
                borderBottom: index < paginatedReports.length - 1 ? '1px solid rgba(229, 231, 235, 0.5)' : 'none'
              }}
            >
              {/* Report ID */}
              <div className="flex items-center">
                <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  {report.id}
                </span>
              </div>

              {/* Patient Details */}
              <div className="flex items-center gap-3">
                <div 
                  className="flex-shrink-0 flex items-center justify-center text-white font-medium text-sm"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(85, 92, 245, 1) 0%, rgba(124, 130, 255, 1) 100%)'
                  }}
                >
                  {report.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    {report.patientName}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                    {report.email}
                  </div>
                </div>
              </div>

              {/* Package Type */}
              <div className="flex items-center">
                <span
                  className="px-3 py-1 text-xs font-medium"
                  style={{
                    ...getPackageBadgeColor(report.packageType),
                    borderRadius: '50px'
                  }}
                >
                  {report.packageType}
                </span>
              </div>

              {/* Created On */}
              <div className="flex items-center">
                <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  {report.createdOn}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3 relative">
                <button className="hover:opacity-70 transition-opacity" title="View">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M1 10C1 10 4 4 10 4C16 4 19 10 19 10C19 10 16 16 10 16C4 16 1 10 1 10Z"
                      stroke="rgba(142, 142, 142, 1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                      stroke="rgba(142, 142, 142, 1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button 
                  className="hover:opacity-70 transition-opacity" 
                  title="Download"
                  onClick={() => handleDownload(report)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17 13V16C17 16.5304 16.7893 17.0391 16.4142 17.4142C16.0391 17.7893 15.5304 18 15 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V13"
                      stroke="rgba(142, 142, 142, 1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 9L10 13L14 9"
                      stroke="rgba(142, 142, 142, 1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 13V2"
                      stroke="rgba(142, 142, 142, 1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button 
                  className="hover:opacity-70 transition-opacity"
                  onClick={() => setShowActionMenu(showActionMenu === index ? null : index)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="5" r="1.5" fill="rgba(142, 142, 142, 1)"/>
                    <circle cx="10" cy="10" r="1.5" fill="rgba(142, 142, 142, 1)"/>
                    <circle cx="10" cy="15" r="1.5" fill="rgba(142, 142, 142, 1)"/>
                  </svg>
                </button>
                {showActionMenu === index && (
                  <div 
                    className="absolute right-0 top-full mt-2 py-2 z-50"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                      border: '1px solid rgba(202, 202, 202, 1)',
                      borderRadius: '8px',
                      minWidth: '150px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                      View Details
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                      Download
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50" style={{ color: 'rgba(229, 62, 62, 1)' }}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

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

      {/* Dropdown Backdrop */}
      {(showPackageDropdown || showActionMenu !== null) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowPackageDropdown(false)
            setShowActionMenu(null)
          }}
        />
      )}
    </div>
  )
}
