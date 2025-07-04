// components/landing/FinalCTASection.tsx
import Link from 'next/link';

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-32 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">Ready to See Your Future Home?</h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-text-color-light">Your first three designs are on us. Sign up today and start creating the space you've always wanted.</p>
        <div className="mt-10">
          <Link href="/signup" className="bg-accent text-primary font-bold py-4 px-10 rounded-md hover:shadow-gold-glow text-lg transition-all duration-fast">
            Start Your Free Trial
          </Link>
        </div>
      </div>
    </section>
  );
}