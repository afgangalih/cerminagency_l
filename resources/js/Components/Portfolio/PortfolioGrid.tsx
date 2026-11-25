'use client';

import React from 'react';
import { ArrowUpRight, FolderSearch, RotateCcw } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
  onResetFilters: () => void;
  hasActiveFilter: boolean;
}

export function PortfolioGrid({
  items,
  onSelectItem,
  onResetFilters,
  hasActiveFilter,
}: PortfolioGridProps) {
  if (items.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 py-16 px-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#01A0CA]/10 text-[#01A0CA] flex items-center justify-center mx-auto">
              <FolderSearch className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-[#121212]">
                Portofolio tidak ditemukan
              </h3>
              <p className="text-sm text-zinc-500">
                Belum ada proyek yang cocok dengan kata kunci atau kategori yang dipilih.
              </p>
            </div>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Tampilkan Semua Portofolio</span>
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group bg-white rounded-xl border border-zinc-200/90 p-1.5 shadow-2xs hover:border-[#01A0CA]/60 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col"
            >
              {/* Visual Showcase Thumbnail */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100">
                <img
                  src={item.thumbnail_url}
                  alt={`${item.client_name} - ${item.title}`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Subtle Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top Right Hover Action */}
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-[#121212] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-[#01A0CA]" />
                </div>

                {/* Client & Category Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#01A0CA] font-semibold truncate">
                    {item.category?.short_label || item.category?.name || item.industry}
                  </p>
                  <h3 className="text-sm font-bold text-white leading-snug truncate">
                    {item.client_name}
                  </h3>
                  <p className="text-[11px] text-zinc-300 truncate">
                    {item.deliverables_summary}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

