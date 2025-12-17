  
'use client';

import React, { useState } from "react";
import JoinWaitlistSuccessToast from "./JoinWaitlistSuccessToast";

export default function WaitlistModal({ open, onClose }) {
  const [sent, setSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Always render the toast so it can show after modal closes
  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setFormData({ name: '', email: '' });
    }
  }, [open]);

  if (!open) {
    return (
      <JoinWaitlistSuccessToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message="You've joined the waitlist! We'll keep you updated."
      />
    );
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to backend / Mailchimp
    console.log('Waitlist signup:', formData);
    setShowToast(true);
    onClose();
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <JoinWaitlistSuccessToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message="You've joined the waitlist! We'll keep you updated."
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto relative">
        {/* Header: Title and Close Button */}
        <div className="flex items-center justify-between px-8 pt-8 pb-3">
          <h2 className="text-2xl font-bold text-gray-900">Join the Immortigen Waitlist</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center z-10"
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="w-full h-px bg-gray-200 mb-4"></div>

        {/* Info box below header */}
        <div className="flex flex-col items-center justify-center px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl px-3 py-4 border border-purple-200 w-full max-w-lg mx-auto mb-6 flex flex-col items-center">
            <p className="text-gray-600 text-base text-center mb-2">Get early access, exclusive longevity tips and beta‑tester perks.</p>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-1">Be the First to Know</h3>
            <p className="text-gray-600 text-base text-center">Join thousands of others who are excited about the future of longevity.</p>
          </div>
        </div>

        {/* Main Content - Form (not in a box) */}
        <div className="px-8 pb-8 flex flex-col items-center justify-center">
          <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-lg mx-auto">
            <input
              type="text"
              name="name"
              required
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all text-gray-900 placeholder-gray-500 text-base"
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
                Join Waitlist
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By joining, you agree to receive updates about Immortigen. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
