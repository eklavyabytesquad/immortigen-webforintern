'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function VitalsContent({ patient }) {
  const [hrvPeriod, setHrvPeriod] = useState('Today')
  const [heartRatePeriod, setHeartRatePeriod] = useState('Today')
  const [activityPeriod, setActivityPeriod] = useState('This Week')
  const [sleepPeriod, setSleepPeriod] = useState('This Week')

  // Data generators for different periods
  const getHRVData = (period) => {
    switch(period) {
      case 'Today':
        return {
          labels: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am'],
          data: [65, 75, 68, 82, 55, 78, 72, 85, 60, 75, 82, 78, 65, 70],
          stats: { min: 55, max: 85, avg: 71 }
        }
      case 'This Week':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [70, 75, 68, 80, 72, 78, 82],
          stats: { min: 68, max: 82, avg: 75 }
        }
      case 'This Month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [72, 75, 70, 78],
          stats: { min: 70, max: 78, avg: 74 }
        }
    }
  }

  const getHeartRateData = (period) => {
    switch(period) {
      case 'Today':
        return {
          labels: ['1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am', '1am', '2am'],
          data: [75, 65, 62, 78, 70, 72, 68, 62, 58, 55, 60, 58, 65, 70],
          stats: { min: 55, max: 78, avg: 66 }
        }
      case 'This Week':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [68, 72, 65, 75, 70, 62, 58],
          stats: { min: 58, max: 75, avg: 67 }
        }
      case 'This Month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [70, 68, 72, 65],
          stats: { min: 65, max: 72, avg: 69 }
        }
    }
  }

  const getActivityData = (period) => {
    switch(period) {
      case 'Today':
        return {
          labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
          data: [1200, 2500, 3200, 2800, 4500, 1300],
          stats: { avg: 2583, total: 15500, best: 4500 }
        }
      case 'This Week':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [8500, 12000, 6500, 10500, 9200, 15000, 11800],
          stats: { avg: 10500, total: 73500, best: 15000 }
        }
      case 'This Month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [68000, 72500, 65000, 78000],
          stats: { avg: 70875, total: 283500, best: 78000 }
        }
    }
  }

  const getSleepData = (period) => {
    switch(period) {
      case 'Today':
        return {
          labels: ['12am', '2am', '4am', '6am', '8am'],
          data: [1.5, 3.0, 4.5, 6.0, 7.2],
          stats: { avg: 7.2, best: 7.2, quality: 'Good' }
        }
      case 'This Week':
        return {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [7.5, 6.2, 8.1, 7.8, 6.5, 9.2, 8.5],
          stats: { avg: 7.7, best: 9.2, quality: 'Good' }
        }
      case 'This Month':
        return {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          data: [7.8, 7.5, 8.2, 7.6],
          stats: { avg: 7.8, best: 8.2, quality: 'Excellent' }
        }
    }
  }

  // Memoized data based on selected periods
  const hrvDataset = useMemo(() => getHRVData(hrvPeriod), [hrvPeriod])
  const heartRateDataset = useMemo(() => getHeartRateData(heartRatePeriod), [heartRatePeriod])
  const activityDataset = useMemo(() => getActivityData(activityPeriod), [activityPeriod])
  const sleepDataset = useMemo(() => getSleepData(sleepPeriod), [sleepPeriod])

  // Chart data with animations
  const hrvData = {
    labels: hrvDataset.labels,
    datasets: [
      {
        data: hrvDataset.data,
        backgroundColor: 'rgba(251, 148, 91, 1)',
        borderRadius: 4,
        barThickness: hrvPeriod === 'Today' ? 6 : hrvPeriod === 'This Week' ? 24 : 40,
      },
    ],
  }

  const heartRateData = {
    labels: heartRateDataset.labels,
    datasets: [
      {
        data: heartRateDataset.data,
        fill: true,
        backgroundColor: 'rgba(58, 134, 254, 0.15)',
        borderColor: 'rgba(58, 134, 254, 1)',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(58, 134, 254, 1)',
        pointHoverBackgroundColor: 'rgba(58, 134, 254, 1)',
      },
    ],
  }

  const activityData = {
    labels: activityDataset.labels,
    datasets: [
      {
        data: activityDataset.data,
        backgroundColor: 'rgba(34, 197, 94, 1)',
        borderRadius: 4,
        barThickness: activityPeriod === 'Today' ? 20 : activityPeriod === 'This Week' ? 24 : 40,
      },
    ],
  }

  const sleepData = {
    labels: sleepDataset.labels,
    datasets: [
      {
        data: sleepDataset.data,
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 2.5,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(139, 92, 246, 1)',
        pointHoverBackgroundColor: 'rgba(139, 92, 246, 1)',
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart',
    },
    transitions: {
      active: {
        animation: {
          duration: 400
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 13,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#999',
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: '#999',
          font: {
            size: 10,
          },
        },
      },
    },
  }

  const formatNumber = (num) => {
    return num >= 1000 ? (num / 1000).toFixed(0) + 'k' : num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Heart Rate Variability Chart */}
      <div className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Image
                src="/assets/dashbaord/chartheart.png"
                alt="Heart Icon"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Heart Rate Variability</h2>
          </div>
          <select
            value={hrvPeriod}
            onChange={(e) => setHrvPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 hover:border-orange-300 cursor-pointer"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        <div className="flex gap-6">
          <div className="flex-1 transition-opacity duration-500" style={{ height: '280px' }} key={hrvPeriod}>
            <Bar data={hrvData} options={chartOptions} />
          </div>
          <div className="flex flex-col justify-center gap-4 min-w-[180px]">
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Minimum</p>
              <p className="text-3xl font-bold text-blue-500 transition-all duration-500">{hrvDataset.stats.min}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Maximum</p>
              <p className="text-3xl font-bold text-red-500 transition-all duration-500">{hrvDataset.stats.max}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Average</p>
              <p className="text-3xl font-bold text-orange-500 transition-all duration-500">{hrvDataset.stats.avg}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Rate Chart */}
      <div className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <Image
                src="/assets/dashbaord/chartheart.png"
                alt="Heart Icon"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Heart Rate</h2>
          </div>
          <select
            value={heartRatePeriod}
            onChange={(e) => setHeartRatePeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white transition-all duration-200 hover:border-blue-300 cursor-pointer"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        <div className="flex gap-6">
          <div className="flex-1 transition-opacity duration-500" style={{ height: '280px' }} key={heartRatePeriod}>
            <Line data={heartRateData} options={chartOptions} />
          </div>
          <div className="flex flex-col justify-center gap-4 min-w-[180px]">
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Minimum</p>
              <p className="text-3xl font-bold text-blue-500 transition-all duration-500">{heartRateDataset.stats.min}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Maximum</p>
              <p className="text-3xl font-bold text-red-500 transition-all duration-500">{heartRateDataset.stats.max}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Average</p>
              <p className="text-3xl font-bold text-blue-500 transition-all duration-500">{heartRateDataset.stats.avg}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" fill="white"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Activity (Steps)</h2>
          </div>
          <select
            value={activityPeriod}
            onChange={(e) => setActivityPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-200 bg-white transition-all duration-200 hover:border-green-300 cursor-pointer"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        <div className="flex gap-6">
          <div className="flex-1 transition-opacity duration-500" style={{ height: '280px' }} key={activityPeriod}>
            <Bar data={activityData} options={chartOptions} />
          </div>
          <div className="flex flex-col justify-center gap-4 min-w-[180px]">
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">{activityPeriod === 'Today' ? 'Total Steps' : 'Daily Average'}</p>
              <p className="text-3xl font-bold text-green-500 transition-all duration-500">{formatNumber(activityDataset.stats.avg)}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">{activityPeriod === 'This Month' ? 'Monthly Total' : activityPeriod === 'This Week' ? 'Weekly Total' : 'Peak Activity'}</p>
              <p className="text-3xl font-bold text-green-600 transition-all duration-500">{formatNumber(activityDataset.stats.total)}</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Best {activityPeriod === 'This Month' ? 'Week' : 'Day'}</p>
              <p className="text-3xl font-bold text-green-500 transition-all duration-500">{formatNumber(activityDataset.stats.best)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sleep Chart */}
      <div className="rounded-xl p-6 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center transition-transform duration-300 hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6 2 3 5 3 9C3 13 6 16 10 16C14 16 17 13 17 9C17 7.5 16.5 6.2 15.6 5.2C15.8 5.7 16 6.3 16 7C16 10.3 13.3 13 10 13C6.7 13 4 10.3 4 7C4 4.8 5.2 2.9 7 2.2C8 2.1 9 2 10 2Z" fill="white"/>
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Sleep (Hours)</h2>
          </div>
          <select
            value={sleepPeriod}
            onChange={(e) => setSleepPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white transition-all duration-200 hover:border-purple-300 cursor-pointer"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        
        <div className="flex gap-6">
          <div className="flex-1 transition-opacity duration-500" style={{ height: '280px' }} key={sleepPeriod}>
            <Line data={sleepData} options={chartOptions} />
          </div>
          <div className="flex flex-col justify-center gap-4 min-w-[180px]">
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">{sleepPeriod === 'Today' ? 'Total Sleep' : 'Average Sleep'}</p>
              <p className="text-3xl font-bold text-purple-500 transition-all duration-500">{sleepDataset.stats.avg}h</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Best {sleepPeriod === 'This Month' ? 'Week' : 'Night'}</p>
              <p className="text-3xl font-bold text-purple-600 transition-all duration-500">{sleepDataset.stats.best}h</p>
            </div>
            <div className="rounded-lg p-4 transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <p className="text-xs text-gray-500 mb-2">Sleep Quality</p>
              <p className="text-3xl font-bold text-purple-500 transition-all duration-500">{sleepDataset.stats.quality}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
