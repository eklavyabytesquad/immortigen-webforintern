'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import CustomDropdown from './custom-dropdown'

const AGE_RANGES = ['All Ages', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70']

const RAW_DISEASES = [
  "HDL cholesterol levels",
  "Hypertension",
  "Heart failure",
  "Coronary artery disease",
  "Atrial fibrillation",
  "Myocardial infarction",
  "Omega-6 fatty acids to omega-3 fatty acids ratio",
  "Peripheral artery disease",
  "Venous thromboembolism",
  "Acute Respiratory Distress Syndrome",
  "Lung function (FVC)",
  "Lung function (FEV1/FVC)",
  "Lung function (FEV1)",
  "Lung cancer",
  "Asthma",
  "Dementia",
  "Alzheimer's disease",
  "Fibrosis",
  "Epilepsy",
  "Narcolepsy",
  "Multiple sclerosis",
  "Parkinson's disease",
  "Juvenile Parkinson's",
  "Stroke",
  "Stroke (ischemic)",
  "C-reactive protein levels",
  "Rheumatoid arthritis",
  "Systemic lupus erythematosus"
]

const DISEASES = ['All Diseases', ...Array.from(new Set(RAW_DISEASES))]

const BASE_DATA = (() => {
  const dataset = []
  const diseases = DISEASES.slice(1) // 28 diseases
  const ages = AGE_RANGES.slice(1) // 6 age ranges

  // Create 1500 people (900 males, 600 females for 60/40 split)
  for (let i = 0; i < 1500; i += 1) {
    const ageIndex = i % ages.length
    const diseaseIndex = Math.floor((i / ages.length) * 3) % diseases.length
    const gender = i < 900 ? 'Male' : 'Female'

    dataset.push({
      id: i + 1,
      ageRange: ages[ageIndex],
      disease: diseases[diseaseIndex],
      gender
    })
  }

  // Ensure each disease has at least 50 people for better distribution
  diseases.forEach((disease) => {
    const diseaseCount = dataset.filter(d => d.disease === disease).length
    if (diseaseCount < 50) {
      const needed = 50 - diseaseCount
      for (let j = 0; j < needed && j < dataset.length; j++) {
        const randomIndex = Math.floor(Math.random() * dataset.length)
        if (dataset[randomIndex]) {
          dataset[randomIndex].disease = disease
        }
      }
    }
  })

  // Shuffle for better distribution
  for (let i = dataset.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataset[i], dataset[j]] = [dataset[j], dataset[i]]
  }

  console.log('Total people created:', dataset.length)
  console.log('Male count:', dataset.filter(d => d.gender === 'Male').length)
  console.log('Female count:', dataset.filter(d => d.gender === 'Female').length)

  return dataset
})()

export default function LeftCard() {
  const [selectedAge, setSelectedAge] = useState('All Ages')
  const [selectedDisease, setSelectedDisease] = useState('All Diseases')

  const filteredSet = useMemo(() => BASE_DATA.filter((item) => {
    const ageMatch = selectedAge === 'All Ages' || item.ageRange === selectedAge
    const diseaseMatch = selectedDisease === 'All Diseases' || item.disease === selectedDisease
    return ageMatch && diseaseMatch
  }), [selectedAge, selectedDisease])

  const maleFiltered = useMemo(() => filteredSet.filter((item) => item.gender === 'Male').length, [filteredSet])
  const femaleFiltered = useMemo(() => filteredSet.filter((item) => item.gender === 'Female').length, [filteredSet])

  // Create static hexagon structure once (doesn't change with filters)
  const hexRows = useMemo(() => {
    // Aggregate 1500 people into 150 hexagons (10 people per hex)
    const hexagons = []
    for (let i = 0; i < 150; i++) {
      const startIdx = i * 10
      const peopleInHex = BASE_DATA.slice(startIdx, startIdx + 10)
      
      // Determine dominant gender (majority wins)
      const maleCount = peopleInHex.filter(p => p.gender === 'Male').length
      const femaleCount = peopleInHex.filter(p => p.gender === 'Female').length
      const dominantGender = maleCount >= femaleCount ? 'Male' : 'Female'
      
      hexagons.push({
        id: i + 1,
        people: peopleInHex,
        gender: dominantGender
      })
    }

    // Separate female and male hexagons
    const femaleHexes = hexagons.filter(h => h.gender === 'Female')
    const maleHexes = hexagons.filter(h => h.gender === 'Male')
    
    // Define honeycomb pattern with 150 hexagons
    const rowLengths = [5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5]
    
    // Define which positions should be female (center hexagon shape)
    // Creating a compact hexagonal cluster in the center
    const femalePositions = new Set()
    
    // Calculate center hexagon pattern positions - more compact
    let pos = 0
    rowLengths.forEach((rowLen, rowIdx) => {
      const rowCenter = Math.floor(rowLen / 2)
      const distanceFromCenterRow = Math.abs(rowIdx - 8) // Row 8 is center
      
      for (let col = 0; col < rowLen; col++) {
        const distanceFromCenterCol = Math.abs(col - rowCenter)
        
        // Create smaller, tighter hexagonal shape in center
        // Only positions very close to absolute center
        if (distanceFromCenterRow === 0 && distanceFromCenterCol <= 2) {
          // Center row: 5 cells
          femalePositions.add(pos)
        } else if (distanceFromCenterRow === 1 && distanceFromCenterCol <= 2) {
          // Adjacent rows: 3-4 cells each
          femalePositions.add(pos)
        } else if (distanceFromCenterRow === 2 && distanceFromCenterCol <= 1) {
          // Outer ring: 1-2 cells each
          femalePositions.add(pos)
        }
        pos++
      }
    })

    // Build sorted array with females in center hexagon pattern
    const sortedHexagons = []
    let femaleIndex = 0
    let maleIndex = 0
    
    for (let i = 0; i < 150; i++) {
      if (femalePositions.has(i) && femaleIndex < femaleHexes.length) {
        sortedHexagons.push(femaleHexes[femaleIndex++])
      } else if (maleIndex < maleHexes.length) {
        sortedHexagons.push(maleHexes[maleIndex++])
      } else if (femaleIndex < femaleHexes.length) {
        sortedHexagons.push(femaleHexes[femaleIndex++])
      }
    }

    // Create rows from sorted hexagons
    const rows = []
    let dataIndex = 0
    
    for (let i = 0; i < rowLengths.length && dataIndex < sortedHexagons.length; i++) {
      const rowLength = Math.min(rowLengths[i], sortedHexagons.length - dataIndex)
      rows.push({
        cells: sortedHexagons.slice(dataIndex, dataIndex + rowLength),
        offset: i
      })
      dataIndex += rowLength
    }
    
    return rows
  }, [])

  // Calculate which hexagons should be highlighted based on filters
  const filteredHexIds = useMemo(() => {
    const ids = new Set()
    
    // For each hexagon, check if ANY person in it matches the filters
    hexRows.forEach(row => {
      row.cells.forEach(hexagon => {
        const hasMatchingPerson = hexagon.people.some(person => {
          const ageMatch = selectedAge === 'All Ages' || person.ageRange === selectedAge
          const diseaseMatch = selectedDisease === 'All Diseases' || person.disease === selectedDisease
          return ageMatch && diseaseMatch
        })
        
        if (hasMatchingPerson) {
          ids.add(hexagon.id)
        }
      })
    })
    
    return ids
  }, [hexRows, selectedAge, selectedDisease])

  const getHexStyle = (hexagon, isFiltered, index) => {
    const baseColor = hexagon.gender === 'Male'
      ? '#8881F1'
      : '#FE4092'

    const opacity = isFiltered ? 1 : 0.1

    return {
      background: baseColor,
      opacity,
      animationDelay: `${index * 0.008}s`
    }
  }

  return (
    <div
      className="relative h-full p-7 flex flex-col"
      style={{ 
        height: '803px',
        background: 'rgba(255, 255, 255, 0.4)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '12px'
      }}
    >
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-700">Demographic Overview</h2>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <CustomDropdown
              options={AGE_RANGES}
              value={selectedAge}
              onChange={setSelectedAge}
              placeholder="Age"
            />
          </div>
          <div className="w-1/2">
            <CustomDropdown
              options={DISEASES}
              value={selectedDisease}
              onChange={setSelectedDisease}
              placeholder="Diseases"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center">
          {hexRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex transition-transform ${row.offset % 2 === 1 ? 'translate-x-[13px]' : ''}`}
              style={{ marginTop: rowIndex > 0 ? '-6.5px' : '0' }}
            >
              {row.cells.map((hexagon) => {
                const isFiltered = filteredHexIds.has(hexagon.id)
                const peopleInfo = hexagon.people.map(p => `${p.gender} · ${p.ageRange} · ${p.disease}`).join('\n')
                return (
                  <div
                    key={hexagon.id}
                    className="hex-cell"
                    style={getHexStyle(hexagon, isFiltered, hexagon.id)}
                    title={`Hexagon ${hexagon.id} (${hexagon.people.length} people)\n${peopleInfo}`}
                  />
                )
              })}
            </div>
          ))}
        </div>

  <div className="mt-8 rounded-2xl border border-white/50 bg-white/60 px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Selected patients</span>
            <span className="text-2xl font-semibold text-slate-800">{filteredSet.length}</span>
          </div>
          <div className="mt-4 flex gap-8 text-sm">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="relative" style={{ width: '12px', height: '12px' }}>
                <Image
                  src="/assets/dashbaord/Hex1.png"
                  alt="Male"
                  width={12}
                  height={12}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span>Male</span>
              <span className="font-semibold text-slate-800">{maleFiltered}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <div className="relative" style={{ width: '12px', height: '12px' }}>
                <Image
                  src="/assets/dashbaord/Hex.png"
                  alt="Female"
                  width={12}
                  height={12}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span>Female</span>
              <span className="font-semibold text-slate-800">{femaleFiltered}</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hex-cell {
          width: 26px;
          height: 30px;
          clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
          border-radius: 5px;
          transition: transform 0.2s ease, opacity 0.2s ease;
          animation: hex-pop 0.4s ease forwards;
          margin: 0 0.5px;
        }

        .hex-cell:hover {
          transform: translateY(-2px) scale(1.08);
        }

        @keyframes hex-pop {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(8px);
          }
          to {
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
