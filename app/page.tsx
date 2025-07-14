// FINAL, DEFINITIVE, AND FULLY RESPONSIVE LUXURY LANDING PAGE - app/page.tsx
'use client';

import { useState, useEffect, FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowRight, MessageCircle, X, UploadCloud, PenTool, BrainCircuit, CheckCircle, 
    UserCheck, Building, Palette, Star, PlayCircle
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// --- Reusable Animated Wrapper Component ---
const MotionWrap: FC<{ children: ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, delay, ease: [0.25, 1, 0.5, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

// --- 1. Hero Section: Re-engineered for Perfect Mobile View ---
const HeroSection = () => (
    <section className="relative h-screen w-full flex items-center justify-center text-center text-white overflow-hidden">
        {/* --- THE DEFINITIVE FIX FOR THE VIDEO BACKGROUND --- */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
            <video
              key="hero-video" // Adding a key helps React with re-renders
              playsInline
              autoPlay
              muted
              loop
              poster="/images/hero-poster.jpg"
              // The object-cover class is the key. It forces the video to cover the entire
              // container without stretching or losing its aspect ratio. It will crop the
              // video slightly on different screen sizes, which is the desired effect.
              className="w-full h-full object-cover"
            >
                <source src="/videos/herosection.mp4" type="video/mp4" />
            </video>
        </div>
        {/* --- END OF FIX --- */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 px-4">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold font-display tracking-tight text-shadow-lg">
                Your Space. <br /> Instantly Reimagined.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 text-lg max-w-2xl mx-auto text-gray-200 text-shadow">
                Upload a photo. Define your aesthetic. Receive breathtaking interior designs in seconds.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10">
                <Link href="/generate" className="group inline-flex items-center justify-center gap-x-3 bg-white text-black font-semibold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-2xl">
                    Start Your Free Transformation <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </div>
    </section>
);

// --- 2. Before/After Slider Section ---
const BeforeAfterSlider = () => (
    <section className="py-20 sm:py-28 bg-soft-white">
        <div className="container mx-auto px-4">
            <MotionWrap className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-primary">See the Future of Your Home.</h2>
            </MotionWrap>
            <MotionWrap delay={0.2}>
                <div className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                    <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src="/images/before.jpg" alt="Room before design" />}
                        itemTwo={<ReactCompareSliderImage src="/images/after.png" alt="Room after AI design" />}
                        style={{ height: '60vh', minHeight: '400px', maxHeight: '700px' }}
                    />
                </div>
                <p className="text-center mt-4 text-gray-600">
                    <span className="font-semibold">Drag the slider</span> to reveal the transformation.
                </p>
            </MotionWrap>
        </div>
    </section>
);

// --- 3. How It Works Section (With Mobile Horizontal Scroll) ---
const HowItWorksSection = () => {
    const steps = [
        { icon: UploadCloud, title: "1. Upload", description: "A single photo of your space." },
        { icon: PenTool, title: "2. Define", description: "Select your dream style & materials." },
        { icon: BrainCircuit, title: "3. Generate", description: "Our AI creates your bespoke design." },
        { icon: CheckCircle, title: "4. Finalize", description: "Download or generate variations." }
    ];
    return (
        <section id="how-it-works" className="py-20 sm:py-28 bg-pure-white border-y">
            <div className="container mx-auto px-4">
                <MotionWrap className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-primary">Your Vision, Effortlessly Realized</h2>
                </MotionWrap>
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-4 -mx-4 px-4">
                        {steps.map((step) => (
                            <div key={step.title} className="flex-shrink-0 snap-center w-4/5 text-center p-8 bg-soft-white rounded-2xl border">
                                <div className="flex items-center justify-center h-12 w-12 bg-accent/10 rounded-full mx-auto mb-4"><step.icon className="w-6 h-6 text-accent" /></div>
                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                <p className="mt-1 text-text-color-light text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <MotionWrap delay={index * 0.1} key={step.title} className="text-center p-4">
                           <div className="flex items-center justify-center h-20 w-20 bg-accent/10 rounded-full mx-auto mb-6"><step.icon className="w-10 h-10 text-accent" /></div>
                           <h3 className="text-2xl font-semibold font-display">{step.title}</h3>
                           <p className="mt-2 text-text-color-light">{step.description}</p>
                        </MotionWrap>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 4. Video Demo & Explanation Section ---
const VideoSection = () => (
    <section className="py-20 sm:py-28 bg-soft-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <MotionWrap className="md:order-2">
                <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-white aspect-w-16 aspect-h-9 bg-black">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/your-video-id-here" title="Decorythm Demo Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </MotionWrap>
            <MotionWrap className="md:order-1 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-primary">See It In Action</h2>
                <p className="mt-4 text-lg text-text-color-light max-w-xl mx-auto md:mx-0">Words are one thing, but seeing is believing. Watch our 1-minute demo to understand the power and simplicity of Decorythm.</p>
            </MotionWrap>
        </div>
    </section>
);

// --- 5. "Designed for Visionaries" Section (With Mobile Horizontal Scroll) ---
const WhoIsThisForSection = () => {
    const userTypes = [
        { icon: UserCheck, title: "Homeowners", description: "Visualize your renovation before committing time and money." },
        { icon: Building, title: "Real Estate Agents", description: "Create stunning virtual staging to sell properties faster." },
        { icon: Palette, title: "Interior Designers", description: "Rapidly prototype ideas and present high-quality concepts to your clients." },
    ];
    return (
        <section className="py-20 sm:py-28 bg-pure-white border-y">
            <div className="container mx-auto px-4">
                <MotionWrap className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display text-primary">Designed for Visionaries</h2>
                </MotionWrap>
                <div className="md:hidden">
                    <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-4 -mx-4 px-4">
                        {userTypes.map((user) => (
                            <div key={user.title} className="flex-shrink-0 snap-center w-4/5 text-center p-8 bg-soft-white rounded-2xl border">
                                <div className="flex items-center justify-center h-12 w-12 bg-accent/10 rounded-full mx-auto mb-5"><user.icon className="w-6 h-6 text-accent" /></div>
                                <h3 className="text-xl font-semibold">{user.title}</h3>
                                <p className="mt-2 text-text-color-light">{user.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
                    {userTypes.map((user, index) => (
                        <MotionWrap delay={index * 0.15} key={user.title} className="p-8 bg-soft-white rounded-2xl border text-center">
                            <div className="flex items-center justify-center h-16 w-16 bg-accent/10 rounded-full mx-auto mb-5"><user.icon className="w-8 h-8 text-accent" /></div>
                            <h3 className="text-xl font-semibold">{user.title}</h3>
                            <p className="mt-2 text-text-color-light">{user.description}</p>
                        </MotionWrap>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- 6. Final CTA Section (With New Background) ---
const FinalCTA = () => (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="container mx-auto px-4 text-center">
            <MotionWrap>
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white">Ready to Create?</h2>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">Your dream space is waiting. The only limit is your imagination.</p>
                <div className="mt-10">
                    <Link href="/generate" className="group inline-flex items-center justify-center gap-x-3 bg-white text-black font-semibold py-4 px-10 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                        Start Designing for Free <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </MotionWrap>
        </div>
    </section>
);

// --- 7. AI Chatbot (Responsive) ---
type ChatOption = {
  text: string;
  next: string;
};

type ChatNode = {
  answer?: string;
  question?: string;
  options: ChatOption[];
  redirect?: string;
};

type ChatTree = {
  [key: string]: ChatNode;
};
// --- END OF TYPING FIX ---

const AiChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [conversation, setConversation] = useState([
        { role: 'assistant', content: 'Welcome to Decorythm! I am Deco, your personal design concierge. How can I assist you today?' }
    ]);
    
    // The state now knows it can only be a key from our chatTree
    const [currentOptionsKey, setCurrentOptionsKey] = useState<keyof typeof chatTree>('main');

    const chatTree: ChatTree = {
        main: {
            question: "How can I assist you today?",
            options: [
                { text: "Explain Design Styles", next: "styles" },
                { text: "How does the AI work?", next: "howItWorks" },
                { text: "What are design tokens?", next: "tokens" },
            ]
        },
        styles: {
            answer: "Of course. We specialize in a range of aesthetics. 'Modern' focuses on clean lines, 'Bohemian' on eclectic textures, and 'Industrial' on raw, edgy materials. Which would you like to know more about?",
            options: [
                { text: "Tell me about Modern", next: "modernStyle" },
                { text: "Tell me about Bohemian", next: "bohemianStyle" },
                { text: "Back to main menu", next: "main" },
            ]
        },
        howItWorks: {
            answer: "It's simple! You upload a photo of your space. Then, you select your desired styles and materials. Our AI, trained on luxury design principles, generates a new, photorealistic version of your room in under a minute.",
            options: [{ text: "Tell me about the AI", next: "aiTech" }, { text: "Back to main menu", next: "main" }]
        },
        tokens: {
            answer: "Think of tokens as your design credits. One token is used for each image generation. You receive free tokens upon signing up, and can purchase more with our premium packages.",
            options: [{ text: "View Pricing", next: "pricingLink" }, { text: "Back to main menu", next: "main" }]
        },
        modernStyle: {
            answer: "Modern design emphasizes simplicity, neutral colors, and natural materials like wood and metal. It's defined by a lack of ornate decoration, creating a clean, uncluttered, and calming space.",
            options: [{ text: "Explain another style", next: "styles" }, { text: "Back to main menu", next: "main" }]
        },
        bohemianStyle: {
            answer: "Bohemian or 'Boho' style is for the free-spirited. It features a mix of patterns, textures, natural elements like plants, and collected items from around the world. It's warm, personal, and eclectic.",
            options: [{ text: "Explain another style", next: "styles" }, { text: "Back to main menu", next: "main" }]
        },
        aiTech: {
            answer: "Our AI doesn't just copy and paste. It understands spatial relationships, lighting physics, and the principles of good design harmony to create a truly cohesive and believable space.",
            options: [{ text: "How do I start?", next: "howItWorks" }, { text: "Back to main menu", next: "main" }]
        },
        pricingLink: {
            redirect: '/pricing',
            options: [] // must have an options array to match the type
        }
    };

    // The 'option' parameter is now correctly typed as ChatOption
    const handleOptionClick = (option: ChatOption) => {
        const userMessage = { role: 'user', content: option.text };
        const nextNodeKey = option.next as keyof typeof chatTree;
        const nextNode = chatTree[nextNodeKey];

        if (nextNode.redirect) {
            window.location.href = nextNode.redirect;
            return;
        }

        const assistantResponse = { role: 'assistant', content: nextNode.answer || nextNode.question || '' };
        
        setConversation(prev => [...prev, userMessage, assistantResponse]);
        setCurrentOptionsKey(nextNodeKey);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)}
                    className="bg-accent text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center">
                    <MessageCircle size={32} />
                </motion.button>
            </div>
            <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl border z-50 flex flex-col origin-bottom-right h-[32rem]">
                    <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl flex-shrink-0">
                        <h3 className="font-semibold text-primary">Decorythm Concierge</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900"><X size={20}/></button>
                    </div>
                    <div className="p-4 flex-grow overflow-y-auto space-y-4">
                        {conversation.map((msg, index) => (
                             <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0">
                        <div className="flex flex-wrap gap-2">
                           {chatTree[currentOptionsKey]?.options.map(option => (
                               <button key={option.next} onClick={() => handleOptionClick(option)}
                                className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200">
                                   {option.text}
                               </button>
                           ))}
                        </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </>
    );
};


// --- The Final Assembled Page ---
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <BeforeAfterSlider />
      <HowItWorksSection />
      <VideoSection />
      <WhoIsThisForSection />
      {/* The complex Quiz and Gallery sections will be the next features we build. */}
      <FinalCTA />
      <AiChatbot />
    </div>
  );
}