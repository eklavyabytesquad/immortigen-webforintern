'use client'

import { useState } from 'react'

export default function ThreeDBody({ onShowOrganDetail }) {
  const [activeOrgan, setActiveOrgan] = useState(null)
  const [hoveredOrgan, setHoveredOrgan] = useState(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })

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

  const handleOrganClick = (organName, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const popupWidth = 320 // Popup width (w-80 = 320px)
    const popupHeight = 400 // Estimated popup height
    
    // Calculate initial position next to the organ
    let xPosition = rect.right + 10
    let yPosition = rect.top + window.scrollY + (rect.height / 2) // Center vertically on organ
    
    // Check if popup would go outside right edge of screen
    if (xPosition + popupWidth > viewportWidth) {
      // Position popup to the left of the organ instead
      xPosition = rect.left - popupWidth - 10
    }
    
    // If it would still go outside left edge, center it on the organ
    if (xPosition < 10) {
      xPosition = rect.left + (rect.width / 2) - (popupWidth / 2)
      // Position below the organ when centered
      yPosition = rect.bottom + window.scrollY + 10
    }
    
    // Ensure popup doesn't go above the top of the screen
    if (yPosition < window.scrollY + 10) {
      yPosition = window.scrollY + 10
    }
    
    // Ensure popup doesn't go below the bottom of the screen
    if (yPosition + popupHeight > window.scrollY + viewportHeight - 10) {
      yPosition = window.scrollY + viewportHeight - popupHeight - 10
    }
    
    // Final boundary checks
    if (xPosition < 10) xPosition = 10
    if (xPosition + popupWidth > viewportWidth - 10) {
      xPosition = viewportWidth - popupWidth - 10
    }

    setPopupPosition({
      x: xPosition,
      y: yPosition
    })
    setActiveOrgan(organName)
  }

  const handleClosePopup = () => {
    setActiveOrgan(null)
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
    <>
      {/* 3D Body Container */}
      <div className="w-3/7 bg-white border border-gray-300 rounded-lg shadow-lg p-6 flex items-center justify-center">
        <div className="relative">
          {/* Human Body */}
          <img 
            src="/Body.png" 
            alt="Human Body" 
            className="max-w-full max-h-full object-contain"
          />
          {/* Brain positioned above the body */}
          <img 
            src="/downloads/Brain.png" 
            alt="Brain" 
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-23 h-23 object-contain transition-all duration-300 cursor-pointer hover:scale-105 ${
              hoveredOrgan === 'Brain' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Brain')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Brain', e)}
          />
          {/* Thyroid positioned near the neck */}
          <img 
            src="/downloads/Thyroid.png" 
            alt="Thyroid" 
            className={`absolute top-35 left-1/2 transform -translate-x-1/2 w-15 h-12 object-contain transition-all duration-300 cursor-pointer hover:scale-105 ${
              hoveredOrgan === 'Thyroid' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Thyroid')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Thyroid', e)}
          />
          {/* Lungs positioned below thyroid */}
          <img 
            src="/downloads/Lungs.png" 
            alt="Lungs" 
            className={`absolute top-41.5 left-1/2 transform -translate-x-1/2 w-51 h-41 object-contain transition-all duration-300 cursor-pointer hover:scale-105 z-2 ${
              hoveredOrgan === 'Lungs' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Lungs')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Lungs', e)}
          />
          {/* Heart positioned above lungs with higher z-index */}
          <img 
            src="/downloads/heart.png" 
            alt="Heart" 
            className={`absolute top-50 left-1/2 transform -translate-x-1/2 w-20 h-18 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
              hoveredOrgan === 'Heart' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Heart')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Heart', e)}
          />
          {/* Gut positioned below lungs */}
          <img 
            src="/downloads/Gut.png" 
            alt="Gut" 
            className={`absolute top-80 left-1/2 transform -translate-x-1/2 w-50 h-45 object-contain transition-all duration-300 cursor-pointer hover:scale-105 z-5 ${
              hoveredOrgan === 'Gut' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Gut')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Gut', e)}
          />
          {/* Kidney positioned on the sides */}
          <img 
            src="/downloads/Kidney.png" 
            alt="Kidney" 
            className={`absolute top-75 left-1/2 transform -translate-x-1/2 w-30 h-22 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
              hoveredOrgan === 'Kidney' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Kidney')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Kidney', e)}
          />
          {/* Stomach positioned below gut, above body image, moved slightly right */}
          <img 
            src="/downloads/Stomach.png" 
            alt="Stomach" 
            className={`absolute top-68 left-4/7 transform -translate-x-1/2 w-30 h-25 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-2 ${
              hoveredOrgan === 'Stomach' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Stomach')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Stomach', e)}
          />
          {/* Liver positioned in upper right abdomen */}
          <img 
            src="/downloads/Liver.png" 
            alt="Liver" 
            className={`absolute top-70 left-2/5 transform -translate-x-1/2 w-35 h-28 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-2 ${
              hoveredOrgan === 'Liver' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Liver')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Liver', e)}
          />
          {/* Bladder positioned in lower pelvis */}
          <img 
            src="/downloads/Bladder.png" 
            alt="Bladder" 
            className={`absolute top-115 left-1/2 transform -translate-x-1/2 w-20 h-18 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
              hoveredOrgan === 'Bladder' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Bladder')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Bladder', e)}
          />
          {/* Legs positioned in lower pelvis */}
          <img 
            src="/downloads/Legs.png" 
            alt="Legs" 
            className={`absolute top-120 left-1/2 transform -translate-x-1/2 w-70 h-40 object-contain transition-all duration-300 cursor-pointer hover:scale-110 z-10 ${
              hoveredOrgan === 'Legs' ? 'grayscale-0 brightness-110' : 'grayscale'
            }`}
            onMouseEnter={() => handleOrganHover('Legs')}
            onMouseLeave={handleOrganLeave}
            onClick={(e) => handleOrganClick('Legs', e)}
          />
        </div>
      </div>
      
      {/* Organ Popup */}
      {activeOrgan && organData[activeOrgan] && (
        <div 
          className="fixed bg-white border-2 border-gray-300 rounded-xl shadow-2xl p-4 w-80 z-[9999] animate-in fade-in duration-200"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`
          }}
        >
          {/* Close Button */}
          <button 
            onClick={handleClosePopup}
            className="absolute top-2 right-2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            ✕
          </button>

          <div className="mb-3 pr-8">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🫀 {organData[activeOrgan].name}
            </h3>
            <p className="text-sm text-gray-600">Patient Risk Analysis</p>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {organData[activeOrgan].users.map((user, index) => (
              <div key={index} className={`p-2 rounded-lg border ${getRiskColor(user.risk)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getRiskIcon(user.risk)}</span>
                    <div>
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs opacity-75">{user.condition}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRiskColor(user.risk)}`}>
                    {user.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <button 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 text-sm"
              onClick={() => {
                onShowOrganDetail && onShowOrganDetail(activeOrgan)
                setActiveOrgan(null) // Close popup when navigating
              }}
            >
              📊 More Details
            </button>
          </div>
        </div>
      )}
    </>
  )
}