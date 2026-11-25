'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Layers, MessageCircle, X } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';

interface PortfolioDetailModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export function PortfolioDetailModal({ item, onClose }: PortfolioDetailModalProps) {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (item) {
      setActiveImage(item.thumbnail_url);
    }
  }, [item]);

  if (!item) return null;

  const gallery =
    item.gallery_images && item.gallery_images.length > 0
      ? item.gallery_images
      : [item.thumbnail_url];

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya tertarik membuat konsep konten seperti portofolio *${item.client_name}* (${item.title}).`
  )}`;

  return (
    <Dialog open={Boolean(item)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-3xl rounded-2xl bg-white border border-zinc-200 shadow-2xl overflow-hidden my-8">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left Media Preview */}
            <div className="md:col-span-6 bg-zinc-100 p-4 flex flex-col justify-between gap-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200">
                <img
                  src={activeImage || item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition shrink-0 cursor-pointer ${
                        activeImage === imgUrl
                          ? 'border-[#01A0CA]'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Project Information */}
            <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5 relative">
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup modal"
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4 pr-6">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-[#01A0CA] font-bold">
                    {item.category?.name || item.industry}
                  </p>
                  <DialogTitle className="text-xl font-extrabold text-[#121212] mt-1 leading-snug">
                    {item.client_name}
                  </DialogTitle>
                  <p className="text-sm font-semibold text-zinc-700 mt-0.5">
                    {item.title}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {item.summary}
                </p>

                <div className="grid grid-cols-1 gap-2.5 pt-2 border-t border-zinc-100 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-zinc-500 font-medium">Industri</span>
                    <span className="font-semibold text-[#121212] text-right">{item.industry}</span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-zinc-500 font-medium">Deliverables</span>
                    <span className="font-semibold text-[#121212] text-right">{item.deliverables_summary}</span>
                  </div>
                  {item.metrics && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-zinc-500 font-medium">Sorotan Hasil</span>
                      <span className="font-bold text-[#01A0CA] text-right">{item.metrics}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konsultasi Format Serupa</span>
                </a>

                {item.service_slug && (
                  <Link
                    href={`/services/${item.service_slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-zinc-200 hover:border-[#01A0CA] text-zinc-700 hover:text-[#01A0CA] text-xs font-semibold transition"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Lihat Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

