"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { subscribeToHamburger } from "./Navbar";
import heroImg from "../../public/assets/hero-img.png";

export default function ScienceDetailPage({ pillarData, currentPage }) {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    content: false,
    sections: false,
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const cursorRef = useRef(null);
  const animationFrameRef = useRef(0);

  useEffect(() => {
    // Subscribe to hamburger state changes
    const unsubscribe = subscribeToHamburger(setIsHamburgerOpen);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, hero: true })),
      100
    );
    const timer2 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, content: true })),
      500
    );
    const timer3 = setTimeout(
      () => setIsVisible((prev) => ({ ...prev, sections: true })),
      800
    );

    const handleMouseMove = (e) => {
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX - 24}px`;
            cursorRef.current.style.top = `${e.clientY - 24}px`;
          }
          animationFrameRef.current = 0;
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const navigationItems = [
    { name: "Precision Nutrition", slug: "precision-nutrition" },
    { name: "Targeted Physical Activity", slug: "targeted-physical-activity" },
    { name: "Physiological Balance", slug: "physiological-balance" },
    { name: "Genomic & Epigenomic Insights", slug: "genomic-epigenomic-insights" },
    { name: "Behavioural Science & Mindset", slug: "behavioural-science-mindset" },
  ];

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10000] flex items-center justify-center transition-opacity duration-200 ${
          isHoveringCard ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "48px",
          height: "48px",
          backgroundColor: "rgba(95, 74, 251, 0.44)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "50%",
          left: "-100px",
          top: "-100px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out scale-105 hover:scale-110"
            style={{
              backgroundImage: `url(${heroImg.src})`,
              zIndex: 0,
            }}
          />
          <div className="absolute inset-0 bg-black/20 z-5" />
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
            <h1
              className={`font-semibold font-manrope mb-4 text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transform transition-all duration-1000 ease-out ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } hover:scale-105 cursor-default`}
            >
              Our Five Key Pillars
            </h1>
            <p
              className={`max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[41rem] font-inter font-medium text-[#1F1F1F] text-sm sm:text-base transform transition-all duration-1000 delay-300 ease-out ${
                isVisible.hero
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              } hover:text-black cursor-default`}
            >
              Our methodology integrates insights from five key pillars,
              assessing your current state and customizing interventions to
              optimize your body&apos;s innate potential for resilience and
              well-being.
            </p>
          </div>
        </section>

        {/* Pills Navigation - Hidden when hamburger is open */}
        <div className={`sticky top-0 bg-white py-3 sm:py-4 z-30 border-b border-gray-100 transition-all duration-300 ${
          isHamburgerOpen ? 'opacity-0 pointer-events-none transform -translate-y-2' : 'opacity-100 transform translate-y-0'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center">
              <div className="flex gap-[6px] sm:gap-[10px] bg-gray-100 rounded-[60px] p-1 border border-gray-200 overflow-x-auto scrollbar-hide">
                {navigationItems.map((pill) => (
                  <Link
                    key={pill.name}
                    href={`/Science/${pill.slug}`}
                    className={`px-[15px] sm:px-[20px] lg:px-[30px] py-3 sm:py-4 rounded-[60px] text-[10px] sm:text-xs font-inter font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      pill.slug === currentPage
                        ? "bg-[#5F4AFB] text-white shadow-lg"
                        : "text-gray-600 hover:bg-white hover:text-gray-800 hover:shadow-sm"
                    }`}
                  >
                    {pill.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          {/* Featured Image */}
          <div className="mb-12 sm:mb-16">
            <div className="relative w-full max-w-2xl mx-auto h-[250px] sm:h-[300px] lg:h-[360px] rounded-3xl overflow-hidden">
              <Image
                src={pillarData.imageUrl}
                alt={pillarData.heading}
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Title and Subtitle */}
          <div
            className={`text-left mb-8 sm:mb-12 transform transition-all duration-1000 ease-out ${
              isVisible.content
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl font-manrope font-bold text-[#5F4AFB] mb-3">
              {pillarData.heading}
            </h1>
            <p className="text-lg sm:text-xl font-inter text-gray-600 font-medium">
              {pillarData.subHeading}
            </p>
          </div>

          {/* The Science Section */}
          <div
            className={`mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${
              isVisible.sections
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-manrope font-bold text-gray-900 mb-6 sm:mb-8">
              The Science
            </h2>
            <p className="font-inter text-[#8E8E8E] leading-relaxed text-sm sm:text-base hover:text-[#6B6B6B] transition-colors duration-300 cursor-default">
              {pillarData.science || pillarData.scienceDescription}
            </p>
          </div>

          {/* How We Assess Section */}
          <div
            className={`mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${
              isVisible.sections
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-manrope font-bold text-gray-900 mb-6 sm:mb-8">
              How We Assess
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {(pillarData.assess || pillarData.howWeAssess || []).map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-2 h-2 bg-[#5F4AFB] rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="font-inter text-[#8E8E8E] leading-relaxed text-sm sm:text-base group-hover:text-[#6B6B6B] transition-colors duration-300 cursor-default">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Customized Approach Section */}
          <div
            className={`mb-12 sm:mb-16 transform transition-all duration-1000 ease-out ${
              isVisible.sections
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
          >
            <h2 className="text-xl sm:text-2xl font-manrope font-bold text-gray-900 mb-6 sm:mb-8">
              Our Customized Approach
            </h2>
            {(pillarData.customizedApproach?.description || pillarData.approachDescription) && (
              <p className="font-inter text-[#8E8E8E] leading-relaxed text-sm sm:text-base mb-6 sm:mb-8 hover:text-[#6B6B6B] transition-colors duration-300 cursor-default">
                {pillarData.customizedApproach?.description || pillarData.approachDescription}
              </p>
            )}
            <div className="space-y-4 sm:space-y-6">
              {(pillarData.approach || pillarData.customizedApproach?.strategies || []).map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="w-2 h-2 bg-[#5F4AFB] rounded-full mt-2 sm:mt-3 mr-3 sm:mr-4 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                  <p className="font-inter text-[#8E8E8E] leading-relaxed text-sm sm:text-base group-hover:text-[#6B6B6B] transition-colors duration-300 cursor-default">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hover-card {
          cursor: none;
        }
        .hover-card:hover {
          cursor: none;
        }
        .hover-card * {
          cursor: none !important;
        }
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
