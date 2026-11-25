'use client';

import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { ClientStoryItem } from '@/types/clientStory';

interface ClientStoryModalProps {
  story: ClientStoryItem | null;
  onClose: () => void;
}

export function ClientStoryModal({ story, onClose }: ClientStoryModalProps) {
  if (!story) return null;

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Halo Tim Cermin Kreatif! Saya baru membaca studi kasus *${story.client_name}* dan ingin berdiskusi untuk kolaborasi brand kami.`
  )}`;

  return (
    <Dialog open={Boolean(story)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <DialogPanel className="w-full max-w-3xl rounded-2xl bg-white border border-zinc-200 shadow-2xl overflow-hidden my-8 relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup studi kasus"
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/90 hover:bg-zinc-100 text-zinc-700 flex items-center justify-center shadow-xs transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Cover Image */}
          <div className="relative h-52 sm:h-64 bg-zinc-100 overflow-hidden">
            <img
              src={story.cover_image_url}
              alt={story.client_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-white/80 font-semibold">
                  {story.industry}
                </p>
                <DialogTitle className="text-2xl font-extrabold text-white mt-0.5">
                  {story.client_name}
                </DialogTitle>
              </div>
              <div className="bg-white rounded-lg px-3 py-1.5 shadow-sm hidden sm:block">
                <img
                  src={story.logo_url}
                  alt={story.client_name}
                  className="h-6 w-auto max-w-[96px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm text-zinc-700 leading-relaxed">
              {story.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-zinc-100">
              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Tantangan Klien
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {story.challenge}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#01A0CA]">
                  Solusi Cermin Studio
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {story.solution}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-50 border border-zinc-200/80 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-zinc-500 block font-medium">Deliverables</span>
                <span className="font-bold text-[#121212] mt-0.5 block">{story.deliverables}</span>
              </div>
              {story.metrics && (
                <div>
                  <span className="text-zinc-500 block font-medium">Dampak Kolaborasi</span>
                  <span className="font-bold text-[#01A0CA] mt-0.5 block">{story.metrics}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs sm:text-sm font-bold transition text-center"
              >
                Diskusikan Kebutuhan Brand Anda
              </a>

              {story.service_slug && (
                <Link
                  href={`/services/${story.service_slug}`}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-zinc-200 hover:border-[#01A0CA] text-zinc-700 hover:text-[#01A0CA] text-xs sm:text-sm font-semibold transition"
                >
                  Lihat Layanan Terkait
                </Link>
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

