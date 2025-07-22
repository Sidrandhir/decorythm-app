// FINAL, DEFINITIVE, COMPLETE & LUXURIOUS LANDING PAGE - app/page.tsx
'use client';

import { useState, useEffect, FC, ReactNode, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, MessageCircle, X, Upload, Palette, Brain, Check,
    Sparkles, ShieldCheck, Users, HeartHandshake, Star, Briefcase, Phone, Mail, Lock, Building
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// --- Helper Components ---
const MotionWrap: FC<{ children: ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
        {children}
    </motion.div>
);
const SectionHeader: FC<{ title: string; subtitle?: string; className?: string }> = ({ title, subtitle, className }) => (
    <MotionWrap className={`text-center mb-12 sm:mb-16 ${className}`}>
        <h2 className="text-4xl md:text-5xl font-bold font-display text-primary">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-text-color-light max-w-3xl mx-auto">{subtitle}</p>}
    </MotionWrap>
);

// --- 1. Hero Section ---
const HeroSection = () => (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0"><video playsInline autoPlay muted loop poster="/images/hero-poster.jpg" className="w-full h-full object-cover"><source src="/videos/herosection.mp4" type="video/mp4" /></video></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 px-4 text-white">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl md:text-[64px] font-bold font-display text-white tracking-tight">Crafted by Vision.<br/> Delivered by Design.</motion.h1>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mt-6 text-xl md:text-[22px] max-w-3xl mx-auto text-green-100/90 font-light">AI-powered interiors. Soul-powered living.</motion.h2>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="mt-10">
                <Link href="/generate" className="group inline-flex items-center justify-center gap-x-3 bg-cta text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow-cta">
                    🪄 Start Your Transformation
                </Link>
            </motion.div>
        </div>
    </section>
);

// --- 2. Before–After Slider ---
const BeforeAfterSliderSection = () => (
    <section className="py-20 sm:py-28 bg-soft-white"><div className="container mx-auto px-4 text-center"><MotionWrap><h2 className="text-4xl font-medium font-display text-accent">See Your Space, Reimagined.</h2><p className="mt-4 text-lg text-text-color">Drag the slider to experience how DecoRythm uncovers the elegance within your current environment.</p></MotionWrap><MotionWrap delay={0.2} className="mt-12"><div className="max-w-5xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-4 border-white"><ReactCompareSlider itemOne={<ReactCompareSliderImage src="/images/before.jpg" alt="Room before design" />} itemTwo={<ReactCompareSliderImage src="/images/after.png" alt="Room after AI design" />} style={{ height: '70vh', minHeight: '400px', maxHeight: '800px' }} /></div></MotionWrap></div></section>
);

// --- 3. About DecoRythm ---
const AboutSection = () => (
    <section className="py-20 sm:py-28 bg-pure-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Text Content */}
            <MotionWrap className="text-left">
                <h2 className="text-4xl md:text-[42px] font-display text-primary leading-tight">
                    Where Vision <br/> Meets Technology
                </h2>
                <p className="mt-6 text-lg text-text-color leading-8">
                    Decorythm is a luxury lifestyle technology company that empowers individuals to craft emotionally intelligent spaces through world-class AI and design aesthetics. Every element is intentional, every outcome deeply personal.
                </p>
                <p className="mt-4 text-lg text-accent italic">
                    “It’s not about decorating. It’s about curating a life.”
                </p>
            </MotionWrap>
            
            {/* Right Column: The new Video Element */}
            <MotionWrap delay={0.2}>
                <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white aspect-w-16 aspect-h-12 bg-black">
                    <video 
                        className="w-full h-full object-cover" 
                        playsInline 
                        autoPlay 
                        muted 
                        loop 
                        src="/videos/DecoRythm (1).mp4"
                    >
                    </video>
                </div>
            </MotionWrap>
        </div>
    </section>
);

// --- NEW SECTION: "The Proof Gallery" ---
const ProofGallerySection = () => {
  // Define the 8 image pairs for your gallery
  const galleryItems = [
    { before: "/images/gallery/before-1.jpg", after: "/images/gallery/after-1.jpg" },
    { before: "/images/gallery/before-2.jpg", after: "/images/gallery/after-2.jpg" },
    { before: "/images/gallery/before-3.jpg", after: "/images/gallery/after-3.jpg" },
    { before: "/images/gallery/before-4.jpg", after: "/images/gallery/after-4.jpg" },
    { before: "/images/gallery/before-5.jpg", after: "/images/gallery/after-5.jpg" },
    { before: "/images/gallery/before-6.jpg", after: "/images/gallery/after-6.jpg" },
    { before: "/images/gallery/before-7.jpg", after: "/images/gallery/after-7.jpg" },
    { before: "/images/gallery/before-8.jpg", after: "/images/gallery/after-8.jpg" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-soft-white border-y">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="A Gallery of Proof" 
          subtitle="Explore a curated selection of real-world transformations. Each slider reveals the power of our design intelligence." 
        />
        
        {/* The responsive grid that holds the sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <MotionWrap key={index} delay={index * 0.05}>
              <div className="aspect-w-1 aspect-h-1 rounded-2xl shadow-lg overflow-hidden border-2 border-white">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={item.before} alt="Before" />}
                  itemTwo={<ReactCompareSliderImage src={item.after} alt="After" />}
                />
              </div>
            </MotionWrap>
          ))}
        </div>

      </div>
    </section>
  );
};

// --- 4. How It Works (with Video) ---
const HowItWorksVideoSection = () => {
    const steps = [ { icon: Upload, title: "Upload Your Room" }, { icon: Palette, title: "Select Your Aesthetic" }, { icon: Brain, title: "Generate Your Masterpiece" }, { icon: Check, title: "Download & Refine" } ];
    return (
        <section id="how-it-works" className="py-20 sm:py-28 bg-soft-white border-y"><div className="container mx-auto px-4"><div className="text-center mb-12"><h2 className="text-4xl font-display text-cta">It All Begins With a Photo</h2><p className="mt-4 text-lg text-primary">The world’s simplest luxury design experience.</p></div><div className="grid md:grid-cols-2 gap-12 items-center mt-12"><MotionWrap><div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white aspect-w-16 aspect-h-9 bg-black"><iframe className="w-full h-full" src="https://www.youtube.com/embed/your-video-id-here" title="Decorythm Demo Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div><p className="text-center italic text-sm text-gray-500 mt-2">Curated in seconds. Felt for a lifetime.</p></MotionWrap><MotionWrap delay={0.2} className="space-y-6">{steps.map((step) => (<div key={step.title} className="flex items-center gap-5 p-4 bg-pure-white rounded-xl border"><div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center"><step.icon className="w-6 h-6 text-accent"/></div><h3 className="text-base font-bold text-gray-800">{step.title}</h3></div>))}</MotionWrap></div></div></section>
    );
};

// --- 5. Why Decorythm ---
const WhyDecorythmSection = () => {
    const pillars = [ 
        { icon: Sparkles, title: "Effortless Beauty", desc: "One image. Infinite elegance." }, 
        { icon: Brain, title: "Design Intelligence", desc: "Your choices refined by aesthetic algorithms." }, 
        { icon: HeartHandshake, title: "Tailored Sophistication", desc: "No design is repeated. Every space is a signature." }, 
        { icon: Lock, title: "Private by Nature", desc: "Your data, your designs — safe and sacred." } 
    ];
    return (
        <section className="py-20 sm:py-28 bg-pure-white">
            <div className="container mx-auto px-4">
                <SectionHeader title="Designed for the Discerning" />
                
                {/* --- THIS IS THE FIX: RESPONSIVE LOGIC --- */}

                {/* Mobile View: Horizontal Scroller */}
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-4 -mx-4 px-4">
                        {pillars.map((p, i) => (
                            <div key={i} className="flex-shrink-0 snap-center w-4/5 text-center p-8 bg-soft-white rounded-2xl border">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                    <p.icon className="w-8 h-8 text-accent"/>
                                </div>
                                <h3 className="text-xl font-bold font-body">{p.title}</h3>
                                <p className="mt-2 text-text-color-light">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop View: Grid Layout */}
                <div className="hidden md:grid mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((p, i) => (
                        <MotionWrap delay={i*0.1} key={i} className="p-8 bg-soft-white rounded-2xl border text-center hover:shadow-2xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <p.icon className="w-8 h-8 text-accent"/>
                            </div>
                            <h3 className="text-xl font-bold font-body">{p.title}</h3>
                            <p className="mt-2 text-text-color-light">{p.desc}</p>
                        </MotionWrap>
                    ))}
                </div>
                {/* --- END OF FIX --- */}

            </div>
        </section>
    );
};


// --- 6. Image Gallery ---
const GallerySection = () => {
    const images = [ { src: "/images/gallery/japandi.png", tag: "Japandi Essence" }, { src: "/images/gallery/Brutalist.png", tag: "Minimalist Brutalist" }, { src: "/images/gallery/Industrial.png", tag: "Warm Industrial" }, { src: "/images/gallery/Neo Classic.png", tag: "Neo-Classical Glamour" } ];
    return <section className="py-20 sm:py-28 bg-soft-white border-y"><div className="container mx-auto px-4 text-center"><h2 className="text-4xl font-display text-center mb-12">Living Spaces, Elevated</h2><div className="columns-2 md:columns-4 gap-4 space-y-4">{images.map((img, i) => (<MotionWrap delay={i * 0.05} key={img.src}><div className="relative overflow-hidden rounded-xl group shadow-lg"><Image src={img.src} width={500} height={700} alt={img.tag} className="w-full h-auto transition-transform duration-500 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"><h3 className="text-white font-bold font-display uppercase tracking-widest text-sm">{img.tag}</h3></div></div></MotionWrap>))}</div></div></section>;
};

// --- 7. Storytelling Section ---
const StorytellingSection = () => (
    <section className="py-20 sm:py-28 bg-pure-white"><div className="container mx-auto px-4 text-center"><MotionWrap className="max-w-3xl mx-auto"><h2 className="text-[42px] font-display text-primary">Design Reflects Destiny</h2><p className="mt-6 text-lg text-text-color leading-8">Every room holds memory. Every corner whispers intention. DecoRythm awakens the dormant elegance in your space and helps you shape a version of yourself you're proud to return home to.</p><div className="mt-8 border-l-4 border-accent p-6 text-left bg-soft-white rounded-r-xl shadow-lg"><p className="text-[22px] italic text-accent font-display">"This wasn’t just a redesign. It felt like I stepped into the life I always wanted."</p><p className="mt-2 text-right font-semibold text-gray-600">— A DecoRythm Creator</p></div></MotionWrap></div></section>
);

// --- 8. Full Services ---
const FullServicesSection = () => {
    const services = [ { icon: Sparkles, title: "Residential Redesign" }, { icon: Building, title: "Commercial & Retail Spaces" }, { icon: Palette, title: "Palette Matching AI" }, { icon: Users, title: "Layout Flow Optimization" }, { icon: Brain, title: "Style Discovery Engine" }, { icon: ShieldCheck, title: "White Glove Finalization" } ];
    return <section className="py-20 sm:py-28 bg-soft-white border-y"><div className="container mx-auto px-4"><h2 className="text-4xl font-display text-left">Our Curation Suite</h2><div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{services.map((s, i) => (<MotionWrap delay={i*0.1} key={i} className="flex items-start gap-5 p-6 bg-pure-white rounded-2xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"><div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center"><s.icon className="w-6 h-6 text-accent"/></div><h3 className="font-medium text-base pt-3">{s.title}</h3></MotionWrap>))}</div></div></section>;
};

// --- 9. Testimonials ---
const TestimonialsSection = () => {
    const testimonials = [ { quote: "The moment I saw the result, I knew this was the future of home.", name: "Elena G., Creative Director" }, { quote: "It brings emotion into a digital product. That’s luxury.", name: "Karan M., Interior Architect" }, { quote: "This is the Apple of Interior Design. Clean, smart, elegant.", name: "Ayesha R., Investor" } ];
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
    return <section className="py-20 sm:py-28 bg-pure-white"><div className="container mx-auto px-4"><h2 className="text-4xl font-display text-center text-cta mb-12">The Trust of Taste-Makers</h2><div className="overflow-hidden max-w-3xl mx-auto" ref={emblaRef}><div className="flex">{testimonials.map((t, i) => (<div className="flex-[0_0_100%] min-w-0 text-center px-8" key={i}><p className="text-lg italic text-text-color">"{t.quote}"</p><p className="mt-4 font-bold font-body">{t.name}</p></div>))}</div></div></div></section>
};

// --- 10. Final CTA ---
const FinalCTASection = () => (
    <section className="py-20 sm:py-32 bg-soft-white"><div className="container mx-auto px-4 text-center"><MotionWrap><h2 className="text-[44px] font-bold font-display text-primary">Your Masterpiece Awaits</h2><p className="mt-4 text-xl text-text-color max-w-2xl mx-auto">Claim your access to intelligent interior design — crafted with intention, delivered with grace.</p><div className="mt-10"><Link href="/generate" className="group inline-flex items-center justify-center gap-x-3 bg-accent text-primary font-bold py-4 px-10 rounded-full text-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-2xl">🎨 Begin Designing Your Space</Link></div></MotionWrap></div></section>
);

// --- 11. AI Chat Assistant ---
const AiChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversation, setConversation] = useState([{ role: 'assistant', content: 'Welcome to your private design assistant. Select a question below to explore our services or connect directly with our design advisors.' }]);
    type ChatNode = { answer?: string; options: { text: string; next: string; }[] };
    type ChatTree = { [key: string]: ChatNode; };
    const [currentNodeKey, setCurrentNodeKey] = useState<keyof typeof chatTree>('main');

    const chatTree: ChatTree = {
        main: { options: [{ text: "How does it generate designs?", next: "howItWorks" }, { text: "Can I request a specific style?", next: "styles" }, { text: "Is the result ready for execution?", next: "execution" }, { text: "Is this for commercial spaces?", next: "commercial" }] },
        howItWorks: { answer: "You upload a photo, select aesthetic choices, and our AI, trained on luxury design principles, generates a photorealistic render. It’s a seamless blend of your vision and our design intelligence.", options: [{ text: "Tell me about styles", next: "styles" }, { text: "Back", next: "main" }] },
        styles: { answer: "Absolutely. You can select from curated styles or even describe a unique 'vibe.' Our platform is designed to interpret and visualize your specific aesthetic preferences.", options: [{ text: "Is it free?", next: "pricing" }, { text: "Back", next: "main" }] },
        execution: { answer: "Yes. The designs are high-resolution and conceptually sound, ready to be shared with architects or our network of execution partners to bring them to life.", options: [{ text: "How does it work?", next: "howItWorks" }, { text: "Back", next: "main" }] },
        commercial: { answer: "Yes, Decorythm is perfect for offices, studios, and retail environments. We craft spaces that enhance brand identity and customer experience.", options: [{ text: "Contact Us", next: "contact" }, { text: "Back", next: "main" }] },
        pricing: { answer: "You receive complimentary design credits upon signing up. For further projects, we offer premium packages.", options: [{ text: "Contact Us", next: "contact" }, { text: "Back", next: "main" }] },
        contact: { answer: "Our specialists are ready to assist. You can reach us via the contact options below.", options: [{ text: "Thanks!", next: "main" }] }
    };

    const handleOptionClick = (option: { text: string; next: string }) => {
        const nextNodeKey = option.next as keyof typeof chatTree;
        const userMessage = { role: 'user', content: option.text };
        const assistantResponse = { role: 'assistant', content: chatTree[nextNodeKey].answer || "How else may I assist you?" };
        setConversation(prev => [...prev, userMessage, assistantResponse]);
        setCurrentNodeKey(nextNodeKey);
    };

    return (
        <><div className="fixed bottom-6 right-6 z-50"><motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="bg-accent text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"><MessageCircle size={32} /></motion.button></div><AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl border z-50 flex flex-col origin-bottom-right h-[32rem]"><div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl flex-shrink-0"><h3 className="font-semibold text-primary">Deco</h3><button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900"><X size={20}/></button></div><div className="p-4 flex-grow overflow-y-auto space-y-4">{conversation.map((msg, i) => (<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{msg.content}</div></div>))}</div><div className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0"><div className="flex flex-wrap gap-2">{chatTree[currentNodeKey].options.map(opt => (<button key={opt.next} onClick={() => handleOptionClick(opt)} className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200">{opt.text}</button>))}</div><div className="flex justify-center gap-4 mt-4 border-t pt-3"><a href="tel:..." className="text-xs text-gray-500 hover:text-black flex items-center gap-1.5"><Phone size={12}/> Speak to a Specialist</a><a href="mailto:..." className="text-xs text-gray-500 hover:text-black flex items-center gap-1.5"><Mail size={12}/> Email Support</a></div></div></motion.div>}</AnimatePresence></>
    );
};


// --- The Master Assembled Page ---
export default function LandingPage() {
  return (
    <div className="bg-pure-white">
      <HeroSection />
      <BeforeAfterSliderSection />
      <AboutSection />
      <ProofGallerySection />
      <HowItWorksVideoSection />
      <WhyDecorythmSection />
      <GallerySection />
      <StorytellingSection />
      <FullServicesSection />
      <TestimonialsSection />
      <FinalCTASection />
      <AiChatbot />
    </div>
  );
}