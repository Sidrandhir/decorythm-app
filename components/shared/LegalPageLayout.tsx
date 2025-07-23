// components/shared/LegalPageLayout.tsx
import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-soft-white py-20 sm:py-28">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-primary mb-8">
          {title}
        </h1>
        <div className="prose prose-lg lg:prose-xl max-w-none text-text-color-light space-y-4">
            {/* The 'prose' classes from Tailwind automatically style p, h2, ul, etc. */}
            {children}
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;