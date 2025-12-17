'use client';

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroImg from '../../../public/assets/hero-img.png';
import precisionImg from '../../../public/assets/precision-nutri.png';
import physicalImg from '../../../public/assets/physical-activity.png';
import physicoImg from '../../../public/assets/sleeping-girl.png';
import brainImg from '../../../public/assets/brain.jpg';
import bubbleImg from '../../../public/assets/bubble.jpg';

// Science content data
const intro = `At Immortigen, we believe that aging is not just an inevitable decline, but a complex biological process that can be understood and influenced. Our mission is to empower you to take control of your healthspan – the years of your life lived in good health and vitality. We move beyond generic advice, employing a deeply personalized, science-driven approach rooted in understanding your unique biology and behaviour.`;

const pillars = [
  {
    id: 1,
    heading: "Precision Nutrition",
    subHeading: "Fuelling Your Cells for Longevity",
    imageUrl: precisionImg,
    slug: "precision-nutrition", // Add slug for navigation
    assess: [
      "Advanced biomarker analysis (vitamins, minerals, glucose, insulin, lipids, hs‑CRP, organ‑function panels).",
      "Detailed dietary‑intake tracking & lifestyle review.",
      "Gut‑microbiome sequencing.",
      "Nutrigenomic insights — how your genes modify nutrient handling."
    ],
    approach: [
      "Personalised macro‑ & micro‑nutrient targets.",
      "Food recommendations to boost beneficial compounds & support autophagy.",
      "Targeted supplementation protocols (e.g. mitochondrial support, anti‑inflammatory nutraceuticals).",
      "Meal‑timing / intermittent‑fasting strategies when appropriate.",
      "Comprehensive gut‑health optimisation."
    ]
  },
  {
    id: 2,
    heading: "Targeted Physical Activity",
    imageUrl: physicalImg,
    subHeading: "Building Resilience From Muscle to Mind",
    slug: "targeted-physical-activity",
    assess: [
      "Functional movement & fitness testing (strength, VO₂, flexibility, balance).",
      "Body‑composition analysis (muscle / fat distribution).",
      "Lifestyle & preference review (barriers, likes, limitations).",
      "Optional biomarkers / genomics for exercise response."
    ],
    approach: [
      "Tailored mix of resistance, cardiovascular, flexibility & balance work.",
      "Progressive‑overload road‑map that evolves as you adapt.",
      "Integration into daily routines for sustainability.",
      "Recovery & sleep protocols to maximise adaptation."
    ]
  },
  {
    id: 3,
    heading: "Physiological Balance",
    imageUrl: physicoImg,
    subHeading: "Harmonising Your Body's Systems",
    slug: "physiological-balance",
    assess: [
      "Comprehensive hormone & inflammatory panels (cortisol, thyroid, sex hormones etc.).",
      "Stress‑response evaluation — Heart‑Rate Variability & subjective metrics.",
      "Sleep‑quality analysis (questionnaires / wearables).",
      "Baseline cognitive‑function screening."
    ],
    approach: [
      "Evidence‑based stress‑management (mindfulness, breath‑work, HRV biofeedback).",
      "Personalised sleep‑optimisation protocols (chronotype, environment, light exposure).",
      "Lifestyle tweaks for circadian / hormonal alignment.",
      "Nutritional & lifestyle support for detoxification pathways.",
      "Clinician collaboration for targeted hormone balancing where indicated."
    ]
  },
  {
    id: 4,
    heading: "Genomic & Epigenomic Insights",
    imageUrl: bubbleImg,
    subHeading: "Understanding & Influencing Your Blueprint",
    slug: "genomic-epigenomic-insights",
    assess: [
      "Targeted longevity panels or Whole‑Exome Sequencing.",
      "DNA‑methylation testing to quantify biological age.",
    ],
    approach: [
      "Hyper‑personalised risk‑mitigation plans informed by genetics & methylation.",
      "Precision nutrition (nutrigenomics) & supplement choices (pharmacogenomics).",
      "Exercise / lifestyle refinement based on genetic insights.",
      "Ongoing biological‑age tracking to monitor progress."
    ]
  },
  {
    id: 5,
    heading: "Behavioural Science & Mindset",
    imageUrl: brainImg,
    subHeading: "Sustaining Positive Change",
    slug: "behavioural-science-mindset",
    assess: [
      "Validated questionnaires (readiness, self‑efficacy, motivation, perceived stress).",
      "Habit & routine mapping; barrier identification.",
      "Goals & values alignment workshops."
    ],
    approach: [
      "Motivational interviewing & personalised coaching.",
      "Habit‑formation frameworks (cue → routine → reward).",
      "SMART action‑plans with tracking & accountability.",
      "Mindset cultivation (growth, resilience, positive self‑talk).",
      "Stress‑resilience & social‑support strategies."
    ]
  }
];

// Science Card Component
const ScienceCard = ({ pillar, index, isVisible, onCardHover, onCardClick }) => {
  const handleClick = () => {
    onCardClick(pillar);
  };

  return (
    <div 
      className={`science-card w-[400px] h-[600px] rounded-3xl bg-[#F6F5FF] shadow-xl overflow-hidden flex-shrink-0 transition-all duration-700 ease-out group hover:scale-[1.08] hover:shadow-2xl transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-16 opacity-0'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
      }}
      onMouseEnter={() => onCardHover(true)}
      onMouseLeave={() => onCardHover(false)}
      onClick={handleClick}
    >
      {/* Header Section - Fixed height */}
      <div className="px-8 py-8 h-[180px] flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5F4AFB] transition-colors duration-300">{pillar.heading}</h3>
            <p className="text-base text-gray-600 leading-relaxed">{pillar.subHeading}</p>
          </div>
          <div className="p-3 bg-[#5F4AFB] rounded-full shadow-md ml-6 group-hover:rotate-45 transition-all duration-300">
            <svg className="w-4 h-4 text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Image Section - Fixed height and aligned */}
      <div className="h-[360px] px-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg">
          <Image 
            src={pillar.imageUrl} 
            alt={pillar.heading}
            fill
            className="object-cover group-hover:brightness-110 transition-all duration-500"
          />
        </div>
      </div>
      
      {/* Bottom padding to maintain card height */}
      <div className="h-[60px]"></div>
    </div>
  );
};

export default function SciencePage() {
  const router = useRouter();
  
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    pillarsTitle: false,
    pillars: false,
    integration: false
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isScrollPaused, setIsScrollPaused] = useState(false);
  const cursorRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  // Handle card click navigation
  const handleCardClick = (pillar) => {
    // Navigate to the detail page using the pillar's slug
    // You can adjust the route path according to your routing structure
    router.push(`/Science/${pillar.slug}`);
  };

  useEffect(() => {
    // Hero animation on mount
    const timer1 = setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    
    // Optimized mouse tracking for custom cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Use passive event listener for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
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

    // Auto-scroll functionality
    const startAutoScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer || isScrollPaused) return;

      const scroll = () => {
        if (!isScrollPaused && scrollContainer) {
          scrollContainer.scrollLeft += 1;
          
          // Reset scroll when reaching the end
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          }
        }
        scrollAnimationRef.current = requestAnimationFrame(scroll);
      };
      
      scrollAnimationRef.current = requestAnimationFrame(scroll);
    };

    // Start auto-scroll when pillars become visible
    if (isVisible.pillars) {
      startAutoScroll();
    }

    return () => {
      clearTimeout(timer1);
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      
      // Cleanup animation frames
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, [isVisible.pillars, isScrollPaused]);

  // Update cursor position with CSS transform for better performance
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePosition.x - 16}px, ${mousePosition.y - 16}px, 0)`;
    }
  }, [mousePosition]);

  // Dynamic CSS for cursor
  useEffect(() => {
    // Create or update the style element
    let styleElement = document.getElementById('dynamic-cursor-styles');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-cursor-styles';
      document.head.appendChild(styleElement);
    }

    // Update CSS based on hover state
    if (isHoveringCard) {
      styleElement.textContent = `
        .science-card,
        .science-card *,
        .science-card *::before,
        .science-card *::after {
          cursor: none !important;
        }
      `;
    } else {
      styleElement.textContent = `
        .science-card {
          cursor: pointer;
        }
      `;
    }

    // Cleanup on unmount
    return () => {
      const element = document.getElementById('dynamic-cursor-styles');
      if (element) {
        element.remove();
      }
    };
  }, [isHoveringCard]);

  // Handle card hover
  const handleCardHover = (isHovering) => {
    setIsHoveringCard(isHovering);
    setIsScrollPaused(isHovering);
  };

  return (
    <>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-[10000] flex items-center justify-center transition-all duration-200 ease-out ${
          isHoveringCard ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(95, 74, 251, 0.8)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          willChange: 'transform',
        }}
      >
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[55vh] min-h-[400px] overflow-hidden">
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
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className={`font-semibold font-manrope mb-4 text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl transform transition-all duration-1000 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:scale-105 cursor-default`}>
            The Science Behind Immortigen
          </h1>
          <p className={`max-w-[41rem] font-inter font-medium text-[#1F1F1F] transform transition-all duration-1000 delay-300 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:text-black cursor-default`}>
            Optimising your biology for lifelong well‑being
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section 
        data-section="intro" 
        className="max-w-4xl mx-auto py-24 px-4"
      >
        <div className={`mt-4 font-inter max-w-[65vw] mx-auto text-center text-[#8E8E8E] transform transition-all duration-1000 ease-out ${
          isVisible.intro 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        } hover:text-[#6B6B6B] hover:scale-[1.02] cursor-default`}>
          {intro}
        </div>
      </section>

      {/* Five Key Pillars Section */}
      <div 
        data-section="pillarsTitle"
        className="align-middle items-center justify-center flex flex-col ml-[2rem] mt-5 mb-12"
      >
        <h1 className={`font-manrope text-[35px] font-bold transform transition-all duration-1000 ease-out ${
          isVisible.pillarsTitle 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:scale-105 hover:text-[#5F4AFB] cursor-default`}>
          Our Five Key Pillars
        </h1>
        <p className={`max-w-[60vw] mt-4 text-[#8E8E8E] text-center transform transition-all duration-1000 delay-300 ease-out ${
          isVisible.pillarsTitle 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:text-[#6B6B6B] cursor-default`}>
          Our methodology integrates insights from five key pillars, assessing your current state and customizing interventions to optimize your body&apos;s innate potential for resilience and well-being.
        </p>
      </div>

      {/* Pillars Cards */}
      <div 
        data-section="pillars"
        className="overflow-x-auto scrollbar-hide px-10 py-8"
        ref={scrollContainerRef}
      >
        <div className="flex space-x-12 w-max">
          {/* Duplicate the pillars array for seamless infinite scroll */}
          {[...pillars, ...pillars].map((pillar, index) => (
            <ScienceCard 
              key={`${pillar.id}-${Math.floor(index / pillars.length)}`} 
              pillar={pillar} 
              index={index % pillars.length} 
              isVisible={isVisible.pillars} 
              onCardHover={handleCardHover}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Integration Section */}
      <div 
        data-section="integration"
        className="mx-auto align-middle items-center justify-center flex flex-col mt-40"
      >
        <h1 className={`text-3xl text-center font-semibold mb-2 transform transition-all duration-1000 ease-out ${
          isVisible.integration 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:scale-105 hover:text-[#5F4AFB] cursor-default`}>
          Integration
        </h1>
        <h4 className={`tracking-[.2em] text-xs text-center text-[#8E8E8E] mb-8 uppercase transform transition-all duration-1000 delay-200 ease-out ${
          isVisible.integration 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        } hover:text-[#6B6B6B] cursor-default`}>
          YOUR PERSONALIZED PATH TO VITALITY
        </h4>

        <p className={`w-[60vw] mt-8 text-[#8E8E8E] text-center opacity-[0.7] transform transition-all duration-1000 delay-400 ease-out ${
          isVisible.integration 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        } hover:opacity-100 hover:text-[#6B6B6B] hover:scale-[1.02] cursor-default`}>
          The true power of the Immortigen approach lies in the integration of these five pillars. We don&apos;t look at nutrition, exercise, physiology, genomics, or behaviour in isolation. Our platform synthesizes data from all areas to create a holistic understanding of your individual biology and psychology. This allows us to craft a dynamic, cohesive, and deeply personalized roadmap designed to optimize your cellular health, enhance your resilience, build sustainable habits, and maximize your healthspan.
        </p>

        <p className={`max-w-[60vw] mt-6 text-[#8E8E8E] text-center opacity-[0.7] transform transition-all duration-1000 delay-600 ease-out ${
          isVisible.integration 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-12 opacity-0'
        } hover:opacity-100 hover:text-[#6B6B6B] hover:scale-[1.02] cursor-default`}>
          Your journey with Immortigen is an ongoing partnership. We continuously monitor your progress, adapt your plan based on new data and your evolving needs, empowering you to live healthier, longer, and with greater vitality.
        </p>
      </div>

      {/* Disclaimer */}
      <p className={`max-w-[80vw] mt-40 text-[#8E8E8E] text-[12px] text-center opacity-[0.6] mx-auto mb-10 transform transition-all duration-1000 delay-800 ease-out ${
        isVisible.integration 
          ? 'translate-y-0 opacity-60' 
          : 'translate-y-8 opacity-0'
      } hover:opacity-80 cursor-default`}>
        Disclaimer: Immortigen provides personalized wellness programs based on scientific insights. We are not a medical provider and do not offer medical diagnosis or treatment. Our programs are designed to complement, not replace, the care provided by your physician. Always consult with your healthcare professional before making significant changes to your diet, exercise routine, or health regimen. Our goal is to optimize well-being and healthspan; &quot;reversing aging&quot; refers to influencing biological markers and processes associated with aging, not chronological age reversal.
      </p>

      <style jsx>{`
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