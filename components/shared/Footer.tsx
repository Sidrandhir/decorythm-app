// FINAL, CORRECTED ICONS - components/shared/Footer.tsx
'use client';

import Link from "next/link";
// We still use Lucide for generic icons
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

// --- THIS IS THE FIX ---
// We import the perfect brand icons from the 'react-icons' library
import { FaPinterest, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // The correct, modern X icon
// --- END OF FIX ---


export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-2 md:grid-cols-12 gap-8">
                    
                    <div className="col-span-2 md:col-span-12 lg:col-span-4">
                        <h3 className="text-2xl font-bold text-white font-display">Decorythm</h3>
                        <p className="mt-4 text-sm max-w-xs leading-relaxed">
                            Intelligent luxury design, tailored to your aspirations.
                        </p>
                        {/* The social links now use the new, perfect icons */}
                        <div className="flex mt-6 space-x-6 text-xl">
                            <a href="https://in.pinterest.com/DecoRythm/" aria-label="Pinterest" className="hover:text-white transition-colors"><FaPinterest /></a>
                            <a href="https://www.facebook.com/decorythm/" aria-label="Facebook" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/decorythm/" aria-label="Instagram" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="https://www.youtube.com/@decorythm" aria-label="YouTube" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                            <a href="https://x.com/DecoRythm" aria-label="X (formerly Twitter)" className="hover:text-white transition-colors"><FaXTwitter /></a>
                            <a href="https://www.linkedin.com/company/106892400/admin/dashboard/" aria-label="LinkedIn" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="https://chat.whatsapp.com/Hh9uI7QFalDFCVnpdgo99H?mode=ac_t" aria-label="WhatsApp" className="hover:text-white transition-colors"><FaWhatsapp /></a>
                        </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h4 className="font-semibold text-white tracking-wider uppercase text-sm">Product</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/generate" className="hover:text-white transition-colors">Generate</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h4 className="font-semibold text-white tracking-wider uppercase text-sm">Company</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h4 className="font-semibold text-white tracking-wider uppercase text-sm">Resources</h4>
                         <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>
                     <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <h4 className="font-semibold text-white tracking-wider uppercase text-sm">Legal</h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-xs">
                    <p>© {new Date().getFullYear()} Decorythm. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}