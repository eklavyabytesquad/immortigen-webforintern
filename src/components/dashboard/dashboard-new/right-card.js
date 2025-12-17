'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import ClinicalActionsPopup from './clinical-actions-popup'
import CustomDropdown from './custom-dropdown'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function RightCard() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState('This week')
  const [showClinicalActionsPopup, setShowClinicalActionsPopup] = useState(false)

  // Dummy data for the week
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Low Risk',
        data: [180, 150, 200, 250, 220, 240, 200],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(34, 197, 94)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Moderate Risk',
        data: [60, 50, 70, 90, 80, 85, 75],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.08)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(249, 115, 22)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'High Risk',
        data: [30, 25, 20, 28, 35, 30, 40],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(239, 68, 68)',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'line',
          padding: 16,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: 'rgba(142, 142, 142, 1)',
          boxWidth: 20,
          boxHeight: 2,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: 'rgba(226, 232, 240, 1)',
        borderWidth: 1,
        padding: 12,
        titleColor: '#1e293b',
        bodyColor: '#475569',
        titleFont: {
          size: 13,
          weight: '600',
        },
        bodyFont: {
          size: 12,
          weight: '500',
        },
        usePointStyle: true,
        boxPadding: 6,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: 'rgba(148, 163, 184, 0.15)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgba(142, 142, 142, 1)',
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 500,
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgba(142, 142, 142, 1)',
          stepSize: 100,
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const clinicalActions = [
    {
      id: 1,
      patientId: '0000003',
      patientName: 'Rohan Kumar',
      icon: '❤️',
      iconBg: 'bg-red-50',
      text: 'Irregular heartbeat detected',
      severity: 'High',
      time: '2h ago'
    },
    {
      id: 2,
      patientId: '0000002',
      patientName: 'Priya Sharma',
      icon: '🫁',
      iconBg: 'bg-blue-50',
      text: 'Oxygen saturation below normal range',
      severity: 'Moderate',
      time: '5h ago'
    },
    {
      id: 3,
      patientId: '0000005',
      patientName: 'Raj Malhotra',
      icon: '🩺',
      iconBg: 'bg-orange-50',
      text: 'Blood pressure elevated - requires attention',
      severity: 'Moderate',
      time: '1d ago'
    },
    {
      id: 4,
      patientId: '0000001',
      patientName: 'Anika Joshi',
      icon: '🩸',
      iconBg: 'bg-purple-50',
      text: 'Abnormal blood glucose levels detected',
      severity: 'High',
      time: '1d ago'
    }
  ]

  const handleClinicalActionClick = (patientId) => {
    router.push(`/dashboard/patients/${patientId}`)
  }

  return (
    <>
      <div className="flex flex-col gap-6 h-full">
      {/* Top Stats Cards */}
      <div
        className="rounded-[32px] border border-white/60 p-6"
        style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px)' }}
      >
        <div className="grid grid-cols-3 gap-0">
          <div className="px-4">
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(75, 75, 75, 1)' }}></div>
              <p className="text-xs mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Total Patient</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(75, 75, 75, 1)' }}>48</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(85, 92, 245, 1)' }}></div>
              <p className="text-xs mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Active Tracking</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(85, 92, 245, 1)' }}>36</p>
            </div>
          </div>

          <div className="border-l px-4" style={{ borderColor: 'rgba(142, 142, 142, 0.3)' }}>
            <div className="flex flex-col">
              <div className="w-1 h-3 rounded mb-3" style={{ backgroundColor: 'rgba(21, 182, 108, 1)' }}></div>
              <p className="text-xs mb-1" style={{ color: 'rgba(142, 142, 142, 1)' }}>Patient Satisfaction Score</p>
              <p className="text-2xl font-bold" style={{ color: 'rgba(21, 182, 108, 1)' }}>88%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Overview Chart */}
      <div
        className="rounded-[32px] border border-white/60 p-6"
        style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold" style={{ color: 'rgba(0, 0, 0, 1)' }}>Patient Overview</h3>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-xs px-4 py-2 rounded-full border focus:outline-none"
            style={{ 
              backgroundColor: 'transparent',
              borderColor: 'rgba(142, 142, 142, 0.3)',
              color: 'rgba(142, 142, 142, 1)'
            }}
          >
            <option>This week</option>
            <option>Last week</option>
            <option>This month</option>
          </select>
        </div>
        <div className="relative" style={{ height: '220px' }}>
          <Line data={data} options={options} />
        </div>
      </div>

      {/* Clinical Actions */}
      <div
        className="rounded-[32px] border border-white/60 p-6 flex-1"
        style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px)' }}
      >
        <h3 className="text-base font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 1)' }}>Clinical actions</h3>
        <div className="space-y-3">
          {clinicalActions.slice(0, 2).map((action) => (
            <div
              key={action.id}
              onClick={() => handleClinicalActionClick(action.patientId)}
              className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-white/80 hover:bg-white/80 transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-8 h-8 rounded-lg ${action.iconBg} flex items-center justify-center text-base`}>
                  {action.icon}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate" style={{ color: 'rgba(0, 0, 0, 1)' }}>
                    {action.text}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {action.patientName}
                    </span>
                    <span className="text-xs" style={{ color: 'rgba(142, 142, 142, 0.6)' }}>•</span>
                    <span className="text-xs" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                      {action.time}
                    </span>
                  </div>
                </div>
              </div>
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(142, 142, 142, 1)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setShowClinicalActionsPopup(true)}
          className="w-full mt-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-1" 
          style={{ color: 'rgba(142, 142, 142, 1)' }}
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

      {/* Clinical Actions Popup */}
      <ClinicalActionsPopup 
        isOpen={showClinicalActionsPopup} 
        onClose={() => setShowClinicalActionsPopup(false)} 
      />
    </>
  )
}
