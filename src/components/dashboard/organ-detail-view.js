'use client'

import { useState } from 'react'

export default function OrganDetailView({ organName, onBackToBody }) {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Same organ data as in 3dbody.js - you might want to move this to a shared file
  const organData = {
    Brain: {
      name: 'Brain',
      icon: '🧠',
      description: 'Central nervous system control center',
      users: [
        { name: 'Alice Johnson', risk: 'high', condition: 'Cognitive decline', age: 72, lastCheckup: '2024-09-15', score: 45 },
        { name: 'Bob Smith', risk: 'low', condition: 'Healthy function', age: 34, lastCheckup: '2024-09-20', score: 92 },
        { name: 'Carol Davis', risk: 'medium', condition: 'Memory issues', age: 58, lastCheckup: '2024-09-18', score: 67 },
        { name: 'David Wilson', risk: 'high', condition: 'Neurodegeneration', age: 68, lastCheckup: '2024-09-12', score: 38 },
        { name: 'Emma Brown', risk: 'low', condition: 'Optimal health', age: 29, lastCheckup: '2024-09-22', score: 95 }
      ]
    },
    Heart: {
      name: 'Heart',
      icon: '❤️',
      description: 'Cardiovascular system pump',
      users: [
        { name: 'Paul Johnson', risk: 'high', condition: 'Arrhythmia', age: 65, lastCheckup: '2024-09-10', score: 42 },
        { name: 'Quinn Davis', risk: 'medium', condition: 'High blood pressure', age: 52, lastCheckup: '2024-09-16', score: 63 },
        { name: 'Rachel Kim', risk: 'low', condition: 'Strong heart', age: 28, lastCheckup: '2024-09-25', score: 88 },
        { name: 'Sam Wilson', risk: 'high', condition: 'Coronary disease', age: 71, lastCheckup: '2024-09-08', score: 35 },
        { name: 'Tina Lopez', risk: 'medium', condition: 'Cholesterol issues', age: 45, lastCheckup: '2024-09-19', score: 59 }
      ]
    },
    Liver: {
      name: 'Liver',
      icon: '🫀',
      description: 'Detoxification and metabolism center',
      users: [
        { name: 'Julia Ward', risk: 'high', condition: 'Fatty liver', age: 61, lastCheckup: '2024-09-11', score: 41 },
        { name: 'Kevin Brooks', risk: 'low', condition: 'Normal enzymes', age: 31, lastCheckup: '2024-09-23', score: 87 },
        { name: 'Linda Gray', risk: 'medium', condition: 'Elevated ALT', age: 49, lastCheckup: '2024-09-17', score: 64 },
        { name: 'Mike Reed', risk: 'high', condition: 'Liver fibrosis', age: 67, lastCheckup: '2024-09-09', score: 36 },
        { name: 'Nina Cox', risk: 'low', condition: 'Optimal function', age: 26, lastCheckup: '2024-09-24', score: 91 }
      ]
    },
    Lungs: {
      name: 'Lungs',
      icon: '🫁',
      description: 'Respiratory system gas exchange',
      users: [
        { name: 'Kate Roberts', risk: 'high', condition: 'COPD risk', age: 69, lastCheckup: '2024-09-13', score: 43 },
        { name: 'Liam Murphy', risk: 'low', condition: 'Clear airways', age: 32, lastCheckup: '2024-09-21', score: 89 },
        { name: 'Maya Patel', risk: 'medium', condition: 'Mild asthma', age: 38, lastCheckup: '2024-09-14', score: 66 },
        { name: 'Noah Garcia', risk: 'high', condition: 'Smoking damage', age: 54, lastCheckup: '2024-09-07', score: 39 },
        { name: 'Olivia White', risk: 'low', condition: 'Excellent capacity', age: 25, lastCheckup: '2024-09-26', score: 93 }
      ]
    },
    Kidney: {
      name: 'Kidney',
      icon: '🫘',
      description: 'Filtration and fluid balance',
      users: [
        { name: 'Zoe Martinez', risk: 'high', condition: 'Chronic kidney disease', age: 73, lastCheckup: '2024-09-06', score: 37 },
        { name: 'Adam Foster', risk: 'low', condition: 'Normal function', age: 30, lastCheckup: '2024-09-27', score: 90 },
        { name: 'Beth Collins', risk: 'medium', condition: 'Kidney stones', age: 44, lastCheckup: '2024-09-15', score: 61 },
        { name: 'Carl Turner', risk: 'high', condition: 'Reduced filtration', age: 66, lastCheckup: '2024-09-05', score: 40 },
        { name: 'Diana Ross', risk: 'low', condition: 'Excellent health', age: 27, lastCheckup: '2024-09-28', score: 94 }
      ]
    },
    // Adding basic data for other organs
    Thyroid: {
      name: 'Thyroid', icon: '🦋', description: 'Metabolic regulation gland',
      users: [
        { name: 'Frank Miller', risk: 'medium', condition: 'Hypothyroidism', age: 55, lastCheckup: '2024-09-14', score: 62 },
        { name: 'Grace Lee', risk: 'low', condition: 'Normal function', age: 33, lastCheckup: '2024-09-22', score: 86 }
      ]
    },
    Gut: {
      name: 'Gut', icon: '🍃', description: 'Digestive system microbiome',
      users: [
        { name: 'Uma Singh', risk: 'medium', condition: 'IBS symptoms', age: 41, lastCheckup: '2024-09-16', score: 58 },
        { name: 'Victor Chang', risk: 'low', condition: 'Healthy microbiome', age: 29, lastCheckup: '2024-09-24', score: 88 }
      ]
    },
    Stomach: {
      name: 'Stomach', icon: '🥗', description: 'Primary digestion chamber',
      users: [
        { name: 'Eric Hill', risk: 'medium', condition: 'Gastritis', age: 47, lastCheckup: '2024-09-18', score: 60 },
        { name: 'Fiona Green', risk: 'low', condition: 'Normal acid levels', age: 35, lastCheckup: '2024-09-23', score: 84 }
      ]
    },
    Bladder: {
      name: 'Bladder', icon: '💧', description: 'Urinary storage system',
      users: [
        { name: 'Oscar Hughes', risk: 'medium', condition: 'Overactive bladder', age: 59, lastCheckup: '2024-09-17', score: 56 },
        { name: 'Penny Wood', risk: 'low', condition: 'Normal capacity', age: 31, lastCheckup: '2024-09-25', score: 85 }
      ]
    },
    Legs: {
      name: 'Legs', icon: '🦵', description: 'Lower extremity circulation',
      users: [
        { name: 'Tara Scott', risk: 'high', condition: 'Poor circulation', age: 64, lastCheckup: '2024-09-12', score: 44 },
        { name: 'Ulric Nash', risk: 'low', condition: 'Strong muscles', age: 28, lastCheckup: '2024-09-26', score: 89 }
      ]
    }
  }

  const currentOrgan = organData[organName] || { name: organName, users: [], icon: '🔍', description: 'Organ analysis' }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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

  const getRiskStats = () => {
    const total = currentOrgan.users.length
    const high = currentOrgan.users.filter(u => u.risk === 'high').length
    const medium = currentOrgan.users.filter(u => u.risk === 'medium').length
    const low = currentOrgan.users.filter(u => u.risk === 'low').length
    return { total, high, medium, low }
  }

  const filteredUsers = currentOrgan.users.filter(user => 
    selectedRiskFilter === 'all' || user.risk === selectedRiskFilter
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name)
      case 'risk': 
        const riskOrder = { high: 3, medium: 2, low: 1 }
        return riskOrder[b.risk] - riskOrder[a.risk]
      case 'score': return b.score - a.score
      case 'age': return b.age - a.age
      default: return 0
    }
  })

  const stats = getRiskStats()

  return (
    <div className="w-full bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBackToBody}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-200"
            >
              ← Back to Body
            </button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                {currentOrgan.icon} {currentOrgan.name} Analysis
              </h1>
              <p className="text-indigo-100 mt-1">{currentOrgan.description}</p>
            </div>
          </div>
        </div>

        {/* Risk Statistics */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-sm text-indigo-100">Total Patients</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.high}</div>
            <div className="text-sm text-red-100">High Risk</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.medium}</div>
            <div className="text-sm text-yellow-100">Medium Risk</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{stats.low}</div>
            <div className="text-sm text-green-100">Low Risk</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Filter by Risk:</label>
              <select 
                value={selectedRiskFilter} 
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Risks</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="name">Name</option>
                <option value="risk">Risk Level</option>
                <option value="score">Health Score</option>
                <option value="age">Age</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {sortedUsers.length} of {currentOrgan.users.length} patients
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {sortedUsers.map((user, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getRiskIcon(user.risk)}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.condition}</p>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>Age: {user.age}</span>
                      <span>Last Checkup: {user.lastCheckup}</span>
                      <span>Health Score: {user.score}/100</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium uppercase border ${getRiskColor(user.risk)}`}>
                    {user.risk} Risk
                  </span>
                  <div className="mt-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          user.score >= 80 ? 'bg-green-500' : 
                          user.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{width: `${user.score}%`}}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentOrgan.users.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium">No patient data available</h3>
          <p className="text-sm">Patient information for {organName} will appear here when available.</p>
        </div>
      )}
    </div>
  )
}