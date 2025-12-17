'use client'

import { useState, useRef, useEffect } from 'react'

export default function PatientDropdown({ patients, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef(null)

  const selectedPatient = patients.find(p => p.id === value) || patients[0]

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2 rounded-full cursor-pointer"
        style={{
          backgroundColor: 'transparent',
          border: '1px solid rgba(202, 202, 202, 1)',
          minWidth: '320px'
        }}
      >
        <div 
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold text-xs"
          style={{
            backgroundColor: 'rgba(85, 92, 245, 1)'
          }}
        >
          {getInitials(selectedPatient.name)}
        </div>
        <span 
          className="flex-1 text-left font-medium text-sm"
          style={{
            color: 'rgba(75, 75, 75, 1)'
          }}
        >
          {selectedPatient.name}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          width="14" 
          height="14" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="rgba(142, 142, 142, 1)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 flex flex-col"
          style={{
            maxHeight: '304px',
            padding: '24px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(40px)',
            boxShadow: '-7px 0px 20px rgba(97, 97, 97, 0.25)',
            borderRadius: '12px',
            minWidth: '320px'
          }}
        >
          {/* Search Input */}
          <div className="mb-4">
            <div className="relative flex items-center" style={{ height: '36px' }}>
              <svg 
                className="absolute left-3 w-5 h-5"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ color: 'rgba(142, 142, 142, 1)' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 text-sm rounded-full focus:outline-none"
                style={{
                  height: '36px',
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  border: '1px solid #E1E1E1',
                  backdropFilter: 'blur(20px)',
                  color: 'rgba(75, 75, 75, 1)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: '-0.02em'
                }}
              />
            </div>
          </div>

          {/* Options List with Profile Circles */}
          <div className="flex-1 overflow-y-auto">
            {patients
              .filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => {
                    onChange(patient.id)
                    setIsOpen(false)
                  }}
                  className="flex items-center cursor-pointer transition-all"
                  style={{
                    height: '44px',
                    padding: '12px 16px 12px 8px',
                    gap: '12px',
                    backgroundColor: value === patient.id ? 'rgba(85, 92, 245, 0.06)' : 'transparent',
                    borderBottom: '1px solid #E1E1E1'
                  }}
                  onMouseEnter={(e) => {
                    if (value !== patient.id) {
                      e.currentTarget.style.backgroundColor = 'rgba(85, 92, 245, 0.06)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== patient.id) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <div 
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold"
                    style={{
                      backgroundColor: 'rgba(85, 92, 245, 1)',
                      fontSize: '11px'
                    }}
                  >
                    {getInitials(patient.name)}
                  </div>
                  <span 
                    style={{ 
                      color: '#4B4B4B',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: value === patient.id ? 600 : 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {patient.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <style jsx>{`
        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
        
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
