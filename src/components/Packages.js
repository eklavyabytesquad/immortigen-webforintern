"use client";
import React, { useState, useEffect } from "react";
import CheckoutPopup from "./CheckoutPopup.js";

const packages = [
  {
    id: "blood-test",
    title: "Blood Test Package",
    price: "₹ 3,400",
    originalPrice: "₹ 4,800",
    discount: "29% OFF",
    period: "/test",
    popular: true,
    available: true,
    features: [
      "Serum Calcium",
      "Vitamin Profile",
      "ESR (Erythrocyte Sedimentation Rate)",
      "Diabetes Screening (HbA1C & Fasting Sugar)",
      "CBC (Complete Blood Count)",
      "CRP (C-Reactive Protein), Quantitative",
      "Lipid Profile",
      "And More...",
    ],
  },
  {
    id: "foundational",
    title: "Foundational Longevity",
    price: "₹ 5000",
    period: "/test",
    popular: false,
    available: false,
    features: [
      "Metabolic Health",
      "Inflammation Markers",
      "Organ Function",
      "Hormonal & Nutritional Status",
      "Basic Cellular Health",
    ],
  },
  {
    id: "comprehensive",
    title: "Advanced Precision Longevity",
    price: "₹ 30,000",
    period: "/test",
    popular: false,
    available: false,
    features: [
      "All components of the Precision Longevity Panel",
      "Core Longevity Genes",
      "Select Pharmacogenomics (PGx)",
      "Select Nutrigenomics",
      "Select Metagenomics",
    ],
  },
  {
    id: "advanced",
    title: "Precision Longevity",
    price: "₹ 15,000",
    period: "/test",
    popular: false,
    available: false,
    features: [
      "All components of the Foundational Longevity Panel",
      "Epigenetic Age Test",
    ],
  },
];

const TestingPackages = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with comprehensive (index 1)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Scroll to comprehensive package on mobile when component mounts
    if (windowWidth > 0 && windowWidth < 768) {
      const container = document.querySelector(".packages-scroll-container");
      if (container) {
        const cardWidth = 288 + 16; // card width (w-72 = 288px) + gap (16px)
        container.scrollLeft = cardWidth; // Scroll to show comprehensive card first
      }
    }
  }, [windowWidth]);

  const isMobile = windowWidth < 768;
  const handleSelectPackage = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    if (!pkg.available) {
      setIsComingSoonOpen(true);
      return;
    }
    setSelectedPackage(pkg);
    setIsPopupOpen(true);
    console.log(`Selected package: ${packageId}`);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedPackage(null);
  };

  return (
    <section className="py-12 px-4 bg-white min-h-screen flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F1F1F] mb-2">
            Testing Packages
          </h2>
          <p className="text-sm font-medium text-[#8E8E8E] uppercase tracking-[3px]">
            TAKE THE FIRST STEP TODAY
          </p>
        </div>

        {/* Packages Grid - Desktop and Horizontal Mobile */}
        <div
          className={`${
            isMobile
              ? "flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide packages-scroll-container"
              : "grid grid-cols-1 md:grid-cols-4 gap-8"
          } w-full`}
          onScroll={
            isMobile
              ? (e) => {
                  const container = e.target;
                  const cardWidth = 288 + 16; // card width + gap
                  const scrollLeft = container.scrollLeft;
                  const newIndex = Math.round(scrollLeft / cardWidth);
                  setCurrentIndex(newIndex);
                }
              : undefined
          }
        >
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg transform-gpu ${
                pkg.popular
                  ? "border-[#5F4AFB] shadow-lg"
                  : "border-gray-200 hover:border-[#5F4AFB]/30"
              } ${
                isMobile
                  ? "flex-shrink-0 w-72 snap-center"
                  : `${
                      index === 1
                        ? "md:order-2"
                        : index === 2
                        ? "md:order-3"
                        : ""
                    }`
              }`}
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.2s ease-out, box-shadow 0.3s ease-out",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Much smaller rotation values for subtle effect
                const rotateX = (y - centerY) / 40; // Reduced from /10 to /40
                const rotateY = (x - centerX) / 40; // Reduced from /10 to /40, reversed direction

                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(2px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
              }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-0 left-0 right-0 z-10">
                  <div className="bg-[#5F4AFB] text-white text-center py-2 rounded-t-2xl text-xs font-bold uppercase tracking-wider">
                    MOST POPULAR!
                  </div>
                </div>
              )}

              <div className="p-6 h-full flex flex-col">
                {/* Package Title */}
                <div className={`mb-6 ${pkg.popular ? "mt-8" : ""}`}>
                  <div className="bg-gray-50 rounded-lg px-2 py-2 mb-4 inline-block">
                    <h3 className="text-base font-bold text-[#5F4AFB] text-left leading-tight">
                      {pkg.title}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col items-center justify-center mb-6">
                    {pkg.originalPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-[#8E8E8E] line-through">
                          {pkg.originalPrice}
                        </span>
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {pkg.discount}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#1F1F1F]">
                        {pkg.price}
                      </span>
                      <span className="text-lg text-[#8E8E8E] ml-1">
                        {pkg.period}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-[#1F1F1F] mb-4">
                    What included
                  </h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <svg
                            className="w-4 h-4 text-[#5F4AFB]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-sm text-[#1F1F1F] leading-relaxed ${
                            feature.includes("All components of the Precision Longevity Panel") ||
                            feature.includes("All components of the Foundational Longevity Panel")
                              ? "font-bold"
                              : "underline"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <div className="mt-auto">
                  <button
                    onClick={() => handleSelectPackage(pkg.id)}
                    className={`w-full py-3 px-6 rounded-full font-semibold text-base transition-all duration-300 ${
                      pkg.popular
                        ? "bg-[#5F4AFB] text-white hover:bg-[#4E3FCC]"
                        : "bg-white text-[#5F4AFB] border-2 border-[#5F4AFB] hover:bg-[#5F4AFB] hover:text-white"
                    }`}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        {isMobile && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {packages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-[#5F4AFB]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Popup */}
      <CheckoutPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        selectedPackage={selectedPackage}
      />

      {/* Coming Soon Popup */}
      {isComingSoonOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setIsComingSoonOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5F4AFB] to-[#4E3FCC] rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-[#1F1F1F] mb-3">
                Coming Soon!
              </h3>
              
              <p className="text-[#8E8E8E] mb-6 leading-relaxed">
                This package is currently under development. Were working hard to bring you the best longevity testing experience.
              </p>
              
              <button
                onClick={() => setIsComingSoonOpen(false)}
                className="w-full py-3 px-6 bg-[#5F4AFB] text-white rounded-full font-semibold text-base hover:bg-[#4E3FCC] transition-all duration-300"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestingPackages;
