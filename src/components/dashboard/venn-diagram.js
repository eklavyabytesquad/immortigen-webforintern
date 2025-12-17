'use client'

import { useState } from 'react'

export default function VennDiagram() {
  const [hoveredElement, setHoveredElement] = useState(null)
  const [selectedGender, setSelectedGender] = useState('Male') // Single gender selection
  const [selectedDisease, setSelectedDisease] = useState('Diabetes') // Single disease selection
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('31-50') // Single age group selection

  // Extended sample patient data (50 patients)
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
    { "id": 50, "gender": "Female", "disease": "Asthma", "ageGroup": "51+" }
  ]

  const availableGenders = ['Male', 'Female']
  const availableDiseases = ['Diabetes', 'Hypertension', 'Asthma', 'Heart Attack', 'Stroke', 'Cancer', 'Obesity', 'COPD', 'Arthritis']
  const availableAgeGroups = ['18-30', '31-50', '51+']

  // Calculate active circles and their positions
  const getActiveCircles = () => {
    const circles = []
    
    // Add gender circle if selected
    if (selectedGender) {
      circles.push({
        id: 'gender',
        label: selectedGender,
        color: selectedGender === 'Male' ? '#1d4ed8' : '#be185d',
        fillColor: selectedGender === 'Male' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(236, 72, 153, 0.3)'
      })
    }
    
    // Add disease circle if selected
    if (selectedDisease) {
      circles.push({
        id: 'disease',
        label: selectedDisease,
        color: '#15803d',
        fillColor: 'rgba(34, 197, 94, 0.3)'
      })
    }
    
    // Add age group circle if selected
    if (selectedAgeGroup) {
      circles.push({
        id: 'age',
        label: `${selectedAgeGroup} years`,
        color: '#ca8a04',
        fillColor: 'rgba(251, 191, 36, 0.3)'
      })
    }
    
    return { circles, count: circles.length }
  }

  // Calculate positions based on number of circles
  const getCirclePositions = (circleCount) => {
    const positions = []
    const centerX = 200
    const centerY = 140
    
    if (circleCount === 1) {
      positions.push({ x: centerX, y: centerY })
    } else if (circleCount === 2) {
      positions.push(
        { x: centerX - 50, y: centerY },
        { x: centerX + 50, y: centerY }
      )
    } else if (circleCount === 3) {
      // Perfect triangle for 3 circles with good overlap
      positions.push(
        { x: centerX - 40, y: centerY - 30 }, // Top left
        { x: centerX + 40, y: centerY - 30 }, // Top right  
        { x: centerX, y: centerY + 40 }       // Bottom center
      )
    }
    
    return positions
  }

  // Calculate intersections and counts
  const calculateCounts = () => {
    // Individual set counts
    const genderCount = selectedGender ? patientData.filter(p => p.gender === selectedGender).length : 0
    const diseaseCount = selectedDisease ? patientData.filter(p => p.disease === selectedDisease).length : 0
    const ageCount = selectedAgeGroup ? patientData.filter(p => p.ageGroup === selectedAgeGroup).length : 0
    
    // 2-way intersections
    const genderDisease = (selectedGender && selectedDisease) ? 
      patientData.filter(p => p.gender === selectedGender && p.disease === selectedDisease).length : 0
    
    const genderAge = (selectedGender && selectedAgeGroup) ? 
      patientData.filter(p => p.gender === selectedGender && p.ageGroup === selectedAgeGroup).length : 0
    
    const diseaseAge = (selectedDisease && selectedAgeGroup) ? 
      patientData.filter(p => p.disease === selectedDisease && p.ageGroup === selectedAgeGroup).length : 0
    
    // 3-way intersection
    const allThree = (selectedGender && selectedDisease && selectedAgeGroup) ? 
      patientData.filter(p => 
        p.gender === selectedGender && 
        p.disease === selectedDisease && 
        p.ageGroup === selectedAgeGroup
      ).length : 0
    
    return {
      gender: genderCount,
      disease: diseaseCount,
      age: ageCount,
      genderDisease,
      genderAge,
      diseaseAge,
      allThree,
      total: patientData.length
    }
  }

  const { circles, count } = getActiveCircles()
  const positions = getCirclePositions(count)
  const counts = calculateCounts()

  // Get all number positions for proper layout
  const getNumberPositions = () => {
    const numbers = []
    
    if (count === 1) {
      // Single circle - show count in center
      numbers.push({
        x: positions[0].x,
        y: positions[0].y,
        count: circles[0].id === 'gender' ? counts.gender : 
               circles[0].id === 'disease' ? counts.disease : counts.age,
        type: 'individual',
        color: circles[0].color
      })
    } else if (count === 2) {
      // Two circles - individual counts + intersection
      const circle1Count = circles[0].id === 'gender' ? counts.gender : 
                          circles[0].id === 'disease' ? counts.disease : counts.age
      const circle2Count = circles[1].id === 'gender' ? counts.gender : 
                          circles[1].id === 'disease' ? counts.disease : counts.age
      const intersectionCount = getIntersectionCount(0, 1)
      
      // Circle 1 only (left side)
      numbers.push({
        x: positions[0].x - 25,
        y: positions[0].y,
        count: circle1Count - intersectionCount,
        type: 'individual',
        color: circles[0].color
      })
      
      // Circle 2 only (right side)  
      numbers.push({
        x: positions[1].x + 25,
        y: positions[1].y,
        count: circle2Count - intersectionCount,
        type: 'individual',
        color: circles[1].color
      })
      
      // Intersection (center)
      numbers.push({
        x: (positions[0].x + positions[1].x) / 2,
        y: (positions[0].y + positions[1].y) / 2,
        count: intersectionCount,
        type: 'intersection',
        color: '#dc2626'
      })
      
    } else if (count === 3) {
      // Three circles - individual counts + 2-way intersections + 3-way intersection
      const genderIdx = circles.findIndex(c => c.id === 'gender')
      const diseaseIdx = circles.findIndex(c => c.id === 'disease')
      const ageIdx = circles.findIndex(c => c.id === 'age')
      
      // Individual circle counts (exclusive regions)
      if (genderIdx !== -1) {
        numbers.push({
          x: positions[genderIdx].x - 35,
          y: positions[genderIdx].y - 15,
          count: counts.gender - counts.genderDisease - counts.genderAge + counts.allThree,
          type: 'individual',
          color: circles[genderIdx].color
        })
      }
      
      if (diseaseIdx !== -1) {
        numbers.push({
          x: positions[diseaseIdx].x + 35,
          y: positions[diseaseIdx].y - 15,
          count: counts.disease - counts.genderDisease - counts.diseaseAge + counts.allThree,
          type: 'individual',
          color: circles[diseaseIdx].color
        })
      }
      
      if (ageIdx !== -1) {
        numbers.push({
          x: positions[ageIdx].x,
          y: positions[ageIdx].y + 35,
          count: counts.age - counts.genderAge - counts.diseaseAge + counts.allThree,
          type: 'individual',
          color: circles[ageIdx].color
        })
      }
      
      // 2-way intersections (excluding 3-way)
      if (genderIdx !== -1 && diseaseIdx !== -1) {
        numbers.push({
          x: (positions[genderIdx].x + positions[diseaseIdx].x) / 2,
          y: (positions[genderIdx].y + positions[diseaseIdx].y) / 2 - 10,
          count: counts.genderDisease - counts.allThree,
          type: 'intersection2',
          color: '#dc2626'
        })
      }
      
      if (genderIdx !== -1 && ageIdx !== -1) {
        numbers.push({
          x: (positions[genderIdx].x + positions[ageIdx].x) / 2 - 20,
          y: (positions[genderIdx].y + positions[ageIdx].y) / 2 + 5,
          count: counts.genderAge - counts.allThree,
          type: 'intersection2',
          color: '#dc2626'
        })
      }
      
      if (diseaseIdx !== -1 && ageIdx !== -1) {
        numbers.push({
          x: (positions[diseaseIdx].x + positions[ageIdx].x) / 2 + 20,
          y: (positions[diseaseIdx].y + positions[ageIdx].y) / 2 + 5,
          count: counts.diseaseAge - counts.allThree,
          type: 'intersection2',
          color: '#dc2626'
        })
      }
      
      // 3-way intersection (center)
      if (genderIdx !== -1 && diseaseIdx !== -1 && ageIdx !== -1) {
        numbers.push({
          x: (positions[genderIdx].x + positions[diseaseIdx].x + positions[ageIdx].x) / 3,
          y: (positions[genderIdx].y + positions[diseaseIdx].y + positions[ageIdx].y) / 3,
          count: counts.allThree,
          type: 'intersection3',
          color: '#b91c1c'
        })
      }
    }
    
    return numbers
  }

  const getIntersectionCount = (idx1, idx2) => {
    const circle1 = circles[idx1]
    const circle2 = circles[idx2]
    
    if (circle1.id === 'gender' && circle2.id === 'disease') return counts.genderDisease
    if (circle1.id === 'gender' && circle2.id === 'age') return counts.genderAge
    if (circle1.id === 'disease' && circle2.id === 'age') return counts.diseaseAge
    
    return 0
  }

  return (
    <div className="h-[400px] bg-white border border-gray-300 rounded-lg shadow-lg p-3 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Venn Diagram Area with Results */}
        <div className="flex-1 flex justify-between items-center">
          <svg width="400" height="280" viewBox="0 0 400 280" className="overflow-visible">
            {circles.map((circle, index) => {
              const pos = positions[index]
              return (
                <g key={circle.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="80"
                    fill={hoveredElement === circle.id ? circle.fillColor.replace('0.3', '0.5') : circle.fillColor}
                    stroke={circle.color}
                    strokeWidth="3"
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredElement(circle.id)}
                    onMouseLeave={() => setHoveredElement(null)}
                  />
                  <text 
                    x={pos.x} 
                    y={pos.y - 60} 
                    textAnchor="middle" 
                    className="text-sm font-bold"
                    fill={circle.color}
                  >
                    {circle.label}
                  </text>
                </g>
              )
            })}
            
            {/* All Number Labels */}
            {getNumberPositions().map((number, index) => (
              <text
                key={`number-${index}`}
                x={number.x}
                y={number.y}
                textAnchor="middle"
                className={`font-bold ${
                  number.type === 'individual' ? 'text-lg' : 
                  number.type === 'intersection2' ? 'text-base' : 
                  'text-xl'
                }`}
                fill={number.color}
              >
                {number.count}
              </text>
            ))}
            
            {/* No data message if no circles */}
            {circles.length === 0 && (
              <text x="200" y="140" textAnchor="middle" className="text-lg text-gray-500">
                Select filters to view data
              </text>
            )}
          </svg>
          
          {/* Results - Positioned to the right of Venn diagram */}
          <div className="ml-6 w-48">
            <h4 className="font-semibold text-gray-700 mb-3 text-sm">Results</h4>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs space-y-2">
              <div>📊 Total Patients: <strong>{counts.total}</strong></div>
              <div>👨👩 Gender: <strong>{counts.gender}</strong></div>
              <div>🩺 Disease: <strong>{counts.disease}</strong></div>
              <div>🎂 Age Group: <strong>{counts.age}</strong></div>
              <div>🔄 Intersections: <strong>{counts.genderDisease + counts.genderAge + counts.diseaseAge}</strong></div>
              <div>🎯 All Three: <strong>{counts.allThree}</strong></div>
            </div>
          </div>
        </div>

        {/* Controls Panel - Only dropdowns */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex gap-4 text-xs">
            {/* Gender Dropdown */}
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">Gender (Single)</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs"
              >
                <option value="">No Gender Selected</option>
                {availableGenders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            {/* Disease Dropdown */}
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">Disease (Single)</label>
              <select
                value={selectedDisease}
                onChange={(e) => setSelectedDisease(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs"
              >
                <option value="">No Disease Selected</option>
                {availableDiseases.map(disease => (
                  <option key={disease} value={disease}>{disease}</option>
                ))}
              </select>
            </div>

            {/* Age Group Dropdown */}
            <div className="flex-1">
              <label className="block font-semibold text-gray-700 mb-1">Age Group (Single)</label>
              <select
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-xs"
              >
                <option value="">No Age Group Selected</option>
                {availableAgeGroups.map(ageGroup => (
                  <option key={ageGroup} value={ageGroup}>{ageGroup} years</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}