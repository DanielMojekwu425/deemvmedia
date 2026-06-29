/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github, Award, Heart, Shield, Sparkles, Star } from 'lucide-react';
import { TEAM } from '../data';

export default function AboutScreen() {
  return (
    <div id="about-screen-root" className="w-full bg-zinc-950 text-white pt-28 pb-20">
      {/* Hero Header */}
      <section id="about-hero" className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 relative overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sky-400 font-mono text-[10px] tracking-widest uppercase mb-6"
          >
            <Star className="w-3 h-3 fill-sky-400" />
            Our Vision & Journey
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
          >
            Building the Future Through <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">Digital Innovation</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl text-balance"
          >
            At Deemvmedia, we build more than websites. We compile high-finesse software platforms and brand ecosystems that command market share and build strong customer trust.
          </motion.p>
        </div>
      </section>

      {/* The Manifesto / Core Pillars */}
      <section id="about-pillars" className="border-t border-zinc-900/60 bg-zinc-950/60 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                Under the Hood
              </span>
              <h2 className="font-display text-3xl font-bold text-white mt-3 mb-6"> Our Philosophy & Standards </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Our working philosophy is anchored in transparency and performance optimization. We refuse to sell template solutions.
              </p>
              <div className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-900/80">
                <blockquote className="font-sans italic text-xs text-zinc-400 leading-relaxed">
                  "Speed is a feature, beauty is a promise, and reliability is the foundation."
                </blockquote>
              </div>
            </div>

            {/* Pillar Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: 'Visual Finesse',
                  desc: 'Every layout transitions beautifully. We are obsessed with layout proportion, elegant typographic contrast, and pixel precision.'
                },
                {
                  icon: Shield,
                  title: 'Enterprise Standard Code',
                  desc: 'We write modular TypeScript, design clear schemas, and optimize bundling so systems perform without latency.'
                },
                {
                  icon: Award,
                  title: 'Strategic Narrative',
                  desc: 'We define core stories. Our copywriting frames complex developer parameters into customer benefit highlights.'
                },
                {
                  icon: Heart,
                  title: 'Human-First UX',
                  desc: 'Our interfaces are highly accessible. We design in adherence with modern accessibility rules, enabling ease of navigation.'
                }
              ].map((pillar, idx) => (
                <div key={idx} className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-2xl flex flex-col gap-4">
                  <div className="w-10 h-10 bg-zinc-900 rounded-lg border border-zinc-850 flex items-center justify-center text-sky-400">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-white font-semibold text-lg">{pillar.title}</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="about-team" className="py-24 px-6 md:px-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[10px] tracking-widest text-teal-400 uppercase font-semibold">
              The Crew
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white mt-3 mb-6">
              Meet Our Specialists
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm">
              We leverage an specialized core team of engineers, designers, and directors focused solely on delivery.
            </p>
          </div>

          <div id="team-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <div 
                id={`team-member-card-${idx}`}
                key={idx} 
                className="bg-zinc-900/30 border border-zinc-900 rounded-2xl p-6 hover:border-zinc-800 transition-all duration-350 flex flex-col group h-full"
              >
                {/* Photo container */}
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-6 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-[1.01] group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-350" />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg group-hover:text-sky-400 transition-colors duration-250">
                      {member.name}
                    </h3>
                    <div className="font-mono text-[10px] uppercase text-zinc-500 tracking-wider mb-3">
                      {member.role}
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                      {member.bio}
                    </p>
                  </div>

                  {/* Social media connections */}
                  <div className="flex gap-3 border-t border-zinc-900/60 pt-4">
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" aria-label={`${member.name} Linkedin`}>
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" aria-label={`${member.name} Twitter`}>
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a href={member.socials.github} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" aria-label={`${member.name} GitHub`}>
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Partnership Block */}
      <section id="about-partners" className="bg-zinc-950/50 py-20 border-t border-zinc-900/60 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">Flexible Delivery Frameworks</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mt-4 mb-6">Ready to Innovate Together?</h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
            We adapt directly to your internal roadmap—either embedding as an advanced visual engineering task-force or guiding your product from initial sketch to production.
          </p>
        </div>
      </section>
    </div>
  );
}
