'use client'

import { useState } from 'react'

export default function ThreeDBodyPatient({ onOrganClick }) {
  const [hoveredOrgan, setHoveredOrgan] = useState(null)

  // Dummy user data for different organs
  const organData = {
    Brain: {
      name: 'Brain',
      users: [
        { name: 'Alice Johnson', risk: 'high', condition: 'Cognitive decline' },
        { name: 'Bob Smith', risk: 'low', condition: 'Healthy function' },
        { name: 'Carol Davis', risk: 'medium', condition: 'Memory issues' },
        { name: 'David Wilson', risk: 'high', condition: 'Neurodegeneration' },
        { name: 'Emma Brown', risk: 'low', condition: 'Optimal health' }
      ]
    },
    Thyroid: {
      name: 'Thyroid',
      users: [
        { name: 'Frank Miller', risk: 'medium', condition: 'Hypothyroidism' },
        { name: 'Grace Lee', risk: 'low', condition: 'Normal function' },
        { name: 'Henry Taylor', risk: 'high', condition: 'Hyperthyroidism' },
        { name: 'Ivy Chen', risk: 'medium', condition: 'Goiter' },
        { name: 'Jack Anderson', risk: 'low', condition: 'Healthy levels' }
      ]
    },
    Lungs: {
      name: 'Lungs',
      users: [
        { name: 'Kate Roberts', risk: 'high', condition: 'COPD risk' },
        { name: 'Liam Murphy', risk: 'low', condition: 'Clear airways' },
        { name: 'Maya Patel', risk: 'medium', condition: 'Mild asthma' },
        { name: 'Noah Garcia', risk: 'high', condition: 'Smoking damage' },
        { name: 'Olivia White', risk: 'low', condition: 'Excellent capacity' }
      ]
    },
    Heart: {
      name: 'Heart',
      users: [
        { name: 'Paul Johnson', risk: 'high', condition: 'Arrhythmia' },
        { name: 'Quinn Davis', risk: 'medium', condition: 'High blood pressure' },
        { name: 'Rachel Kim', risk: 'low', condition: 'Strong heart' },
        { name: 'Sam Wilson', risk: 'high', condition: 'Coronary disease' },
        { name: 'Tina Lopez', risk: 'medium', condition: 'Cholesterol issues' }
      ]
    },
    Gut: {
      name: 'Gut',
      users: [
        { name: 'Uma Singh', risk: 'medium', condition: 'IBS symptoms' },
        { name: 'Victor Chang', risk: 'low', condition: 'Healthy microbiome' },
        { name: 'Wendy Clark', risk: 'high', condition: 'Inflammatory bowel' },
        { name: 'Xander Bell', risk: 'low', condition: 'Good digestion' },
        { name: 'Yara Ahmed', risk: 'medium', condition: 'Food sensitivities' }
      ]
    },
    Kidney: {
      name: 'Kidney',
      users: [
        { name: 'Zoe Martinez', risk: 'high', condition: 'Chronic kidney disease' },
        { name: 'Adam Foster', risk: 'low', condition: 'Normal function' },
        { name: 'Beth Collins', risk: 'medium', condition: 'Kidney stones' },
        { name: 'Carl Turner', risk: 'high', condition: 'Reduced filtration' },
        { name: 'Diana Ross', risk: 'low', condition: 'Excellent health' }
      ]
    },
    Stomach: {
      name: 'Stomach',
      users: [
        { name: 'Eric Hill', risk: 'medium', condition: 'Gastritis' },
        { name: 'Fiona Green', risk: 'low', condition: 'Normal acid levels' },
        { name: 'Gary Stone', risk: 'high', condition: 'Peptic ulcer' },
        { name: 'Helen Price', risk: 'medium', condition: 'Acid reflux' },
        { name: 'Ian Cooper', risk: 'low', condition: 'Healthy digestion' }
      ]
    },
    Liver: {
      name: 'Liver',
      users: [
        { name: 'Julia Ward', risk: 'high', condition: 'Fatty liver' },
        { name: 'Kevin Brooks', risk: 'low', condition: 'Normal enzymes' },
        { name: 'Linda Gray', risk: 'medium', condition: 'Elevated ALT' },
        { name: 'Mike Reed', risk: 'high', condition: 'Liver fibrosis' },
        { name: 'Nina Cox', risk: 'low', condition: 'Optimal function' }
      ]
    },
    Bladder: {
      name: 'Bladder',
      users: [
        { name: 'Oscar Hughes', risk: 'medium', condition: 'Overactive bladder' },
        { name: 'Penny Wood', risk: 'low', condition: 'Normal capacity' },
        { name: 'Quincy Baker', risk: 'high', condition: 'Bladder inflammation' },
        { name: 'Rita King', risk: 'medium', condition: 'Frequent UTIs' },
        { name: 'Steve Long', risk: 'low', condition: 'Healthy function' }
      ]
    },
    Legs: {
      name: 'Legs',
      users: [
        { name: 'Tara Scott', risk: 'high', condition: 'Poor circulation' },
        { name: 'Ulric Nash', risk: 'low', condition: 'Strong muscles' },
        { name: 'Vera Hunt', risk: 'medium', condition: 'Varicose veins' },
        { name: 'Will Perry', risk: 'high', condition: 'Deep vein thrombosis' },
        { name: 'Xenia Ross', risk: 'low', condition: 'Excellent mobility' }
      ]
    }
  }

  const handleOrganHover = (organName) => {
    setHoveredOrgan(organName)
  }

  const handleOrganLeave = () => {
    setHoveredOrgan(null)
  }

  const handleOrganClickInternal = (organName) => {
    // Find organ data with proper status, color, and image
    const organStatusMap = {
      'Brain': { name: 'Brain', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Brain.png' },
      'Thyroid': { name: 'Thyroid', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Thyroid.png' },
      'Lungs': { name: 'Lungs', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Lungs.png' },
      'Heart': { name: 'Heart', status: 'Need attention', color: 'rgba(255, 79, 69, 1)', progress: 30, image: '/downloads/heart.png' },
      'Gut': { name: 'Gut', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Gut.png' },
      'Kidney': { name: 'Kidney', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Kidney.png' },
      'Stomach': { name: 'Stomach', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Stomach.png' },
      'Liver': { name: 'Liver', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Liver.png' },
      'Bladder': { name: 'Bladder', status: 'Borderline', color: 'rgba(246, 155, 27, 1)', progress: 60, image: '/downloads/Bladder.png' },
      'Legs': { name: 'Legs', status: 'Optimal', color: 'rgba(21, 182, 108, 1)', progress: 100, image: '/downloads/Legs.png' },
    }
    
    const organData = organStatusMap[organName]
    if (organData && onOrganClick) {
      onOrganClick(organData)
    }
  }


  const lowerBodyGlowStyle = {
    background: 'radial-gradient(circle at 50% 0%, rgba(228, 233, 243, 0.55) 0%, rgba(228, 233, 243, 0.2) 35%, rgba(228, 233, 243, 0) 70%)',
    filter: 'blur(48px)'
  }
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high': return '⚠️'
      case 'medium': return '⚡'
      case 'low': return '✅'
      default: return '❓'
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Human Body */}
        <img 
          src="/Body.png" 
          alt="Human Body" 
          className="max-w-full max-h-[600px] object-contain"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-[-54px] -translate-x-1/2 w-[360px] h-[260px] opacity-70"
          style={lowerBodyGlowStyle}
        />
        {/* Brain positioned above the body */}
        <img 
          src="/downloads/Brain.png" 
          alt="Brain" 
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-23 h-23 object-contain transition-all duration-300 cursor-pointer hover:scale-105 ${
            hoveredOrgan === 'Brain' ? 'grayscale-0 brightness-110' : 'grayscale brightness-115'
          }`}
          onMouseEnter={() => handleOrganHover('Brain')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Brain')}
        />
        {/* Thyroid positioned near the neck */}
        <img 
          src="/downloads/Thyroid.png" 
          alt="Thyroid" 
          className={`absolute top-35 left-1/2 transform -translate-x-1/2 w-15 h-12 object-contain transition-all duration-300 cursor-pointer hover:scale-105 ${
            hoveredOrgan === 'Thyroid' ? 'grayscale-0 brightness-110' : 'grayscale brightness-150'
          }`}
          onMouseEnter={() => handleOrganHover('Thyroid')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Thyroid')}
        />
        {/* Lungs positioned below thyroid */}
        <img 
          src="/downloads/Lungs.png" 
          alt="Lungs" 
          className={`absolute top-41.5 left-1/2 transform -translate-x-1/2 w-51 h-41 object-contain transition-all duration-300 cursor-pointer hover:scale-105 z-2 ${
            hoveredOrgan === 'Lungs' ? 'grayscale-0 brightness-110' : 'grayscale brightness-150'
          }`}
          onMouseEnter={() => handleOrganHover('Lungs')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Lungs')}
        />
        {/* Heart positioned above lungs with higher z-index */}
        <img 
          src="/downloads/heart.png" 
          alt="Heart" 
          className={`absolute top-50 left-1/2 transform -translate-x-1/2 w-20 h-18 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
            hoveredOrgan === 'Heart' ? 'grayscale-0 brightness-110' : 'grayscale brightness-130'
          }`}
          onMouseEnter={() => handleOrganHover('Heart')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Heart')}
        />
        {/* Gut positioned below lungs */}
        <img 
          src="/downloads/Gut.png" 
          alt="Gut" 
          className={`absolute top-80 left-1/2 transform -translate-x-1/2 w-50 h-45 object-contain transition-all duration-300 cursor-pointer hover:scale-105 z-5 ${
            hoveredOrgan === 'Gut' ? 'grayscale-0 brightness-110' : 'grayscale brightness-140'
          }`}
          onMouseEnter={() => handleOrganHover('Gut')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Gut')}
        />
        {/* Kidney positioned on the sides */}
        <img 
          src="/downloads/Kidney.png" 
          alt="Kidney" 
          className={`absolute top-75 left-1/2 transform -translate-x-1/2 w-30 h-22 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
            hoveredOrgan === 'Kidney' ? 'grayscale-0 brightness-110' : 'grayscale brightness-140'
          }`}
          onMouseEnter={() => handleOrganHover('Kidney')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Kidney')}
        />
        {/* Stomach positioned below gut, above body image, moved slightly right */}
        <img 
          src="/downloads/Stomach.png" 
          alt="Stomach" 
          className={`absolute top-68 left-4/7 transform -translate-x-1/2 w-30 h-25 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-2 ${
            hoveredOrgan === 'Stomach' ? 'grayscale-0 brightness-110' : 'grayscale brightness-110'
          }`}
          onMouseEnter={() => handleOrganHover('Stomach')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Stomach')}
        />
        {/* Liver positioned in upper right abdomen */}
        <img 
          src="/downloads/Liver.png" 
          alt="Liver" 
          className={`absolute top-70 left-2/5 transform -translate-x-1/2 w-28 h-22 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-2 ${
            hoveredOrgan === 'Liver' ? 'grayscale-0 brightness-110' : 'grayscale brightness-110'
          }`}
          onMouseEnter={() => handleOrganHover('Liver')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Liver')}
        />
        {/* Bladder positioned in lower pelvis */}
        <img 
          src="/downloads/Bladder.png" 
          alt="Bladder" 
          className={`absolute top-115 left-1/2 transform -translate-x-1/2 w-20 h-18 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
            hoveredOrgan === 'Bladder' ? 'grayscale-0 brightness-110' : 'grayscale brightness-110'
          }`}
          onMouseEnter={() => handleOrganHover('Bladder')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Bladder')}
        />
        {/* Legs positioned in lower pelvis */}
        <img 
          src="/downloads/Legs.png" 
          alt="Legs" 
          className={`absolute top-120 left-1/2 transform -translate-x-1/2 w-70 h-40 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
            hoveredOrgan === 'Legs' ? 'grayscale-0 brightness-110' : 'grayscale brightness-110'
          }`}
          onMouseEnter={() => handleOrganHover('Legs')}
          onMouseLeave={handleOrganLeave}
          onClick={() => handleOrganClickInternal('Legs')}
        />
      </div>
    </div>
  )
}