'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Camera,
  Film,
  Info,
  LayoutGrid,
  Megaphone,
  Palette,
  Search,
  Share2,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { PortfolioCategoryItem } from '@/types/portfolio';

interface PortfolioHeaderFilterProps {
  categories: PortfolioCategoryItem[];
  activeCategory: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onClearSearch: () => void;
  onSelectCategory: (slug: string) => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Share2,
  Video,
  Palette,
  Film,
  LayoutGrid,
  Camera,
  Megaphone,
};

export function PortfolioHeaderFilter({
  categories,
  activeCategory,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  onSelectCategory,
}: PortfolioHeaderFilterProps) {
  const allRingItems = [
    {
      slug: 'all',
      label: 'Featured All Portfolio',
      iconName: 'Sparkles',
    },
    ...categories.map((cat) => ({
      slug: cat.slug,
      label: cat.short_label || cat.name,
      iconName: cat.icon_name,
    })),
  ];

  return (
    <section className="pt-10 pb-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500">
          <Link href="/" className="text-[#01A0CA] hover:underline font-semibold transition">
            Home
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="text-[#121212] font-semibold">Portfolio</span>
        </nav>

        {/* Split Title & Client Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight">
              Portofolio Cermin Kreatif
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Kami menghadirkan kreativitas visual, strategi konten terukur, dan kualitas produksi studio pada setiap proyek klien.
            </p>
          </div>

          <form onSubmit={onSearchSubmit} className="w-full md:w-[340px] shrink-0">
            <div className="flex items-stretch rounded-lg border border-zinc-200 bg-white overflow-hidden focus-within:border-[#01A0CA] focus-within:ring-2 focus-within:ring-[#01A0CA]/15 transition">
              <div className="relative flex-1 flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Cari nama klien atau proyek..."
                  className="w-full border-0 bg-transparent px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:ring-0"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={onClearSearch}
                    aria-label="Hapus pencarian"
                    className="p-1.5 mr-1 text-zinc-400 hover:text-zinc-700 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                aria-label="Cari portofolio"
                className="px-4 bg-[#01A0CA] hover:bg-[#008db3] text-white flex items-center justify-center transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Horizontal Story-Ring Category Filter (Figma Node 25:321) */}
        <div className="pt-2">
          <div className="flex items-start gap-4 sm:gap-5 overflow-x-auto pb-3 lg:grid lg:grid-cols-8 lg:gap-3 lg:overflow-visible">
            {allRingItems.map((item) => {
              const IconComp = iconMap[item.iconName] || Sparkles;
              const isActive = activeCategory === item.slug;

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => onSelectCategory(item.slug)}
                  className="group flex flex-col items-center gap-2.5 min-w-[104px] lg:min-w-0 text-center cursor-pointer focus:outline-none"
                >
                  <div
                    className={`w-[86px] h-[86px] sm:w-[92px] sm:h-[92px] rounded-full p-1 transition-all duration-200 flex items-center justify-center ${
                      isActive
                        ? 'border-[3px] border-[#01A0CA] shadow-md shadow-[#01A0CA]/15 scale-[1.02]'
                        : 'border border-[#01A0CA]/35 group-hover:border-[#01A0CA]'
                    }`}
                  >
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#01A0CA] text-white'
                          : 'bg-[#01A0CA]/10 text-[#01A0CA] group-hover:bg-[#01A0CA] group-hover:text-white'
                      }`}
                    >
                      <IconComp className="w-7 h-7 stroke-[1.75]" />
                    </div>
                  </div>

                  <span
                    className={`text-xs leading-snug transition-colors line-clamp-2 px-1 ${
                      isActive
                        ? 'font-bold text-[#01A0CA]'
                        : 'font-semibold text-[#121212] group-hover:text-[#01A0CA]'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Strip Banner (Instagram Follow) */}
        <div className="rounded-lg bg-[#01A0CA]/10 border border-[#01A0CA]/20 px-4 py-3 text-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm text-[#01A0CA]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Ikuti Instagram</span>
            <a
              href="https://instagram.com/cerminkreatif"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              @cerminkreatif
            </a>
            <span>untuk update portofolio &amp; karya studio terbaru!</span>
          </p>
        </div>
      </div>
    </section>
  );
}

