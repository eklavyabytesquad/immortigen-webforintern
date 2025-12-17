'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ReportsContent({ patient }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedReports, setSelectedReports] = useState([])
  const [viewingReport, setViewingReport] = useState(null)

  const reportsData = [
    {
      id: 1,
      name: 'Multiomics report',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago',
      downloadPath: '/downloads/360-report.pdf'
    },
    {
      id: 2,
      name: 'Genomics report',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago'
    },
    {
      id: 3,
      name: 'Blood Report',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago'
    },
    {
      id: 4,
      name: 'Recommendation',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago'
    },
    {
      id: 5,
      name: '360° integrated report',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago',
      downloadPath: '/downloads/360-report.pdf'
    },
    {
      id: 5,
      name: 'Metagenomic report',
      createdOn: '18 Aug, 2025',
      lastOpened: '3d ago'
    },
  ]

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReports(reportsData.map(r => r.id))
    } else {
      setSelectedReports([])
    }
  }

  const handleSelectReport = (id) => {
    if (selectedReports.includes(id)) {
      setSelectedReports(selectedReports.filter(r => r !== id))
    } else {
      setSelectedReports([...selectedReports, id])
    }
  }

  const handleView = (report) => {
    if (report.downloadPath) {
      // Open PDF in a new browser tab
      window.open(report.downloadPath, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = (report) => {
    if (report.downloadPath) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = report.downloadPath
      link.download = report.name + '.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const closeViewer = () => {
    setViewingReport(null)
  }

  const filteredReports = reportsData.filter(report =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        {/* Search Bar - Right Aligned */}
      <div className="flex justify-end mb-6">
        <div className="relative" style={{ width: '400px' }}>
          <input
            type="text"
            placeholder="Find a report..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-12 rounded-full outline-none"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              border: '1px solid rgba(229, 231, 235, 1)',
              color: 'rgba(0, 0, 0, 1)'
            }}
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
              stroke="rgba(142, 142, 142, 1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 19L14.65 14.65"
              stroke="rgba(142, 142, 142, 1)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'transparent' }}>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b" style={{ borderColor: 'rgba(229, 231, 235, 1)' }}>
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedReports.length === reportsData.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded cursor-pointer"
              style={{ accentColor: 'rgba(85, 92, 245, 1)' }}
            />
          </div>
          <div className="col-span-5 flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Report Name
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60 hover:opacity-100"
            />
          </div>
          <div className="col-span-3 flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Created on
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60 hover:opacity-100"
            />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Last Opened
            </span>
            <Image
              src="/assets/dashbaord/filter.png"
              alt="Filter"
              width={14}
              height={14}
              className="cursor-pointer opacity-60 hover:opacity-100"
            />
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <span className="text-sm font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
              Action
            </span>
          </div>
        </div>

        {/* Table Body */}
        <div>
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b hover:bg-white/30 transition-colors"
              style={{ borderColor: 'rgba(229, 231, 235, 1)' }}
            >
              <div className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  checked={selectedReports.includes(report.id)}
                  onChange={() => handleSelectReport(report.id)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ accentColor: 'rgba(85, 92, 245, 1)' }}
                />
              </div>
              <div className="col-span-5 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/dashbaord/pdf.png"
                    alt="PDF"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  {report.name}
                </span>
              </div>
              <div className="col-span-3 flex items-center">
                <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  {report.createdOn}
                </span>
              </div>
              <div className="col-span-2 flex items-center">
                <span className="text-sm" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                  {report.lastOpened}
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-center gap-3">
                <button 
                  className="hover:opacity-70 transition-opacity" 
                  title="View"
                  onClick={() => handleView(report)}
                >
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
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}
