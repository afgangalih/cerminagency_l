'use client';

import React from 'react';
import { Head } from '@inertiajs/react';
import { Service, ServiceNavSummary } from '@/types/service';
import { MarketingNav } from '@/Components/Marketing/MarketingNav';
import { MarketingFooter } from '@/Components/Marketing/MarketingFooter';

// Main Service Components
import { ServiceHero } from '@/Components/Services/ServiceHero';
import { ServiceScopeGrid } from '@/Components/Services/ServiceScopeGrid';
import { ServiceWorkflowSteps } from '@/Components/Services/ServiceWorkflowSteps';
import { ServiceWhyUsSplit } from '@/Components/Services/ServiceWhyUsSplit';
import { ServiceShowcaseGrid } from '@/Components/Services/ServiceShowcaseGrid';
import { ServicePricingTiers } from '@/Components/Services/ServicePricingTiers';
import { ServiceFaqAccordion } from '@/Components/Services/ServiceFaqAccordion';
import { ServiceCtaBanner } from '@/Components/Services/ServiceCtaBanner';
import { ServiceSiblingCrossSell } from '@/Components/Services/ServiceSiblingCrossSell';

// Sub-Service Dedicated Components (Persis Figma node 18:3776 & GoSocial Pattern)
import { SubServiceHero } from '@/Components/Services/SubServiceHero';
import { SubServiceClientsBanner } from '@/Components/Services/SubServiceClientsBanner';
import { SubServiceInPageNav } from '@/Components/Services/SubServiceInPageNav';
import { SubServiceDataDrivenSplit } from '@/Components/Services/SubServiceDataDrivenSplit';
import { SubServiceContentStrategySplit } from '@/Components/Services/SubServiceContentStrategySplit';
import { SubServiceDeliverablesGrid } from '@/Components/Services/SubServiceDeliverablesGrid';
import { SubServiceWorkflowAndBanner } from '@/Components/Services/SubServiceWorkflowAndBanner';
import { SubServiceTestimonials } from '@/Components/Services/SubServiceTestimonials';

interface ServiceShowPageProps {
  service: Service;
  allServices?: ServiceNavSummary[];
}

export default function ServiceShowPage({ service, allServices }: ServiceShowPageProps) {
  const pageTitle = service.meta_title || `${service.title} - Cermin Kreatif Malang`;
  const pageDescription = service.meta_description || service.description;

  // Extract clean platform name (e.g., "Instagram", "TikTok", "Facebook")
  const platformName = service.title.replace(/^Jasa\s+Kelola\s+/i, '');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
      </Head>

      <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-[#01A0CA] selection:text-white flex flex-col justify-between">
        {/* Global Marketing Navigation with Dynamic Mega Menu */}
        <MarketingNav />

        {/* Dynamic Service Sections (100% Modular Data-Driven) */}
        <main className="flex-1">
          {service.parent_slug ? (
            /* =================================================================== */
            /* SUB-SERVICE DEDICATED LAYOUT (PERSIS FIGMA NODE 18:3776)            */
            /* =================================================================== */
            <>
              {/* 1. Sub-Service Hero with multi-color platform title & Spotlight Box */}
              <SubServiceHero service={service} />

              {/* 2. Dark Navy Client Logos Band / Infinite Marquee */}
              <SubServiceClientsBanner />

              {/* 3. Sticky In-Page Navigation Bar */}
              <SubServiceInPageNav />

              {/* 4. Section 1: "Strategi Berbasis Tren & Data 🎯" (Left Text, Right Analytics Card) */}
              <SubServiceDataDrivenSplit platformName={platformName} />

              {/* 5. Section 2: "Jasa Pembuatan Konten [Platform]" (Left Phone Mockup, Right 4 Features) */}
              <SubServiceContentStrategySplit platformName={platformName} />

              {/* 6. Section 3: "Termasuk Apa Saja? ✨" (6 Deliverables White Cards) */}
              <SubServiceDeliverablesGrid platformName={platformName} serviceTitle={service.title} />

              {/* 7. Section 4: "Proses Kelola [Platform]" (3 Steps + "Metode Profesional" Banner) */}
              <SubServiceWorkflowAndBanner platformName={platformName} serviceTitle={service.title} />

              {/* [PRICING NOTE]: Disimpan aman dalam kode & database, dinonaktifkan sementara per permintaan klien */}
              {/* <ServicePricingTiers packages={service.pricing_packages} serviceTitle={service.title} /> */}

              {/* 8. Cross-Sell: Social Media Lainnya */}
              <ServiceSiblingCrossSell currentSlug={service.slug} />

              {/* 9. Real Testimonials & Case Studies */}
              <SubServiceTestimonials />

              {/* 10. Showcase / Portfolio Grid */}
              {service.showcase_items && service.showcase_items.length > 0 && (
                <ServiceShowcaseGrid items={service.showcase_items} serviceTitle={service.title} />
              )}

              {/* 11. Technical FAQ Accordion */}
              <ServiceFaqAccordion faqs={service.faqs} serviceTitle={service.title} />

              {/* 12. Pre-Footer "Don't get left behind.." CTA Banner */}
              <ServiceCtaBanner serviceTitle={service.title} />
            </>
          ) : (
            /* =================================================================== */
            /* MAIN SERVICE MASTER LAYOUT (WITH PILIHAN SOCIAL MEDIA SELECTOR)      */
            /* =================================================================== */
            <>
              {/* 1. Main Service Hero */}
              <ServiceHero service={service} />

              {/* 2. Deliverables & Scope Grid (With "Pilihan Social Media" cards if SMM) */}
              <ServiceScopeGrid scopes={service.scopes} serviceTitle={service.title} slug={service.slug} />

              {/* 3. 3-Step Collaboration SOP */}
              <ServiceWorkflowSteps steps={service.workflow_steps} />

              {/* 4. Why Us / Differentiator Split */}
              <ServiceWhyUsSplit whyUs={service.why_us_points} heroVisualType={service.hero_visual_type} />

              {/* 5. Showcase / Portfolio Grid */}
              {service.showcase_items && service.showcase_items.length > 0 && (
                <ServiceShowcaseGrid items={service.showcase_items} serviceTitle={service.title} />
              )}

              {/* [PRICING NOTE]: Disimpan aman dalam kode & database, dinonaktifkan sementara per permintaan klien */}
              {/* <ServicePricingTiers packages={service.pricing_packages} serviceTitle={service.title} /> */}

              {/* 6. Technical FAQ Accordion */}
              <ServiceFaqAccordion faqs={service.faqs} serviceTitle={service.title} />

              {/* 7. Bottom Action Banner */}
              <ServiceCtaBanner serviceTitle={service.title} />
            </>
          )}
        </main>

        {/* Global Marketing Footer */}
        <MarketingFooter />
      </div>
    </>
  );
}
