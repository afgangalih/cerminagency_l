'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { PaginatedPortfolios } from '@/types/portfolio';

interface PortfolioPaginationProps {
  portfolios: PaginatedPortfolios;
  perPage: number;
  perPageOptions: number[];
  onPageChange: (url: string | null) => void;
  onPerPageChange: (newPerPage: number) => void;
}

export function PortfolioPagination({
  portfolios,
  perPage,
  perPageOptions,
  onPageChange,
  onPerPageChange,
}: PortfolioPaginationProps) {
  const cleanLabel = (label: string) => {
    if (label.includes('Previous')) return '«';
    if (label.includes('Next')) return '»';
    return label.replace(/&laquo;|&raquo;/g, '').trim();
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Page Numbers */}
          <nav aria-label="Portfolio pagination" className="flex flex-wrap items-center gap-1.5">
            {portfolios.links.map((link, idx) => {
              const label = cleanLabel(link.label);
              const isDisabled = !link.url;

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onPageChange(link.url)}
                  className={`min-w-[36px] h-9 px-3 rounded-md text-xs sm:text-sm font-medium transition flex items-center justify-center ${
                    link.active
                      ? 'bg-[#01A0CA] text-white font-bold shadow-xs'
                      : isDisabled
                        ? 'bg-white text-zinc-300 cursor-not-allowed'
                        : 'bg-white text-zinc-600 hover:bg-zinc-100 hover:text-[#01A0CA] cursor-pointer'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Items Per Page Selector (Persis Figma) */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-500">
            <label htmlFor="portfolio-per-page" className="font-medium whitespace-nowrap">
              Items per page:
            </label>
            <div className="relative">
              <select
                id="portfolio-per-page"
                value={perPage}
                onChange={(e) => onPerPageChange(Number(e.target.value))}
                className="appearance-none bg-white border border-zinc-200 rounded-md pl-3 pr-8 py-1.5 text-xs sm:text-sm font-medium text-zinc-700 focus:border-[#01A0CA] focus:ring-1 focus:ring-[#01A0CA] cursor-pointer"
              >
                {perPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} / page
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

