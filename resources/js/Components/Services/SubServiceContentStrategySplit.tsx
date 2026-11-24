'use client';

import React from 'react';
import { Film, Search, Sparkles, Palette } from 'lucide-react';

interface SubServiceContentStrategySplitProps {
  platformName?: string;
}

export function SubServiceContentStrategySplit({ platformName = 'Instagram' }: SubServiceContentStrategySplitProps) {
  const features = [
    {
      title: 'Engaging Content',
      desc: 'Konten yang dirancang mengikuti tren visual terkini untuk mendorong interaksi, simpan, bagikan, dan percakapan organik.',
      icon: Sparkles,
    },
    {
      title: 'Riset Audiens Mendalam',
      desc: 'Riset mendalam untuk memahami karakter target pasar, pergerakan kompetitor, serta hashtag tertarget dengan jangkauan tinggi.',
      icon: Search,
    },
    {
      title: 'Reels & Video Vertikal 9:16',
      desc: 'Produksi video pendek 9:16 dinamis untuk menyampaikan pesan brand secara ringkas dan memaksimalkan jangkauan tab Reels.',
      icon: Film,
    },
    {
      title: 'Desain Berstandar Studio',
      desc: 'Desain visual feeds dan story berstandar studio yang konsisten, berkelas, dan selaras dengan identitas brand bisnis Anda.',
      icon: Palette,
    },
  ];

  return (
    <section id="content-strategy" className="py-20 sm:py-24 bg-zinc-50/60 border-b border-zinc-200/80 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column (5 Cols): Realistic Smartphone Frame Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] bg-[#121212] rounded-[38px] p-3 shadow-2xl border-4 border-zinc-800">
              
              {/* Smartphone Inner Screen */}
              <div className="bg-white rounded-[28px] overflow-hidden text-zinc-900 border border-zinc-200">
                
                {/* Status Bar */}
                <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[10px] font-bold text-zinc-800 font-mono">
                  <span>09:41</span>
                  <div className="w-16 h-3.5 bg-zinc-900 rounded-full mx-auto" />
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>5G</span>
                  </div>
                </div>

                {/* Profile Top Bar */}
                <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-100">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900">
                    <span>cerminagency</span>
                    <span className="text-[#01A0CA] text-[11px]">✓</span>
                  </div>
                  <div className="text-zinc-400 font-bold text-sm">⋮</div>
                </div>

                {/* Profile Stats */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Avatar with Cermin Blue Ring */}
                    <div className="w-14 h-14 rounded-full bg-[#01A0CA]/20 p-0.5 shadow-sm">
                      <div className="w-full h-full bg-white rounded-full p-0.5 flex items-center justify-center">
                        <img
                          src="/images/cermin-logo.png"
                          alt="Cermin Logo"
                          className="w-full h-full object-contain rounded-full"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-center font-mono">
                      <div>
                        <div className="text-xs font-bold text-zinc-900">248</div>
                        <div className="text-[9px] text-zinc-500">Posts</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900">18.4K</div>
                        <div className="text-[9px] text-zinc-500">Followers</div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900">142</div>
                        <div className="text-[9px] text-zinc-500">Following</div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-0.5 text-[11px] leading-tight">
                    <div className="font-bold text-zinc-900">Cermin Creative Agency Malang</div>
                    <div className="text-zinc-500 text-[10px]">Agency Social Media &amp; Creative Studio</div>
                    <div className="text-zinc-600 text-[10px]">Estetika Visual • Kalender 30 Hari • 4K Video</div>
                    <div className="text-[#01A0CA] font-semibold text-[10px] pt-0.5">cerminagency.com/services</div>
                  </div>

                  {/* Story Highlights Circles */}
                  <div className="flex items-center gap-2.5 pt-1 overflow-x-hidden">
                    {['Portofolio', 'Studio 4K', 'BehindScene', 'Review'].map((story, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-700">
                          {story[0]}
                        </div>
                        <span className="text-[8px] text-zinc-500 font-medium">{story}</span>
                      </div>
                    ))}
                  </div>

                  {/* 3x3 Feeds Grid with Real Studio Visuals */}
                  <div className="pt-2">
                    <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden border border-zinc-100">
                      {[
                        { img: '/images/about/studio-workspace.jpg', type: 'reel' },
                        { img: '/images/about/studio-room.jpg', type: 'carousel' },
                        { img: '/images/about/studio-team.jpg', type: 'post' },
                        { img: '/images/about/studio-room.jpg', type: 'post' },
                        { img: '/images/about/studio-workspace.jpg', type: 'reel' },
                        { img: '/images/about/studio-team.jpg', type: 'carousel' },
                        { img: '/images/about/studio-team.jpg', type: 'reel' },
                        { img: '/images/about/studio-room.jpg', type: 'post' },
                        { img: '/images/about/studio-workspace.jpg', type: 'post' },
                      ].map((item, idx) => (
                        <div key={idx} className="relative aspect-square bg-zinc-200 group overflow-hidden">
                          <img
                            src={item.img}
                            alt="Feed Thumbnail"
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                          {item.type === 'reel' && (
                            <span className="absolute top-1 right-1 text-white text-[8px] bg-black/60 px-1 py-0.5 rounded font-bold">
                              ▶
                            </span>
                          )}
                          {item.type === 'carousel' && (
                            <span className="absolute top-1 right-1 text-white text-[8px] bg-black/60 px-1 py-0.5 rounded font-bold">
                              ⧉
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): 4 Feature Boxes (Cermin Color Theme) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#01A0CA] font-mono mb-2">
                Produksi Visual &amp; Video
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight">
                Jasa Pembuatan Konten {platformName}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
              Tim profesional kami siap membantu Anda membangun identitas visual dan konten yang mendorong pertumbuhan akun secara konsisten. Tidak ada lagi konten asal posting yang sepi interaksi.
            </p>

            {/* 4 Feature Boxes in 2x2 Grid (Cermin Blue #01A0CA accents) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {features.map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#01A0CA]/50 hover:shadow-sm transition duration-200 space-y-2.5 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#01A0CA]/10 text-[#01A0CA] flex items-center justify-center font-bold group-hover:bg-[#01A0CA] group-hover:text-white transition">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-[#121212] leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
