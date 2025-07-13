// File: components/landing/Footer.tsx
'use client';
import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-1">
                        <h3 className="text-xl font-bold text-white font-display">Decorythm</h3>
                        <p className="mt-2 text-sm">Transforming lifestyles through intelligent luxury design.</p>
                        <div className="flex mt-4 space-x-4">
                            <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={20} /></a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={20} /></a>
                        </div>
                    </div>
                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white">Quick Links</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/generate" className="hover:text-white">Generate</Link></li>
                            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
                        </ul>
                    </div>
                    {/* Column 3: Company */}
                    <div>
                        <h4 className="font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white">About Us</Link></li>
                            <li><Link href="#" className="hover:text-white">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    {/* Column 4: Legal */}
                    <div>
                        <h4 className="font-semibold text-white">Legal</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>© {new Date().getFullYear()} Decorythm. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}