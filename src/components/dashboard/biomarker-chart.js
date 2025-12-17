'use client'

import { useState } from 'react'

export default function BiomarkerChart({ data }) {
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Chart dimensions
  const width = 160
  const height = 70
  const padding = 8
  const colorBarWidth = 3
  const barGap = 2 // Reduced gap between bars (was 3)
  const chartWidth = width - colorBarWidth - 20

  // Use provided data or default
  const allPoints = data || [
    { value: 65, date: '2024-10-01' },
    { value: 45, date: '2024-10-08' },
    { value: 75, date: '2024-10-15' }
  ]

  // Only use 3 data points
  const filteredData = allPoints.length >= 3 
    ? [allPoints[0], allPoints[Math.floor(allPoints.length / 2)], allPoints[allPoints.length - 1]]
    : allPoints

  // Calculate y position based on value (0-100 scale)
  const getY = (value) => {
    const maxValue = 100
    const minValue = 0
    const range = maxValue - minValue
    const normalizedValue = (value - minValue) / range
    return height - padding - (normalizedValue * (height - padding * 2))
  }

  // Define horizontal line positions (top, middle, bottom)
  const chartHeight = height - padding * 2
  const topLineY = padding
  const middleLineY = padding + chartHeight / 2
  const bottomLineY = height - padding

  // Snap values to nearest horizontal line and assign color
  const snapToLine = (value) => {
    // Determine which zone the value falls into
    if (value >= 67) {
      // Top zone (Critical)
      return { y: topLineY, color: 'rgba(255, 79, 69, 1)' } // Red
    } else if (value >= 34) {
      // Middle zone (Warning)
      return { y: middleLineY, color: 'rgba(246, 155, 27, 1)' } // Orange
    } else {
      // Bottom zone (Normal)
      return { y: bottomLineY, color: 'rgba(21, 182, 108, 1)' } // Green
    }
  }

  // Create points for the line chart - snapped to horizontal lines
  const points = filteredData.map((item, index) => {
    const x = padding + (index * ((chartWidth - padding * 2) / (filteredData.length - 1)))
    const snapped = snapToLine(item.value)
    return {
      x,
      y: snapped.y,
      value: item.value,
      date: item.date,
      color: snapped.color
    }
  })

  // Create smooth curved path with subtle bezier curves
  const createSmoothPath = () => {
    if (points.length < 2) return ''
    
    let path = `M ${points[0].x} ${points[0].y}`
    
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i]
      const next = points[i + 1]
      
      // Calculate control points for subtle curve
      const controlPointOffset = (next.x - current.x) * 0.3 // Reduce curve intensity (was 0.5)
      const cp1x = current.x + controlPointOffset
      const cp2x = next.x - controlPointOffset
      
      // Use cubic bezier curve for subtle smooth transition
      path += ` C ${cp1x} ${current.y}, ${cp2x} ${next.y}, ${next.x} ${next.y}`
    }
    
    return path
  }

  const pathData = createSmoothPath()

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Three horizontal lines */}
        <line
          x1={padding}
          y1={topLineY}
          x2={chartWidth}
          y2={topLineY}
          stroke="rgba(200, 200, 200, 0.4)"
          strokeWidth="0.5"
        />
        <line
          x1={padding}
          y1={middleLineY}
          x2={chartWidth}
          y2={middleLineY}
          stroke="rgba(200, 200, 200, 0.4)"
          strokeWidth="0.5"
        />
        <line
          x1={padding}
          y1={bottomLineY}
          x2={chartWidth}
          y2={bottomLineY}
          stroke="rgba(200, 200, 200, 0.4)"
          strokeWidth="0.5"
        />

        {/* Dashed chart line in grey */}
        <path
          d={pathData}
          fill="none"
          stroke="rgba(180, 180, 180, 0.6)"
          strokeWidth="1"
          strokeDasharray="3 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points - first 2 small, last one large with special styling */}
        {points.map((point, index) => {
          const isLastPoint = index === points.length - 1
          const radius = isLastPoint ? 7 : 3
          
          if (isLastPoint) {
            return (
              <g key={index}>
                {/* White border */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={radius + 1}
                  fill="rgba(255, 255, 255, 1)"
                />
                {/* Main circle - uses color based on horizontal line */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={radius}
                  fill={point.color}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(index)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{
                    filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))'
                  }}
                />
              </g>
            )
          } else {
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={radius}
                fill={point.color}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                style={{
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))'
                }}
              />
            )
          }
        })}

        {/* Vertical color bar on the right with gaps and capsule shape */}
        <g transform={`translate(${chartWidth + 12}, ${padding})`}>
          {/* Red (Critical) - Top */}
          <rect
            x="0"
            y="0"
            width={colorBarWidth}
            height={(chartHeight - barGap * 2) / 3}
            fill="rgba(255, 79, 69, 1)"
            rx="4"
            ry="4"
          />
          {/* Orange (Warning) - Middle */}
          <rect
            x="0"
            y={(chartHeight - barGap * 2) / 3 + barGap}
            width={colorBarWidth}
            height={(chartHeight - barGap * 2) / 3}
            fill="rgba(246, 155, 27, 1)"
            rx="4"
            ry="4"
          />
          {/* Green (Normal) - Bottom */}
          <rect
            x="0"
            y={(chartHeight - barGap * 2) * 2 / 3 + barGap * 2}
            width={colorBarWidth}
            height={(chartHeight - barGap * 2) / 3}
            fill="rgba(21, 182, 108, 1)"
            rx="4"
            ry="4"
          />
        </g>

        {/* Tooltip */}
        {hoveredPoint !== null && (
          <g>
            <foreignObject
              x={points[hoveredPoint].x - 55}
              y={points[hoveredPoint].y - 38}
              width="110"
              height="30"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'rgba(75, 75, 75, 1)',
                  fontSize: '11px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)'
                }}
              >
                On {formatDate(filteredData[hoveredPoint].date)}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
    </div>
  )
}
