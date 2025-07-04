// components/landing/HeroSection.tsx
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="bg-rich-cream py-20 sm:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">
          Redesign Your Space, <span className="text-accent">Reimagine Your Life.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-text-color-light">
          Upload a photo of any room and let our advanced AI generate stunning, photorealistic redesigns in any style imaginable. Your dream home is just a click away.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/generate"
            className="bg-primary text-pure-white font-bold py-3 px-8 rounded-md hover:bg-warm-gray shadow-elevated transition-all duration-fast"
          >
            Transform Your Room Now
          </Link>
          <Link href="#how-it-works" className="font-semibold text-text-color leading-6">
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}