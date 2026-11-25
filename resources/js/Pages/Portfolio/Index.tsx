'use client';

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  PaginatedPortfolios,
  PortfolioCategoryItem,
  PortfolioFilters,
  PortfolioItem,
  PortfolioServiceSummary,
} from '@/types/portfolio';
import { MarketingNav } from '@/Components/Marketing/MarketingNav';
import { MarketingFooter } from '@/Components/Marketing/MarketingFooter';
import { ServiceCtaBanner } from '@/Components/Services/ServiceCtaBanner';
import { PortfolioHeaderFilter } from '@/Components/Portfolio/PortfolioHeaderFilter';
import { PortfolioGrid } from '@/Components/Portfolio/PortfolioGrid';
import { PortfolioPagination } from '@/Components/Portfolio/PortfolioPagination';
import { PortfolioStrategyCta } from '@/Components/Portfolio/PortfolioStrategyCta';
import { PortfolioDetailModal } from '@/Components/Portfolio/PortfolioDetailModal';

interface PortfolioIndexPageProps {
  portfolios: PaginatedPortfolios;
  categories: PortfolioCategoryItem[];
  services: PortfolioServiceSummary[];
  filters: PortfolioFilters;
  perPageOptions: number[];
}

export default function PortfolioIndexPage({
  portfolios,
  categories,
  services,
  filters,
  perPageOptions,
}: PortfolioIndexPageProps) {
  const [searchInput, setSearchInput] = useState<string>(filters.search || '');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const navigateWithFilters = (next: Partial<PortfolioFilters>) => {
    const query = {
      category: next.category ?? filters.category,
      search: next.search ?? searchInput,
      per_page: next.per_page ?? filters.per_page,
    };

    router.get('/portfolio', query, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  const handleSelectCategory = (slug: string) => {
    navigateWithFilters({ category: slug });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateWithFilters({ search: searchInput.trim() });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    navigateWithFilters({ search: '' });
  };

  const handlePerPageChange = (newPerPage: number) => {
    navigateWithFilters({ per_page: newPerPage });
  };

  const handlePageChange = (url: string | null) => {
    if (!url) return;
    router.visit(url, {
      preserveState: true,
      preserveScroll: false,
    });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    router.get(
      '/portfolio',
      { category: 'all', search: '', per_page: filters.per_page },
      { preserveState: true, preserveScroll: true, replace: true }
    );
  };

  const hasActiveFilter =
    filters.category !== 'all' || Boolean(filters.search && filters.search.trim() !== '');

  return (
    <>
      <Head>
        <title>Portofolio Karya &amp; Klien - Cermin Kreatif Malang</title>
        <meta
          name="description"
          content="Eksplorasi portofolio pengelolaan media sosial, produksi video vertikal Reels & TikTok 9:16, dan desain visual brand oleh Cermin Kreatif Studio Malang."
        />
      </Head>

      <div className="min-h-screen bg-white font-sans text-[#121212] selection:bg-[#01A0CA] selection:text-white flex flex-col justify-between">
        <MarketingNav />

        <main className="flex-1">
          <PortfolioHeaderFilter
            categories={categories}
            activeCategory={filters.category}
            searchQuery={searchInput}
            onSearchChange={setSearchInput}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch}
            onSelectCategory={handleSelectCategory}
          />

          <PortfolioGrid
            items={portfolios.data}
            onSelectItem={setSelectedItem}
            onResetFilters={handleResetFilters}
            hasActiveFilter={hasActiveFilter}
          />

          <PortfolioPagination
            portfolios={portfolios}
            perPage={filters.per_page}
            perPageOptions={perPageOptions}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />

          <PortfolioStrategyCta services={services} />

          <ServiceCtaBanner serviceTitle="Portofolio Karya Cermin" />
        </main>

        <MarketingFooter />

        <PortfolioDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </>
  );
}

