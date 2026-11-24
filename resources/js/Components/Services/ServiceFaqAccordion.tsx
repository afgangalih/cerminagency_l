'use client';

import React, { useState } from 'react';
import { FaqItem } from '@/types/service';
import { ChevronDown } from 'lucide-react';

interface ServiceFaqAccordionProps {
  faqs: FaqItem[];
  serviceTitle: string;
}

export function ServiceFaqAccordion({ faqs, serviceTitle }: ServiceFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Tanya Jawab Layanan
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
            Pertanyaan Seputar Layanan {serviceTitle}
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Semua hal penting mengenai teknis alur kerja, ketentuan revisi, dan proses produksi di Cermin.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-xl border transition duration-200 overflow-hidden ${
                  isOpen ? 'border-[#01A0CA]/60 bg-blue-50/20 shadow-xs' : 'border-zinc-200/90 bg-white hover:border-zinc-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 focus:outline-hidden"
                >
                  <span className={isOpen ? 'text-[#01A0CA]' : 'text-zinc-800'}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#01A0CA] text-white' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

