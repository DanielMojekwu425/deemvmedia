/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Layout,
  Compass,
  Sparkles,
  Fingerprint,
  TrendingUp,
  Shield,
  Settings,
  CheckCircle2,
  Code2,
  LineChart,
  MousePointerClick
} from 'lucide-react';
import { SERVICES } from '../data';
import { Screen, Service } from '../types';
import Background3D from './Background3D';

// Map icon name strings to Lucide components
const ICON_MAP = {
  Layout: Layout,
  Compass: Compass,
  Sparkles: Sparkles,
  Fingerprint: Fingerprint,
  TrendingUp: TrendingUp,
  Shield: Shield
};

interface HomeScreenProps {
  setScreen: (screen: Screen) => void;
}

export default function HomeScreen({ setScreen }: HomeScreenProps) {
  // Configurator state variables
  const [selectedServices, setSelectedServices] = useState<string[]>(['Digital Engineering']);
  const [targetTimeline, setTargetTimeline] = useState<number>(3); // months
  const [currentVibe, setCurrentVibe] = useState<'bold' | 'minimalist' | 'editorial' | 'technical'>('minimalist');

  const toggleConfigService = (serviceTitle: string) => {
    if (selectedServices.includes(serviceTitle)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serviceTitle));
      }
    } else {
      setSelectedServices([...selectedServices, serviceTitle]);
    }
  };

  // Compute stats on the configured choice
  const computeFocusScore = (dimension: 'tech' | 'design' | 'story') => {
    let base = 30;

    // Impact of services
    if (selectedServices.includes('Digital Engineering') && dimension === 'tech') base += 40;
    if (selectedServices.includes('Experiential UI/UX') && dimension === 'design') base += 45;
    if (selectedServices.includes('Brand Storytelling') && dimension === 'story') base += 40;
    if (selectedServices.includes('Strategic Architecture') && dimension === 'tech') base += 25;
    if (selectedServices.includes('Strategic Architecture') && dimension === 'story') base += 15;
    if (selectedServices.includes('Marketing & SEO Growth') && dimension === 'tech') base += 15;
    if (selectedServices.includes('Marketing & SEO Growth') && dimension === 'story') base += 20;
    if (selectedServices.includes('Secure Performance') && dimension === 'tech') base += 35;

    // Vibe modifiers
    if (currentVibe === 'minimalist') {
      if (dimension === 'design') base += 10;
      if (dimension === 'tech') base += 5;
    } else if (currentVibe === 'bold') {
      if (dimension === 'story') base += 15;
      if (dimension === 'design') base += 5;
    } else if (currentVibe === 'editorial') {
      if (dimension === 'story') base += 20;
    } else if (currentVibe === 'technical') {
      if (dimension === 'tech') base += 20;
    }

    // Timeline modifier
    if (targetTimeline < 2) {
      if (dimension === 'tech') base -= 5;
    } else if (targetTimeline > 5) {
      base += 5;
    }

    return Math.min(100, Math.max(15, base));
  };

  const techScore = computeFocusScore('tech');
  const designScore = computeFocusScore('design');
  const storyScore = computeFocusScore('story');

  return (
    <div id="home-screen-root" className="w-full">
      {/* Hero Section with 3D canvas and bgimage visible */}
      <section
        id="home-hero-section"
        className="relative min-h-screen bg-zinc-950/30 flex items-center justify-center pt-32 pb-16 overflow-hidden px-6 md:px-12"
      >
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25" />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
        
        {/* 3D Reactive Background */}
        <Background3D />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center pointer-events-none">
          {/* Accent tag badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 font-mono text-[10px] tracking-widest uppercase mb-6 pointer-events-auto"
          >
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-pulse" />
            Deemvmedia & Co. Digital Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-8 max-w-4xl leading-[1.08] text-balance"
          >
            Where <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">Software Solutions & Enterprise Media Production</span> Build Exceptional Digital Experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 text-balance"
          >
            We co-pilot digital products, visual systems, and bespoke web engineering that transform baseline metrics and anchor real-world authority.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center pointer-events-auto"
          >
            <button
              onClick={() => setScreen('portfolio')}
              className="group flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-zinc-950 px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wide transition-all duration-300 shadow-xl shadow-sky-500/10 cursor-pointer"
            >
              Explore Our Work
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setScreen('contact')}
              className="bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 hover:border-zinc-700 px-8 py-4 rounded-full font-sans text-sm tracking-wide transition-all duration-300 cursor-pointer"
            >
              Book Discovery Session
            </button>
          </motion.div>

          {/* Scroll directive indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 flex flex-col items-center gap-2 font-mono text-[9px] tracking-widest uppercase text-zinc-500 hover:text-zinc-300 transition-colors pointer-events-none"
          >
            <span>DISCOVER THE METHODOLOGY</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-sky-500 to-transparent animate-bounce mt-1" />
          </motion.div>
        </div>
      </section>

      {/* Agency Stats Segment */}
      <section id="agency-stats-section" className="bg-zinc-950/60 backdrop-blur-md border-y border-zinc-900/60 py-16 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: '150+', label: 'Products Launched' },
            { value: '99.9%', label: 'Average SLA Uptime' },
            { value: '18+', label: 'Industry Awards' },
            { value: '54M+', label: 'Audience Peak Reach' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="font-display font-medium text-4xl sm:text-5xl text-white tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-grid-section" className="bg-zinc-950/50 backdrop-blur-md py-24 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center md:text-left mb-16 max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest text-sky-500 uppercase font-semibold">
              Bespoke Capability Suites
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mt-3 mb-6">
              Our Core Expertise
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We focus heavily on precision, skipping bloated agency layers to pair strategic engineering lead programmers directly with digital directors.
            </p>
          </div>

          <div id="services-cards-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((srv, idx) => {
              const IconComponent = ICON_MAP[srv.iconName];
              return (
                <div
                  id={`service-card-${idx}`}
                  key={idx}
                  className="bg-zinc-900/40 hover:bg-zinc-900/70 border border-zinc-900/80 hover:border-zinc-800 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Icon frame */}
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-sky-400 mb-6 group-hover:text-white group-hover:bg-sky-500/10 group-hover:border-sky-500/20 transition-all duration-300">
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                    </div>
                    <h3 className="font-display text-white font-semibold text-lg mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                      {srv.description}
                    </p>
                  </div>

                  <ul className="space-y-2 border-t border-zinc-800/60 pt-4">
                    {srv.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-[11px] text-zinc-500 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive brief planner section: "Experience the Deemv Effect" */}
      <section id="brief-planner-section" className="bg-zinc-950/50 backdrop-blur-md pb-28 pt-8 px-6 md:px-12 relative z-20 overflow-hidden">
        {/* Subtle decorative visual elements */}
        <div className="absolute top-1/2 left-full w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full bg-rose-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto bg-zinc-900/30 border border-zinc-900 rounded-3xl p-8 md:p-14 relative z-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Planner Narrative */}
            <div className="lg:col-span-5">
              <span className="font-mono text-[9px] tracking-widest text-indigo-400 uppercase bg-zinc-900/60 border border-zinc-800/80 px-2.5 py-1 rounded inline-block mb-4">
                Interactive Planner
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
                Benchmark Your Digital Initiative
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                Tweak services, desired timelines, and digital vibes below to immediately map your solution profile. Experience how we balance speed and aesthetics.
              </p>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                    Project Vibe Preference
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'minimalist', label: 'Classic Minimalist' },
                      { id: 'bold', label: 'Bold High-Contrast' },
                      { id: 'editorial', label: 'Editorial Story' },
                      { id: 'technical', label: 'Technical Precision' }
                    ].map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setCurrentVibe(v.id as any)}
                        className={`px-3 py-2 text-[11px] font-medium rounded-lg text-center cursor-pointer transition-all border ${currentVibe === v.id
                            ? 'bg-sky-500/10 border-sky-500/40 text-sky-400'
                            : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
                          }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-2">
                    <span className="uppercase tracking-wider">Target Timeline</span>
                    <span className="text-white">{targetTimeline} Months</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    step={1}
                    value={targetTimeline}
                    onChange={(e) => setTargetTimeline(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-650 mt-1">
                    <span>Rapid (1M)</span>
                    <span>Quarterly (3M)</span>
                    <span>Multi-Phase (6M)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Configurator Matrix Box */}
            <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800/60 p-6 md:p-8 rounded-2xl shadow-xl">
              <h4 className="font-display font-medium text-white text-base mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-400 animate-spin-slow" />
                Select Focus Spheres
              </h4>
              <p className="text-[11px] text-zinc-500 mb-6">Select all strategic components that match your design outline.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {SERVICES.map((s, idx) => {
                  const isChecked = selectedServices.includes(s.title);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleConfigService(s.title)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${isChecked
                          ? 'bg-zinc-950 border-sky-500/30 text-white'
                          : 'bg-zinc-900/30 border-zinc-800/60 text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                        }`}
                    >
                      <div className={`w-4 h-4 rounded mt-1 flex items-center justify-center border transition-all ${isChecked
                          ? 'bg-sky-500 border-sky-500 text-zinc-950'
                          : 'border-zinc-700 bg-transparent'
                        }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="text-xs font-medium">{s.title}</div>
                        <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{s.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* LIVE SCOPE METERS */}
              <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 space-y-4">
                <h5 className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-400 mb-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Calculated Strategic Allocation
                </h5>

                {/* Tech focus meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1"><Code2 className="w-3 h-3 text-sky-400" /> Engineering Depth</span>
                    <span className="text-white">{techScore}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${techScore}%` }} />
                  </div>
                </div>

                {/* Design focus meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3 text-indigo-400" /> Experiential Design Weight</span>
                    <span className="text-white">{designScore}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 transition-all duration-500" style={{ width: `${designScore}%` }} />
                  </div>
                </div>

                {/* Brand / Storytelling focus meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                    <span className="flex items-center gap-1"><LineChart className="w-3 h-3 text-rose-400" /> Messaging & Resonance</span>
                    <span className="text-white">{storyScore}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 transition-all duration-500" style={{ width: `${storyScore}%` }} />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-850/60 pt-6">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500">Estimates are based on initial complexity indices.</p>
                </div>
                <button
                  type="submit"
                  onClick={() => setScreen('contact')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-lg transition-all cursor-pointer shadow-lg"
                >
                  Generate Agency Pitch
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative block */}
      <section id="homepage-narrative-section" className="bg-zinc-950/60 backdrop-blur-md py-24 border-t border-zinc-900/40 relative z-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-300 leading-relaxed max-w-4xl mx-auto">
            "Design isn't just decoration. It is how you claim space. When backed by flawless software architectures, design becomes an absolute force multiplier for digital success."
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="w-10 h-[1px] bg-zinc-700" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-zinc-500">Deemvmedia Principles</span>
            <span className="w-10 h-[1px] bg-zinc-700" />
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="home-cta-block-section" className="bg-zinc-950/60 backdrop-blur-md py-24 border-t border-zinc-900/60">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-6 tracking-tight">Ready to Build Your Digital Legacy?</h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Let's outline your ideas, draft user flow concepts, and execute high-performance engineering tailored to your industry.
          </p>
          <button
            onClick={() => setScreen('contact')}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-zinc-950 px-8 py-4 rounded-full font-sans font-medium text-sm tracking-wide transition-all shadow-xl shadow-sky-500/10 cursor-pointer"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
