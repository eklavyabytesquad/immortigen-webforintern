'use client';

import React, { useState } from "react";
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png';

export default function WaitlistPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to backend / Mailchimp
    console.log('Waitlist signup:', formData);
    setSent(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg.src})`,
            zIndex: 0,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="font-semibold font-manrope mb-4 text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Join the Immortigen Waitlist
          </h1>
          <p className="max-w-[41rem] font-inter font-medium text-[#1F1F1F]">
            Get early access, exclusive longevity tips and beta‑tester perks.
          </p>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section className="py-24 px-4">
        <div className="max-w-lg mx-auto rounded-3xl bg-[#F8F9FF] p-10 ring-1 ring-[#E6E6F8] shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-[#1F1F1F] mb-2">
                Thank you!
              </h3>              <p className="text-gray-600">
                We&apos;ll keep you posted on our progress and notify you when we launch.
              </p>
            </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#1F1F1F] mb-2">
                  Be the First to Know
                </h2>
                <p className="text-gray-600">
                  Join thousands of others who are excited about the future of longevity.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5F4AFB] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#4F3FCB] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:ring-offset-2"
                >
                  Join Waitlist
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By joining, you agree to receive updates about Immortigen. 
                  You can unsubscribe at any time.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      {!sent && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-[#1F1F1F] mb-12">
              What You&apos;ll Get as an Early Member
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5F4AFB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Early Access</h4>
                <p className="text-gray-600 text-sm">
                  Be among the first to experience our groundbreaking longevity platform.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5F4AFB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Special Pricing</h4>
                <p className="text-gray-600 text-sm">
                  Exclusive discounts and beta-tester pricing for early supporters.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#5F4AFB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2">Exclusive Content</h4>
                <p className="text-gray-600 text-sm">
                  Longevity tips, research insights, and health optimization strategies.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
