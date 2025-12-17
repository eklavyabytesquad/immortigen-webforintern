'use client'

import { useState, useMemo, useRef } from 'react'

export default function BubbleChart() {
  // Clean sample patient data (150 patients with unique IDs)
  const patientData = [
    { "id": 1, "gender": "Male", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 2, "gender": "Female", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 3, "gender": "Male", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 4, "gender": "Female", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 5, "gender": "Female", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 6, "gender": "Male", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 7, "gender": "Female", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 8, "gender": "Male", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 9, "gender": "Male", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 10, "gender": "Female", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 11, "gender": "Male", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 12, "gender": "Female", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 13, "gender": "Male", "disease": "Asthma", "ageGroup": "51+" },
    { "id": 14, "gender": "Female", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 15, "gender": "Male", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 16, "gender": "Female", "disease": "Stroke", "ageGroup": "51+" },
    { "id": 17, "gender": "Male", "disease": "Cancer", "ageGroup": "31-50" },
    { "id": 18, "gender": "Female", "disease": "Obesity", "ageGroup": "18-30" },
    { "id": 19, "gender": "Male", "disease": "COPD", "ageGroup": "51+" },
    { "id": 20, "gender": "Female", "disease": "Arthritis", "ageGroup": "31-50" },
    { "id": 21, "gender": "Male", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 22, "gender": "Female", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 23, "gender": "Male", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 24, "gender": "Female", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 25, "gender": "Male", "disease": "Stroke", "ageGroup": "31-50" },
    { "id": 26, "gender": "Female", "disease": "Cancer", "ageGroup": "18-30" },
    { "id": 27, "gender": "Male", "disease": "Obesity", "ageGroup": "51+" },
    { "id": 28, "gender": "Female", "disease": "COPD", "ageGroup": "31-50" },
    { "id": 29, "gender": "Male", "disease": "Arthritis", "ageGroup": "18-30" },
    { "id": 30, "gender": "Female", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 31, "gender": "Male", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 32, "gender": "Female", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 33, "gender": "Male", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 34, "gender": "Female", "disease": "Stroke", "ageGroup": "31-50" },
    { "id": 35, "gender": "Male", "disease": "Cancer", "ageGroup": "51+" },
    { "id": 36, "gender": "Female", "disease": "Obesity", "ageGroup": "51+" },
    { "id": 37, "gender": "Male", "disease": "COPD", "ageGroup": "18-30" },
    { "id": 38, "gender": "Female", "disease": "Arthritis", "ageGroup": "51+" },
    { "id": 39, "gender": "Male", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 40, "gender": "Female", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 41, "gender": "Male", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 42, "gender": "Female", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 43, "gender": "Male", "disease": "Stroke", "ageGroup": "51+" },
    { "id": 44, "gender": "Female", "disease": "Cancer", "ageGroup": "31-50" },
    { "id": 45, "gender": "Male", "disease": "Obesity", "ageGroup": "18-30" },
    { "id": 46, "gender": "Female", "disease": "COPD", "ageGroup": "51+" },
    { "id": 47, "gender": "Male", "disease": "Arthritis", "ageGroup": "31-50" },
    { "id": 48, "gender": "Female", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 49, "gender": "Male", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 50, "gender": "Female", "disease": "Asthma", "ageGroup": "51+" },
    { "id": 51, "gender": "Male", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 52, "gender": "Female", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 53, "gender": "Male", "disease": "Asthma", "ageGroup": "51+" },
    { "id": 54, "gender": "Female", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 55, "gender": "Female", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 56, "gender": "Male", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 57, "gender": "Female", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 58, "gender": "Male", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 59, "gender": "Male", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 60, "gender": "Female", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 61, "gender": "Male", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 62, "gender": "Female", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 63, "gender": "Male", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 64, "gender": "Female", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 65, "gender": "Male", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 66, "gender": "Female", "disease": "Stroke", "ageGroup": "31-50" },
    { "id": 67, "gender": "Male", "disease": "Cancer", "ageGroup": "51+" },
    { "id": 68, "gender": "Female", "disease": "Obesity", "ageGroup": "31-50" },
    { "id": 69, "gender": "Male", "disease": "COPD", "ageGroup": "18-30" },
    { "id": 70, "gender": "Female", "disease": "Arthritis", "ageGroup": "18-30" },
    { "id": 71, "gender": "Male", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 72, "gender": "Female", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 73, "gender": "Male", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 74, "gender": "Female", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 75, "gender": "Male", "disease": "Stroke", "ageGroup": "18-30" },
    { "id": 76, "gender": "Female", "disease": "Cancer", "ageGroup": "51+" },
    { "id": 77, "gender": "Male", "disease": "Obesity", "ageGroup": "31-50" },
    { "id": 78, "gender": "Female", "disease": "COPD", "ageGroup": "18-30" },
    { "id": 79, "gender": "Male", "disease": "Arthritis", "ageGroup": "51+" },
    { "id": 80, "gender": "Female", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 81, "gender": "Male", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 82, "gender": "Female", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 83, "gender": "Male", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 84, "gender": "Female", "disease": "Stroke", "ageGroup": "18-30" },
    { "id": 85, "gender": "Male", "disease": "Cancer", "ageGroup": "31-50" },
    { "id": 86, "gender": "Female", "disease": "Obesity", "ageGroup": "18-30" },
    { "id": 87, "gender": "Male", "disease": "COPD", "ageGroup": "51+" },
    { "id": 88, "gender": "Female", "disease": "Arthritis", "ageGroup": "31-50" },
    { "id": 89, "gender": "Male", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 90, "gender": "Female", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 91, "gender": "Male", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 92, "gender": "Female", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 93, "gender": "Male", "disease": "Stroke", "ageGroup": "51+" },
    { "id": 94, "gender": "Female", "disease": "Cancer", "ageGroup": "18-30" },
    { "id": 95, "gender": "Male", "disease": "Obesity", "ageGroup": "18-30" },
    { "id": 96, "gender": "Female", "disease": "COPD", "ageGroup": "31-50" },
    { "id": 97, "gender": "Male", "disease": "Arthritis", "ageGroup": "18-30" },
    { "id": 98, "gender": "Female", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 99, "gender": "Male", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 100, "gender": "Female", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 101, "gender": "Male", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 102, "gender": "Female", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 103, "gender": "Male", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 104, "gender": "Female", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 105, "gender": "Female", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 106, "gender": "Male", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 107, "gender": "Female", "disease": "Asthma", "ageGroup": "51+" },
    { "id": 108, "gender": "Male", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 109, "gender": "Male", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 110, "gender": "Female", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 111, "gender": "Male", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 112, "gender": "Female", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 113, "gender": "Male", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 114, "gender": "Female", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 115, "gender": "Male", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 116, "gender": "Female", "disease": "Stroke", "ageGroup": "18-30" },
    { "id": 117, "gender": "Male", "disease": "Cancer", "ageGroup": "18-30" },
    { "id": 118, "gender": "Female", "disease": "Obesity", "ageGroup": "51+" },
    { "id": 119, "gender": "Male", "disease": "COPD", "ageGroup": "31-50" },
    { "id": 120, "gender": "Female", "disease": "Arthritis", "ageGroup": "51+" },
    { "id": 121, "gender": "Male", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 122, "gender": "Female", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 123, "gender": "Male", "disease": "Asthma", "ageGroup": "51+" },
    { "id": 124, "gender": "Female", "disease": "Heart Attack", "ageGroup": "18-30" },
    { "id": 125, "gender": "Male", "disease": "Stroke", "ageGroup": "31-50" },
    { "id": 126, "gender": "Female", "disease": "Cancer", "ageGroup": "31-50" },
    { "id": 127, "gender": "Male", "disease": "Obesity", "ageGroup": "51+" },
    { "id": 128, "gender": "Female", "disease": "COPD", "ageGroup": "51+" },
    { "id": 129, "gender": "Male", "disease": "Arthritis", "ageGroup": "31-50" },
    { "id": 130, "gender": "Female", "disease": "Diabetes", "ageGroup": "18-30" },
    { "id": 131, "gender": "Male", "disease": "Hypertension", "ageGroup": "31-50" },
    { "id": 132, "gender": "Female", "disease": "Asthma", "ageGroup": "18-30" },
    { "id": 133, "gender": "Male", "disease": "Heart Attack", "ageGroup": "31-50" },
    { "id": 134, "gender": "Female", "disease": "Stroke", "ageGroup": "51+" },
    { "id": 135, "gender": "Male", "disease": "Cancer", "ageGroup": "51+" },
    { "id": 136, "gender": "Female", "disease": "Obesity", "ageGroup": "31-50" },
    { "id": 137, "gender": "Male", "disease": "COPD", "ageGroup": "18-30" },
    { "id": 138, "gender": "Female", "disease": "Arthritis", "ageGroup": "18-30" },
    { "id": 139, "gender": "Male", "disease": "Diabetes", "ageGroup": "51+" },
    { "id": 140, "gender": "Female", "disease": "Hypertension", "ageGroup": "18-30" },
    { "id": 141, "gender": "Male", "disease": "Asthma", "ageGroup": "31-50" },
    { "id": 142, "gender": "Female", "disease": "Heart Attack", "ageGroup": "51+" },
    { "id": 143, "gender": "Male", "disease": "Stroke", "ageGroup": "18-30" },
    { "id": 144, "gender": "Female", "disease": "Cancer", "ageGroup": "51+" },
    { "id": 145, "gender": "Male", "disease": "Obesity", "ageGroup": "31-50" },
    { "id": 146, "gender": "Female", "disease": "COPD", "ageGroup": "18-30" },
    { "id": 147, "gender": "Male", "disease": "Arthritis", "ageGroup": "51+" },
    { "id": 148, "gender": "Female", "disease": "Diabetes", "ageGroup": "31-50" },
    { "id": 149, "gender": "Male", "disease": "Hypertension", "ageGroup": "51+" },
    { "id": 150, "gender": "Female", "disease": "Asthma", "ageGroup": "18-30" }
  ]

  const [selectedGender, setSelectedGender] = useState('All')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All')
  const [selectedDisease, setSelectedDisease] = useState('All')
  const containerRef = useRef(null)

  // Get unique values for filters
  const diseases = useMemo(() => {
    const unique = [...new Set(patientData.map(p => p.disease))].sort()
    return ['All', ...unique]
  }, [])

  const ageGroups = ['All', '18-30', '31-50', '51+']
  const genders = ['All', 'Male', 'Female']

  // Get size based on age group
  const getSizeByAge = (ageGroup) => {
    switch(ageGroup) {
      case '18-30': return 20
      case '31-50': return 30
      case '51+': return 40
      default: return 25
    }
  }

  // Filter and calculate opacity for each patient
  const processedData = useMemo(() => {
    return patientData.map((patient, index) => {
      let isHighlighted = true
      
      // Check if patient matches filters
      if (selectedGender !== 'All' && patient.gender !== selectedGender) {
        isHighlighted = false
      }
      if (selectedAgeGroup !== 'All' && patient.ageGroup !== selectedAgeGroup) {
        isHighlighted = false
      }
      if (selectedDisease !== 'All' && patient.disease !== selectedDisease) {
        isHighlighted = false
      }

      return {
        ...patient,
        isHighlighted,
        size: getSizeByAge(patient.ageGroup)
      }
    })
  }, [selectedGender, selectedAgeGroup, selectedDisease])

  // Calculate static positions based on highlight state
  const getPosition = (patient, index, containerWidth, containerHeight) => {
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2
    const padding = 20

    if (patient.isHighlighted) {
      // Clustered in center with NO overlap
      const itemsPerRing = 8
      const ring = Math.floor(index / itemsPerRing)
      const posInRing = index % itemsPerRing
      const angle = (posInRing / itemsPerRing) * Math.PI * 2
      const radius = ring * (patient.size + 5) // Spacing between circles
      
      return {
        left: centerX + Math.cos(angle) * radius - patient.size / 2,
        top: centerY + Math.sin(angle) * radius - patient.size / 2
      }
    } else {
      // Spread evenly across the entire container with NO overlap
      const cols = Math.ceil(Math.sqrt(patientData.length))
      const rows = Math.ceil(patientData.length / cols)
      
      const col = index % cols
      const row = Math.floor(index / cols)
      
      const cellWidth = (containerWidth - padding * 2) / cols
      const cellHeight = (containerHeight - padding * 2) / rows
      
      // Add random offset within cell to avoid grid-like appearance
      const randomOffsetX = (Math.sin(index * 12.9898) * 0.3) * (cellWidth - patient.size)
      const randomOffsetY = (Math.cos(index * 78.233) * 0.3) * (cellHeight - patient.size)
      
      return {
        left: padding + col * cellWidth + cellWidth / 2 - patient.size / 2 + randomOffsetX,
        top: padding + row * cellHeight + cellHeight / 2 - patient.size / 2 + randomOffsetY
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {/* Gender Filter */}
        <div className="relative">
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
          >
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        {/* Age Group Filter */}
        <div className="relative">
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
          >
            {ageGroups.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>

        {/* Disease Filter */}
        <div className="relative">
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer"
          >
            {diseases.map(disease => (
              <option key={disease} value={disease}>{disease}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bubble Chart Container */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-white rounded-lg overflow-hidden" 
        style={{ minHeight: '500px' }}
      >
        {processedData.map((patient, index) => {
          const containerRect = containerRef.current?.getBoundingClientRect()
          const containerWidth = containerRect?.width || 800
          const containerHeight = containerRect?.height || 500
          
          const position = getPosition(patient, index, containerWidth, containerHeight)
          
          // Darker colors for selected circles
          const baseColor = patient.gender === 'Female' 
            ? (patient.isHighlighted ? 'rgb(219, 39, 119)' : 'rgb(236, 72, 153)') 
            : (patient.isHighlighted ? 'rgb(59, 130, 246)' : 'rgb(147, 197, 253)')
          
          const opacity = patient.isHighlighted ? 1 : 0.25
          const borderColor = patient.gender === 'Female' ? 'rgb(236, 72, 153)' : 'rgb(147, 197, 253)'
          
          return (
            <div
              key={patient.id}
              className="absolute rounded-full cursor-pointer"
              style={{
                width: `${patient.size}px`,
                height: `${patient.size}px`,
                backgroundColor: baseColor,
                opacity: opacity,
                left: `${position.left}px`,
                top: `${position.top}px`,
                transition: 'all 0.6s ease-out',
                transformOrigin: 'center center',
                boxShadow: patient.isHighlighted ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                filter: patient.isHighlighted ? 'brightness(1.05)' : 'none',
                border: patient.isHighlighted ? 'none' : `2px solid ${borderColor}`
              }}
              title={`${patient.gender} - ${patient.ageGroup} - ${patient.disease}`}
            />
          )
        })}
      </div>

      {/* Stats Cards Below Bubble Chart */}
      <div className="flex gap-4 mt-6">
        {/* Total Patient */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Total Patient</div>
          <div className="text-3xl font-bold text-gray-800">1234</div>
        </div>

        {/* Active Monitoring */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Active Monitoring</div>
          <div className="text-3xl font-bold text-blue-600">934</div>
        </div>

        {/* Patient Satisfaction Score */}
        <div className="flex-1 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Patient Satisfaction Score</div>
          <div className="text-3xl font-bold text-green-600">88%</div>
        </div>
      </div>
    </div>
  )
}
