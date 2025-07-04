// components/landing/Footer.tsx
export function Footer() {
  return (
    <footer className="bg-primary text-light-text-on-dark py-12">
      <div className="container mx-auto px-4 text-center text-sm">
        <p className="font-heading text-lg text-accent">Decorythm</p>
        <p className="mt-4 text-text-color-subtle">© {new Date().getFullYear()} Decorythm Inc. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-x-6">
          <a href="#" className="hover:text-accent">Privacy Policy</a>
          <a href="#" className="hover:text-accent">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}