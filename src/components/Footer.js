'use client';

import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call - replace with your actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage('Thank you! We\'ll notify you when we launch.');
            setEmail('');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };    // Footer navigation links organized by category
    const footerLinks = {
        useful: [
            { label: "About us", href: "/About" },
            { label: "Science", href: "/science" },
            { label: "Biomarkers", href: "/biomarkers" },
        ],
        support: [
            { label: "FAQ", href: "/Faq" },
            { label: "Contact", href: "/Contact" },
            { label: "Career", href: "/Career" },
        ]
    };

    // Social media links
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://facebook.com/Immortigen",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        }, {
            name: "Instagram",
            href: "https://instagram.com/Immortigen",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: "Twitter",
            href: "https://twitter.com/Immortigen",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com/company/Immortigen",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            )
        }
    ];
    return (<footer className="bg-[#1A1A1A] text-white">
        {/* Coming Soon Section */}
        <div id="app-coming-soon" className="px-4 md:px-8 pt-20 pb-16">
            <div className="max-w-7xl mx-auto">                    <div className="border border-gray-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/60">
                {/* 3D Mesh Background */}
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#654BFF', stopOpacity: 0.8 }} />
                                <stop offset="50%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.6 }} />
                                <stop offset="100%" style={{ stopColor: '#A855F7', stopOpacity: 0.4 }} />
                            </linearGradient>
                        </defs>

                        {/* Visible mesh grid */}
                        <g stroke="url(#meshGradient)" strokeWidth="1" fill="none" opacity="0.8">
                            {/* Vertical lines */}
                            {Array.from({ length: 60 }, (_, i) => (
                                <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" />
                            ))}
                            {/* Horizontal lines */}
                            {Array.from({ length: 20 }, (_, i) => (
                                <line key={`h-${i}`} x1="0" y1={i * 20} x2="1200" y2={i * 20} />
                            ))}
                        </g>

                        {/* Grid intersection points */}
                        <g fill="url(#meshGradient)" opacity="0.4">
                            {Array.from({ length: 60 }, (_, i) =>
                                Array.from({ length: 20 }, (_, j) => (
                                    <circle
                                        key={`point-${i}-${j}`}
                                        cx={i * 20}
                                        cy={j * 20}
                                        r="0.5"
                                    />
                                ))
                            )}
                        </g>
                    </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Immortigen app coming soon...
                    </h2>
                    <p className="text-gray-300 mb-8 text-lg">
                        We&apos;re launching the app soon to help you track your data.<br />
                        Until then, join our waitlist to stay updated!
                    </p>                              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" suppressHydrationWarning={true}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 sm:py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#654BFF] text-sm sm:text-base"
                            required
                            disabled={isSubmitting}
                            suppressHydrationWarning={true}
                        />                                
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-1/2 self-center sm:self-auto sm:w-auto group px-0 sm:px-8 py-2 sm:py-3 bg-[#654BFF] hover:bg-[#5a42e6] text-white rounded-full font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden min-w-0 sm:min-w-[140px] text-sm sm:text-base"
                            suppressHydrationWarning={true}
                        >
                            <span className="group-hover:translate-x-[-12px] transition-transform duration-300 block">
                                {isSubmitting ? 'Joining...' : 'Join waitlist'}
                            </span>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 translate-x-8 group-hover:translate-x-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-[#654BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                            </div>
                        </button>
                    </form>

                    {message && (
                        <p className={`mt-4 text-sm ${message.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
            </div>
        </div>{/* Main Footer Content */}
        <div className="px-4 md:px-8 pb-12">
            <div className="max-w-7xl mx-auto">

                {/* Top section with logo and navigation links */}
                <div className="flex flex-col lg:flex-row lg:justify-between mb-12">

                    {/* Company logo and tagline */}
                    <div className="mb-10 lg:mb-0">
                        <Link href="/" className="inline-block">
                            <img
                                src="/immortigenlogo.png"
                                alt="Immortigen"
                                className="h-[74px] w-auto"
                            />
                        </Link>
                    </div>

                    {/* Navigation links */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-16 text-[#BDBDBD]">

                        {/* Useful Links column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Useful Links</h4>
                            <ul className="space-y-3">
                                {footerLinks.useful.map(({ label, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="hover:text-white transition-colors duration-200 text-sm"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Support</h4>
                            <ul className="space-y-3">
                                {footerLinks.support.map(({ label, href }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="hover:text-white transition-colors duration-200 text-sm"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Information column */}
                        <div>
                            <h4 className="font-semibold text-white mb-4">Find Us</h4>
                            <div className="space-y-3">
                                <p className="text-sm">Chennai, Tamil Nadu, India</p>
                                <a
                                    href="mailto:contact@Immortigen.com"
                                    className="hover:text-white transition-colors duration-200 text-sm block"
                                >
                                    contact@Immortigen.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section with copyright and social links */}
                <div className="border-t border-[#2E2E2E] pt-8 flex flex-col md:flex-row md:justify-between gap-6 items-center">

                    {/* Copyright */}
                    <p className="text-sm text-[#BDBDBD]">
                        Copyright © 2025 Immortigen. All rights reserved.
                    </p>

                    {/* Social media links */}
                    <div className="flex gap-4 items-center">
                        {socialLinks.map(({ name, href, icon }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#BDBDBD] hover:text-white transition-colors duration-200 p-2"
                                aria-label={`Follow us on ${name}`}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;