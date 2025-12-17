"use client";
import React from "react";

const AppHelpSection = () => (
  <section className="mb-[200px] px-4">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-[#1F1F1F] mb-4">How The App Helps</h2>
      <p className="text-base font-semibold text-[#8E8E8E] mb-10 tracking-[4px]">LIVE BETTER WITH Immortigen</p>
    </div>
    <div className="flex justify-center pt-10">
      <img
        src="/assets/how-the-app-helps.png"
        alt="How the app helps"
        className="w-full max-w-[840px] h-auto drop-shadow-lg"
      />
    </div>
  </section>
);

export default AppHelpSection;
