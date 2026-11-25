'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { 
  ChevronDown, 
  ArrowRight, 
  CheckCircle, 
  Target, 
  Link2, 
  Handshake, 
  Palette, 
  Video, 
  Camera, 
  Building2, 
  Menu, 
  X,
  PhoneCall,
  Info
} from 'lucide-react';
import { CerminLogo } from '@/Components/UI/CerminLogo';

type MenuType = 'services' | 'solution' | 'company' | null;

export function MarketingNav() {
  const [activeMenu, setActiveMenu] = useState<MenuType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<MenuType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (menu: MenuType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Main Sticky Navbar (Border muncul saat scroll dengan transisi halus) */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled || activeMenu !== null
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-2xs' 
            : 'bg-white/90 backdrop-blur-xs border-b border-transparent shadow-none'
        }`}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative">
          
          {/* Logo Brand */}
          <Link href="/" className="group shrink-0" onClick={() => setActiveMenu(null)}>
            <CerminLogo size="md" textColor="text-[#121212]" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-semibold text-zinc-700">
            {/* 1. Services (Mega Menu Node 6:8446) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
            >
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  activeMenu === 'services' ? 'text-[#01A0CA] bg-blue-50/70 font-bold' : 'hover:text-[#01A0CA] hover:bg-zinc-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'services' ? 'rotate-180 text-[#01A0CA]' : 'text-zinc-400'}`} />
              </button>
            </div>

            {/* 2. Solution */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('solution')}
            >
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  activeMenu === 'solution' ? 'text-[#01A0CA] bg-blue-50/70 font-bold' : 'hover:text-[#01A0CA] hover:bg-zinc-50'
                }`}
              >
                <span>Solution</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'solution' ? 'rotate-180 text-[#01A0CA]' : 'text-zinc-400'}`} />
              </button>
            </div>

            {/* 3. Company (Mega Menu Node 6:14672) */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('company')}
            >
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition ${
                  activeMenu === 'company' ? 'text-[#01A0CA] bg-blue-50/70 font-bold' : 'hover:text-[#01A0CA] hover:bg-zinc-50'
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === 'company' ? 'rotate-180 text-[#01A0CA]' : 'text-zinc-400'}`} />
              </button>
            </div>

            {/* Direct Link: Konsultasi / Brief */}
            <a 
              href="#brief-section" 
              className="px-4 py-2 rounded-lg hover:text-[#01A0CA] hover:bg-zinc-50 transition"
              onMouseEnter={() => setActiveMenu(null)}
            >
              Konsultasi
            </a>
          </nav>

          {/* Action Buttons (Right) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:text-[#01A0CA] transition"
            >
              Client Area
            </Link>

            <a
              href="#brief-section"
              className="px-6 py-2.5 rounded-xl bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold shadow-md shadow-[#01A0CA]/25 hover:shadow-lg transition transform active:scale-95"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#brief-section"
              className="px-3.5 py-1.5 rounded-lg bg-[#01A0CA] text-white text-xs font-bold shadow-xs"
            >
              Get In Touch
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:bg-zinc-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* ======================================================== */}
          {/* DESKTOP MEGA MENU DROPDOWNS (RAPIH & TERTATA, TIDAK NGELEBAR) */}
          {/* ======================================================== */}

          {/* MEGA MENU 1: SERVICES (Figma Node 6:8446) */}
          {activeMenu === 'services' && (
            <div 
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full w-[960px] bg-white border border-zinc-200 border-t-[3px] border-t-[#01A0CA] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] rounded-b-2xl overflow-hidden transition-all duration-150 z-50"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-stretch">
                
                {/* Left Side: Creative Studio Banner (Cerah, Alami, Persis Gambar 2 Referensi) */}
                <div className="w-[360px] relative overflow-hidden text-white p-7 flex flex-col justify-between shrink-0">
                  {/* Bright Natural Daylight Creative Studio Photo */}
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                    alt="Creative Studio Team Discussion"
                    className="absolute inset-0 w-full h-full object-cover scale-105"
                  />
                  {/* Soft Natural Overlay (Bright, warm daylight, no dark blue tint) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
                  
                  {/* Top: Logo Cermin & Jargon */}
                  <div className="relative z-10 space-y-4">
                    {/* Logo Cermin */}
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/images/cermin-logo.png"
                        alt="Cermin Kreatif"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 shrink-0"
                      />
                      <span className="font-bold tracking-tight text-white text-base">
                        Cermin Kreatif
                      </span>
                    </div>

                    {/* Jargon (Tanpa badge, teks bersih & elegan) */}
                    <div className="pt-1">
                      <h3 className="text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-xs">
                        Perception is Everything
                      </h3>
                      <p className="text-xs text-white/80 mt-1.5 leading-relaxed font-normal">
                        Mitra terpercaya untuk pertumbuhan digital, produksi video vertikal sinematik, dan visual brand.
                      </p>
                    </div>
                  </div>

                  {/* Bottom: How it Works Button */}
                  <div className="relative z-10 pt-6">
                    <a
                      href="#about"
                      onClick={() => setActiveMenu(null)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#01A0CA] hover:bg-[#008db3] text-white text-xs font-bold shadow-md hover:shadow-lg transition group cursor-pointer"
                    >
                      <span>How it Works</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                    </a>
                  </div>
                </div>

                {/* Right Side: Services Grid (Presisi 100%, Garis Menyatu Sempurna, Tanpa Titik) */}
                <div className="flex-1 p-7 grid grid-cols-2 gap-x-8 gap-y-4 bg-white items-start">
                  
                  {/* Top-Left: Social Media Retainer */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 h-6">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#01A0CA] text-white uppercase tracking-wider">
                        All
                      </span>
                      <h4 className="font-bold text-sm text-[#01A0CA]">
                        Social Media Retainer
                      </h4>
                    </div>

                    <ul className="space-y-1.5 text-xs font-medium text-zinc-700">
                      <li>
                        <Link 
                          href="/services/social-media-management" 
                          onClick={() => setActiveMenu(null)} 
                          className="flex items-center justify-between hover:text-[#01A0CA] transition py-1 group font-bold text-zinc-900"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform text-[#01A0CA]">Social Media Management</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#01A0CA] shrink-0" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/social-media-management" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Perencanaan Kalender Konten
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/social-media-management" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Copywriting Naskah &amp; Captions
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/social-media-management" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Pelaporan &amp; Analisis Insight
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Top-Right: Graphic Design */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 h-6">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-[#01A0CA] text-white uppercase tracking-wider">
                        All
                      </span>
                      <h4 className="font-bold text-sm text-[#01A0CA]">
                        Graphic Design
                      </h4>
                    </div>

                    <ul className="space-y-1.5 text-xs font-medium text-zinc-700">
                      <li>
                        <Link 
                          href="/services/graphic-design" 
                          onClick={() => setActiveMenu(null)} 
                          className="flex items-center justify-between hover:text-[#01A0CA] transition py-1 group font-bold text-zinc-900"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform text-[#01A0CA]">Graphic Design</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#01A0CA] shrink-0" />
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/graphic-design" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Grid Feed (3x3 Puzzle &amp; Feeds)
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/graphic-design" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Desain Cover Reels &amp; Story Template
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/services/graphic-design" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Identitas Visual &amp; Brandbook
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* PRECISE FULL-WIDTH DIVIDER (Menyatu lurus horizontal sempurna!) */}
                  <div className="col-span-2 border-t border-zinc-100 my-1" />

                  {/* Bottom-Left: Technology & Platform */}
                  <div>
                    <h5 className="font-bold text-xs text-zinc-900 mb-2.5 tracking-wide">
                      Technology &amp; Platform
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-600 font-medium">
                      <li>
                        <Link 
                          href="/portal" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Client Review Portal (SLA &lt; 24h)
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/portal" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Simulasi Grid Feed 3x3 Interaktif
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Bottom-Right: Visual & Studio (Malang) */}
                  <div>
                    <h5 className="font-bold text-xs text-zinc-900 mb-2.5 tracking-wide">
                      Visual &amp; Studio (Malang)
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-600 font-medium">
                      <li>
                        <Link 
                          href="/services/instagram-tiktok-feeds" 
                          onClick={() => setActiveMenu(null)} 
                          className="flex items-center justify-between hover:text-[#01A0CA] transition py-1 group font-bold text-zinc-900"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform text-[#01A0CA]">Instagram &amp; TikTok Feeds</span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#01A0CA] shrink-0" />
                        </Link>
                      </li>
                      <li>
                        <a 
                          href="#about" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Sesi Syuting di Studio Malang
                        </a>
                      </li>
                      <li>
                        <a 
                          href="#works" 
                          onClick={() => setActiveMenu(null)} 
                          className="block hover:text-[#01A0CA] transition py-1 hover:translate-x-0.5"
                        >
                          Commercial Photography
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* MEGA MENU 2: COMPANY (Figma Node 6:14672) */}
          {activeMenu === 'company' && (
            <div 
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full w-[470px] bg-white border border-zinc-200 border-t-[3px] border-t-[#01A0CA] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-b-2xl overflow-hidden transition-all duration-150 z-50"
              onMouseEnter={() => handleMouseEnter('company')}
              onMouseLeave={handleMouseLeave}
            >
              {/* Upper Content (Links) */}
              <div className="p-7">
                <div className="flex items-center gap-2 text-[#01A0CA] font-bold text-base mb-4">
                  <span>Tentang Perusahaan</span>
                  <Info className="w-4 h-4" />
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm text-zinc-800">
                  {/* Left Column */}
                  <ul className="space-y-2.5 font-medium text-xs">
                    <li>
                      <a href="#about" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        How it Works
                      </a>
                    </li>
                    <li>
                      <Link href="/our-clients" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        Our Clients
                      </Link>
                    </li>
                    <li>
                      <a href="#pricing" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        Partnership
                      </a>
                    </li>
                  </ul>

                  {/* Right Column */}
                  <ul className="space-y-2.5 font-medium text-xs">
                    <li>
                      <Link href="/portfolio" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        Portfolio
                      </Link>
                    </li>
                    <li>
                      <a href="#about" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#faq" onClick={() => setActiveMenu(null)} className="hover:text-[#01A0CA] transition block">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Lower Contact Box (Persis Node 6:14672) */}
              <div className="bg-[#f8fafd] border-t border-zinc-100 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                    <PhoneCall className="w-5 h-5 text-[#01A0CA]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-zinc-900 leading-tight">Hubungi Kami</h5>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Cari tahu bagaimana kami dapat membantu brand Anda.</p>
                  </div>
                </div>

                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveMenu(null)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#01A0CA] hover:bg-[#008db3] text-white font-bold text-xs transition shrink-0 shadow-xs"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* MEGA MENU 3: SOLUTION */}
          {activeMenu === 'solution' && (
            <div 
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-full w-[520px] bg-white border border-zinc-200 border-t-[3px] border-t-[#01A0CA] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-b-2xl overflow-hidden transition-all duration-150 z-50 p-6"
              onMouseEnter={() => handleMouseEnter('solution')}
              onMouseLeave={handleMouseLeave}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                  <h4 className="font-bold text-xs text-zinc-900">Solusi Berdasarkan Kebutuhan Brand</h4>
                  <span className="text-[10px] font-mono text-[#01A0CA] font-bold">SOP Terpadu</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <a href="#pricing" onClick={() => setActiveMenu(null)} className="p-3 rounded-xl border border-zinc-100 hover:border-[#01A0CA]/40 hover:bg-blue-50/30 transition block">
                    <div className="font-bold text-zinc-900 mb-1">Brand UMKM & Local Hero</div>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Paket Starter Growth: 8 Reels/TikTok + 12 Feed bulanan teratur.</p>
                  </a>
                  <a href="#pricing" onClick={() => setActiveMenu(null)} className="p-3 rounded-xl border border-zinc-100 hover:border-[#01A0CA]/40 hover:bg-blue-50/30 transition block">
                    <div className="font-bold text-zinc-900 mb-1">Scale Brand Nasional</div>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Signature Retainer: 15 Reels 4K + sesi syuting fisik studio Malang.</p>
                  </a>
                  <a href="#about" onClick={() => setActiveMenu(null)} className="p-3 rounded-xl border border-zinc-100 hover:border-[#01A0CA]/40 hover:bg-blue-50/30 transition block">
                    <div className="font-bold text-zinc-900 mb-1">Disiplin SLA Revisi 2x</div>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Audit trail transparan, bebas drama scope creep dan molor.</p>
                  </a>
                  <a href="/portal" onClick={() => setActiveMenu(null)} className="p-3 rounded-xl border border-zinc-100 hover:border-[#01A0CA]/40 hover:bg-blue-50/30 transition block">
                    <div className="font-bold text-zinc-900 mb-1">Simulator Feed & Video</div>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">Review draf 9:16 vertikal dan grid feed 3x3 sebelum tayang.</p>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ======================================================== */}
        {/* MOBILE SLIDE-DOWN DRAWER MENU                            */}
        {/* ======================================================== */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-4 pt-4 pb-8 space-y-4 shadow-xl">
            <div className="space-y-1 text-sm font-semibold text-zinc-800">
              
              {/* Services Sub-accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSubMenu(mobileSubMenu === 'services' ? null : 'services')}
                  className="w-full py-2.5 flex items-center justify-between text-left"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition ${mobileSubMenu === 'services' ? 'rotate-180 text-[#01A0CA]' : ''}`} />
                </button>
                {mobileSubMenu === 'services' && (
                  <div className="pl-4 py-2 space-y-2 text-xs text-zinc-600 bg-zinc-50 rounded-lg">
                    <Link href="/services/social-media-management" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-[#01A0CA] font-semibold">Social Media Management</Link>
                    <Link href="/services/instagram-tiktok-feeds" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-[#01A0CA] font-semibold">Instagram &amp; TikTok Feeds</Link>
                    <Link href="/services/graphic-design" onClick={() => setMobileOpen(false)} className="block py-1 hover:text-[#01A0CA] font-semibold">Graphic Design</Link>
                    <a href="#about" onClick={() => setMobileOpen(false)} className="block py-1 text-zinc-500">Studio Syuting Fisik (Malang)</a>
                  </div>
                )}
              </div>

              {/* Company Sub-accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSubMenu(mobileSubMenu === 'company' ? null : 'company')}
                  className="w-full py-2.5 flex items-center justify-between text-left"
                >
                  <span>Company</span>
                  <ChevronDown className={`w-4 h-4 transition ${mobileSubMenu === 'company' ? 'rotate-180 text-[#01A0CA]' : ''}`} />
                </button>
                {mobileSubMenu === 'company' && (
                  <div className="pl-4 py-2 space-y-2 text-xs text-zinc-600 bg-zinc-50 rounded-lg">
                    <a href="#about" onClick={() => setMobileOpen(false)} className="block py-1">Tentang Cermin</a>
                    <a href="#works" onClick={() => setMobileOpen(false)} className="block py-1">Portofolio Karya</a>
                    <a href="#faq" onClick={() => setMobileOpen(false)} className="block py-1">Blog & Panduan</a>
                    <a href="https://wa.me/6281234567890" target="_blank" className="block py-1 text-[#01A0CA]">WhatsApp Hotline</a>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <a href="#brief-section" onClick={() => setMobileOpen(false)} className="block py-2.5">
                Konsultasi Layanan
              </a>
              <Link href="/portal" onClick={() => setMobileOpen(false)} className="block py-2.5 text-zinc-600">
                Client Portal Demo
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-2.5 text-zinc-600">
                Login Client Area
              </Link>
            </div>

            <div className="pt-2">
              <a
                href="#brief-section"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-xl bg-[#01A0CA] text-white text-xs font-bold text-center block shadow-md"
              >
                Get In Touch &rarr;
              </a>
            </div>
          </div>
        )}

      </header>
    </>
  );
}
