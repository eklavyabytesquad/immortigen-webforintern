'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png';
import { healthBiomarkersData } from './biomarkers.js';

const ChevronDown = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const AccordionItem = ({ 
  title, 
  description, 
  components = [], 
  bgColor = 'bg-gray-100', 
  emoji, 
  isVisible, 
  delay = 0 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-200 py-4 cursor-pointer transform transition-all duration-700 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : 'translate-y-8 opacity-0'
    }`}
    style={{
      transitionDelay: isVisible ? `${delay}ms` : '0ms'
    }}
    onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center pr-2">
        <div className="flex items-center flex-1 min-w-0">
          <p className="text-sm md:text-base font-medium text-gray-700 hover:text-[#5F4AFB] transition-colors duration-300 break-words pr-2">{title}</p>
        </div>
        <div className="flex-shrink-0">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
      }`}>
        {description && <p className="text-xs md:text-sm text-gray-600 whitespace-pre-line">{description}</p>}
        {components.length > 0 && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-28 text-xs text-gray-600 mt-2">
            {components.map((comp, idx) => (
              <li key={idx} className="bg-gray-50 px-2 sm:px-4 lg:px-12 py-1 rounded break-words">{comp}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const CategoryHeader = ({ title, emoji, bgColor = 'bg-blue-100', isVisible, delay = 0 }) => (
  <div className={`flex items-center gap-2 sm:gap-3 mb-6 sm:mb-10 mt-8 sm:mt-12 transform transition-all duration-1000 ease-out ${
    isVisible 
      ? 'translate-y-0 opacity-100' 
      : 'translate-y-8 opacity-0'
  } hover:scale-105 cursor-default px-1`}
  style={{
    transitionDelay: isVisible ? `${delay}ms` : '0ms'
  }}>
    <span className={`text-lg sm:text-xl ${bgColor} rounded-md p-1.5 sm:p-2 hover:scale-110 transition-transform duration-300 flex-shrink-0`}>{emoji}</span>
    <h2 className="text-lg sm:text-xl font-bold font-manrope hover:text-[#5F4AFB] transition-colors duration-300 break-words">{capitalize(title)}</h2>
  </div>
);

const renderAccordionGrid = (items, getTitle, getDescription, isVisible, baseDelay = 0) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-4 lg:gap-x-20">
    {items.map((item, idx) => (
      <AccordionItem
        key={idx}
        title={getTitle(item)}
        description={getDescription(item)}
        isVisible={isVisible}
        delay={baseDelay + (idx * 150)}
      />
    ))}
  </div>
);

const FoundationalHealthPanel = ({ data, isVisible }) => {
  const categoryEmojis = {
    heartHealth: '🫀', energyMetabolism: '⚡', hormonalHealth: '🧬',
    nutrientsVitaminsMinerals: '💊', kidneyHealth: '🫘', liverHealth: '🧫',
    inflammationImmunity: '🔥', bloodHealth: '🩸', cancerScreeningMale: '🦠', urineAnalysis: '💧'
  };

  const categoryColors = {
    heartHealth: 'bg-red-100', energyMetabolism: 'bg-yellow-100', hormonalHealth: 'bg-purple-100',
    nutrientsVitaminsMinerals: 'bg-green-100', kidneyHealth: 'bg-blue-100', liverHealth: 'bg-teal-100',
    inflammationImmunity: 'bg-orange-100', bloodHealth: 'bg-pink-100', cancerScreeningMale: 'bg-indigo-100', urineAnalysis: 'bg-cyan-100'
  };

  return (
    <section className="px-4 sm:px-8 lg:px-32 py-8 sm:py-12 lg:py-16 max-w-full text-left mt-[5vh] sm:mt-[10vh]">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-1000 ease-out break-words ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Foundational Health Panel:Blood-Based Biomarkers
      </h1>
      <p className={`text-gray-600 mb-6 sm:mb-8 max-w-full lg:max-w-[55vw] transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        {data.description}
      </p>

      {Object.entries(data.categories).map(([key, val], categoryIdx) => (
        <div key={key}>
          <CategoryHeader
            title={key.split(/(?=[A-Z])/).join(' ')}
            emoji={categoryEmojis[key]}
            bgColor={categoryColors[key]}
            isVisible={isVisible}
            delay={600 + (categoryIdx * 300)}
          />
          {renderAccordionGrid(
            val.biomarkers,
            (bio) => bio.name,
            (bio) => bio.description,
            isVisible,
            800 + (categoryIdx * 300)
          )}
        </div>
      ))}
    </section>
  );
};

const GeneticBlueprintPanel = ({ data, isVisible }) => {
  return (
    <section className="px-4 sm:px-8 lg:px-32 py-8 sm:py-12 lg:py-16 max-w-full text-left bg-[#f5f5f5] mt-[5vh] sm:mt-[10vh]">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-1000 ease-out break-words ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Genetic Blueprint Panel: Exome Sequencing Key Genes
      </h1>
      <p className={`text-gray-600 mb-6 sm:mb-8 max-w-full lg:max-w-[55vw] transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        {data.description}
      </p>

      <CategoryHeader title="Longevity Genes" emoji="🧬" bgColor="bg-purple-100" isVisible={isVisible} delay={600} />
      {renderAccordionGrid(data.genes, (g) => g.gene, (g) => g.relevance, isVisible, 800)}

      <CategoryHeader title="Nutrigenomic Genes" emoji="🥗" bgColor="bg-green-100" isVisible={isVisible} delay={1200} />
      {renderAccordionGrid(data.nutrigenomicGenes, (g) => g.gene, (g) => g.relevance, isVisible, 1400)}

      <CategoryHeader title="ACMG Secondary Findings" emoji="⚠️" bgColor="bg-red-100" isVisible={isVisible} delay={1800} />
      <AccordionItem
        title={data.acmgSecondaryFindings.description}
        description={data.acmgSecondaryFindings.relevance}
        isVisible={isVisible}
        delay={2000}
      />
    </section>
  );
};

const GutHealthPanel = ({ data, isVisible }) => {
  return (
    <section className="px-4 sm:px-8 lg:px-32 py-8 sm:py-12 lg:py-16 max-w-full text-left mt-[5vh] sm:mt-[10vh]">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-1000 ease-out break-words ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Gut Health & Systemic Impact Panel: Metagenome Sequencing
      </h1>
      <p className={`text-gray-600 mb-6 sm:mb-8 max-w-full lg:max-w-[55vw] transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        {data.description}
      </p>

      <CategoryHeader title="Diversity & Composition" emoji="🌱" bgColor="bg-green-100" isVisible={isVisible} delay={600} />
      {renderAccordionGrid(data.categories.diversityComposition, (i) => i.name, (i) => i.relevance, isVisible, 800)}

      <CategoryHeader title="Key Bacterial Taxa" emoji="🦠" bgColor="bg-blue-100" isVisible={isVisible} delay={1200} />
      {renderAccordionGrid(data.categories.keyBacterialTaxa, (i) => i.name, (i) => i.relevance, isVisible, 1400)}

      <CategoryHeader title="Microbial Metabolites" emoji="🧪" bgColor="bg-purple-100" isVisible={isVisible} delay={1800} />
      {renderAccordionGrid(data.categories.keyMicrobialMetabolites, (i) => i.name, (i) => i.relevance, isVisible, 2000)}
    </section>
  );
};

const BiologicalAgePanel = ({ data, isVisible }) => {
  return (
    <section className="px-4 sm:px-8 lg:px-32 py-8 sm:py-12 lg:py-16 max-w-full text-left bg-[#f5f5f5] mt-[5vh] sm:mt-[10vh]">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-1000 ease-out break-words ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Biological Age Panel: Methylation Analysis (Epigenetic Clocks)
      </h1>
      <p className={`text-gray-600 mb-6 sm:mb-8 max-w-full lg:max-w-[55vw] transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        {data.description}
      </p>

      {renderAccordionGrid(
        data.clocks,
        (c) => c.name,
        (c) => `${c.primaryAssessment}\n${c.relevance}`,
        isVisible,
        600
      )}
    </section>
  );
};

const PersonalizedMedicationPanel = ({ data, isVisible }) => {
  return (
    <section className="px-4 sm:px-8 lg:px-32 py-8 sm:py-12 lg:py-16 max-w-full text-left mt-[5vh] sm:mt-[10vh]">
      <h1 className={`text-2xl sm:text-3xl font-bold mb-2 transform transition-all duration-1000 ease-out break-words ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        Personalized Medication Panel: Pharmacogenomics (PgX)
      </h1>
      <p className={`text-gray-600 mb-6 sm:mb-8 max-w-full lg:max-w-[55vw] transform transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`} style={{ transitionDelay: '300ms' }}>
        {data.description}
      </p>

      {renderAccordionGrid(
        data.genes,
        (g) => g.gene,
        (g) => `Variants: ${g.variants}\nDrugs: ${g.affectedDrugs.join(', ')}\n${g.implication}`,
        isVisible,
        600
      )}
    </section>
  );
};

export default function BiomarkersPage() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    foundational: false,
    genetic: false,
    biological: false,
    gut: false,
    medication: false
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Hero animation on mount
    const timer1 = setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    
    // Mouse tracking for custom cursor
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
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
    sections.forEach(section => observer.observe(section));    return () => {
      clearTimeout(timer1);
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const {
    foundationalHealthPanel,
    geneticBlueprintPanel,
    gutHealthPanel,
    biologicalAgePanel,
    personalizedMedicationPanel
  } = healthBiomarkersData.healthBiomarkers;

  return (
    <>      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-[10000] mix-blend-difference hidden lg:block"
        style={{
          left: mousePosition.x - 30,
          top: mousePosition.y - 30,
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }}
        id="custom-cursor"
      >
        <div className="w-[60px] h-[60px] border-2 border-[#5F4AFB] rounded-full bg-[#5F4AFB]/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-2 h-2 bg-[#5F4AFB] rounded-full"></div>
        </div>
      </div>{/* Hero Section */}
      <section className="relative w-full h-[40vh] sm:h-[55vh] min-h-[300px] sm:min-h-[400px] overflow-hidden">
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
          <h1 className={`font-semibold font-manrope mb-4 text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl transform transition-all duration-1000 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:scale-105 cursor-default max-w-full break-words`}>
            The 150+ test list.
          </h1>
          <p className={`max-w-full sm:max-w-[41rem] font-inter font-medium text-[#1F1F1F] text-sm sm:text-base transform transition-all duration-1000 delay-300 ease-out ${
            isVisible.hero 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          } hover:text-black cursor-default px-2 sm:px-0`}>
            Our methodology integrates insights from five key pillars, assessing your current state and customizing interventions to optimize your body&apos;s innate potential for resilience and well-being.
          </p>
        </div>
      </section>{/* Main Content Panels */}
      <div data-section="foundational">
        <FoundationalHealthPanel data={foundationalHealthPanel} isVisible={isVisible.foundational} />
      </div>
      
      <div data-section="genetic">
        <GeneticBlueprintPanel data={geneticBlueprintPanel} isVisible={isVisible.genetic} />
      </div>
      
      <div data-section="gut">
        <GutHealthPanel data={gutHealthPanel} isVisible={isVisible.gut} />
      </div>
      
      <div data-section="biological">
        <BiologicalAgePanel data={biologicalAgePanel} isVisible={isVisible.biological} />
      </div>
      
      <div data-section="medication">
        <PersonalizedMedicationPanel data={personalizedMedicationPanel} isVisible={isVisible.medication} />
      </div>

      <style jsx>{`
        .custom-cursor {
          cursor: none;
        }
        
        .custom-cursor:hover {
          cursor: none;
        }
      `}</style>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const cursor = document.getElementById('custom-cursor');
            const cards = document.querySelectorAll('.custom-cursor');
            
            cards.forEach(card => {
              card.addEventListener('mouseenter', () => {
                if (cursor) cursor.style.opacity = '1';
              });
              
              card.addEventListener('mouseleave', () => {
                if (cursor) cursor.style.opacity = '0';
              });
            });
          });
        `
      }} />
    </>
  );
}