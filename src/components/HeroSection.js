'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

import man from '../../public/assets/tag-svgs/man.png';
import man2 from '../../public/assets/tag-svgs/man2.png';
import sleeping_girl from '../../public/assets/tag-svgs/sleeping-girl.png';
import gut_microbiome from '../../public/assets/tag-svgs/gut-microbiome.png';
import mobile from '../../public/assets/tag-svgs/mobile.png';
import eye from '../../public/assets/tag-svgs/tagPlaceholder1.svg';
import dna from '../../public/assets/tag-svgs/dna.png';
import fruits from '../../public/assets/tag-svgs/fruits.png';
import band from '../../public/assets/tag-svgs/band.jpg';
import rbc from '../../public/assets/tag-svgs/rbc.png';
import JoinWaitlistPopup from "./JoinWaitlistPopup";

const tags = [
  "Longevity", "Healthy Aging", "Biological Age", "Organ Mapping",
  "Gut Health", "Sleep Tracking", "Disease Prevention", "Stress Monitoring",
  "Personalized Health", "Aging Reversal", "Autonomous Agents",
  "Immune Resilience", "Next-Gen Health", "Preventive Care", "Genetic Testing", "DNA Analysis", "Whole Genome", "Daily Health Score", "Daily Health Score", "Wellness Tips",
  "Molecular Markers", "Health Blueprint", "Smart Biotracker"
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [row1ScrollPosition, setRow1ScrollPosition] = useState(-1000);
  const [row2ScrollPosition, setRow2ScrollPosition] = useState(-1000);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  const handleDownloadClick = () => {
    const appSection = document.getElementById('app-coming-soon');
    if (appSection) {
      appSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    const autoScrollTimer = setInterval(() => {
      setRow1ScrollPosition(prev => {
        const newPos = prev - 2;
        return newPos <= -4000 ? newPos + 2000 : newPos;
      });
      
      setRow2ScrollPosition(prev => {
        const newPos = prev + 2;
        return newPos >= 4000 ? newPos - 2000 : newPos;
      });
    }, 25);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate hero scroll progress (0 to 1)
      const progress = Math.min(currentScrollY / (windowHeight * 1.5), 1);
      setHeroScrollProgress(progress);

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setScrollY(currentScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      clearInterval(autoScrollTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Create first row content with proper sequence
  const createFirstRowContent = () => {
    const firstRowSequence = [
      { type: 'text', content: 'Longevity' },
      { type: 'text', content: 'Healthy Aging' },
      { type: 'image', content: man.src },
      { type: 'text', content: 'Biological Age' },
      { type: 'text', content: 'Organ Mapping' },
      { type: 'image', content: man2.src },
      { type: 'text', content: 'Gut Health' },
      { type: 'text', content: 'Sleep Tracking' },
      { type: 'image', content: sleeping_girl.src },
      { type: 'text', content: 'Disease Prevention' },
      { type: 'text', content: 'Stress Monitoring' },
      { type: 'image', content: gut_microbiome.src },
      { type: 'text', content: 'Personalized Health' },
      { type: 'text', content: 'Aging Reversal' },
      { type: 'image', content: mobile.src },
      { type: 'text', content: 'Autonomous Agents' },
      { type: 'text', content: 'Immune Resilience' },
      { type: 'image', content: rbc.src }
    ];

    const repeated = [];
    for (let i = 0; i < 30; i++) {
      repeated.push(...firstRowSequence);
    }
    return repeated;
  };

  // Create second row content with proper sequence
  const createSecondRowContent = () => {
    const secondRowSequence = [
      { type: 'text', content: 'Next-Gen Health' },
      { type: 'text', content: 'Preventive Care' },
      { type: 'image', content: eye.src },
      { type: 'text', content: 'Genetic Testing' },
      { type: 'text', content: 'DNA Analysis' },
      { type: 'image', content: dna.src },
      { type: 'text', content: 'Whole Genome' },
      { type: 'text', content: 'Daily Health Score' },
      { type: 'image', content: fruits.src },
      { type: 'text', content: 'Wellness Tips' },
      { type: 'text', content: 'Molecular Markers' },
      { type: 'image', content: band.src },
      { type: 'text', content: 'Health Blueprint' },
      { type: 'text', content: 'Smart Biotracker' },
      { type: 'image', content: sleeping_girl.src },
      { type: 'text', content: 'Immune System' },
      { type: 'text', content: 'Cell Regeneration' },
      { type: 'image', content: gut_microbiome.src },
      

    ];

    const repeated = [];
    for (let i = 0; i < 30; i++) {
      repeated.push(...secondRowSequence);
    }
    return repeated;
  };

  const firstRowContent = createFirstRowContent();
  const secondRowContent = createSecondRowContent();
  
  // FIXED: Both hero and tags use the same transform logic
  const heroTransform = `translateY(${heroScrollProgress * -50}vh) scale(${1 - heroScrollProgress * 0.05})`;
  const heroOpacity = Math.max(0.4, 1 - heroScrollProgress * 0.6);
  
  // SYNCHRONIZED: Tags follow hero movement exactly
  const tagsTransform = `translateY(${heroScrollProgress * -50}vh)`;
  const tagsOpacity = Math.max(0.4, 1 - heroScrollProgress * 0.6);

  return (
    <>
      {/* Hero Section */}
      <section
        className="hero-section-3d relative w-full h-screen overflow-hidden -mt-20 pt-20 z-hero smooth-transform"
        style={{
          transform: heroTransform,
          opacity: heroOpacity,
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
          backgroundColor: 'rgba(250, 250, 250, 1)'
        }}
      >
        {/* Background Hero GIF */}
        <div className="absolute inset-0 z-0">
          <img
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'center center',
              transform: 'translateY(-10%)',
            }}
            className="absolute inset-0 opacity-25 block sm:hidden"
            draggable="false"
            src="/hero.gif"
            alt="Hero animation"
          />

          <img
            style={{
              width: '100vh',
              height: '100vw',
              transform: 'rotate(90deg) translateY(-100%)',
              transformOrigin: 'top left'
            }}
            className="absolute inset-0 object-cover opacity-30 hidden sm:block"
            draggable="false"
            src="/hero.gif"
            alt="Hero animation"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none h-40 md:h-40">
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(
                to top,
                rgba(250, 250, 250, 1) 0%,
                rgba(250, 250, 250, 0.95) 15%,
                rgba(250, 250, 250, 0.85) 30%,
                rgba(250, 250, 250, 0.6) 50%,
                rgba(250, 250, 250, 0.3) 70%,
                rgba(250, 250, 250, 0.1) 85%,
                transparent 100%
              )`
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center hero-overlay z-10 min-h-screen">
          <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8 relative z-20 max-w-7xl mx-auto py-16 sm:py-20">
            
            {/* Hero Title */}
            <h1
              className="font-manrope font-[600] leading-[110%] sm:leading-[120%] lg:leading-[130%] tracking-[-0.8px] sm:tracking-[0px] lg:tracking-[-1px] text-center w-full max-w-[1162px] text-[42px] xs:text-[48px] sm:text-[40px] md:text-[44px] lg:text-[54px] xl:text-[60px] flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-y-2 mb-6 sm:mb-4 text-gray-800 sm:text-current transition-all duration-700 ease-out relative"
              style={{ fontSize: 'clamp(36px, 9vw, 52px)' }}
            >
              {/* Mobile layout - FIXED 3 LINE STRUCTURE */}
              <span className={`flex flex-col sm:hidden items-center justify-center gap-y-1 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: isVisible ? '0.2s' : '0s', lineHeight: 1.1 }}>
                {/* Line 1: Shaping the */}
                <span
                  className={`transform transition-all duration-700 ease-out hover:scale-105 hover:text-[#6349FF] cursor-default w-full ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                  style={{ transitionDelay: isVisible ? '0.4s' : '0s' }}
                >
                  Shaping the
                </span>
                {/* Line 2: future by making */}
                <span className="flex flex-row items-center w-full justify-center gap-x-1">
                  <span
                    className={`font-gelasio italic font-[500] leading-[110%] tracking-[-1.2px] bg-gradient-to-r from-[#7B69FF] to-[#782CC4] bg-clip-text text-transparent relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-110 hover:from-[#5a42e6] hover:to-[#6b59e6] cursor-default ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ 
                      transitionDelay: isVisible ? '0.6s' : '0s',
                      background: 'linear-gradient(120deg, #7B69FF 0%, #782CC4 30%, rgba(255,255,255,0.8) 50%, #782CC4 70%, #7B69FF 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shine-text 2.5s ease-in-out infinite'
                    }}
                  >
                    future
                  </span>
                  <span className={`transform transition-all duration-700 ease-out hover:scale-105 hover:text-[#6349FF] cursor-default ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: isVisible ? '0.7s' : '0s' }}>
                    by making
                  </span>
                </span>
                {/* Line 3: aging optional */}
                <span className={`transform transition-all duration-700 ease-out hover:scale-105 hover:text-[#6349FF] cursor-default w-full ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: isVisible ? '1.0s' : '0s' }}>
                aging optional
                </span>
              </span>
              
              {/* Desktop layout */}
              <span className={`hidden sm:block w-full text-center transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
                <span className="inline-block">
                  <span className="font-manrope font-[600]">Shaping the </span>
                  <span className="font-gelasio italic font-[500] leading-[110%] sm:leading-[120%] lg:leading-[130%] tracking-[-1.2px] sm:tracking-[-2px] lg:tracking-[-3px] bg-gradient-to-r from-[#7B69FF] to-[#782CC4] bg-clip-text text-transparent px-1 sm:px-2 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(120deg, #7B69FF 0%, #782CC4 30%, rgba(255,255,255,0.8) 50%, #782CC4 70%, #7B69FF 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shine-text 2.5s ease-in-out infinite'
                    }}>future
                  </span>
                  <span className="font-manrope font-[600]"> by</span>
                </span>
                <br />
                <span className="inline-block mt-2">
                  <span className="font-manrope font-[600]">making aging optional</span>
                </span>
              </span>
            </h1>

            {/* Tagline */}
            <p className={`mt-3 sm:mt-5 text-[20px] sm:text-[18px] md:text-[19px] lg:text-[20px] xl:text-[21px] w-full max-w-[800px] text-center leading-[1.5] sm:leading-relaxed px-2 sm:px-2 text-neutral-500 sm:text-[#8E8E8E] font-normal transform transition-all duration-700 ease-out hover:text-gray-600 hover:scale-[1.02] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: isVisible ? '1.2s' : '0s' }}>
              With the mission to make aging optional, we are building the future of longevity
              by decoding your body&apos;s biological age using advanced AI and genetics.
            </p>
            
            {/* CTA buttons */}
            <div className={`mt-8 sm:mt-8 flex flex-row gap-2 sm:gap-4 lg:gap-8 w-full max-w-none sm:max-w-none justify-center items-center px-2 sm:px-0 transform transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{ transitionDelay: isVisible ? '1.4s' : '0s' }}>

              <button
                className={`inline-flex items-center justify-center py-2.5 sm:py-3 px-4 sm:px-6 rounded-full border-2 border-[#5F4AFB] font-semibold text-[#5F4AFB] text-xs sm:text-base backdrop-blur-sm shadow-lg hover:bg-[#5F4AFB] hover:text-white hover:scale-105 hover:shadow-xl hover:border-[#5a42e6] active:scale-95 transition-all duration-300 ease-out whitespace-nowrap sm:flex-initial sm:w-auto sm:min-w-[160px] transform hover:-translate-y-0 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                style={{ transitionDelay: isVisible ? '0.6s' : '0s' }}
                onClick={() => setWaitlistOpen(true)}
              >
                Join Waitlist
              </button>

              <button 
                onClick={handleDownloadClick}
                className={`flex items-center justify-between bg-gradient-to-r from-[#654BFF] to-[#7963FF] hover:from-[#5a42e6] hover:to-[#6b59e6] hover:scale-105 hover:shadow-xl active:scale-95 transition-all duration-300 ease-out rounded-full border-2 border-[#7D47F7]/30 hover:border-[#6b59e6]/40 sm:flex-initial sm:w-[194px] h-[40px] sm:h-[52px] pl-3 sm:pl-[24px] pr-1.5 sm:pr-[18px] py-2 sm:py-[16px] gap-2 sm:gap-[20px] group shadow-lg backdrop-blur-sm transform hover:-translate-y-1 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: isVisible ? '1.8s' : '0s' }}>
                <span className="text-[10px] sm:text-[15px] leading-[12px] sm:leading-[18px] font-[600] text-white whitespace-nowrap flex-shrink-0"
                      style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="sm:hidden">Download app</span>
                  <span className="hidden sm:inline">Download app</span>
                </span>
                <div className="w-[24px] sm:w-[36px] h-[24px] sm:h-[36px] rounded-full flex items-center justify-center p-[6px] sm:p-[10px] group-active:scale-90 transition-all duration-300 ease-in-out shadow-sm"
                  style={{ background: '#FFFFFF1A', border: '1px solid #FFFFFF33' }}>
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none" 
                       className="sm:w-7 sm:h-7 transition-all duration-300 ease-in-out group-hover:rotate-[135deg]"
                  >
                    <path d="M5 23L21 7M21 7L21 21M21 7L7 7" 
                          stroke="#FAFAFA" strokeWidth="2.5" 
                          strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tags Section - NOW SYNCHRONIZED WITH HERO */}
      <section
        className="tags-section-3d relative w-full overflow-hidden z-tags"
        style={{
          backgroundColor: '#FAFAFA',
          transform: tagsTransform,
          opacity: tagsOpacity,
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
          paddingTop: '40px',
          paddingBottom: '40px',
          height: '200px',
        }}
      >
        <div className="relative z-20 w-full space-y-8 px-4 h-full flex flex-col justify-center">
          {/* First row */}
          <div
            className="flex whitespace-nowrap w-max"
            style={{
              animation: 'infinite-marquee-left 850s linear infinite',
            }}
          >
            {[...firstRowContent, ...firstRowContent].map((item, i) => (
              <div key={`row1-${i}`} className="mx-3">
                {item.type === 'text' ? (
                  <div className="px-8 py-4 rounded-full border border-gray-300 text-[#7D47F7] bg-white text-xl font-normal shadow-md">
                    {item.content}
                  </div>
                ) : (
                  <img src={item.content} alt="" className="h-15 w-30 rounded-full object-cover shadow-md" />
                )}
              </div>
            ))}
          </div>

          {/* Second row */}
          <div
            className="flex whitespace-nowrap w-max"
            style={{
              animation: 'infinite-marquee-right 850s linear infinite',
            }}
          >
            {[...secondRowContent, ...secondRowContent].map((item, i) => (
              <div key={`row2-${i}`} className="mx-3">
                {item.type === 'text' ? (
                  <div className="px-8 py-4 rounded-full border border-gray-300 text-[#7D47F7] bg-white text-xl font-normal shadow-md">
                    {item.content}
                  </div>
                ) : (
                  <img src={item.content} alt="" className="h-15 w-30 rounded-full object-cover shadow-md" />
                )}
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes infinite-marquee-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes infinite-marquee-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0%);
            }
          }
        `}</style>
      </section>

      {/* Waitlist Popup Overlay - now covers entire viewport, including hero section */}
      {waitlistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
          <div className="absolute inset-0" onClick={() => setWaitlistOpen(false)} />
          <div className="relative z-[101] flex items-center justify-center w-full h-full">
            <div className="max-w-md w-full flex items-center justify-center">
              <JoinWaitlistPopup open={true} onClose={() => setWaitlistOpen(false)} />
            </div>
          </div>
        </div>
      )}
      
     
    </>
  );
};

export default HeroSection;
