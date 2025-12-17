'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import bcrypt from 'bcryptjs'
import supabase from './supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Generate a secure session token
const generateSessionToken = () => {
  return crypto.randomUUID() + '-' + Date.now() + '-' + Math.random().toString(36).substring(2)
}

// Get user's IP address and user agent
const getClientInfo = () => {
  const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : null
  // Note: Getting real IP address requires server-side implementation
  // For now, we'll use a placeholder
  const ipAddress = '127.0.0.1' // This should be handled server-side in production
  
  return { userAgent, ipAddress }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    
    // Set up periodic session validation (every 5 minutes)
    const interval = setInterval(validateSession, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const checkAuth = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token')
      if (!sessionToken) {
        setLoading(false)
        return
      }

      await validateSession()
    } catch (error) {
      console.error('Auth check error:', error)
      await logout()
    } finally {
      setLoading(false)
    }
  }

  const validateSession = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token')
      if (!sessionToken) {
        setUser(null)
        setSession(null)
        return
      }

      // Check if session exists and is valid
      const { data: sessionData, error: sessionError } = await supabase
        .from('sandbox_sessions')
        .select(`
          id,
          user_id,
          session_token,
          expires_at,
          is_active,
          sandbox_users (
            id,
            email,
            full_name,
            company_name,
            is_active,
            created_at
          )
        `)
        .eq('session_token', sessionToken)
        .eq('is_active', true)
        .single()

      if (sessionError || !sessionData || new Date(sessionData.expires_at) < new Date()) {
        // Session is invalid or expired
        await logout()
        return
      }

      // Update last accessed time
      await supabase
        .from('sandbox_sessions')
        .update({ last_accessed_at: new Date().toISOString() })
        .eq('session_token', sessionToken)

      // Set user and session data
      setUser(sessionData.sandbox_users)
      setSession(sessionData)

    } catch (error) {
      console.error('Session validation error:', error)
      await logout()
    }
  }

  const handleLogin = async (formData, setLoading, setError, router) => {
    setLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return { success: false }
    }

    try {
      // Get user from database
      const { data: userData, error: userError } = await supabase
        .from('sandbox_users')
        .select('*')
        .eq('email', formData.email)
        .eq('is_active', true)
        .single()

      if (userError || !userData) {
        setError('Invalid email or password')
        setLoading(false)
        return { success: false }
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(formData.password, userData.password_hash)

      if (!passwordMatch) {
        setError('Invalid email or password')
        setLoading(false)
        return { success: false }
      }

      // Create new session
      const sessionToken = generateSessionToken()
      const { userAgent, ipAddress } = getClientInfo()
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

      const { data: sessionData, error: sessionError } = await supabase
        .from('sandbox_sessions')
        .insert([
          {
            user_id: userData.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString(),
            ip_address: ipAddress,
            user_agent: userAgent,
            is_active: true
          }
        ])
        .select()
        .single()

      if (sessionError) {
        setError('Failed to create session: ' + sessionError.message)
        setLoading(false)
        return { success: false }
      }

      // Store session token in localStorage
      localStorage.setItem('session_token', sessionToken)

      // Set user and session state
      setUser(userData)
      setSession(sessionData)

      setLoading(false)
      
      // Redirect to dashboard
      router.push('/dashboard')

      return { success: true, user: userData }

    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed: ' + error.message)
      setLoading(false)
      return { success: false }
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)

      // Get user from database
      const { data: userData, error: userError } = await supabase
        .from('sandbox_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single()

      if (userError || !userData) {
        throw new Error('Invalid email or password')
      }

      // Verify password
      const passwordMatch = await bcrypt.compare(password, userData.password_hash)

      if (!passwordMatch) {
        throw new Error('Invalid email or password')
      }

      // Create new session
      const sessionToken = generateSessionToken()
      const { userAgent, ipAddress } = getClientInfo()
      const expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

      const { data: sessionData, error: sessionError } = await supabase
        .from('sandbox_sessions')
        .insert([
          {
            user_id: userData.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString(),
            ip_address: ipAddress,
            user_agent: userAgent,
            is_active: true
          }
        ])
        .select()
        .single()

      if (sessionError) {
        throw new Error('Failed to create session: ' + sessionError.message)
      }

      // Store session token in localStorage
      localStorage.setItem('session_token', sessionToken)

      // Set user and session state
      setUser(userData)
      setSession(sessionData)

      return { success: true, user: userData }

    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)

      // Hash password
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(userData.password, saltRounds)

      // Insert user into database
      const { data: newUser, error: userError } = await supabase
        .from('sandbox_users')
        .insert([
          {
            email: userData.email,
            password_hash: passwordHash,
            full_name: userData.fullName,
            company_name: userData.companyName || null,
            is_active: true
          }
        ])
        .select()
        .single()

      if (userError) {
        if (userError.code === '23505') {
          throw new Error('Email already exists')
        } else {
          throw new Error('Registration failed: ' + userError.message)
        }
      }

      // Auto-login after registration
      const loginResult = await login(userData.email, userData.password)
      return loginResult

    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      const sessionToken = localStorage.getItem('session_token')
      
      if (sessionToken) {
        // Deactivate session in database
        await supabase
          .from('sandbox_sessions')
          .update({ is_active: false })
          .eq('session_token', sessionToken)
      }

      // Clear local storage
      localStorage.removeItem('session_token')
      
      // Clear state
      setUser(null)
      setSession(null)

      // Redirect to main page
      router.push('/')

    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, clear local state
      localStorage.removeItem('session_token')
      setUser(null)
      setSession(null)
      router.push('/')
    }
  }

  const value = {
    user,
    session,
    loading,
    login,
    handleLogin,
    register,
    logout,
    checkAuth,
    validateSession
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
