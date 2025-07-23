// app/contact/page.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Mail, Phone, Clock, Instagram, Linkedin, Send, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import ClientOnly from '@/components/shared/ClientOnly';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, ease: 'easeOut' } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } },
};

export default function ContactPage() {
  // State is already prepared to handle the 'phone' field
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'An unknown error occurred.');

      setSubmissionStatus('success');
      setFormData({ fullName: '', email: '', phone: '', subject: 'General Inquiry', message: '' });

    } catch (error: any) {
      setSubmissionStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-pure-white">
      {/* ... Hero and Quick Contact sections remain the same ... */}
      <motion.section 
        className="text-center py-20 sm:py-28 bg-soft-white border-b overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-display text-primary">
            Let’s Bring Your Vision to Life.
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-6 text-lg max-w-3xl mx-auto text-text-color-light">
            Our design consultants and AI experts are here to help. Whether it’s a question, collaboration, or a custom interior vision — we’d love to hear from you.
          </motion.p>
        </div>
      </motion.section>

      <motion.section 
        className="py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Mail className="w-10 h-10 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-semibold font-display">Email Us</h3>
              <a href="mailto:support@decorythm.com" className="text-text-color hover:text-accent transition-colors">support@decorythm.com</a>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Phone className="w-10 h-10 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-semibold font-display">Call Us</h3>
              <a href="tel:+919876543210" className="text-text-color hover:text-accent transition-colors">+91-98765-43210</a>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Clock className="w-10 h-10 mx-auto text-accent mb-4" />
              <h3 className="text-xl font-semibold font-display">Working Hours</h3>
              <p className="text-text-color">Mon–Sat: 10 AM – 7 PM IST</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="py-16 bg-soft-white border-t"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ClientOnly>
              <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-primary">Full Name</label>
                  <input type="text" id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary">Email Address</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
                </div>
                
                {/* --- NEW FIELD ADDED HERE --- */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary">
                    Mobile Number <span className="text-gray-400"></span>
                  </label>
                  <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} placeholder="e.g., +91 12345 67890" className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent" />
                </div>
                {/* --- END OF NEW FIELD --- */}
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary">Subject</label>
                  <select id="subject" name="subject" required value={formData.subject} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent">
                    <option>General Inquiry</option>
                    <option>Design Help</option>
                    <option>Feedback</option>
                    <option>Business Proposal</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary">Message</label>
                  <textarea id="message" name="message" rows={5} required value={formData.message} onChange={handleChange} className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"></textarea>
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-lg font-semibold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-wait transition-colors duration-300 transform hover:scale-105">
                    {isSubmitting ? <Loader className="animate-spin mr-3" /> : <Send className="mr-3" />}
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
                {submissionStatus && (
                  <div className={`mt-4 p-4 rounded-lg flex items-center text-sm font-medium ${submissionStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submissionStatus === 'success' ? <CheckCircle className="mr-3" /> : <AlertTriangle className="mr-3" />}
                    {submissionStatus === 'success' ? 'Thank you! Your message has been recorded. We will be in touch shortly.' : errorMessage}
                  </div>
                )}
              </motion.form>
            </ClientOnly>

            <motion.div variants={itemVariants} className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold font-display text-primary">Visit Us</h3>
                <p className="mt-2 text-text-color-light">Decorythm HQ</p>
                <p className="text-text-color-light">5th Floor, Urban Aura, Koregaon Park, Pune, Maharashtra</p>
                <p className="mt-1 text-sm text-accent">📍 By appointment only.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-primary">Have Questions?</h3>
                <p className="mt-2 text-text-color-light">
                  Find quick answers to common questions about our AI, the design process, and more on our FAQ page.
                </p>
                <Link href="/faq" className="inline-block mt-4 text-accent font-semibold hover:underline">
                  Read our FAQ →
                </Link>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-primary">Follow Our Journey</h3>
                 <div className="flex space-x-6 mt-4">
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Instagram size={28} /></a>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors"><FaPinterest size={28} /></a>
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Linkedin size={28} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}