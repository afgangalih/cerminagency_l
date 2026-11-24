'use client';

import React from 'react';

export function SubServiceInPageNav() {
  const navItems = [
    { label: 'Data-Driven', href: '#data-driven' },
    { label: 'Content Strategy', href: '#content-strategy' },
    { label: 'Features', href: '#features' },
    { label: 'Our Process', href: '#our-process' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-xs hidden md:block">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-center space-x-1 sm:space-x-4 py-3 text-xs font-semibold text-zinc-600">
          {navItems.map((item, idx) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                className="px-3 py-1.5 rounded-lg hover:text-[#01A0CA] hover:bg-zinc-100 transition"
              >
                {item.label}
              </a>
              {idx < navItems.length - 1 && (
                <span className="text-zinc-300 select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

