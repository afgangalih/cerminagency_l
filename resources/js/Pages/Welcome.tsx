import React from 'react';
import { Head } from '@inertiajs/react';
import { AgencyProvider } from '@/context/AgencyContext';
import { MarketingNav } from '@/Components/Marketing/MarketingNav';
import { HeroSection } from '@/Components/Marketing/HeroSection';
import { HighlightBlueSection } from '@/Components/Marketing/HighlightBlueSection';
import { AboutAgencySection } from '@/Components/Marketing/AboutAgencySection';
import { ClientsMarqueeSection } from '@/Components/Marketing/ClientsMarqueeSection';
import { OurWorksSection } from '@/Components/Marketing/OurWorksSection';
import { OurServicesDarkSection } from '@/Components/Marketing/OurServicesDarkSection';
import { PricingSection } from '@/Components/Marketing/PricingSection';
import { TestimonialsMetricsSection } from '@/Components/Marketing/TestimonialsMetricsSection';
import { PreFooterCtaSection } from '@/Components/Marketing/PreFooterCtaSection';
import { BriefFormSection } from '@/Components/Marketing/BriefFormSection';
import { FaqSection } from '@/Components/Marketing/FaqSection';
import { MarketingFooter } from '@/Components/Marketing/MarketingFooter';

export default function Welcome() {
  return (
    <AgencyProvider>
      <Head title="Cermin Kreatif — Studio Produksi Video & Retainer Agensi Indonesia" />
      <main className="flex-1 flex flex-col bg-white min-h-screen selection:bg-[#01A0CA] selection:text-white">
        {/* 1. Top Alert Announcement & Sticky Navigation */}
        <MarketingNav />

        {/* 2. Hero Section (Split Layout + 9:16 Reels Floating Mockup) */}
        <HeroSection />

        {/* 3. Blue Highlight Banner (#01A0CA) */}
        <HighlightBlueSection />

        {/* 4. About Us & Video Studio Showcase (Malang) */}
        <AboutAgencySection />

        {/* 5. Diverse Experience - Client Brand Marquee (3 Rows Infinite Animation) */}
        <ClientsMarqueeSection />

        {/* 6. Our Works (Category Sidebar + 6 Vertical Video Cards 9:16) */}
        <OurWorksSection />

        {/* 7. Our Services (Dark Section #121212) */}
        <OurServicesDarkSection />

        {/* 8. Retainer Packages & Transparent Pricing */}
        <PricingSection />

        {/* 9. Client Testimonials & Big Metrics Ribbon (94% Retensi & 18.2 Jam SLA) */}
        <TestimonialsMetricsSection />

        {/* 10. Pre-Footer Dark CTA Banner & As Seen On Media */}
        <PreFooterCtaSection />

        {/* 11. Interactive Brief Form & Instant Invoice Generator */}
        <BriefFormSection />

        {/* 12. Frequently Asked Questions (FAQ) */}
        <FaqSection />

        {/* 13. Mega Platform Dark Footer */}
        <MarketingFooter />
      </main>
    </AgencyProvider>
  );
}
