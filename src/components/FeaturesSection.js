"use client";
import React, { useState, useEffect, useRef } from "react";

const featureCards = [
  { 
    id: 1,
    title: "Holistic Multi-Omics Integration", 
    description: "We combine genomics, epigenetics, metagenomics, proteomics and nutrigenomics into one unified health profile.", 
    imgSrc: "/assets/feature-cards/image.jpeg" 
  },
  { 
    id: 2,
    title: "Agent-Based AI Analytics", 
    description: "Autonomous AI collaborate to analyze your data, predict risks, and dynamically adjust recommendations.", 
    imgSrc: "/assets/feature-cards/image-1.png" 
  },
  { 
    id: 3,
    title: "Organ-Specific Aging Metrics", 
    description: "We calculate biological age not just overall, but for individual organs (heart, liver, brain, kidneys).", 
    imgSrc: "/assets/feature-cards/image-3.jpg" 
  },
  { 
    id: 4,
    title: "Early Disease Prediction", 
    description: "Our AI-driven models continuously scan your multi-omics & wearable data for subtle shifts that precede clinical symptoms.", 
    imgSrc: "/assets/feature-cards/image-5.jpg" 
  },
  { 
    id: 5,
    title: "Immortigen Unique ID", 
    description: "A secure, blockchain-backed digital identity that links all your multi-omics, wearable & clinical data under one unified profile.", 
    imgSrc: "/assets/feature-cards/image-6.jpg" 
  },
  { 
    id: 6,
    title: "Hyper-Personalized Longevity Plans", 
    description: "Every recommendation (diet, exercise, supplements, therapies) is tailored to your unique profile and goals. Our AI continuously refines suggestions based on your progress and changing biomarkers.", 
    imgSrc: "/assets/feature-cards/image-4.jpg" 
  },
  { 
    id: 7,
    title: "Real-Time BioTracker Wearable", 
    description: "Our custom wrist device continuously measures vital signs, activity, hydration and temperature.", 
    imgSrc: "/assets/feature-cards/image-2.png" 
  }
];

const FeaturesSection = () => {
  const containerRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const animationIdRef = useRef(null);
  
  const CARD_WIDTH = 400; // Card width + gap
  const ANIMATION_SPEED = 0.5;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // CSS Transform Animation - Much smoother with bidirectional loop
  useEffect(() => {
    if (isMobile || isPaused) return;

    let animationSpeed = isHovered ? ANIMATION_SPEED * 0.3 : ANIMATION_SPEED;

    const animate = () => {
      setTranslateX(prev => {
        const newValue = prev - animationSpeed;
        const singleSetWidth = CARD_WIDTH * featureCards.length;
        
        // Reset position when reaching the end of the middle set to maintain seamless loop
        if (newValue <= -singleSetWidth * 2) {
          return -singleSetWidth;
        }
        
        return newValue;
      });
      
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isMobile, isHovered, isPaused]);

  const handleCardClick = (cardId, cardIndex, event) => {
    event.stopPropagation();
    if (expandedCard === cardId && expandedCardIndex === cardIndex) {
      setExpandedCard(null);
      setExpandedCardIndex(null);
    } else {
      setExpandedCard(cardId);
      setExpandedCardIndex(cardIndex);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle drag scrolling for manual control
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsPaused(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Apply drag offset and normalize position for seamless bidirectional loop
    setTranslateX(prev => {
      const newValue = prev + dragOffset;
      const singleSetWidth = CARD_WIDTH * featureCards.length;
      
      // Keep position within the middle set bounds for seamless loop
      if (newValue > -singleSetWidth) {
        // If dragged too far right, wrap to the end of middle set
        return -singleSetWidth * 2 + (newValue + singleSetWidth);
      } else if (newValue <= -singleSetWidth * 2) {
        // If dragged too far left, wrap to the beginning of middle set
        return -singleSetWidth + (newValue + singleSetWidth * 2);
      }
      
      return newValue;
    });
    
    setDragOffset(0);
    
    // Resume animation after a short delay
    setTimeout(() => setIsPaused(false), 1000);
  };

  const getCardDimensions = () => {
    if (isMobile) {
      return {
        normal: { width: '100%', height: '200px' }, // Reduced height for collapsed state
        expanded: { width: '100%', height: '320px' } // Increased height for expanded state
      };
    } else {
      return {
        normal: { width: '380px', height: '460px' },
        expanded: { width: '580px', height: '460px' }
      };
    }
  };

  const cardDimensions = getCardDimensions();

  // Mobile Layout
  if (isMobile) {
    return (
      <section className="py-12 relative">
        <div className="flex flex-col items-center mb-8 px-4">
          <h2 
            className="text-3xl leading-tight font-bold text-[#1F1F1F] mb-4 text-center"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            What We Offer
          </h2>
          <p 
            className="text-sm font-semibold text-[#8E8E8E] text-center uppercase tracking-[2px]"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            WHAT MAKES US DIFFERENT
          </p>
        </div>
        
        <div className="px-4 space-y-4">
          {featureCards.map((card, idx) => {
            const isExpanded = expandedCard === card.id && expandedCardIndex === idx;
            
            return (
              <div
                key={`${card.id}-${idx}`}
                className="w-full overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  height: isExpanded ? cardDimensions.expanded.height : cardDimensions.normal.height
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer w-full h-full"
                  style={{
                    backgroundImage: `url(${card.imgSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                  onClick={(e) => handleCardClick(card.id, idx, e)}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <button
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                    aria-label={isExpanded ? "Close details" : "View details"}
                  >
                    <div className="relative w-5 h-5">
                      {isExpanded ? (
                        <>
                          <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-transform duration-200"></div>
                          <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-transform duration-200"></div>
                        </>
                      ) : (
                        <>
                          <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"></div>
                          <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"></div>
                        </>
                      )}
                    </div>
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold leading-tight mb-2">
                      {card.title}
                    </h3>
                    
                    {/* Description only shows when expanded */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop Layout with CSS Transform
  return (
    <section className="py-12 md:py-16 relative">
      <div className="flex flex-col items-center mb-8 md:mb-12 px-4">
        <h2 
          className="text-3xl md:text-4xl lg:text-[40px] leading-tight font-bold text-[#1F1F1F] mb-4 text-center"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          What We Offer
        </h2>
        <p 
          className="text-sm md:text-base font-semibold text-[#8E8E8E] text-center uppercase tracking-[2px] md:tracking-[4px]"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          WHAT MAKES US DIFFERENT
        </p>
      </div>

      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ userSelect: 'none' }}
      >
        <div 
          ref={containerRef}
          className="flex items-stretch gap-6 pb-6 md:pb-8 transition-transform duration-75 ease-linear will-change-transform"
          style={{ 
            transform: `translateX(${translateX + dragOffset}px)`,
            width: `${CARD_WIDTH * featureCards.length * 3}px` // Triple width for seamless loop
          }}
        >
          {/* Render cards 3 times for infinite bidirectional effect */}
          {[...Array(3)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              {featureCards.map((card, idx) => {
                const uniqueIndex = setIndex * featureCards.length + idx;
                const isExpanded = expandedCard === card.id && expandedCardIndex === uniqueIndex;
                const dimensions = isExpanded ? cardDimensions.expanded : cardDimensions.normal;
                
                return (
                  <div
                    key={`${card.id}-${uniqueIndex}`}
                    className="flex-shrink-0 group relative transition-all duration-500 ease-in-out"
                    style={{
                      width: dimensions.width,
                      height: dimensions.height,
                      zIndex: isExpanded ? 50 : 1
                    }}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer w-full h-full"
                      style={{
                        backgroundImage: `url(${card.imgSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform: isExpanded ? 'scale(1.02)' : 'scale(1)',
                        boxShadow: isExpanded ? '0 20px 40px rgba(0,0,0,0.2)' : undefined
                      }}
                      onClick={(e) => handleCardClick(card.id, uniqueIndex, e)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      <button
                        className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 z-10"
                        aria-label={isExpanded ? "Close details" : "View details"}
                      >
                        <div className="relative w-6 h-6">
                          {isExpanded ? (
                            <>
                              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 transition-transform duration-200"></div>
                              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-transform duration-200"></div>
                            </>
                          ) : (
                            <>
                              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"></div>
                              <div className="absolute top-1/2 left-1/2 w-0.5 h-4 bg-white transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"></div>
                            </>
                          )}
                        </div>
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className={`font-semibold mb-2 leading-tight transition-all duration-300 ${
                          isExpanded ? 'text-2xl' : 'text-xl'
                        }`}>
                          {card.title}
                        </h3>
                        
                        <div className={`transition-all duration-500 overflow-hidden ${
                          isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <p className="text-sm leading-relaxed opacity-95 mt-2">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx>{`
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;