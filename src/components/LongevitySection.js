'use client';

import React, { useRef, useEffect, useState } from "react";

const dataSources = [
  {
    id: "blood",
    label: "Blood",
    finalPosition: { row: 0, index: 0 },
    image: "/assets/longevity-svgs/blood_biomarker.svg",
  },
  {
    id: "gut",
    label: "Gut Microbiome",
    finalPosition: { row: 0, index: 1 },
    image: "/assets/longevity-svgs/microbiome.jpg",
  },
  {
    id: "genes",
    label: "Genes",
    finalPosition: { row: 1, index: 0 },
    image: "/assets/longevity-svgs/genes.png",
  },
  {
    id: "wearables",
    label: "Wearables",
    finalPosition: { row: 1, index: 1 },
    image: "/assets/longevity-svgs/wearable.jpg",
  },
  {
    id: "lifestyle",
    label: "Lifestyle Inputs",
    finalPosition: { row: 1, index: 2 },
    image: "/assets/longevity-svgs/lifestyle_input.svg",
  },
];

const LongevitySection = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [globalScrollY, setGlobalScrollY] = useState(0);
  const [sectionTransform, setSectionTransform] = useState({ translateY: 0, scale: 1 });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setGlobalScrollY(currentScrollY);
      
      // Calculate when longevity section should start sliding up
      const heroScrollThreshold = windowHeight * 0.6;
      const longevityStartY = windowHeight * 0.3;
      
      if (currentScrollY > heroScrollThreshold) {
        const slideProgress = Math.min((currentScrollY - heroScrollThreshold) / (windowHeight * 0.6), 1);
        const translateY = longevityStartY * (1 - slideProgress * 1.5);
        const scale = 0.9 + (slideProgress * 0.1);
        
        setSectionTransform({
          translateY: Math.max(-50, translateY),
          scale: scale
        });
      } else {
        setSectionTransform({
          translateY: longevityStartY,
          scale: 0.9
        });
      }
      
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      
      const inView = rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1;
      setIsInView(inView);
      
      if (inView && rect.top < windowHeight * 0.7) {
        const progress = Math.max(0, Math.min(1, 
          (windowHeight * 0.7 - rect.top) / (windowHeight + containerHeight * 0.6)
        ));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Sequential animation with smoother transitions
  const getCurrentStage = () => {
    if (scrollProgress < 0.15) return 0;  // Blood
    if (scrollProgress < 0.3) return 1;   // Gut
    if (scrollProgress < 0.45) return 2;  // Genes
    if (scrollProgress < 0.6) return 3;   // Wearables
    if (scrollProgress < 0.75) return 4;  // Lifestyle
    return 5; // Complete
  };

  const getStageProgress = (stageIndex) => {
    const stageDuration = 0.15;
    const stageStart = stageIndex * stageDuration;
    const stageEnd = stageStart + stageDuration;

    if (scrollProgress < stageStart) return 0;
    if (scrollProgress > stageEnd) return 1;

    return (scrollProgress - stageStart) / stageDuration;
  };

  const currentStage = getCurrentStage();
  const showTopText = scrollProgress > 0.1 && isInView;
  const showBottomText = scrollProgress >= 0.70 && isInView;

  const getPillPosition = (source) => {
    const { row, index } = source.finalPosition;
    
    if (isMobile) {
      const mobileIndex = dataSources.findIndex(s => s.id === source.id);
      const positions = [
        { x: 0, y: -140 },
        { x: 0, y: -70 },
        { x: -80, y: 0 },
        { x: 80, y: 0 },
        { x: 0, y: 70 }
      ];
      return positions[mobileIndex] || { x: 0, y: 0 };
    } else if (isTablet) {
      if (row === 0) {
        const positions = [
          { x: -180, y: -60 },
          { x: 180, y: -60 }
        ];
        return positions[index] || { x: 0, y: -60 };
      } else {
        const positions = [
          { x: -280, y: 60 },
          { x: 0, y: 60 },
          { x: 280, y: 60 }
        ];
        return positions[index] || { x: 0, y: 60 };
      }
    } else {
      if (row === 0) {
        const positions = [
          { x: -220, y: -70 },
          { x: 220, y: -70 }
        ];
        return positions[index] || { x: 0, y: -70 };
      } else {
        const positions = [
          { x: -380, y: 80 },
          { x: 0, y: 80 },
          { x: 380, y: 80 }
        ];
        return positions[index] || { x: 0, y: 80 };
      }
    }
  };

  const getPillDimensions = (source) => {
    const isFirstRow = source.finalPosition.row === 0;
    
    if (isMobile) {
      const mobileIndex = dataSources.findIndex(s => s.id === source.id);
      if (mobileIndex === 0) {
        return { width: '160px', height: '50px', iconSize: '40px', textSize: 'text-sm' };
      } else if (mobileIndex === 2 || mobileIndex === 3) {
        return { width: '140px', height: '60px', iconSize: '48px', textSize: 'text-sm' };
      } else if (mobileIndex === 4) { // Lifestyle
        return { width: '320px', height: '60px', iconSize: '48px', textSize: 'text-base' };
      }
      return { width: '280px', height: '60px', iconSize: '48px', textSize: 'text-base' };
    } else if (isTablet) {
      if (source.id === 'lifestyle') {
        return { width: '360px', height: '68px', iconSize: '52px', textSize: 'text-base' };
      }
      return { width: '300px', height: '68px', iconSize: '52px', textSize: 'text-base' };
    } else {
      let width = isFirstRow ? '346px' : '284px';
      if (source.id === 'lifestyle') {
        width = '340px'; // Bigger width for lifestyle
      }
      return { width, height: '76px', iconSize: '60px', textSize: 'text-lg md:text-xl' };
    }
  };

  const canStartNextPill = (currentIndex) => {
    if (currentIndex === 0) return true;
    const previousStageEnd = currentIndex * 0.15;
    return scrollProgress >= previousStageEnd - 0.05;
  };

  return (
    <div 
      ref={containerRef} 
      className="longevity-section-3d relative z-longevity smooth-transform"
      style={{
        transform: `translateY(${sectionTransform.translateY}px) scale(${sectionTransform.scale})`,
        transition: 'transform 0.3s ease-out',
        transformOrigin: 'center top'
      }}
    >
      <div 
        className="absolute -top-8 left-0 right-0 h-8 z-longevity-shadow pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.15) 100%)',
          filter: 'blur(6px)',
          opacity: sectionTransform.translateY < 400 ? 0.8 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      />
      
      <div 
        className="h-[250vh] md:h-[200vh] bg-white relative z-longevity w-full"
        style={{
          boxShadow: sectionTransform.translateY < 400 ? '0 -12px 24px rgba(0,0,0,0.15), 0 -4px 8px rgba(0,0,0,0.1)' : 'none',
          transition: 'box-shadow 0.5s ease-out',
          borderRadius: '0'
        }}
      >
        <div className="sticky top-0 h-screen bg-white flex flex-col items-center justify-center px-0 overflow-hidden z-longevity-content w-full"
             style={{
               borderRadius: '0'
             }}>
          <div className="w-full max-w-none h-full flex flex-col items-center justify-center px-4 md:px-8">

            {/* Top text */}
            <div
              className="text-center mb-8 md:mb-12 transition-all duration-700 ease-out px-4 w-full"
              style={{
                opacity: showTopText ? 1 : 0,
                transform: `translateY(${showTopText ? 0 : 40}px)`
              }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-700 leading-tight">
                We integrate data from your
              </h3>
            </div>

            {/* Pills container */}
            <div className="relative w-full flex items-center justify-center">
              <div 
                className="relative flex items-center justify-center"
                style={{ 
                  height: isMobile ? '320px' : isTablet ? '220px' : '280px',
                  width: '100%'
                }}
              >
                {/* Purple Text Labels - Separate from pills */}
                {dataSources.map((source, sourceIndex) => {
                  const stageProgress = getStageProgress(sourceIndex);
                  const canShowText = (currentStage === sourceIndex) && canStartNextPill(sourceIndex) && isInView;
                  
                  if (!canShowText) return null;

                  const textAppearPhase = Math.min(stageProgress / 0.4, 1);
                  const textMovePhase = Math.min(Math.max((stageProgress - 0.4) / 0.3, 0), 1);
                  const textMergePhase = Math.min(Math.max((stageProgress - 0.7) / 0.2, 0), 1);

                  // Text starts from way below and moves to its final position (same as pill)
                  const textStartY = window.innerHeight * 1.1;
                  const textCenterY = 150; // Below center position
                  const pillPosition = getPillPosition(source);
                  
                  // Text moves to same position as pill will be
                  const textFinalY = pillPosition.y;
                  const textFinalX = pillPosition.x;
                  
                  // Text position calculation - moves to pill's final position
                  let currentTextY = textStartY - (textStartY - textCenterY) * textAppearPhase;
                  let currentTextX = 0; // Start at center X
                  
                  // When pill starts moving, text moves to its final position too
                  if (textMovePhase > 0) {
                    currentTextY = textCenterY + (textFinalY - textCenterY) * textMovePhase;
                    currentTextX = textFinalX * textMovePhase;
                  }
                  
                  // Text opacity: appears, stays visible, then fades as it merges into pill
                  const textOpacity = textAppearPhase > 0 ? 
                    Math.min(textAppearPhase + textMovePhase, 1) * (1 - textMergePhase) : 0;

                  return (
                    <h3
                      key={`text-${source.id}`}
                      className="absolute whitespace-nowrap text-xl md:text-3xl lg:text-5xl font-semibold transition-all duration-1500 ease-out px-4 text-center"
                      style={{
                        color: '#5F4AFB',
                        left: '50%',
                        top: '50%',
                        transform: `translateX(calc(-50% + ${currentTextX}px)) translateY(calc(-50% + ${currentTextY}px)) scale(${0.7 + textAppearPhase * 0.3})`,
                        transformOrigin: 'center center',
                        zIndex: 15,
                        opacity: textOpacity,
                        filter: `blur(${(1 - textAppearPhase) * 3}px)`
                      }}
                    >
                      {source.label}
                    </h3>
                  );
                })}

                {/* Pills - Initially without text */}
                <div className="relative flex items-center justify-center w-full h-full">
                  {dataSources.map((source, sourceIndex) => {
                    const stageProgress = getStageProgress(sourceIndex);
                    const finalPosition = getPillPosition(source);
                    const pillDimensions = getPillDimensions(source);
                    
                    const shouldShowPill = (currentStage > sourceIndex || 
                      (currentStage === sourceIndex && canStartNextPill(sourceIndex))) && isInView;
                    
                    if (!shouldShowPill) return null;

                    // Pill timing: appears when text is at center (0.5), moves to position (0.7), text merges (0.8+)
                    const pillAppearPhase = Math.max(0, Math.min((stageProgress - 0.5) / 0.2, 1));
                    const pillMovePhase = Math.max(0, Math.min((stageProgress - 0.7) / 0.2, 1));
                    const textMergePhase = Math.max(0, Math.min((stageProgress - 0.8) / 0.2, 1));

                    const isCompleted = currentStage > sourceIndex;
                    const finalOpacity = isCompleted ? 1 : pillAppearPhase;

                    // Pills start from below center and move to final positions
                    const pillStartX = 0;
                    const pillStartY = 200; // Below center, separate from text
                    
                    const finalX = isCompleted ? finalPosition.x : pillStartX + (finalPosition.x - pillStartX) * pillMovePhase;
                    const finalY = isCompleted ? finalPosition.y : pillStartY + (finalPosition.y - pillStartY) * pillMovePhase;
                    const finalScale = isCompleted ? 1 : Math.max(0.3, 0.3 + pillAppearPhase * 0.7);

                    // Text inside pill should only appear when merging happens
                    const pillTextOpacity = isCompleted ? 1 : textMergePhase;

                    return (
                      <div
                        key={`pill-${source.id}`}
                        className="absolute transition-all duration-1500 ease-out will-change-transform"
                        style={{
                          transform: `translate(${finalX}px, ${finalY}px) scale(${finalScale}) rotateX(${(1-pillAppearPhase) * 15}deg)`,
                          opacity: finalOpacity,
                          filter: `blur(${(1 - pillAppearPhase) * 1.5}px)`,
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <div
                          className="flex items-center border rounded-full bg-black px-2 py-2 gap-4 transition-all duration-500"
                          style={{ 
                            width: pillDimensions.width,
                            height: pillDimensions.height,
                            borderColor: '#8E8E8E',
                            borderWidth: '1px',
                            transform: `rotateY(${(1-pillAppearPhase) * 10}deg)`
                          }}
                        >
                          <div
                            className="rounded-full border overflow-hidden flex items-center justify-center bg-black flex-shrink-0"
                            style={{
                              width: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '107px',
                              height: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '60px',
                              borderColor: '#8E8E8E',
                              borderWidth: '1px',
                              aspectRatio: isMobile ? '1/1' : 'auto',
                              minWidth: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '107px',
                              minHeight: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '60px',
                              maxWidth: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '107px',
                              maxHeight: isMobile ? (sourceIndex === 0 ? '40px' : '56px') : '60px'
                            }}
                          >
                            <img 
                              src={source.image}
                              alt={source.label}
                              className={`${source.image.includes('wearable.jpg') || source.image.includes('genes.png') ? 'w-[150%] h-[150%]' : source.image.includes('microbiome.jpg') ? 'w-[150%] h-[200%]' : 'w-full h-full'} ${isMobile ? 'object-cover' : 'object-contain'}`}
                            />
                          </div>

                          {/* Text inside pill - only appears during merge phase */}
                          <span 
                            className={`whitespace-nowrap flex-1 text-white font-medium ${pillDimensions.textSize} leading-tight transition-opacity duration-500`}
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: 500,
                              fontSize: isMobile ? '16px' : isTablet ? '16px' : '24px',
                              opacity: pillTextOpacity,
                              transform: `scale(${0.8 + pillTextOpacity * 0.2})`,
                              transformOrigin: 'left center'
                            }}
                          >
                            {source.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom text */}
            <div
              className="text-center mt-8 md:mt-12 transition-all duration-1000 ease-out px-4 w-full"
              style={{
                opacity: showBottomText ? 1 : 0,
                transform: `translateY(${showBottomText ? 0 : 40}px)`,
                transitionDelay: showBottomText ? '800ms' : '0ms'
              }}
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-700 leading-tight">
                to deliver hyper-personalized health insights
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LongevitySection;