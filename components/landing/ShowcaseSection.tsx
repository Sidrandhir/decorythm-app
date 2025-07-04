// components/landing/ShowcaseSection.tsx
import Image from 'next/image';

// TODO: Replace these with your actual before-and-after image URLs
const showcaseImages = [
  { before: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', after: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800' },
  { before: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800', after: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800' },
];

export function ShowcaseSection() {
  return (
    <section className="bg-rich-cream py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">Visualize the Possibilities</h2>
          <p className="mt-4 text-lg text-text-color-light">See real transformations powered by Decorythm.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {showcaseImages.map((image, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 shadow-elevated rounded-lg p-2 bg-pure-white">
              <Image src={image.before} alt="Before" width={400} height={400} className="rounded-md object-cover w-full h-full" />
              <Image src={image.after} alt="After" width={400} height={400} className="rounded-md object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}