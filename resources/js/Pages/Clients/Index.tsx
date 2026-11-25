'use client';

import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { ClientLogoItem, ClientStoryItem } from '@/types/clientStory';
import { MarketingNav } from '@/Components/Marketing/MarketingNav';
import { MarketingFooter } from '@/Components/Marketing/MarketingFooter';
import { ServiceCtaBanner } from '@/Components/Services/ServiceCtaBanner';
import { ClientHero } from '@/Components/Clients/ClientHero';
import { ClientStoryGrid } from '@/Components/Clients/ClientStoryGrid';
import { ClientStoryModal } from '@/Components/Clients/ClientStoryModal';
import { ClientDiverseExperience } from '@/Components/Clients/ClientDiverseExperience';

interface ClientsIndexPageProps {
  stories: ClientStoryItem[];
  logos: ClientLogoItem[];
}

export default function ClientsIndexPage({ stories, logos }: ClientsIndexPageProps) {
  const [selectedStory, setSelectedStory] = useState<ClientStoryItem | null>(null);

  return (
    <>
      <Head>
        <title>Our Clients &amp; Case Studies - Cermin Kreatif Malang</title>
        <meta
          name="description"
          content="Pelajari bagaimana Cermin Kreatif Studio Malang membantu berbagai brand, institusi, dan bisnis bertumbuh melalui strategi media sosial dan produksi konten visual."
        />
      </Head>

      <div className="min-h-screen bg-white font-sans text-[#121212] selection:bg-[#01A0CA] selection:text-white flex flex-col justify-between">
        <MarketingNav />

        <main className="flex-1">
          <ClientHero />

          <ClientStoryGrid stories={stories} onSelectStory={setSelectedStory} />

          <ClientDiverseExperience logos={logos} />

          <ServiceCtaBanner serviceTitle="Kolaborasi Klien Cermin" />
        </main>

        <MarketingFooter />

        <ClientStoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
      </div>
    </>
  );
}

