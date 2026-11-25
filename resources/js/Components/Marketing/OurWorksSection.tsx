'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PortfolioCategoryItem, PortfolioItem } from '@/types/portfolio';
import { PortfolioDetailModal } from '@/Components/Portfolio/PortfolioDetailModal';

interface OurWorksSectionProps {
  portfolios?: PortfolioItem[];
  categories?: PortfolioCategoryItem[];
}

export function OurWorksSection({ portfolios = [], categories = [] }: OurWorksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [items, setItems] = useState<PortfolioItem[]>(portfolios);
  const [categoryList, setCategoryList] = useState<PortfolioCategoryItem[]>(categories);
  const hasFetchedFallback = useRef(false);

  useEffect(() => {
    if (portfolios.length > 0) {
      setItems(portfolios);
    }
  }, [portfolios]);

  useEffect(() => {
    if (categories.length > 0) {
      setCategoryList(categories);
    }
  }, [categories]);

  // JSON fallback when rendered via HMR without full Inertia page reload
  useEffect(() => {
    if (portfolios.length === 0 && !hasFetchedFallback.current) {
      hasFetchedFallback.current = true;
      fetch('/api/portfolios/featured')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.portfolios) setItems(data.portfolios);
          if (data?.categories) setCategoryList(data.categories);
        })
        .catch(() => {
          // Silent fallback
        });
    }
  }, [portfolios.length]);

  const visibleProjects = useMemo(() => {
    const filtered =
      activeCategory === 'all'
        ? items.filter((p) => p.is_featured)
        : items.filter((p) => p.category_slug === activeCategory);

    // Fallback to top 6 active portfolios if no featured flag matched
    const source = filtered.length > 0 ? filtered : items;
    return source.slice(0, 6);
  }, [activeCategory, items]);

  const filterItems = useMemo(() => {
    const featuredCount = items.filter((p) => p.is_featured).length || items.length;
    return [
      {
        slug: 'all',
        label: 'Featured Works',
        count: Math.min(featuredCount, 6),
      },
      ...categoryList.map((cat) => ({
        slug: cat.slug,
        label: cat.short_label || cat.name,
        count: cat.portfolios_count ?? items.filter((p) => p.category_slug === cat.slug).length,
      })),
    ];
  }, [categoryList, items]);

  return (
    <section id="our-works" className="py-20 md:py-24 bg-zinc-50/70 border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#01A0CA] font-bold">
              Selected Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121212]">
              Our Works &amp; Showreels
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-normal leading-relaxed">
              Hasil karya manajemen media sosial, video vertikal 9:16, dan desain visual yang kami kerjakan bersama mitra brand di Indonesia.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-200 bg-white hover:border-[#01A0CA] hover:text-[#01A0CA] text-[#121212] text-xs font-bold shadow-2xs transition shrink-0 self-start md:self-auto"
          >
            <span>Lihat Semua Portofolio ({items.length})</span>
            <ArrowRight className="w-4 h-4 text-[#01A0CA]" />
          </Link>
        </div>

        {/* Mobile/Tablet Horizontal Filter Chips */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {filterItems.map((item) => {
            const isActive = activeCategory === item.slug;
            return (
              <button
                key={item.slug}
                type="button"
                onClick={() => setActiveCategory(item.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#01A0CA] text-white shadow-sm shadow-[#01A0CA]/25'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-[#01A0CA] hover:text-[#01A0CA]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Desktop Layout: Category Sidebar + 6 Clean Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-zinc-200/80 p-3 shadow-xs space-y-1">
            <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 px-3 py-2">
              Kategori Layanan
            </p>

            {filterItems.map((item) => {
              const isActive = activeCategory === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveCategory(item.slug)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-[#01A0CA] text-white shadow-sm shadow-[#01A0CA]/20'
                      : 'text-zinc-600 hover:text-[#01A0CA] hover:bg-[#01A0CA]/5'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md shrink-0 ${
                      isActive
                        ? 'bg-white/20 text-white font-bold'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-zinc-100 px-1">
              <Link
                href="/portfolio"
                className="w-full px-3 py-2.5 rounded-xl text-xs font-bold text-[#01A0CA] hover:bg-[#01A0CA]/5 flex items-center justify-between transition"
              >
                <span>Eksplorasi Arsip Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          {/* Project Cards Grid (Clean Image + High-Contrast Text Block Below) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedItem(project)}
                className="bg-white rounded-2xl border border-zinc-200/90 overflow-hidden shadow-2xs hover:border-[#01A0CA]/60 hover:shadow-lg transition-all duration-200 group flex flex-col cursor-pointer"
              >
                {/* Clean Image Frame (No distracting text/pills colliding over photo) */}
                <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                  <img
                    src={project.thumbnail_url}
                    alt={`${project.client_name} - ${project.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Structured High-Contrast Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#01A0CA] truncate">
                        {project.category?.short_label || project.industry}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[#121212] group-hover:text-[#01A0CA] transition leading-snug">
                      {project.client_name}
                    </h3>

                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {project.title}
                    </p>
                  </div>

                  {/* Clean Metadata Footer */}
                  <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2 text-xs">
                    <span className="text-[11px] font-medium text-zinc-600 truncate">
                      {project.metrics || project.deliverables_summary}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#01A0CA] shrink-0">
                      <span>Detail</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Reusable Interactive Portfolio Detail Modal */}
      <PortfolioDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </section>
  );
}
