// File: app/page.tsx
'use client';

import { HeroSection } from '@/components/landing/HeroSection';
import { BeforeAfterSlider } from '@/components/landing/BeforeAfterSlider';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { AiEdgeSection } from '@/components/landing/AiEdgeSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import { Footer } from '@/components/landing/Footer';


export default function LandingPage() {
  return (
    // The main layout file from our previous steps will handle the global Navbar and Footer.
    // This component's only job is to arrange the sections.
    <div>
      <HeroSection />
      <BeforeAfterSlider />
      <HowItWorksSection />
      <TestimonialsSection />  
      <AiEdgeSection />   
      <FinalCTASection />
      <Footer />   
      {/* More sections will be added here */}
    </div>
  );
}