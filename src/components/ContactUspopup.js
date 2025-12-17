'use client';

import React, { useState, useEffect } from "react";
import ContactUsSuccessToast from "./ContactUsSuccessToast"; // Import the toast

export default function ContactUspopup({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [showToast, setShowToast] = useState(false); // Add toast state

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Show toast and close modal
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Always render toast, conditionally render modal
  return (
    <>
      {/* Toast is always rendered */}
      <ContactUsSuccessToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message="Your message has been sent! We'll get back to you soon."
      />
      
      {/* Modal is conditionally rendered */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto relative">
            {/* All your existing modal content stays exactly the same */}
            <div className="flex items-center justify-between px-8 pt-8 pb-3">
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10"
                aria-label="Close modal"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="flex flex-col items-center justify-center px-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-3 py-4 border border-purple-200 w-full max-w-lg mx-auto mb-6 flex flex-col items-center">
                <p className="text-gray-600 text-sm text-center mb-2">We would love to hear from you — drop us a message!</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 justify-center w-full items-center">
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm w-full sm:w-auto justify-center">
                    <svg className="w-4 h-4 text-[#5F4AFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">contact@Immortigen.com</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-gray-200 text-sm w-full sm:w-auto justify-center">
                    <svg className="w-4 h-4 text-[#5F4AFB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Chennai, India</span>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 flex flex-col items-center justify-center">
              <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
                <input 
                  type="text" 
                  name="name" 
                  required 
                  value={formData.name} 
                  onChange={handleChange} 
                  className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base" 
                  placeholder="Full name" 
                />
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base" 
                  placeholder="Email address" 
                />
                <input 
                  type="text" 
                  name="subject" 
                  required 
                  value={formData.subject} 
                  onChange={handleChange} 
                  className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base" 
                  placeholder="Subject" 
                />
                <textarea 
                  name="message" 
                  required 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange} 
                  className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base resize-none" 
                  placeholder="Tell us more about your inquiry..." 
                />
                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-6 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all text-sm"
                    style={{ minWidth: '90px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-full text-white font-medium hover:opacity-90 transition-all shadow-lg text-sm"
                    style={{ backgroundColor: '#654BFF', minWidth: '110px' }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
