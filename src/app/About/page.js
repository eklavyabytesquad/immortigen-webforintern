'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png'; // Adjust the path as necessary
import officeImg from '../../../public/assets/images/office‑shot.jpg';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    content: false,
    mission: false,
    whatWeDo: false,
    image: false
  });

  useEffect(() => {
    // Hero animation on mount
    const timer1 = setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    const timer2 = setTimeout(() => setIsVisible(prev => ({ ...prev, content: true })), 600);
    
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
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[300px] sm:min-h-[400px] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out scale-105 hover:scale-110"
          style={{
            backgroundImage: `url(${heroImg.src})`,
            zIndex: 0,
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 z-5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-2 sm:px-4">
          <h1 className={`font-semibold font-manrope mb-4 text-black text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-all duration-1000 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:scale-105 cursor-default`}>
            About Us
          </h1>
          <p className={`max-w-full sm:max-w-[41rem] font-inter font-medium text-[#1F1F1F] text-base sm:text-lg md:text-xl transform transition-all duration-1000 delay-300 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:text-black cursor-default`}>
            At Immortigen, we believe aging is a code we can decode, a process we can track, and a journey we can optimize for a longer, and stronger life.
          </p>
        </div>
      </section>      {/* Main Content Section */}
      <section 
        data-section="content" 
        className="py-16 sm:py-24 px-2 sm:px-6 mx-auto text-center"
      >
        <p className={`text-[#6B6B6B] leading-7 max-w-full sm:max-w-[65vw] mx-auto transform transition-all duration-1000 ease-out ${
          isVisible.content 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        } hover:text-[#4B4B4B] hover:scale-[1.02] cursor-default`}>
          Immortigen integrates insights from genomics, epigenetics, metagenomics, proteomics, and nutrigenomics to understand how your body is aging at the cellular and organ level. Using this data, we build personalised longevity blueprints—clear, actionable strategies to improve your biological age, slow down aging, and prevent disease before it starts.
        </p>
      </section>

      {/* Office Image */}
      <div 
        data-section="image"
        className={`w-full max-w-full sm:max-w-[80vw] mx-auto my-8 sm:my-12 rounded-lg shadow-md transform transition-all duration-1000 ease-out ${
          isVisible.image 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-95'
        } hover:scale-[1.02] overflow-hidden`}
      >
        <Image 
          src={officeImg} 
          alt="Immortigen team" 
          className="w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-105" 
          priority
        />
      </div>      {/* Mission Section */}
      <section 
        data-section="mission" 
        className="py-16 sm:py-24 text-center"
      >
        <h2 className={`text-2xl sm:text-3xl font-semibold mb-2 transform transition-all duration-1000 ease-out ${
          isVisible.mission 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:scale-105 hover:text-black cursor-default`}>
          Our Mission
        </h2>
        <p className={`tracking-[.2em] text-[10px] sm:text-xs text-[#8E8E8E] mb-8 uppercase transform transition-all duration-1000 delay-200 ease-out ${
          isVisible.mission 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:text-[#6B6B6B] cursor-default`}>
          What drives us
        </p>        <p className={`text-[#6B6B6B] leading-7 max-w-full sm:max-w-[65vw] mx-auto transform transition-all duration-1000 delay-400 ease-out ${
          isVisible.mission 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        } hover:text-[#4B4B4B] hover:scale-[1.02] cursor-default`}>
          We&apos;re on a mission to redefine what it means to grow older. Founded at the intersection of science, data, and human ambition, we are a deep-tech longevity company that harnesses the power of AI agents, multi-omics intelligence, and real-time biomarker tracking to decode aging—and ultimately make it optional.
        </p>
      </section>      {/* What We Do Section */}
      <section 
        data-section="whatWeDo" 
        className="py-16 sm:py-24 mt-[-5vw]"
      >
        <h2 className={`text-2xl sm:text-3xl text-center font-semibold mb-2 transform transition-all duration-1000 ease-out ${
          isVisible.whatWeDo 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:scale-105 hover:text-black cursor-default`}>
          What We Do
        </h2>
        <p className={`tracking-[.2em] text-[10px] sm:text-xs text-center text-[#8E8E8E] mb-8 uppercase transform transition-all duration-1000 delay-200 ease-out ${
          isVisible.whatWeDo 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:text-[#6B6B6B] cursor-default`}>
          How we help
        </p>
        <ol className={`w-full sm:w-[90vw] md:w-[65vw] mx-auto text-left bg-[#F5f5f5] rounded-lg p-4 sm:p-8 md:p-14 space-y-6 sm:space-y-8 text-[#4B4B4B] text-xs sm:text-sm md:text-base list-disc list-inside transform transition-all duration-1000 delay-400 ease-out ${
          isVisible.whatWeDo 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-16 opacity-0 scale-95'
        } hover:bg-[#F0F0F0] hover:shadow-lg`}>
          {[
            "Decode your biological age & organ‑level aging",
            "Receive deeply personalised longevity recommendations",
            "Track your body's real‑time response to your lifestyle",
            "Unlock a healthier, longer future—tailored only to you",
            "Discover early signs of disease",
          ].map((item, i) => (
            <li 
              key={i} 
              className={`text-gray-600 mx-2 sm:mx-[10vh] transform transition-all duration-700 ease-out cursor-default ${
                isVisible.whatWeDo 
                  ? 'translate-x-0 opacity-100' 
                  : 'translate-x-8 opacity-0'
              } hover:text-gray-800 hover:translate-x-2 hover:scale-105`}
              style={{
                transitionDelay: isVisible.whatWeDo ? `${600 + i * 100}ms` : '0ms'
              }}
            >
              &nbsp;{item}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}