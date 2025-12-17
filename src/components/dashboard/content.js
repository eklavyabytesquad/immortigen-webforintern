'use client'

import { useState } from 'react'
import { useAuth } from '../../app/utils/authcontext'
import ThreeDBody from './3dbody'
import OrganDetailView from './organ-detail-view'
import VennDiagram from './venn-diagram'

export default function DashboardContent() {
  const { user, session, loading } = useAuth()
  const [currentView, setCurrentView] = useState('body') // 'body' or 'organ-detail'
  const [selectedOrgan, setSelectedOrgan] = useState(null)

  const handleShowOrganDetail = (organName) => {
    setSelectedOrgan(organName)
    setCurrentView('organ-detail')
  }

  const handleBackToBody = () => {
    setCurrentView('body')
    setSelectedOrgan(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {currentView === 'body' ? (
        /* Two Column Layout for 3D Body View */
        <div className="flex gap-6 min-h-screen">
          {/* Left Div - 3D Body Component */}
          <ThreeDBody onShowOrganDetail={handleShowOrganDetail} />
          
          {/* Right Div - Dashboard Overview */}
          <div className="w-4/7 flex flex-col gap-2 pb-6">
            {/* Top section - Stats boxes (120px height) */}
            <div className="h-[120px] bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <div className="flex gap-4 h-full">
                {/* No of Patients */}
                <div className="flex-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 flex flex-col justify-center items-center border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800">No of Patients</h3>
                  <p className="text-2xl font-bold text-blue-600">1,247</p>
                </div>
                
                {/* Avg Health */}
                <div className="flex-1 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 flex flex-col justify-center items-center border border-green-200">
                  <h3 className="text-lg font-semibold text-green-800">Avg Health</h3>
                  <p className="text-2xl font-bold text-green-600">78%</p>
                </div>
                
                {/* High Risk */}
                <div className="flex-1 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3 flex flex-col justify-center items-center border border-red-200">
                  <h3 className="text-lg font-semibold text-red-800">High Risk</h3>
                  <p className="text-2xl font-bold text-red-600">12%</p>
                </div>
                
                {/* Alerts */}
                <div className="flex-1 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-3 flex flex-col justify-center items-center border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800">Alerts</h3>
                  <p className="text-2xl font-bold text-orange-600">23</p>
                </div>
              </div>
            </div>

            {/* Second Right section - Patient Venn Diagram (400px height) */}
            <VennDiagram />
            
            {/* Bottom section - Risk Stratification Dashboard */}
            <div className="h-[300px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between h-full">
                {/* Left Side - Risk Stratification */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Risk Stratification</h3>
                  </div>
                  
                  {/* Donut Chart Container */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#f3f4f6"
                          strokeWidth="20"
                        />
                        
                        {/* Low Risk - Green (61%) */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="20"
                          strokeDasharray={`${61 * 4.4} 440`}
                          strokeDashoffset="0"
                          className="transition-all duration-500"
                        />
                        
                        {/* Moderate Risk - Orange (17%) */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="20"
                          strokeDasharray={`${17 * 4.4} 440`}
                          strokeDashoffset={`-${61 * 4.4}`}
                          className="transition-all duration-500"
                        />
                        
                        {/* High Risk - Red (22%) */}
                        <circle
                          cx="90"
                          cy="90"
                          r="70"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="20"
                          strokeDasharray={`${22 * 4.4} 440`}
                          strokeDashoffset={`-${(61 + 17) * 4.4}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                    </div>
                    
                    {/* Legend */}
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700">61% Low</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700">17% Moderate</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
                        <span className="text-sm font-medium text-gray-700">22% High</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Statistics Cards */}
                <div className="flex flex-col gap-4 ml-8">
                  {/* Critical Cases */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-48">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-red-600 mb-1">Critical Cases</h4>
                      <p className="text-3xl font-bold text-red-600">124</p>
                    </div>
                  </div>
                  
                  {/* Stable Patients */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-48">
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-green-600 mb-1">Stable Patients</h4>
                      <p className="text-3xl font-bold text-green-600">500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top 3 Clinical Concerns Section */}
            <div className="h-[250px] bg-white border border-gray-300 rounded-lg shadow-lg p-6">
              <div className="w-full">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Top 3 Clinical Concerns</h4>
                <div className="space-y-4">
                  {/* Cardiac strain */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Cardiac strain increased 12% last month</span>
                  </div>
                  
                  {/* Liver fibrosis */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Liver fibrosis risk in 8 patients</span>
                  </div>
                  
                  {/* Renal stress */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Renal stress in 20-40 yr group</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Width Layout for Organ Detail View */
        <div className="h-screen">
          <OrganDetailView 
            organName={selectedOrgan} 
            onBackToBody={handleBackToBody} 
          />
        </div>
      )}
    </div>
  )
}
