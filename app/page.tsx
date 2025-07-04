// app/page.tsx
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ShowcaseSection } from '@/components/landing/ShowcaseSection';
import { FinalCTASection } from '@/components/landing/FinalCTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    // We use your 'soft-white' brand color for the background
    <div className="bg-soft-white w-full">
      <HeroSection />
      <HowItWorksSection />
      <ShowcaseSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}