'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  categoryKey: string;
  thumbnail: string;
  format: string;
  stats: string;
}

export function OurWorksSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Featured (Highlight 10+)' },
    { key: 'fnb', label: 'Food & Beverage' },
    { key: 'beauty', label: 'Skincare & Klinik' },
    { key: 'lifestyle', label: 'Fashion & Lifestyle' },
    { key: 'commercial', label: 'Brand Commercial' },
  ];

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'Maven Coffee Roasters',
      category: 'Specialty Coffee & F&B',
      categoryKey: 'fnb',
      thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      format: '12 Reels + 8 Post Feed',
      stats: '142K+ Views Organik',
    },
    {
      id: 2,
      title: 'Lumen Skin Clinic',
      category: 'Estetika Medis & Beauty',
      categoryKey: 'beauty',
      thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
      format: '20 Reels Edukasi Dokter',
      stats: '89K+ Interaksi Klien',
    },
    {
      id: 3,
      title: 'Arche Streetwear & Denim',
      category: 'Urban Fashion & Lifestyle',
      categoryKey: 'lifestyle',
      thumbnail: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&auto=format&fit=crop&q=80',
      format: 'Lookbook Video 9:16',
      stats: '2.4x Kenaikan Konversi',
    },
    {
      id: 4,
      title: 'The Daily Matcha House',
      category: 'Kafe Modern & Pastry',
      categoryKey: 'fnb',
      thumbnail: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=80',
      format: '8 Reels Menu Seasonal',
      stats: '95K+ Engagement',
    },
    {
      id: 5,
      title: 'Djelajah Outdoor Living',
      category: 'Peralatan Petualang & Apparel',
      categoryKey: 'lifestyle',
      thumbnail: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
      format: 'Cinematic Drone & Macro',
      stats: 'Trending TikTok Explore',
    },
    {
      id: 6,
      title: 'Kopi Padas Nusantara',
      category: 'Roastery & Retail Beans',
      categoryKey: 'commercial',
      thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
      format: 'Company Profile & Campaign',
      stats: '350K+ Jangkauan Nasional',
    },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.categoryKey === activeCategory);

  return (
    <section id="our-works" className="py-20 md:py-28 bg-zinc-50/60 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#01A0CA] font-semibold">
            SELECTED PORTFOLIO
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#121212]">
            Our Works & Showreels
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-normal">
            Beberapa hasil karya video vertikal dan kampanye media sosial yang kami rancang bersama mitra brand di seluruh Indonesia.
          </p>
        </div>

        {/* 2-Column Layout (Figma Style: Sidebar Category on Left, Grid on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: Sidebar Category Filter */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-zinc-200/80 p-3 shadow-xs space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-3 py-1 block">
              Kategori Industri
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#121212] text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100/70'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#01A0CA]" />}
                </button>
              );
            })}
          </div>

          {/* SISI KANAN: Project Cards Grid (6 Projects) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-mono text-white font-medium">
                      {project.format}
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-white">
                      <span className="text-[10px] font-mono text-[#01A0CA] block uppercase font-semibold">
                        {project.stats}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-[#121212] group-hover:text-[#01A0CA] transition leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href="#brief-section"
                    className="w-full py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/70 text-zinc-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Minta Format Serupa</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#01A0CA]" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

