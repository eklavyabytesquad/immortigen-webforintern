'use client';

import React, { useState } from "react";
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to email service / backend
    console.log('Contact form submission:', formData);
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
            Contact Us
          </h1>          <p className="max-w-[41rem] font-inter font-medium text-[#1F1F1F]">
            We&apos;d love to hear from you — drop us a message!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-[#1F1F1F] mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">                Have questions about Immortigen? Want to learn more about our longevity platform? 
                We&apos;re here to help and would love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#5F4AFB] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@Immortigen.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#5F4AFB] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Location</h3>
                    <p className="text-gray-600">Chennai, Tamil Nadu, India</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[#5F4AFB] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#F8F9FF] rounded-3xl p-8 ring-1 ring-[#E6E6F8] shadow-sm">
              {sent ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-[#1F1F1F] mb-2">
                    Message sent!
                  </h3>                  <p className="text-gray-600">
                    We&apos;ll reply as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent"
                      placeholder="Your full name"
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-[#D1D1D1] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#5F4AFB] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#4F3FCB] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-[#1F1F1F] mb-4">
            Frequently Asked Questions
          </h3>          <p className="text-gray-600 mb-8">
            Quick answers to common questions. Can&apos;t find what you&apos;re looking for?
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">How does Immortigen work?</h4>
              <p className="text-gray-600 text-sm">We analyze your genetic and lifestyle data to provide personalized longevity insights and recommendations.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
              <p className="text-gray-600 text-sm">Absolutely. We follow industry best practices for encryption and never sell your personal data.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">When will the app launch?</h4>
              <p className="text-gray-600 text-sm">We&apos;re launching soon! Join our waitlist to be among the first to know when it&apos;s available.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-2">Do you offer partnerships?</h4>
              <p className="text-gray-600 text-sm">Yes, we work with healthcare providers, researchers, and wellness companies. Contact us to learn more.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
