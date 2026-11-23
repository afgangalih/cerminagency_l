'use client';

import React from 'react';
import { Link } from '@inertiajs/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  QrCode,
} from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="relative bg-white text-zinc-600 border-t border-zinc-200">
      {/* ============================================================ */}
      {/* MAIN FOOTER CONTAINER                                        */}
      {/* ============================================================ */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-12">
        
        {/* 4-COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* ================= COLUMN 1: About Cermin Kreatif (span 4) ================= */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">About Cermin Kreatif</h3>
              <div className="w-10 h-[3px] bg-[#01A0CA] rounded-full mt-2" />
            </div>

            <p className="text-sm text-zinc-500 leading-relaxed text-justify sm:text-left">
              Cermin Kreatif merupakan Studio Produksi Video &amp; Retainer Agency di Indonesia yang telah membantu puluhan brand tumbuh di era digital melalui layanan komprehensif mulai dari konsultasi strategi, eksekusi syuting vertikal 9:16 sinematik hingga analisis performa, didukung tim profesional serta teknologi portal kerja terkini.
            </p>

            {/* Google Maps Container with Floating Info Card */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-200 shadow-xs h-[210px] w-full bg-zinc-100">
              {/* Actual Google Maps iframe */}
              <iframe
                title="Lokasi Cermin Kreatif Studio Malang"
                src="https://maps.google.com/maps?q=-7.9425,112.6156&z=15&output=embed&hl=id"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Google Maps Overlay Info Card */}
              <div className="absolute top-2.5 left-2.5 max-w-[215px] bg-white rounded-lg p-2.5 shadow-md border border-zinc-200/90 z-10 pointer-events-auto">
                <p className="font-bold text-[11px] text-zinc-900 truncate leading-tight">
                  Cermin Kreatif - Video Retainer
                </p>
                <p className="text-[9px] text-zinc-500 truncate mt-0.5">
                  Jl. Soekarno Hatta No. 45, Malang
                </p>
                <div className="flex items-center gap-1 mt-1 text-[10px]">
                  <span className="font-bold text-amber-600">4.9</span>
                  <span className="text-amber-500 text-xs leading-none">★★★★★</span>
                  <span className="text-zinc-400 text-[9px]">(128)</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Jl.+Soekarno+Hatta+Malang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#01A0CA] text-white text-[10px] font-semibold hover:bg-[#008db3] transition shadow-xs"
                >
                  <span>Buka di Maps</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* Operating Hours under Map */}
            <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium pt-1">
              <Clock className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
              <span>
                Online Setiap Hari:{' '}
                <strong className="font-semibold text-zinc-900">09.00 s/d 21.00 WIB.</strong>
              </span>
            </div>
          </div>

          {/* ================= COLUMN 2: Company (span 2) ================= */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Company</h3>
              <div className="w-10 h-[3px] bg-[#01A0CA] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 text-sm font-medium text-zinc-600">
              <li>
                <a href="#about" className="hover:text-[#01A0CA] transition-colors">About</a>
              </li>
              <li>
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#01A0CA] transition-colors">
                  Contact Us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#works" className="hover:text-[#01A0CA] transition-colors">Portfolio</a>
                <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider rounded uppercase bg-[#121212] text-white leading-none">
                  Update
                </span>
              </li>
              <li>
                <a href="#pricing" className="text-[#01A0CA] hover:underline font-semibold transition-colors">
                  Partnership
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#01A0CA] transition-colors">Careers</a>
              </li>
              <li className="flex items-center gap-2">
                <a href="#faq" className="hover:text-[#01A0CA] transition-colors">Blog</a>
                <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider rounded uppercase bg-blue-50 text-[#01A0CA] border border-[#01A0CA]/20 leading-none">
                  Insight
                </span>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 3: Top Services (span 3) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Top Services</h3>
              <div className="w-10 h-[3px] bg-[#01A0CA] rounded-full mt-2" />
            </div>

            <ul className="space-y-3.5 text-sm font-medium text-zinc-600">
              <li>
                <a href="#services" className="hover:text-[#01A0CA] transition-colors">
                  Social Media Management
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#01A0CA] transition-colors">
                  Instagram &amp; TikTok Feeds (9:16)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#01A0CA] transition-colors">
                  Graphic Design &amp; Feeds 3×3
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#01A0CA] transition-colors">
                  Paket Retainer Bulanan
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#01A0CA] transition-colors">
                  Studio Syuting Fisik (Malang)
                </a>
              </li>
              <li>
                <Link href="/portal" className="hover:text-[#01A0CA] transition-colors">
                  Client Review Portal SOP
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= COLUMN 4: Contact Us (span 3) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 tracking-tight">Contact Us</h3>
              <div className="w-10 h-[3px] bg-[#01A0CA] rounded-full mt-2" />
            </div>

            <div className="space-y-3 text-sm text-zinc-600">
              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-medium text-zinc-800 hover:text-[#01A0CA] transition-colors"
                >
                  0812 3456 7890 (WA)
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <a 
                  href="mailto:hello@cerminkreatif.com" 
                  className="font-medium text-zinc-800 hover:text-[#01A0CA] transition-colors"
                >
                  hello@cerminkreatif.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span className="text-zinc-600 leading-snug">
                  Studio Cermin Kreatif, Jl. Soekarno Hatta No. 45, Lowokwaru, Kota Malang, Jawa Timur, Indonesia
                </span>
              </div>
            </div>

            {/* KOMDIGI & QR Code Box */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50/70 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#01A0CA] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="leading-tight">
                  <span className="text-[8px] text-zinc-400 uppercase tracking-wider block font-sans">Registered on</span>
                  <span className="text-[12px] font-extrabold text-[#01A0CA] tracking-wide">KOMDIGI</span>
                </div>
              </div>

              <div className="px-2.5 py-2 rounded-xl border border-zinc-200 bg-white flex items-center gap-2 shadow-xs">
                <QrCode className="w-6 h-6 text-zinc-800" />
                <span className="text-[9px] font-medium text-zinc-500 leading-tight">Scan<br />Legalitas</span>
              </div>
            </div>

            {/* Official WhatsApp Card */}
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block p-3 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 transition group shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                </div>
                <div className="leading-tight min-w-0">
                  <div className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 truncate">
                    <span>Cermin Kreatif Official WhatsApp</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-sm font-bold text-zinc-900 group-hover:text-emerald-800 mt-0.5">
                    (+62) 812 3456 7890
                  </div>
                  <div className="text-[9px] text-zinc-500 mt-0.5">
                    Online Everyday 09.00 - 21.00 (GMT+7)
                  </div>
                </div>
              </div>
            </a>
          </div>

        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="mt-14 pt-6 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          
          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-3 font-medium">
            <Link href="/portal" className="hover:text-[#01A0CA] transition-colors">
              Client Area
            </Link>
            <span className="text-zinc-300">/</span>
            <a href="#about" className="hover:text-[#01A0CA] transition-colors">
              Sitemap
            </a>
            <span className="text-zinc-300">/</span>
            <a href="#faq" className="hover:text-[#01A0CA] transition-colors">
              Ketentuan Layanan
            </a>
            <span className="text-zinc-300">/</span>
            <a href="#faq" className="hover:text-[#01A0CA] transition-colors">
              Kebijakan Privasi
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-[#01A0CA] hover:border-[#01A0CA] transition shadow-2xs"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-[#01A0CA] hover:border-[#01A0CA] transition shadow-2xs"
              title="Facebook"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-[#01A0CA] hover:border-[#01A0CA] transition shadow-2xs"
              title="YouTube"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-lg border border-zinc-200 bg-white flex items-center justify-center text-zinc-500 hover:text-[#01A0CA] hover:border-[#01A0CA] transition shadow-2xs"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright & DJKI Legal Bar */}
        <div className="mt-4 pt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-zinc-400">
          <p>
            Cermin Kreatif adalah merek milik PT Cermin Kreatif Studio Media © 2026
          </p>
          <div className="flex items-center gap-1.5 text-[#01A0CA] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 fill-[#01A0CA] text-white shrink-0" />
            <span>Terdaftar pada Direktorat Jenderal Kekayaan Intelektual (DJKI).</span>
          </div>
        </div>

      </div>

      {/* Floating Bottom-Right WhatsApp Button */}
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition duration-200 group"
        title="Chat via WhatsApp"
        aria-label="Chat via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
        <span className="sr-only">WhatsApp Chat</span>
        
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none shadow-md">
          Chat Konsultasi Gratis
        </span>
      </a>
    </footer>
  );
}
