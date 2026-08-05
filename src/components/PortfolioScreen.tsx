/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Calendar, Building, CheckCircle, ArrowRight, X, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project, Screen } from '../types';

interface PortfolioScreenProps {
  setScreen: (screen: Screen) => void;
}

export default function PortfolioScreen({ setScreen }: PortfolioScreenProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'design' | 'branding'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  const categories: { id: 'all' | 'web' | 'design' | 'branding'; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Digital Engineering' },
    { id: 'design', label: 'Experiential Design' },
    { id: 'branding', label: 'Brand Narratives' },
  ];

  const handleLaunchSimilar = () => {
    setSelectedProject(null);
    setScreen('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="portfolio-screen-root" className="w-full bg-transparent text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest text-sky-400 uppercase font-semibold">
              The Case Diaries
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-3 mb-6">
              Ideas Brought to Life.
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Explore the digital blueprints, interfaces, and branding suites we have researched, co-piloted, and engineered for global teams.
            </p>
          </div>

          {/* Filtering row */}
          <div className="flex flex-wrap items-center gap-2 border-b border-zinc-900/40 pb-4 md:pb-0 md:border-b-0">
            {categories.map((cat) => (
              <button
                id={`filter-btn-${cat.id}`}
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-full cursor-pointer transition-all border ${
                  activeFilter === cat.id
                    ? 'bg-sky-500 border-sky-400 text-zinc-950 font-bold'
                    : 'bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div id="portfolio-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                id={`portfolio-card-${project.id}`}
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col justify-between bg-zinc-900/30 border border-zinc-900/80 rounded-2xl overflow-hidden hover:border-zinc-800 transition-all duration-300"
              >
                <div>
                  {/* Case Study Cover Image */}
                  <div className="w-full aspect-[4/3] bg-zinc-900 overflow-hidden relative cursor-pointer" onClick={() => setSelectedProject(project)}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-60 transition-all duration-300 flex items-end p-6">
                      <div className="text-xs font-mono tracking-widest text-white uppercase flex items-center gap-1.5">
                        Read Case Study
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono uppercase bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-500">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-sky-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-zinc-900/60 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">{project.category}</span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer group/btn"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Detailed View Drawer/Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div id="case-study-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
            {/* Click-outside layer */}
            <div className="hidden md:block flex-grow" onClick={() => setSelectedProject(null)} />

            {/* Slide-over panel container */}
            <div id="case-study-outer-drawer" className="w-full md:max-w-2xl bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl relative overflow-y-auto">
              
              {/* Drawer header / Controls */}
              <div className="p-6 md:p-8 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900 sticky top-0 z-10">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                    Case Narrative Study
                  </span>
                  <h2 className="font-display font-bold text-white text-lg md:text-xl line-clamp-1 mt-1">
                    {selectedProject.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer content */}
              <div className="p-6 md:p-8 space-y-8 flex-grow">
                {/* Hero preview card */}
                <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Metadata cards segment */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl flex items-center gap-3">
                    <Building className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[9px] font-mono text-zinc-500 uppercase">Client Profile</div>
                      <div className="text-xs font-semibold text-white">{selectedProject.client}</div>
                    </div>
                  </div>
                  <div className="bg-zinc-950/50 border border-zinc-850 p-4 rounded-xl flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <div className="text-[9px] font-mono text-zinc-500 uppercase">Year Delivered</div>
                      <div className="text-xs font-semibold text-white">{selectedProject.year}</div>
                    </div>
                  </div>
                </div>

                {/* Narrative prose */}
                <div className="space-y-4">
                  <h3 className="font-display text-white font-semibold text-sm tracking-wider uppercase">
                    The Challenge & Strategy
                  </h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed text-pretty">
                    {selectedProject.fullStory}
                  </p>
                </div>

                {/* Results block */}
                <div className="bg-zinc-950/60 border border-zinc-850/80 rounded-2xl p-6 space-y-4">
                  <h3 className="font-mono text-[10px] uppercase font-bold tracking-widest text-sky-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    Core Business Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {selectedProject.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tag pill overview */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-550">Tech Stack & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-1 bg-zinc-950 rounded border border-zinc-850 text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer sticky footer and CTA */}
              <div className="p-6 md:p-8 border-t border-zinc-800/80 bg-zinc-900/90 backdrop-blur sticky bottom-0 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-[10px] font-mono text-zinc-500">Impressed by these metrics?</div>
                  <div className="text-xs font-medium text-white">Let's craft your unique blueprint.</div>
                </div>
                <button
                  type="button"
                  onClick={handleLaunchSimilar}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-450 text-zinc-950 font-sans font-bold text-xs tracking-wider uppercase px-5 py-3 rounded-lg transition-colors cursor-pointer shadow-lg"
                >
                  Launch a Project Like This
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
