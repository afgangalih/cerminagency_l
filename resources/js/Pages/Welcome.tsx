import React from 'react';
import { Head } from '@inertiajs/react';
import { AgencyProvider } from '@/context/AgencyContext';
import { MarketingNav } from '@/Components/Marketing/MarketingNav';
import { HeroSection } from '@/Components/Marketing/HeroSection';
import { BrandMarquee } from '@/Components/Marketing/BrandMarquee';
import { AppShowcaseSection } from '@/Components/Marketing/AppShowcaseSection';
import { PillarsSection } from '@/Components/Marketing/PillarsSection';
import { FeatureDeepDivesSection } from '@/Components/Marketing/FeatureDeepDivesSection';
import { ShowreelGrid } from '@/Components/Marketing/ShowreelGrid';
import { UseCasesSection } from '@/Components/Marketing/UseCasesSection';
import { IntegrationsSection } from '@/Components/Marketing/IntegrationsSection';
import { PricingSection } from '@/Components/Marketing/PricingSection';
import { FaqSection } from '@/Components/Marketing/FaqSection';
import { FinalCtaSection } from '@/Components/Marketing/FinalCtaSection';
import { BriefFormSection } from '@/Components/Marketing/BriefFormSection';
import { MarketingFooter } from '@/Components/Marketing/MarketingFooter';

    export default function Welcome() {
        return (
                            <AgencyProvider>
                                <Head title="Cermin Kreatif — Video Production & Social Media Retainer Platform" />
                                <main className="flex-1 flex flex-col bg-white min-h-screen">
                                    {/* 1. Top Navigation */}
                                    <MarketingNav />

                                                {/* 2. Hero Section */}
                                                <HeroSection />

                                                        {/* 3. Trusted By Logo Marquee */}
                                                        <BrandMarquee />

                                                            {/* 4. Interactive Browser Mockup / App Showcase */}
                                                            <AppShowcaseSection />

                                                    {/* 5. 6 Core Feature Pillars & Scaled Quote */}
                                                    <PillarsSection />

                                            {/* 6. Feature Deep Dives & Client Testimonials */}
                                            <FeatureDeepDivesSection />

                                                {/* 7. Actual Video Production Showreels (Studio Malang) */}
                                                <ShowreelGrid />

                                                    {/* 8. Use Cases by Agency & Brand Type */}
                                                    <UseCasesSection />

                                                {/* 9. 1,000s of Cloud Integrations */}
                                                <IntegrationsSection />

                                            {/* 10. Clear Fair Pricing with Monthly/Annual Toggle */}
                                            <PricingSection />

                                                {/* 11. Frequently Asked Questions Accordion */}
                                                <FaqSection />

                                                    {/* 12. Switch in Days CTA Banner */}
                                                    <FinalCtaSection />

                                                {/* 13. Onboarding Brief & Proforma Invoice Generator */}
                                                <BriefFormSection />

                {/* 14. Full Platform Footer */}
                <MarketingFooter />
            </main >
        </AgencyProvider >
    );
    }
