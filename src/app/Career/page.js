'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png';

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

// Sample job data - replace with your actual data
const sampleJobs = [
  {
    id: 1,
    title: "Head of Biotracker Development",
    department: "R&D",
    location: "Chennai (Hybrid)",
    type: "Full-time",
    description: "At Immortigen, we're on a mission to make aging optional. We're building the most advanced biotracker in the world — beyond Oura, WHOOP, and Apple Watch — combining real-time biomarkers like HRV, SpO₂, Cortisol, Troponin T, CGM, and environmental gas sensing into one unified wearable system.",
    salary: "Equity + Competitive Salary",
    requirements: [
      "7+ years in wearable device development, biomedical sensors, or health tech leadership",
      "Deep understanding of biosensing (PPG, ECG, bioimpedance, skin temp) and embedded systems",
      "Hands-on experience with firmware, signal processing, and low-power hardware architecture",
      "Prior work on consumer wearable devices (e.g., WHOOP, Garmin, Apple, Abbott, etc.) or medical hardware",
      "Experience with clinical trial design, regulatory compliance (FDA, CE), and product launch"
    ],
    goodFit: [
      "Have 4-7+ years of experience in wearable/health tech OR are a PhD, researcher, or hardware innovator deeply passionate about biosensing",
      "Have hands-on experience with PPG, ECG, Temp, SpO₂, hardware/firmware systems and signal processing",
      "Strong systems-thinking mindset and ability to work across hardware, software, and biology",
      "Excited to build something that redefines health tracking and aging"
    ],
    highlights: [
      "Full ownership of biotracker development — from sensor R&D to manufacturing and clinical validation",
      "Lead a world-class team across biosensing, firmware, AI, and UX",
      "Drive innovations across form factors, multi-sensor fusion, signal processing, and predictive health intelligence"
    ],
    isSpecial: true
  },
  // {
  //   id: 2,
  //   title: "Senior Software Engineer",
  //   department: "Engineering",
  //   location: "Chennai, India",
  //   type: "Full-time",
  //   description: "Join our engineering team to build the future of longevity technology."
  // },
  // {
  //   id: 3,
  //   title: "Data Scientist",
  //   department: "Data Science",
  //   location: "Remote",
  //   type: "Full-time", 
  //   description: "Analyze multi-omics data to unlock insights about aging and longevity."
  // },
  // {
  //   id: 4,
  //   title: "Product Manager",
  //   department: "Product",
  //   location: "Chennai, India",
  //   type: "Full-time",
  //   description: "Lead product strategy for our AI-powered health platform."
  // }
];

export default function CareerPage() {
  const [query, setQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isVisible, setIsVisible] = useState({
    hero: false,
    search: false,
    sidebar: false,
    jobs: false
  });

  const departments = ["All", "Engineering", "Data Science", "Product", "Design", "Marketing", "R&D"];

  // Initialize animations on mount and set up intersection observer
  useEffect(() => {
    // Hero animation on mount
    const timer1 = setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            setIsVisible(prev => ({ ...prev, [sectionName]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe sections after component mounts
    setTimeout(() => {
      const sections = document.querySelectorAll('[data-section]');
      sections.forEach(section => observer.observe(section));
    }, 100);

    return () => {
      clearTimeout(timer1);
      observer.disconnect();
    };
  }, []);

  const filteredJobs = sampleJobs.filter(job => {
    const matchesQuery = job.title.toLowerCase().includes(query.toLowerCase()) ||
                        job.description.toLowerCase().includes(query.toLowerCase());
    const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
    return matchesQuery && matchesDepartment;
  });

  return (
    <>      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[3000ms] ease-out scale-105 hover:scale-110"
          style={{
            backgroundImage: `url(${heroImg.src})`,
            zIndex: 0,
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className={`font-semibold font-manrope mb-4 text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transform transition-all duration-1000 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:scale-105 cursor-default`}>
            Be A Part Of Our Mission
          </h1>
          <p className={`max-w-[41rem] font-inter font-medium text-[#1F1F1F] text-sm sm:text-base lg:text-lg transform transition-all duration-1000 delay-300 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:text-black cursor-default`}>
            We&apos;re looking for passionate people to join us on our mission. We value flat hierarchies, clear communication, and full ownership & responsibility.
          </p>
        </div>
      </section>      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Search Bar */}
        <div 
          data-section="search"
          className="mb-8 sm:mb-10 max-w-md mx-auto relative"
        >
          <div className={`transform transition-all duration-1000 ease-out ${
            isVisible.search 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search job titles"
              className="w-full border border-[#E5E5E5] rounded-full py-3 sm:py-4 pl-12 pr-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:border-transparent bg-white transition-all duration-300 ease-in-out hover:shadow-md focus:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02]"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200">
              <SearchIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* Filter Sidebar */}
          <div 
            data-section="sidebar"
            className="w-full xl:w-80 flex-shrink-0"
          >
            <div className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform ${
              isVisible.sidebar 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-12 opacity-0'
            }`}>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Filter by Department</h3>
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
                {departments.map((dept, index) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-sm ${
                      isVisible.sidebar 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-8 opacity-0'
                    } ${
                      selectedDepartment === dept 
                        ? 'bg-[#5F4AFB] text-white shadow-md scale-105' 
                        : 'text-gray-700 hover:bg-gray-50 border border-gray-100'
                    }`}
                    style={{
                      transitionDelay: isVisible.sidebar ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job List */}
          <div 
            data-section="jobs"
            className="flex-1 min-h-0"
          >
            <div className="space-y-4 sm:space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className={`bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg hover:border-[#5F4AFB]/20 transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] group ${
                      isVisible.jobs 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-12 opacity-0'
                    } ${job.isSpecial ? 'border-2 border-[#5F4AFB]/30 bg-gradient-to-br from-white to-[#5F4AFB]/5' : ''}`}
                    style={{
                      transitionDelay: isVisible.jobs ? `${index * 150}ms` : '0ms'
                    }}
                  >
                    {job.isSpecial && (
                      <div className="mb-4 px-3 py-1 bg-gradient-to-r from-[#5F4AFB] to-[#4F3FCB] text-white text-xs font-semibold rounded-full inline-block">
                        🚀 FEATURED ROLE
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#5F4AFB] transition-colors duration-300">
                          {job.title}
                        </h3>
                        
                        {job.salary && (
                          <div className="mb-3">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {job.salary}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <span className="bg-[#F3F4F6] px-2 py-1 rounded-md transition-all duration-300 group-hover:bg-[#5F4AFB]/10 group-hover:text-[#5F4AFB]">
                            {job.department}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if (job.isSpecial) {
                            window.open('https://forms.gle/6rMBj3tQYRLbGc1MA', '_blank');
                          }
                        }}
                        className="bg-[#5F4AFB] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#4F3FCB] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5F4AFB] focus:ring-opacity-50 whitespace-nowrap cursor-pointer"
                      >
                        {job.isSpecial ? 'Apply via Google Form' : 'Apply Now'}
                      </button>
                    </div>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{job.description}</p>
                    
                    {job.highlights && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Role Highlights:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {job.highlights.map((highlight, idx) => (
                            <li key={idx}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {job.goodFit && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">You Could Be a Great Fit If You:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {job.goodFit.map((fit, idx) => (
                            <li key={idx}>{fit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {job.requirements && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {job.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className={`text-center py-12 sm:py-16 transform transition-all duration-1000 ease-out ${
                  isVisible.jobs 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}>
                  <div className="animate-pulse">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">No jobs found matching your criteria.</p>
                  <p className="text-gray-400">Try adjusting your search or filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
