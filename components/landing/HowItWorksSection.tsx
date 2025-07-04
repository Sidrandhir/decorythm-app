// components/landing/HowItWorksSection.tsx
const steps = [
  { number: '01', title: 'Upload Your Photo', description: 'Take a clear picture of the room you want to transform. Good lighting helps our AI see every detail.' },
  { number: '02', title: 'Define Your Vision', description: 'Choose from dozens of styles like Modern, Minimalist, or Bohemian. Tell our AI what you dream of.' },
  { number: '03', title: 'Generate & Refine', description: 'Receive multiple high-quality design concepts in seconds. Love a design? Save it and start your project.' },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">Effortless Transformation in Three Steps</h2>
          <p className="mt-4 text-lg text-text-color-light">From a simple photo to your dream interior.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-subtle-accent-bg border border-accent">
                <span className="font-heading text-2xl font-bold text-accent">{step.number}</span>
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-base text-text-color-subtle">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}