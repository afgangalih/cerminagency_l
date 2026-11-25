'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import { ClientStoryItem } from '@/types/clientStory';

interface ClientStoryGridProps {
  stories: ClientStoryItem[];
  onSelectStory: (story: ClientStoryItem) => void;
}

export function ClientStoryGrid({ stories, onSelectStory }: ClientStoryGridProps) {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Centered Header (Tanpa Badge Pill, Tipografi Bersih) */}
        <div className="text-center max-w-xl mx-auto space-y-2.5">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
            Case Studies
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight leading-snug">
            Lihat bagaimana <span className="text-[#01A0CA]">Cermin</span> membantu pertumbuhan digital klien.
          </h2>
        </div>

        {/* 3x3 Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <article
              key={story.id}
              onClick={() => onSelectStory(story)}
              className="group bg-white rounded-xl border border-zinc-200/80 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.08)] hover:shadow-xl hover:border-[#01A0CA]/40 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                <img
                  src={story.cover_image_url}
                  alt={story.client_name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Client Logo & Story Excerpt */}
              <div className="p-6 flex-1 flex flex-col justify-start space-y-4">
                <div className="h-9 flex items-center">
                  <img
                    src={story.logo_url}
                    alt={`Logo ${story.client_name}`}
                    className="max-h-8 w-auto max-w-[130px] object-contain"
                  />
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed font-normal line-clamp-4">
                  {story.summary}
                </p>
              </div>

              {/* Card Action Footer */}
              <div className="px-6 py-4 border-t border-zinc-100 bg-white flex items-center justify-between">
                <span className="text-sm font-semibold text-[#01A0CA] group-hover:text-[#008db3] transition inline-flex items-center gap-1.5">
                  <span>Read story</span>
                  <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">
                    &rsaquo;
                  </span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400 truncate max-w-[140px]">
                  {story.industry}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="pt-4 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#01A0CA] hover:bg-[#008db3] text-white text-sm font-bold shadow-md shadow-[#01A0CA]/20 transition transform active:scale-95"
          >
            <span>Lihat Portfolio Lainnya</span>
            <span aria-hidden="true">&rsaquo;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

