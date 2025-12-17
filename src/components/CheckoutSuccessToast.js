import React from "react";

export default function CheckoutSuccessToast({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="fixed top-8 right-8 z-[9999]">
      <div className="flex items-center gap-3 bg-green-100 border border-green-400 rounded-2xl px-6 py-4 shadow-lg animate-slide-in-right">
        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#22c55e" />
          <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
        </svg>
        <div className="text-green-800 font-semibold text-base">Order placed successfully!</div>
        <button onClick={onClose} className="ml-2 text-green-700 hover:text-green-900 text-lg">×</button>
      </div>
      <style jsx>{`
        @keyframes slide-in-right {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
}
