'use client';

// Module-level state store (add this at the very top)
let hamburgerState = false;
const hamburgerListeners = new Set();

const updateHamburgerState = (newState) => {
  hamburgerState = newState;
  hamburgerListeners.forEach(callback => callback(newState));
};

export const subscribeToHamburger = (callback) => {
  hamburgerListeners.add(callback);
  // Return current state immediately
  callback(hamburgerState);
  
  // Return unsubscribe function
  return () => hamburgerListeners.delete(callback);
};

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactPage from "./ContactUspopup";

// Navigation menu items
const nav = [
    { label: "Home", to: "/" },
    { label: "About us", to: "/About" },
    { label: "Science", to: "/Science" },
    { label: "Biomarkers", to: "/BioMarkers" },
    { label: "Career", to: "/Career" },
    { label: "Login", to: "/login" }
];

const Navbar = () => {
    const [drawer, setDrawer] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const pathname = usePathname();
    const navRefs = useRef([]);
    const [highlight, setHighlight] = useState({ left: 0, width: 0, opacity: 0 });

    // Update the setDrawer function to use our module state
    const updateDrawer = (newState) => {
        setDrawer(newState);
        updateHamburgerState(newState);
    };

    // Handle scroll background change
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Handle navbar hide/show on scroll
    useEffect(() => {
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide navbar when scrolling down past 100px
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else {
                // Show navbar when scrolling up
                setHidden(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (drawer) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [drawer]);

    // Check if current path matches nav item
    const isActive = (path) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    useEffect(() => {
        const activeIdx = nav.findIndex(({ to }) => isActive(to));
        if (activeIdx !== -1 && navRefs.current[activeIdx]) {
            const el = navRefs.current[activeIdx];
            const rect = el.getBoundingClientRect();
            const parentRect = el.parentElement.parentElement.getBoundingClientRect();
            setHighlight({
                left: rect.left - parentRect.left + rect.width / 2 - 40,
                width: 80,
                opacity: 1
            });
        } else {
            setHighlight(s => ({ ...s, opacity: 0 }));
        }
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            const activeIdx = nav.findIndex(({ to }) => isActive(to));
            if (activeIdx !== -1 && navRefs.current[activeIdx]) {
                const el = navRefs.current[activeIdx];
                const rect = el.getBoundingClientRect();
                const parentRect = el.parentElement.parentElement.getBoundingClientRect();
                setHighlight({
                    left: rect.left - parentRect.left + rect.width / 2 - 40,
                    width: 80,
                    opacity: 1
                });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [pathname]);

    return (
        <>
            <header
                className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-in-out
                      ${scrolled
                        ? "bg-white shadow-lg"
                        : "bg-white/10 backdrop-blur-md"
                    }
                      ${hidden ? "transform -translate-y-full" : "transform translate-y-0"}`}
            >
                <nav className="h-[80px] w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Logo */}
                    <Link href="/" className="flex items-center z-10" onClick={() => updateDrawer(false)}>
                        <div className="flex items-center">
                            <img
                                src="/logo.svg"
                                alt="Immortigen Logo"
                                className="h-8 md:h-10 w-auto"
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8 relative">
                        <div
                            className="absolute w-20 h-2 bg-[#654BFF] rounded-full transition-all duration-300"
                            style={{
                                transform: `translateX(${highlight.left}px)`,
                                width: highlight.width,
                                opacity: highlight.opacity,
                                bottom: '-1.95rem',
                                pointerEvents: 'none',
                            }}
                        />
                        {nav.map(({ label, to }, idx) => (
                            <li key={to} className="relative">
                                <Link
                                    href={to}
                                    ref={el => navRefs.current[idx] = el}
                                    className={`relative py-3 px-4 font-medium transition-colors duration-200
                                        ${isActive(to)
                                            ? "text-[#654BFF]"
                                            : "text-gray-700 hover:text-[#654BFF]"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Contact Us Button */}
                    <button
                        type="button"
                        className={`hidden lg:inline-flex items-center justify-center py-2 px-4 xl:px-8 rounded-full
                         font-medium transition-all duration-200 shadow-sm border-2
                         ${scrolled
                                ? "text-[#654BFF] border-[#654BFF] hover:bg-[#654BFF] hover:text-white"
                                : "text-[#654BFF] border-[#654BFF] hover:bg-[#654BFF] hover:text-white"
                            }`}
                        onClick={() => setContactOpen(true)}
                    >
                        Contact us
                    </button>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden p-2 text-gray-900 hover:text-[#654BFF] transition-colors relative z-50"
                        onClick={() => updateDrawer(!drawer)}
                        aria-label="Toggle menu"
                    >
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            {drawer ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </nav>
            </header>

            {/* Mobile drawer - Full height overlay */}
            <div
                className={`md:hidden fixed inset-0 z-20 transition-all duration-300 ease-out
                    ${drawer
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
            >
                {/* Background overlay */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => updateDrawer(false)}
                ></div>

                {/* Menu content */}
                <div
                    className={`absolute inset-x-0 top-0 h-full bg-white shadow-xl transition-transform duration-300 ease-out
                        ${drawer
                            ? "transform translate-y-0"
                            : "transform -translate-y-full"
                        }`}
                >
                    {/* Header space to avoid overlap with fixed navbar */}
                    <div className="h-[80px]"></div>

                    {/* Menu items */}
                    <div className="flex flex-col justify-center h-[calc(100vh-80px)] px-6 space-y-8">
                        {nav.map(({ label, to }) => (
                            <Link
                                key={to}
                                href={to}
                                className={`text-2xl font-medium py-4 px-4 rounded-lg transition-all duration-200 text-center
                                    ${isActive(to)
                                        ? "text-[#654BFF] bg-[#F5F3FF]"
                                        : "text-gray-700 hover:text-[#654BFF] hover:bg-gray-50"
                                    }`}
                                onClick={() => updateDrawer(false)}
                            >
                                {label}
                            </Link>
                        ))}
                        {/* Mobile Contact Button */}
                        <button
                            type="button"
                            className="mt-8 py-3 px-4 rounded-full text-[#654BFF] text-center font-medium text-xl border-[#654BFF]
                             hover:bg-[#5a42e6] hover:text-white transition-colors duration-200 shadow-lg"
                            onClick={() => { updateDrawer(false); setContactOpen(true); }}
                        >
                            Contact us
                        </button>
                    </div>
                </div>
            </div>

            {/* Contact Us Popup */}
            <ContactPage open={contactOpen} onClose={() => setContactOpen(false)} />
        </>
    );
};

export default Navbar;
