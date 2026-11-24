'use client';

import React from 'react';
import { Quote } from 'lucide-react';

export function SubServiceTestimonials() {
  const testimonials = [
    {
      quote:
        'Cermin membantu kami mengelola berbagai kanal media sosial dengan kalender konten terstruktur, visual brand yang sangat berkelas, dan komunikasi yang responsif.',
      author: 'Gabriel Rey',
      role: 'CEO Triv Indonesia',
      avatarText: 'GR',
    },
    {
      quote:
        'Overall desain visual dan eksekusi content plan dari tim Cermin sangat memuaskan. Tone of voice selaras dengan karakter brand kami dan laporan insight sangat transparan.',
      author: 'Ratna',
      role: 'Bizdev Manager, Fujifilm Indonesia',
      avatarText: 'RN',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-zinc-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Clean Typography, No Pill Badges) */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            Testimoni &amp; Reputasi
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
            Kepercayaan Nyata Klien Cermin
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed font-normal">
            Pengalaman kolaborasi nyata dari para pemegang keputusan bisnis dan brand terkemuka di Indonesia.
          </p>
        </div>

        {/* 2 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-zinc-50 rounded-2xl border border-zinc-200/90 p-7 sm:p-8 flex flex-col justify-between space-y-6 relative hover:border-[#01A0CA]/40 hover:shadow-sm transition"
            >
              <Quote className="w-8 h-8 text-[#01A0CA]/25 absolute top-6 right-6" />

              <p className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed italic font-normal relative z-10">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-zinc-200/70">
                <div className="w-10 h-10 rounded-full bg-[#01A0CA] text-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#121212] leading-snug">
                    {item.author}
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
