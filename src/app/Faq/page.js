'use client';

import React, { useState } from 'react';
import Image from "next/image";
import heroImg from '../../../public/assets/hero-img.png';

// FAQ data
const sampleFaq = {
    General: [
        {
            question: 'How does Immortigen work?',
            answer: 'Immortigen analyzes your genetic and lifestyle data to provide personalized longevity insights. Our advanced algorithms process multiple data points including genetic markers, biomarkers, and lifestyle factors to create a comprehensive profile.',
        },
        {
            question: 'How accurate are your results?',
            answer: 'We use validated scientific models with accuracy rates of 85-95% depending on the prediction type. However, outcomes may vary based on individual differences and environmental factors.',
        },
        {
            question: 'What do I do with the data?',
            answer: 'Use the insights to make better health and lifestyle decisions. You can also share them with your healthcare provider to create a more personalized treatment plan.',
        },
        {
            question: 'How does Immortigen work?',
            answer: 'Our platform uses cutting-edge AI and machine learning to analyze your unique biological data and provide actionable insights for longevity optimization.',
        },
    ],
    Application: [
        {
            question: 'Is there a mobile app available?',
            answer: 'Yes, you can access our platform on both iOS and Android. The mobile app offers full functionality including data tracking, insights viewing, and coach communication.',
        },
        {
            question: 'What features are available in the app?',
            answer: 'The app includes real-time data tracking, personalized recommendations, progress monitoring, and direct access to health coaches.',
        },
    ],
    Personalisation: [
        {
            question: 'How personalized are the recommendations?',
            answer: 'Highly personalized based on your genetic, biomarker, and lifestyle data. Each recommendation is tailored to your unique biological profile and health goals.',
        },
        {
            question: 'Can recommendations change over time?',
            answer: 'Yes, as we gather more data about your progress and lifestyle changes, our recommendations become increasingly personalized and accurate.',
        },
    ],
    Interaction: [
        {
            question: 'Can I talk to a health coach?',
            answer: 'Yes, our platform provides optional 1-on-1 coaching with certified wellness professionals who specialize in longevity and personalized health optimization.',
        },
        {
            question: 'Do recommendations update over time?',
            answer: 'Yes, your plan adapts based on your latest data and behavior patterns. Our AI continuously learns from your progress to refine recommendations.',
        },
    ],
    Privacy: [
        {
            question: 'Is my data safe?',
            answer: 'Absolutely. We follow industry best practices for encryption, use secure cloud infrastructure, and never sell your personal data to third parties.',
        },
        {
            question: 'Can I delete my data?',
            answer: 'Yes, you have full control and can delete your data at any time from your account settings. We respect your right to data portability and deletion.',
        },
    ],
    Subscriptions: [
        {
            question: 'Is there a free trial?',
            answer: 'Yes, we offer a 7-day free trial with access to all features including genetic analysis, personalized recommendations, and coach consultations.',
        },
        {
            question: 'What happens after the trial ends?',
            answer: 'You can choose a monthly or yearly plan. Your data remains safe even if you cancel, and you can reactivate anytime to continue your longevity journey.',
        },
    ],
};

const SearchIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ChevronDown = ({ className, size = 24 }) => (
  <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function FaqPage() {
  const categories = Object.keys(sampleFaq);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaqs = sampleFaq[activeCategory].filter(({ question }) =>
    question.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImg.src})`,
            zIndex: 0,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-bold font-manrope mb-6 text-gray-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="max-w-3xl font-inter font-medium text-lg md:text-xl text-gray-700 leading-relaxed">
            These are the most commonly asked questions about Immortigen. 
            Can&apos;t find what you&apos;re looking for? Chat to our friendly team!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Category Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 lg:hidden">Categories</h3>
              <div className="flex flex-wrap gap-3 lg:flex-col lg:space-y-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setOpenIndex(null);
                      setSearch('');
                    }}
                    className={`px-6 py-3 rounded-full text-sm lg:text-base font-medium transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5 ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-10">
              <div className="relative max-w-2xl">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-6 py-4 pl-14 pr-6 text-gray-700 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <SearchIcon />
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <ChevronDown
                          className={`transition-transform duration-300 text-gray-400 ${
                            openIndex === idx ? 'rotate-180 text-blue-600' : ''
                          }`}
                          size={24}
                        />
                      </div>
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gray-100 mb-4"></div>
                        <p className="text-gray-600 leading-relaxed text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <SearchIcon />
                  </div>
                  <p className="text-gray-500 text-lg">No FAQs found for {search} in {activeCategory}</p>
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search or browse other categories</p>
                </div>
              )}
            </div>

            {/* Additional Help Section */}
            {filteredFaqs.length > 0 && (
              <div className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our friendly team is here to help you on your longevity journey
                  </p>
                  <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
