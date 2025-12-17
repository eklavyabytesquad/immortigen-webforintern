"use client";
import React, { useState, useEffect, useRef } from "react";

const steps = [
  { 
    title: "Sign Up", 
    img: "/assets/app-images/Sign-up.png", 
    details: ["Download our application", "Sign‑up / Log‑in", "Create profile"] 
  },
  { 
    title: "Data Collection", 
    img: "/assets/app-images/Data-collection.png", 
    details: ["Share information about yourself", "Answer questions on medical history", "Tell us about your lifestyle"] 
  },
  { 
    title: "Data Analysis", 
    img: "/assets/app-images/Data-analysis.png", 
    details: ["Computing your data", "Generating insights"] 
  },
  { 
    title: "Welcome to Dashboard", 
    img: "/assets/app-images/Insights.png", 
    details: ["Personalized dashboard", "Recommendations"] 
  },
];

const GetStartedSection = () => {
  const [open, setOpen] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll effect for revealing steps - similar to LongevitySection
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is fully in viewport (scroll hijacking approach)
      const isFullyInView = sectionRect.top <= 0 && sectionRect.bottom >= windowHeight;
      const isPartiallyInView = sectionRect.top < windowHeight && sectionRect.bottom > 0;

      // Reset if section is not visible at all
      if (!isPartiallyInView) {
        setVisibleSteps([]);
        setCurrentImageIndex(0);
        setOpen(0);
        return;
      }

      // Only start animation when section is significantly in view
      if (sectionRect.top < windowHeight * 0.2) {
        // Calculate scroll progress within the section
        const sectionHeight = sectionRect.height;
        const scrolledIntoSection = Math.max(0, -sectionRect.top);
        const scrollProgress = Math.max(0, Math.min(1, scrolledIntoSection / (sectionHeight * 0.8)));

        // Progressive step revelation with more precise timing
        const totalSteps = steps.length;
        const stepInterval = 0.2; // Each step takes 20% of scroll progress
        
        const newVisibleSteps = [];
        let newImageIndex = 0;
        let newOpenIndex = 0;

        // Determine which steps should be visible based on scroll progress
        for (let i = 0; i < totalSteps; i++) {
          const stepStart = i * stepInterval;
          
          if (scrollProgress >= stepStart) {
            newVisibleSteps.push(i);
            newImageIndex = i;
            newOpenIndex = i;
          }
        }

        setVisibleSteps(newVisibleSteps);
        setCurrentImageIndex(newImageIndex);
        setOpen(newOpenIndex);
      } else {
        // Section is entering view but not ready for animation
        setVisibleSteps([]);
        setCurrentImageIndex(0);
        setOpen(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section ref={sectionRef} className="flex flex-col items-center py-12 md:py-16 px-4 bg-gray-50 min-h-[200vh]">
      {/* Header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-8 md:mb-12">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-[#1F1F1F] mb-3 md:mb-4"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Get Started
          </h2>
          <p 
            className="text-sm md:text-base font-semibold text-[#8E8E8E] uppercase tracking-[2px] md:tracking-[4px]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            HOW THE APP WORKS
          </p>
        </div>

        <div className="w-full max-w-7xl">
          {isMobile ? (
            // Mobile Layout - Image on top, points below
            <div className="flex flex-col items-center min-h-[80vh]">
              {/* Phone Preview - Top */}
              <div className="w-full flex justify-center items-center mb-8">
                <div className="relative">
                  <img
                    src={steps[Math.max(0, currentImageIndex)].img}
                    alt={steps[Math.max(0, currentImageIndex)].title}
                    className="w-48 h-auto max-h-[50vh] object-contain drop-shadow-2xl transition-all duration-500 ease-out transform"
                    style={{ 
                      opacity: visibleSteps.length > 0 ? 1 : 0,
                      transform: visibleSteps.length > 0 ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)'
                    }}
                  />
                </div>
              </div>

              {/* Steps List - Bottom - Always show all steps */}
              <div className="w-full relative max-w-md">
                {/* Main connecting line */}
                <div className="absolute left-5 top-4 bottom-0 w-0.5 bg-[#7D47F7] opacity-30" />
                
                <div className="space-y-4">
                  {steps.map((step, i) => {
                    const isOpen = open === i;
                    const isVisible = visibleSteps.includes(i);
                    return (
                      <div 
                        key={i} 
                        ref={el => stepRefs.current[i] = el}
                        className="relative"
                      >
                        <div className="flex items-start space-x-3">
                          {/* Step Number - Always visible */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                              isOpen ? "bg-[#7D47F7] text-white scale-110" : "bg-white text-[#7D47F7] border-2 border-[#7D47F7]"
                            }`}>
                              {i + 1}
                            </div>
                          </div>

                          {/* Content - Always visible */}
                          <div className="flex-1 min-w-0">
                            <button 
                              onClick={() => setOpen(isOpen ? -1 : i)}
                              className="w-full text-left group"
                            >
                              <div className="flex items-center justify-between">
                                <h3 className={`text-base font-semibold transition-colors duration-300 ${
                                  isOpen ? "text-[#7D47F7]" : "text-[#1F1F1F] group-hover:text-[#7D47F7]"
                                }`}>
                                  {step.title}
                                </h3>
                                <svg 
                                  className={`w-4 h-4 transition-all duration-300 ${
                                    isOpen ? "rotate-180 text-[#7D47F7]" : "text-[#8E8E8E] group-hover:text-[#7D47F7]"
                                  }`} 
                                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </button>

                            {isOpen && (
                              <div className="mt-2 animate-fadeIn">
                                <div className="space-y-1">
                                  {step.details.map((detail, j) => (
                                    <div key={j} className="flex items-start space-x-2">
                                      <svg className="w-3 h-3 text-[#7D47F7] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                      <p className="text-sm text-[#666666] leading-relaxed">{detail}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Bottom line after each section */}
                            {i < steps.length - 1 && (
                              <div className="mt-3 border-b border-gray-200" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            // Desktop Layout - Always show all steps
            <div className="flex items-center justify-between gap-12 min-h-[70vh]">
              {/* Steps List - Fixed width */}
              <div className="w-full lg:w-4/6 xl:w-3/5" style={{ width: '500px' }}>
                <div className="relative">
                  {/* Main connecting line */}
                  <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-[#7D47F7] opacity-30" />
                  
                  <div className="space-y-6">
                    {steps.map((step, i) => {
                      const isOpen = open === i;
                      const isVisible = visibleSteps.includes(i);
                      return (
                        <div 
                          key={i} 
                          ref={el => stepRefs.current[i] = el}
                          className="relative"
                        >
                          <div className="flex items-start space-x-4">
                            {/* Step Number - Always visible */}
                            <div className="flex-shrink-0 relative z-10">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all duration-500 ${
                                isOpen ? "bg-[#7D47F7] text-white scale-110 shadow-lg" : "bg-white text-[#7D47F7] border-2 border-[#7D47F7] hover:scale-105"
                              }`}>
                                {i + 1}
                              </div>
                            </div>

                            {/* Content - Always visible */}
                            <div className="flex-1 min-w-0" style={{ width: '400px' }}>
                              <button 
                                onClick={() => setOpen(isOpen ? -1 : i)}
                                className="w-full text-left group"
                              >
                                <div className="flex items-center justify-between" style={{ width: '400px' }}>
                                  <h3 className={`text-lg md:text-xl font-semibold transition-colors duration-300 ${
                                    isOpen ? "text-[#7D47F7]" : "text-[#1F1F1F] group-hover:text-[#7D47F7]"
                                  }`} style={{ width: '350px', overflow: 'visible', whiteSpace: 'nowrap' }}>
                                    {step.title}
                                  </h3>
                                  <svg 
                                    className={`w-5 h-5 transition-all duration-300 ${
                                      isOpen ? "rotate-180 text-[#7D47F7]" : "text-[#8E8E8E] group-hover:text-[#7D47F7]"
                                    }`} 
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </div>
                              </button>

                              {isOpen && (
                                <div className="mt-3 animate-fadeIn" style={{ width: '400px' }}>
                                  <div className="space-y-2">
                                    {step.details.map((detail, j) => (
                                      <div key={j} className="flex items-start space-x-2">
                                        <svg className="w-4 h-4 text-[#7D47F7] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm md:text-base text-[#666666] leading-relaxed" style={{ width: '350px', overflow: 'visible', whiteSpace: 'nowrap' }}>{detail}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Bottom line after each section */}
                              {i < steps.length - 1 && (
                                <div className="mt-4 border-b border-gray-200" />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Phone Preview - Moved more to the right */}
              <div className="w-full lg:w-2/6 xl:w-2/5 flex justify-end items-center pl-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7D47F7]/20 to-transparent rounded-3xl blur-3xl transform scale-110 transition-all duration-700"></div>
                  <img
                    src={steps[Math.max(0, currentImageIndex)].img}
                    alt={steps[Math.max(0, currentImageIndex)].title}
                    className="relative z-10 w-80 lg:w-[400px] xl:w-[450px] h-auto max-h-[80vh] object-contain drop-shadow-2xl transition-all duration-500 ease-out"
                    style={{ 
                      opacity: visibleSteps.length > 0 ? 1 : 0,
                      transform: visibleSteps.length > 0 ? 'scale(1) translateY(0) rotateY(0deg)' : 'scale(0.95) translateY(30px) rotateY(5deg)'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInFromLeft 0.6s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInFromRight 0.6s ease-out forwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.7s ease-out forwards;
        }
        
        /* Custom scroll-based animations */
        .scroll-reveal {
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .image-reveal {
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
};

export default GetStartedSection;