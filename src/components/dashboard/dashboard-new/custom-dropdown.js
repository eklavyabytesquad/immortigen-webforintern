'use client'

import { useState, useRef, useEffect } from 'react'

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select...' }) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(value ? [value] : [])
  const dropdownRef = useRef(null)

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
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full appearance-none rounded-full px-4 py-2 text-sm font-medium text-left flex items-center justify-between"
        style={{
          backgroundColor: 'transparent',
          backdropFilter: 'blur(80px)',
          color: 'rgba(75, 75, 75, 1)',
          border: '1px solid rgba(142, 142, 142, 0.3)'
        }}
      >
        <span>{value || placeholder}</span>
        <svg 
          className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            borderRadius: '12px'
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
                placeholder="Search"
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

          {/* Options List with Checkboxes */}
          <div className="flex-1 overflow-y-auto">
            {options
              .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((option) => (
                <label
                  key={option}
                  className="flex items-center cursor-pointer transition-all"
                  style={{
                    height: '44px',
                    padding: '12px 16px 12px 8px',
                    gap: '16px',
                    backgroundColor: value === option ? 'rgba(85, 92, 245, 0.06)' : 'transparent',
                    borderBottom: '1px solid #E1E1E1'
                  }}
                  onMouseEnter={(e) => {
                    if (value !== option) {
                      e.currentTarget.style.backgroundColor = 'rgba(85, 92, 245, 0.06)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (value !== option) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value === option}
                    onChange={() => {
                      onChange(option)
                    }}
                    className="cursor-pointer"
                    style={{
                      width: '14px',
                      height: '14px',
                      backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      border: '1px solid #8E8E8E',
                      borderRadius: '2px',
                      accentColor: 'rgba(85, 92, 245, 1)'
                    }}
                  />
                  <span 
                    style={{ 
                      color: '#4B4B4B',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: value === option ? 600 : 500,
                      lineHeight: '20px',
                      letterSpacing: '-0.02em',
                      marginLeft: '6px'
                    }}
                  >
                    {option}
                  </span>
                </label>
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
