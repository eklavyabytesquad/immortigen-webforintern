'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function BubbleChart() {
  // Extended sample patient data (150 patients - 3x the original)
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
    // 2x data
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
    { "id": 100, "gender": "Female", "disease": "Asthma", "ageGroup": "31-50" }
  ]

  const [selectedGender, setSelectedGender] = useState('All')
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('All')
  const [selectedDisease, setSelectedDisease] = useState('All')
  const containerRef = useRef(null)
  const bubblesRef = useRef([])
  const animationFrameRef = useRef(null)

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
    return patientData.map(patient => {
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
        size: getSizeByAge(patient.ageGroup),
        x: 0,
        y: 0,
        vx: 0,
        vy: 0
      }
    })
  }, [selectedGender, selectedAgeGroup, selectedDisease])

  // Initialize positions and physics
  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Initialize centered positions in a gentle spread
    processedData.forEach((patient, index) => {
      const bubble = bubblesRef.current[index]
      if (!bubble) return

      // Start all bubbles near center with slight spread
      const angle = (index / processedData.length) * Math.PI * 2
      const radius = 50 + (index % 3) * 30
      const x = width / 2 + Math.cos(angle) * radius
      const y = height / 2 + Math.sin(angle) * radius
      
      patient.x = x
      patient.y = y
      patient.vx = 0 // Start with zero velocity
      patient.vy = 0

      gsap.set(bubble, { x, y })
    })

    // Physics simulation with slower, smoother movement
    const animate = () => {
      const highlightedBubbles = processedData.filter(p => p.isHighlighted)
      const centerX = width / 2
      const centerY = height / 2

      processedData.forEach((patient, i) => {
        const bubble = bubblesRef.current[i]
        if (!bubble) return

        if (patient.isHighlighted) {
          // Gentle attraction to center for clustering
          const dx = centerX - patient.x
          const dy = centerY - patient.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist > 5) {
            // Slow down when close to center
            const distanceFactor = Math.min(dist / 100, 1)
            const force = 0.04 * distanceFactor // Reduces force when near center
            patient.vx += (dx / dist) * force
            patient.vy += (dy / dist) * force
          } else {
            // Almost at center - apply strong damping
            patient.vx *= 0.5
            patient.vy *= 0.5
          }
        } else {
          // Gentle push away from center - but not too far
          const dx = patient.x - centerX
          const dy = patient.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          // Only push if too close (within 120px instead of 200px)
          if (dist < 120) {
            const force = 0.02 // Reduced force (was 0.025)
            patient.vx += (dx / dist) * force
            patient.vy += (dy / dist) * force
          }
        }

        // Collision detection with other bubbles - small gap
        processedData.forEach((other, j) => {
          if (i === j) return
          
          const dx = other.x - patient.x
          const dy = other.y - patient.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = (patient.size + other.size) / 2 + 2 // 2px gap between circles

          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx)
            const overlap = minDist - dist
            const force = overlap * 0.6 // Strong separation to maintain gap
            patient.vx -= Math.cos(angle) * force
            patient.vy -= Math.sin(angle) * force
          }
        })

        // Apply friction - stronger for highlighted circles at center
        const friction = patient.isHighlighted ? 0.82 : 0.88
        patient.vx *= friction
        patient.vy *= friction

        // Cap maximum velocity for smoother movement
        const maxSpeed = patient.isHighlighted ? 1.8 : 2.0 // Slower for highlighted
        const speed = Math.sqrt(patient.vx * patient.vx + patient.vy * patient.vy)
        if (speed > maxSpeed) {
          patient.vx = (patient.vx / speed) * maxSpeed
          patient.vy = (patient.vy / speed) * maxSpeed
        }

        // Update position
        patient.x += patient.vx
        patient.y += patient.vy

        // Boundary collision with padding
        const radius = patient.size / 2
        const padding = 10
        if (patient.x < radius + padding) {
          patient.x = radius + padding
          patient.vx *= -0.3
        }
        if (patient.x > width - radius - padding) {
          patient.x = width - radius - padding
          patient.vx *= -0.3
        }
        if (patient.y < radius + padding) {
          patient.y = radius + padding
          patient.vy *= -0.3
        }
        if (patient.y > height - radius - padding) {
          patient.y = height - radius - padding
          patient.vy *= -0.3
        }

        // Smooth position animation
        gsap.to(bubble, {
          x: patient.x,
          y: patient.y,
          duration: 0.6,
          ease: 'power1.out'
        })
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [processedData])

  // Breathing animation for highlighted bubbles
  useEffect(() => {
    bubblesRef.current.forEach((bubble, index) => {
      if (!bubble) return
      
      const patient = processedData[index]
      if (patient && patient.isHighlighted) {
        // Create slow, gentle breathing effect
        gsap.to(bubble, {
          scale: 1.08,
          duration: 2.5 + Math.random() * 1, // Slower breathing (2.5-3.5 seconds)
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 1
        })
      } else {
        // Kill breathing animation for non-highlighted
        gsap.killTweensOf(bubble)
        gsap.to(bubble, { scale: 1, duration: 0.5 })
      }
    })
  }, [processedData])

  // Generate positions within safe boundaries
  const getBubblePosition = (index, total, size) => {
    // Calculate safe margins based on bubble size
    const marginPercent = 5 // 5% margin from edges
    const sizePercent = (size / 10) // Convert px to approximate %
    
    // Use golden angle for spiral distribution
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    const angle = index * goldenAngle
    
    // Radius increases with index for spiral effect
    const maxRadius = 35 // Maximum 35% from center
    const radius = Math.sqrt(index / total) * maxRadius
    
    // Calculate position from center (50%, 50%)
    const x = 50 + Math.cos(angle) * radius
    const y = 50 + Math.sin(angle) * radius
    
    // Clamp values to safe range
    const safeX = Math.max(marginPercent + sizePercent, Math.min(100 - marginPercent - sizePercent, x))
    const safeY = Math.max(marginPercent + sizePercent, Math.min(100 - marginPercent - sizePercent, y))
    
    return { x: `${safeX}%`, y: `${safeY}%` }
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
          // Darker colors for selected circles
          const baseColor = patient.gender === 'Female' 
            ? (patient.isHighlighted ? 'rgb(219, 39, 119)' : 'rgb(236, 72, 153)') // Darker pink when highlighted
            : (patient.isHighlighted ? 'rgb(59, 130, 246)' : 'rgb(147, 197, 253)') // Darker blue when highlighted
          
          const opacity = patient.isHighlighted ? 1 : 0.25
          const borderColor = patient.gender === 'Female' ? 'rgb(236, 72, 153)' : 'rgb(147, 197, 253)'
          
          return (
            <div
              key={patient.id}
              ref={(el) => (bubblesRef.current[index] = el)}
              className="absolute rounded-full transition-opacity duration-500 cursor-pointer"
              style={{
                width: `${patient.size}px`,
                height: `${patient.size}px`,
                backgroundColor: baseColor,
                opacity: opacity,
                left: 0,
                top: 0,
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
