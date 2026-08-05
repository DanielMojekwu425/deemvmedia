/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Screen } from '../types';

interface HeaderProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Header({ currentScreen, setScreen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to add deep blur overlay on header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; value: Screen }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleNavClick = (screen: Screen) => {
    setScreen(screen);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-lg border-zinc-900/60 py-2 md:py-3 shadow-2xl'
          : 'bg-transparent border-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Brand Name - Spotlight Element */}
        <div className="flex items-center">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer select-none outline-none group relative"
            aria-label="Deemvmedia Home"
          >
            {/* Subtle glow background spotlight for logo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-rose-500/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <img
              src="/DeeMVMedialogolatestnobgw.png"
              alt="Deemvmedia Logo"
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.45)] group-hover:drop-shadow-[0_0_35px_rgba(56,189,248,0.7)] ${
                isScrolled ? 'h-14 sm:h-16 md:h-20 lg:h-22' : 'h-16 sm:h-20 md:h-26 lg:h-28'
              }`}
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentScreen === item.value;
            return (
              <button
                id={`nav-link-${item.value}`}
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`relative font-sans text-sm tracking-wide transition-colors duration-200 cursor-pointer pt-1 pb-1 ${
                  isActive ? 'text-white font-medium' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sky-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action CTA */}
        <div className="hidden md:flex items-center">
          <button
            id="desktop-header-cta"
            onClick={() => handleNavClick('contact')}
            className="group flex items-center gap-1 bg-white hover:bg-zinc-200 text-zinc-950 font-sans font-medium text-xs tracking-wider uppercase px-5 py-2.5 rounded-full transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg"
          >
            Start Your Project
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div id="mobile-menu-drawer" className="absolute top-full left-0 right-0 bg-zinc-950/98 backdrop-blur-lg border-b border-zinc-900 shadow-2xl py-6 px-6 animate-fadeIn">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.value}`}
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`flex items-center justify-between py-2 text-base font-sans tracking-wide border-b border-zinc-900/60 cursor-pointer text-left ${
                  currentScreen === item.value ? 'text-white font-medium pl-1' : 'text-zinc-400'
                }`}
              >
                {item.label}
                {currentScreen === item.value && (
                  <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
                )}
              </button>
            ))}
            <button
              id="mobile-header-cta"
              onClick={() => handleNavClick('contact')}
              className="mt-2 w-full flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-zinc-950 font-sans font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
