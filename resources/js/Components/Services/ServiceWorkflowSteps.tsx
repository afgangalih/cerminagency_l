'use client';

import React from 'react';
import { WorkflowStep } from '@/types/service';
import { ArrowRight, Check } from 'lucide-react';

interface ServiceWorkflowStepsProps {
  steps: WorkflowStep[];
}

export function ServiceWorkflowSteps({ steps }: ServiceWorkflowStepsProps) {
  return (
    <section className="py-20 bg-white border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono">
            SOP &amp; Cara Kerja
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#121212] tracking-tight">
            3 Langkah Kolaborasi Terstruktur
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Alur kerja yang jelas, terukur, dan transparan dari brief awal hingga tayang di platform digital Anda.
          </p>
        </div>

        {/* 3 Steps Grid with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-zinc-50/70 rounded-2xl border border-zinc-200/80 p-8 space-y-4 hover:bg-white hover:border-[#01A0CA]/40 hover:shadow-md transition duration-300"
            >
              {/* Step Badge */}
              <div className="flex items-center justify-between">
                <span className="w-10 h-10 rounded-xl bg-[#01A0CA] text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-[#01A0CA]/25">
                  0{step.step}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                  Fase 0{step.step}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-lg text-[#121212] leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="pt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#01A0CA]">
                <Check className="w-3.5 h-3.5" />
                <span>Terintegrasi di Portal Klien</span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

