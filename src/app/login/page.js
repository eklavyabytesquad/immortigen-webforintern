'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../utils/authcontext'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const { user, loading: authLoading, login } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        // Redirect will be handled by the useEffect above
        router.push('/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading spinner while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex relative overflow-hidden" style={{ width: '720px', background: 'linear-gradient(203.8deg, #555CF5 44.13%, #32368F 99.49%)' }}>
        {/* Decorative Circles */}
        <div 
          className="absolute rounded-full border border-white opacity-20"
          style={{ 
            width: '600px', 
            height: '620px', 
            top: '-390px', 
            left: '366px'
          }}
        />
        <div 
          className="absolute rounded-full border border-white opacity-20"
          style={{ 
            width: '470px', 
            height: '500px', 
            top: '-320px', 
            left: '420px'
          }}
        />
        <div 
          className="absolute rounded-full border border-white opacity-20"
          style={{ 
            width: '380px', 
            height: '380px', 
            top: '-250px', 
            left: '470px'
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12">
          <div className="flex flex-col items-center">
            <div className="rounded-xl overflow-hidden" style={{ width: '360px', height: '480px', borderRadius: '12px' }}>
              <Image
                src="/downloads/loginpage.png"
                alt="Doctor with documents"
                width={394}
                height={587}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm font-medium mb-4" style={{ color: 'rgba(255, 255, 255, 1)' }}>
                Want to track your patient&apos;s health and<br />provide help proactively?
              </p>
              <button 
                className="hover:opacity-90 px-10 py-2 rounded-full transition-all duration-300 font-medium text-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 1)',
                  color: 'rgba(85, 92, 245, 1)',
                  backdropFilter: 'blur(40px)'
                }}
              >
                Contact us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 lg:flex items-center justify-center" style={{ width: '720px', backgroundColor: '#FAFAFA' }}>
        <div className="w-full px-8" style={{ maxWidth: '406px' }}>
          {/* Logo and Title - Left Aligned */}
          <div className="mb-6">
            <div className="mb-5">
              <Image
                src="/downloads/log.svg"
                alt="Immortigen"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
            <p className="text-sm text-gray-500">
              Login with the credential provided through immortigen
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email id
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  style={{
                    width: '406px',
                    height: '43px',
                    borderRadius: '100px',
                    paddingTop: '24px',
                    paddingRight: '20px',
                    paddingBottom: '24px',
                    paddingLeft: '20px',
                    border: '1px solid rgba(225, 225, 225, 1)'
                  }}
                  className="appearance-none block w-full text-gray-900 placeholder-[#8E8E8E] focus:outline-none focus:ring-2 focus:ring-[#555CF5] focus:border-transparent text-sm"
                  placeholder="someone@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    style={{
                      width: '406px',
                      height: '43px',
                      borderRadius: '100px',
                      paddingTop: '24px',
                      paddingRight: '40px',
                      paddingBottom: '24px',
                      paddingLeft: '20px',
                      border: '1px solid rgba(225, 225, 225, 1)'
                    }}
                    className="appearance-none block w-full text-gray-900 placeholder-[#8E8E8E] focus:outline-none focus:ring-2 focus:ring-[#555CF5] focus:border-transparent text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-5 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '406px',
                  height: '43px',
                  borderRadius: '100px',
                  paddingTop: '24px',
                  paddingRight: '20px',
                  paddingBottom: '24px',
                  paddingLeft: '20px',
                  background: 'rgba(85, 92, 245, 1)',
                  backdropFilter: 'blur(40px)'
                }}
                className="flex items-center justify-center text-base font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#555CF5] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                )}
                {isLoading ? 'Signing in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
