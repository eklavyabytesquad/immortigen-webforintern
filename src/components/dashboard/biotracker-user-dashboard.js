'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// Dynamically import Chart.js components to avoid SSR issues
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false })
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false })
const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false })

export default function BiotrackerUserDashboard({ selectedUser }) {
  const [biotrackerData, setBiotrackerData] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState('hr')
  const [chartRegistered, setChartRegistered] = useState(false)

  // Register Chart.js components
  useEffect(() => {
    const registerChartJS = async () => {
      const ChartJS = await import('chart.js')
      const {
        Chart,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        Filler
      } = ChartJS

      Chart.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Title,
        Tooltip,
        Legend,
        ArcElement,
        Filler
      )
      setChartRegistered(true)
    }
    registerChartJS()
  }, [])

  // Load biotracker data
  useEffect(() => {
    const loadBiotrackerData = async () => {
      try {
        const response = await fetch('/src/components/data/biotracker.json')
        if (!response.ok) {
          // Fallback to local data if fetch fails
          const biotrackerJsonData = {
            "status": "success",
            "user": "aayan",
            "email": "iamaayan179@gmail.com",
            "date": "2025-09-27",
            "access_code": "IAMEGTLH",
            "processed_metrics": {
              "hr": {
                "title": "Heart Rate",
                "count": 187,
                "values": [87, 72, 73, 76, 81, 82, 74, 73, 75, 76, 79, 79, 79, 76, 84, 87, 71, 69, 68, 65, 70, 66, 67, 67, 64, 64, 65, 64, 64, 65, 76, 70, 74, 70, 64, 66, 65, 62, 62, 64, 62, 62, 64, 62, 61, 61, 62, 61, 58, 59, 67, 72, 69, 62, 66, 62, 61, 65, 66, 64, 65, 62, 59, 62, 62, 62, 61, 58, 60, 56, 61, 56, 59, 58, 63, 66, 62, 62, 63, 64, 60, 61, 78, 66, 64, 64, 64, 63, 64, 60, 58, 75, 63, 62, 60, 58, 62, 62, 64, 63, 62, 63, 63, 61, 59, 62, 60, 60, 62, 62, 60, 59, 60, 62, 62, 59, 65, 67, 69, 83, 97, 85, 81, 68, 73, 72, 84, 68, 66, 69, 69, 65, 69, 79, 77, 75, 81, 72, 70, 80, 76, 96, 93, 109, 77, 68, 68, 63, 65, 72, 75, 79, 75, 68, 67, 61, 65, 47, 53, 75, 87, 128, 118, 85, 83, 83, 84, 82, 97, 78, 99, 92, 95, 76, 80, 95, 91, 92, 87, 82, 79, 87, 85, 88, 81, 82, 109],
                "unit": "BPM",
                "has_data": true
              },
              "temp": {
                "title": "Skin Temperature",
                "count": 187,
                "values": [35.35, 35.30, 35.32, 35.63, 35.77, 35.85, 35.74, 35.50, 35.45, 35.50, 35.44, 35.38, 35.43, 35.38, 35.32, 35.01, 35.25, 35.84, 35.74, 35.42, 35.29, 35.27, 35.21, 35.21, 35.12, 34.94, 34.85, 34.81, 34.79, 34.74, 34.65, 34.48, 34.44, 34.50, 34.92, 35.48, 35.53, 35.46, 35.43, 35.44, 35.44, 35.47, 35.03, 34.41, 34.37, 34.29, 34.18, 34.15, 34.18, 33.94, 33.80, 34.55, 35.18, 35.33, 35.39, 35.24, 35.08, 35.01, 34.99, 34.83, 34.89, 35.37, 35.56, 35.20, 34.81, 34.78, 34.80, 34.78, 34.75, 34.69, 34.62, 34.56, 34.54],
                "unit": "°C",  
                "has_data": true
              },
              "hrv": {
                "title": "HRV",
                "count": 130,
                "values": [22, 24, 29, 46, 56, 56, 19, 14, 83, 57, 37, 31, 28, 34, 25, 25, 31, 54, 29, 33, 62, 33, 33, 31, 21, 13, 37, 18, 31, 40, 28, 63, 79, 46, 28, 27, 28, 33, 69, 63, 38, 34, 19, 72, 27, 30, 37, 39, 31, 52, 37, 25, 34, 23, 18, 30, 45, 19, 54, 45, 62, 76, 45, 27, 36, 35, 36, 36, 30, 54, 31, 72, 24, 24, 34, 26, 36, 40, 38, 24, 21, 28, 63, 33, 68, 39, 109, 45, 63, 28, 36, 71, 25, 42, 71, 142, 35, 43, 32, 73, 36, 34, 47, 37, 44, 42, 100, 42, 113, 64, 64, 113, 49, 85, 46, 23, 53, 72, 49, 41, 36, 18, 30, 59, 51, 34, 17, 71, 32, 41],
                "unit": "ms",
                "has_data": true
              },
              "steps": {
                "title": "STEPS",
                "count": 287,
                "values": [56, 25, 0, 0, 0, 32, 0, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 34, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 94, 21, 0, 33, 0, 0, 0, 0, 0, 28, 36, 0, 0, 0, 0, 24, 90, 197, 27, 33, 0, 0, 0, 78, 104, 35, 25, 71, 0, 0, 204, 360, 315, 169, 0, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 34, 0, 0, 0, 335, 466, 470, 220, 232, 0, 68, 0, 29, 0, 41, 85, 0, 61, 0, 0, 0, 33, 32, 23, 0, 0, 0, 155, 149, 0, 0, 29, 27, 36, 41, 0, 77],
                "unit": "",
                "has_data": true
              }
            }
          }
          setBiotrackerData(biotrackerJsonData)
          return
        }
        const data = await response.json()
        setBiotrackerData(data)
      } catch (error) {
        console.error('Error loading biotracker data:', error)
      }
    }
    loadBiotrackerData()
  }, [])

  // Calculate statistics
  const stats = useMemo(() => {
    if (!biotrackerData?.processed_metrics) return null
    
    const calculateStats = (values) => {
      const validValues = values.filter(v => v > 0)
      const avg = validValues.reduce((a, b) => a + b, 0) / validValues.length
      const max = Math.max(...validValues)
      const min = Math.min(...validValues)
      return { avg: avg.toFixed(1), max, min, latest: validValues[validValues.length - 1] }
    }

    return {
      hr: calculateStats(biotrackerData.processed_metrics.hr.values),
      temp: calculateStats(biotrackerData.processed_metrics.temp.values),
      hrv: calculateStats(biotrackerData.processed_metrics.hrv.values),
      steps: {
        ...calculateStats(biotrackerData.processed_metrics.steps.values),
        total: biotrackerData.processed_metrics.steps.values.reduce((a, b) => a + b, 0)
      }
    }
  }, [biotrackerData])

  // Chart data configurations
  const chartConfigs = useMemo(() => {
    if (!biotrackerData?.processed_metrics) return {}

    const createChartData = (metric) => {
      const data = biotrackerData.processed_metrics[metric]
      const labels = data.values.map((_, index) => `${index + 1}`)
      
      return {
        labels: labels.slice(-50), // Show last 50 data points
        datasets: [{
          label: data.title,
          data: data.values.slice(-50),
          borderColor: metric === 'hr' ? '#3B82F6' : 
                      metric === 'temp' ? '#EF4444' :
                      metric === 'hrv' ? '#10B981' : '#8B5CF6',
          backgroundColor: metric === 'hr' ? 'rgba(59, 130, 246, 0.1)' : 
                          metric === 'temp' ? 'rgba(239, 68, 68, 0.1)' :
                          metric === 'hrv' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 2,
          pointHoverRadius: 6,
        }]
      }
    }

    return {
      hr: createChartData('hr'),
      temp: createChartData('temp'),
      hrv: createChartData('hrv'),
      steps: createChartData('steps')
    }
  }, [biotrackerData])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#ffffff',
      }
    }
  }

  if (!biotrackerData || !chartRegistered) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading biotracker data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Full Width Layout for Biotracker */}
      <div className="flex gap-6 h-screen">
        {/* Left Div - Main Biotracker Content */}
        <div className="w-3/7 bg-white border border-gray-300 rounded-lg shadow-lg p-6 overflow-y-auto">
          <div className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Biotracker Insights</h1>
              <div className="text-sm text-gray-500">
                {biotrackerData.date}
              </div>
            </div>
            
            {/* Live Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setSelectedMetric('hr')}>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Heart Rate</h3>
                <p className="text-2xl font-bold text-blue-600">{stats?.hr?.latest} BPM</p>
                <p className="text-sm text-blue-700">Avg: {stats?.hr?.avg} BPM</p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-blue-600">Live</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg border border-red-200 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setSelectedMetric('temp')}>
                <h3 className="text-lg font-semibold text-red-900 mb-2">Skin Temperature</h3>
                <p className="text-2xl font-bold text-red-600">{stats?.temp?.latest}°C</p>
                <p className="text-sm text-red-700">Avg: {stats?.temp?.avg}°C</p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-red-600">Live</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setSelectedMetric('hrv')}>
                <h3 className="text-lg font-semibold text-green-900 mb-2">HRV</h3>
                <p className="text-2xl font-bold text-green-600">{stats?.hrv?.latest}ms</p>
                <p className="text-sm text-green-700">Avg: {stats?.hrv?.avg}ms</p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-600">Live</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setSelectedMetric('steps')}>
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Activity</h3>
                <p className="text-2xl font-bold text-purple-600">{stats?.steps?.total}</p>
                <p className="text-sm text-purple-700">Total Steps</p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-purple-600">Live</span>
                </div>
              </div>
            </div>

            {/* Metric Selector */}
            <div className="mb-4">
              <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                {['hr', 'temp', 'hrv', 'steps'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedMetric === metric
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {biotrackerData.processed_metrics[metric].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Metric Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {biotrackerData.processed_metrics[selectedMetric].title} Trend
              </h3>
              <div className="h-40">
                {chartConfigs[selectedMetric] && (
                  <Line 
                    data={chartConfigs[selectedMetric]} 
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        tooltip: {
                          callbacks: {
                            label: (context) => `${context.parsed.y} ${biotrackerData.processed_metrics[selectedMetric].unit}`
                          }
                        }
                      }
                    }} 
                  />
                )}
              </div>
            </div>

            {/* Health Status */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
              <h3 className="text-xl font-semibold text-indigo-900 mb-3">Current Status</h3>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-indigo-700 font-medium">All Systems Optimal</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-600">Data Points:</span>
                  <span className="font-semibold">{biotrackerData.processed_metrics.hr.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-600">Active Sensors:</span>
                  <span className="font-semibold">4/4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Div - Visual Display with Ring Image and Advanced Charts */}
        <div className="w-4/7 bg-white border border-gray-300 rounded-lg shadow-lg p-6 overflow-y-auto">
          <div className="h-full flex flex-col">
            {/* Header with Ring Image */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Smart Biotracker Ring</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Connected to: <span className="font-semibold text-indigo-600">
                    {selectedUser === 'aayan-raj' ? 'AAYAN RAJ' : 
                     selectedUser === 'john-doe' ? 'John Doe' :
                     selectedUser === 'jane-smith' ? 'Jane Smith' :
                     selectedUser === 'mike-wilson' ? 'Mike Wilson' : 'Sarah Connor'}
                  </span>
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/ring.png"
                  alt="Smart Biotracker Ring"
                  width={120}
                  height={120}
                  className="object-contain animate-pulse"
                />
                <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  Active
                </div>
              </div>
            </div>

            {/* Multi-metric Overview Chart */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Multi-metric View</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-32 bg-white rounded-lg p-2">
                  <div className="text-xs font-semibold text-blue-600 mb-1">Heart Rate</div>
                  {chartConfigs.hr && (
                    <Line data={chartConfigs.hr} options={{...chartOptions, scales: { x: { display: false }, y: { display: false } }}} />
                  )}
                </div>
                <div className="h-32 bg-white rounded-lg p-2">
                  <div className="text-xs font-semibold text-red-600 mb-1">Temperature</div>
                  {chartConfigs.temp && (
                    <Line data={chartConfigs.temp} options={{...chartOptions, scales: { x: { display: false }, y: { display: false } }}} />
                  )}
                </div>
                <div className="h-32 bg-white rounded-lg p-2">
                  <div className="text-xs font-semibold text-green-600 mb-1">HRV</div>
                  {chartConfigs.hrv && (
                    <Line data={chartConfigs.hrv} options={{...chartOptions, scales: { x: { display: false }, y: { display: false } }}} />
                  )}
                </div>
                <div className="h-32 bg-white rounded-lg p-2">
                  <div className="text-xs font-semibold text-purple-600 mb-1">Steps</div>
                  {chartConfigs.steps && (
                    <Bar data={chartConfigs.steps} options={{...chartOptions, scales: { x: { display: false }, y: { display: false } }}} />
                  )}
                </div>
              </div>
            </div>

            {/* Health Score Donut Chart */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Score Distribution</h3>
              <div className="flex items-center justify-center h-48">
                <Doughnut 
                  data={{
                    labels: ['Cardiovascular', 'Recovery', 'Activity', 'Temperature'],
                    datasets: [{
                      data: [85, 78, 92, 88],
                      backgroundColor: [
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(139, 92, 246, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                      ],
                      borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(16, 185, 129)',
                        'rgb(139, 92, 246)',
                        'rgb(239, 68, 68)'
                      ],
                      borderWidth: 2
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          usePointStyle: true
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Device Status */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Battery Level
                  </span>
                  <span className="text-green-600 font-semibold">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Bluetooth Connection
                  </span>
                  <span className="text-blue-600 font-semibold">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Data Sync
                  </span>
                  <span className="text-purple-600 font-semibold">Real-time</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Memory Usage
                  </span>
                  <span className="text-orange-600 font-semibold">42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}