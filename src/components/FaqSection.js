"use client";
import React, { useState } from "react";
import Link from "next/link";

const faq = [
  { q: "How does Immortigen work?", a: "We analyse your multi-omics data, wearable metrics, and lifestyle inputs through advanced AI algorithms to provide personalized longevity insights and recommendations." },
  { q: "How accurate are your results?", a: "Our models are built on cutting-edge research and validated datasets, providing highly accurate biological age calculations and health predictions with continuous improvements." },
  { q: "What do I do with the data?", a: "You receive personalized recommendations for diet, exercise, supplements, and lifestyle changes, along with a comprehensive dashboard to track your progress over time." },
  { q: "Is my genetic data secure?", a: "Absolutely. We use bank-level encryption, blockchain technology, and strict privacy protocols to ensure your data is completely secure and never shared without your consent." },
];

const FaqSection = () => {
  const [open, setOpen] = useState(-1);
  const [search, setSearch] = useState("");

  return (
    <section id="faq" className="bg-white text-[#1F1F1F] py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-2">FAQ</h2>
        <p className="tracking-[.15em] text-sm text-[#8E8E8E] mb-10">GET YOUR ANSWERS</p>

        <div className="relative max-w-xl mx-auto mb-12">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg className="w-5 h-5 text-[#8E8E8E]" fill="none" stroke="currentColor" strokeWidth="1.5"
                 viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"/>
            </svg>
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-full border border-[#D1D1D1]
                       focus:outline-none placeholder:text-[#8E8E8E]"
          />
        </div>
      </div>      <div className="max-w-4xl mx-auto divide-y divide-[#E5E5E5]">
        {faq.filter(f => f.q.toLowerCase().includes(search.toLowerCase())).map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="overflow-hidden">
              <button onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between py-6 text-left transition-colors duration-300 hover:text-[#5F4AFB]">
                <span className={`text-lg font-medium transition-colors duration-300 ${
                  isOpen ? 'text-[#5F4AFB]' : 'text-[#1F1F1F]'
                }`}>
                  {f.q}
                </span>
                <svg className={`w-5 h-5 transition-all duration-300 ${
                  isOpen ? "rotate-180 text-[#5F4AFB]" : "text-[#8E8E8E]"
                }`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`transition-all duration-500 ease-in-out ${
                isOpen 
                  ? 'max-h-96 opacity-100 pb-6' 
                  : 'max-h-0 opacity-0 pb-0'
              }`}>
                <div className="text-[#6B6B6B] leading-relaxed">
                  {f.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>      <div className="mt-12 flex justify-center">
        <Link href="/Faq" className="border border-[#5F4AFB] text-[#5F4AFB] rounded-full px-10 py-3
                           hover:bg-[#5F4AFB] hover:text-white transition">
          See all FAQs
        </Link>
      </div>
    </section>
  );
};

export default FaqSection;
