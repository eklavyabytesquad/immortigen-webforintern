'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../app/utils/authcontext'
import supabase from '../../app/utils/supabase'

export default function SessionManager() {
  const { user, session, logout } = useAuth()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserSessions()
    }
  }, [user])

  const fetchUserSessions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sandbox_sessions')
        .select('id, session_token, expires_at, ip_address, user_agent, is_active, created_at, last_accessed_at')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('last_accessed_at', { ascending: false })

      if (error) {
        console.error('Error fetching sessions:', error)
        return
      }

      setSessions(data || [])
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const terminateSession = async (sessionId, sessionToken) => {
    try {
      // Deactivate the session
      const { error } = await supabase
        .from('sandbox_sessions')
        .update({ is_active: false })
        .eq('id', sessionId)

      if (error) {
        console.error('Error terminating session:', error)
        return
      }

      // If it's the current session, logout
      if (session && session.id === sessionId) {
        await logout()
      } else {
        // Refresh sessions list
        fetchUserSessions()
      }
    } catch (error) {
      console.error('Error terminating session:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const getBrowserInfo = (userAgent) => {
    if (!userAgent) return 'Unknown'
    
    if (userAgent.includes('Chrome')) return 'Chrome'
    if (userAgent.includes('Firefox')) return 'Firefox'
    if (userAgent.includes('Safari')) return 'Safari'
    if (userAgent.includes('Edge')) return 'Edge'
    
    return 'Other'
  }

  if (!user) return null

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Active Sessions
        </h3>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-gray-500">No active sessions found.</p>
        ) : (
          <div className="space-y-4">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className={`border rounded-lg p-4 ${
                  session && session.id === sess.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getBrowserInfo(sess.user_agent)}
                          {session && session.id === sess.id && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              Current Session
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">
                          IP: {sess.ip_address} • Last accessed: {formatDate(sess.last_accessed_at)}
                        </p>
                        <p className="text-xs text-gray-500">
                          Expires: {formatDate(sess.expires_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => terminateSession(sess.id, sess.session_token)}
                    className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    {session && session.id === sess.id ? 'Logout' : 'Terminate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={fetchUserSessions}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Refresh Sessions
          </button>
        </div>
      </div>
    </div>
  )
}