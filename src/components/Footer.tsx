/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, ArrowUp } from 'lucide-react';
import { Screen } from '../types';

interface FooterProps {
  setScreen: (screen: Screen) => void;
}

export default function Footer({ setScreen }: FooterProps) {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (screen: Screen) => {
    setScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-900 pt-16 pb-12 w-full text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <a href="#" onClick={handleLogoClick} className="flex items-center group">
              <span className="font-display font-bold text-2xl tracking-wider text-white select-none">
                DEEMV<span className="text-zinc-500 group-hover:text-sky-400 transition-colors">MEDIA</span>
              </span>
            </a>
          </div>
          <p className="text-zinc-400 text-sm max-w-sm mb-6 leading-relaxed">
            Where Technology, Design & Storytelling Build Exceptional Digital Experiences. Translating complex brand ideas into award-winning interfaces.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all cursor-pointer shadow" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Navigation column */}
        <div>
          <h4 className="font-display text-white font-medium text-sm tracking-widest uppercase mb-4">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('portfolio')} className="hover:text-white transition-colors cursor-pointer text-left">
                Our Work
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors cursor-pointer text-left">
                Get In Touch
              </button>
            </li>
          </ul>
        </div>

        {/* Contacts column */}
        <div>
          <h4 className="font-display text-white font-medium text-sm tracking-widest uppercase mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
              <span>
                Deemvmedia Studio, VGC<br />
                Ajah, Lagos, Nigeria
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <a href="mailto:hello@deemvmedia.com" className="hover:text-white transition-colors">
                ceo@deemvmedia.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="hover:text-white transition-colors">
                +234 904 177 1909
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-zinc-900/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          <p>© {new Date().getFullYear()} Deemvmedia LLC. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group"
          >
            Back to Top
            <ArrowUp className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
