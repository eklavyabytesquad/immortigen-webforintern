'use client'

import { useState, useMemo } from 'react'
import { useAuth } from '../../app/utils/authcontext'
import BiotrackerUserDashboard from './biotracker-user-dashboard'

export default function BiotrackerContent() {
  const { user, session, loading } = useAuth()
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserList, setShowUserList] = useState(true)
  const [showDropdown, setShowDropdown] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [connectionFilter, setConnectionFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Dummy users data
  const dummyUsers = [
    {
      id: 'aayan-raj',
      name: 'AAYAN RAJ',
      connected: true,
      heartRate: 72,
      hrv: 45,
      temperature: 36.5,
      steps: 8540,
      sleep: 7.5,
      avatar: 'AR'
    },
    {
      id: 'john-doe',
      name: 'John Doe',
      connected: true,
      heartRate: 68,
      hrv: 52,
      temperature: 36.8,
      steps: 12340,
      sleep: 8.2,
      avatar: 'JD'
    },
    {
      id: 'jane-smith',
      name: 'Jane Smith',
      connected: false,
      heartRate: 75,
      hrv: 38,
      temperature: 36.3,
      steps: 6780,
      sleep: 6.8,
      avatar: 'JS'
    },
    {
      id: 'mike-wilson',
      name: 'Mike Wilson',
      connected: true,
      heartRate: 70,
      hrv: 48,
      temperature: 36.7,
      steps: 9850,
      sleep: 7.9,
      avatar: 'MW'
    },
    {
      id: 'sarah-connor',
      name: 'Sarah Connor',
      connected: true,
      heartRate: 65,
      hrv: 55,
      temperature: 36.4,
      steps: 11200,
      sleep: 8.1,
      avatar: 'SC'
    }
  ]

  const handleUserSelect = (userId) => {
    setSelectedUser(userId)
    setShowUserList(false)
  }

  const handleBackToUserList = () => {
    setShowUserList(true)
    setSelectedUser(null)
  }

  const handleMoreAction = (userId, action) => {
    console.log(`Action ${action} for user ${userId}`)
    setShowDropdown(null)
  }

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = dummyUsers.filter(userData => {
      const matchesSearch = 
        userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        userData.id.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesConnection = connectionFilter === 'all' || 
        (connectionFilter === 'connected' && userData.connected) ||
        (connectionFilter === 'disconnected' && !userData.connected)
      
      return matchesSearch && matchesConnection
    })

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [dummyUsers, searchTerm, connectionFilter, sortBy, sortOrder])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!showUserList && selectedUser) {
    return (
      <div className="space-y-2">
        {/* Back Button */}
        <div className="mb-4">
          <button
            onClick={handleBackToUserList}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-gray-700 font-medium">Back to User List</span>
          </button>
        </div>

        {/* Biotracker User Dashboard Component */}
        <BiotrackerUserDashboard selectedUser={selectedUser} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Biotracker Dashboard</h1>
        <div className="text-sm text-gray-500">
          {filteredAndSortedUsers.filter(u => u.connected).length} of {filteredAndSortedUsers.length} users connected
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Connection Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Connection Status</label>
            <select
              value={connectionFilter}
              onChange={(e) => setConnectionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Devices</option>
              <option value="connected">Connected</option>
              <option value="disconnected">Disconnected</option>
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="heartRate">Heart Rate</option>
                <option value="hrv">HRV</option>
                <option value="temperature">Temperature</option>
                <option value="steps">Steps</option>
                <option value="sleep">Sleep</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
            <button
              onClick={() => {
                setSearchTerm('')
                setConnectionFilter('all')
                setSortBy('name')
                setSortOrder('asc')
              }}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Biotracker Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Heart Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  HRV
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Steps
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sleep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedUsers.map((userData) => (
                <tr 
                  key={userData.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    userData.connected 
                      ? 'cursor-pointer' 
                      : 'cursor-not-allowed opacity-60'
                  }`}
                  onClick={() => {
                    if (userData.connected) {
                      handleUserSelect(userData.id)
                    }
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {userData.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{userData.name}</div>
                        <div className="text-sm text-gray-500">ID: {userData.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${userData.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        userData.connected 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {userData.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium text-gray-700">{userData.heartRate} BPM</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium text-gray-700">{userData.hrv} ms</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium text-gray-700">{userData.temperature}°C</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium text-gray-700">{userData.steps.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="font-medium text-gray-700">{userData.sleep} hours</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevent row click when clicking dropdown
                          setShowDropdown(showDropdown === userData.id ? null : userData.id)
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                      
                      {showDropdown === userData.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                handleUserSelect(userData.id)
                              }}
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                userData.connected 
                                  ? 'text-gray-700 hover:bg-gray-100' 
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                              disabled={!userData.connected}
                            >
                              More Details
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                handleMoreAction(userData.id, 'sync')
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sync Data
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                handleMoreAction(userData.id, 'calibrate')
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Calibrate Device
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                handleMoreAction(userData.id, 'settings')
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Device Settings
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation() // Prevent row click
                                handleMoreAction(userData.id, 'disconnect')
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Disconnect Device
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAndSortedUsers.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  )
}