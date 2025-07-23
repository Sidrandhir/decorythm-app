// FINAL, LUXURY SIGN-UP PAGE - app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserPlus } from 'lucide-react';

// Assuming these are in your components/forms/ directory
import { PasswordInput } from '@/components/forms/PasswordInput';
import { PasswordStrengthMeter } from '@/components/forms/PasswordStrengthMeter';


export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  // Your existing, correct state logic
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Your existing, correct validation logic
  const validatePhoneNumber = (phoneNumber: string) => /^\d{10}$/.test(phoneNumber);
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 10) setPhone(onlyNums);
  };

  // Your existing, correct submission logic
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters long."); return; }
    if (!validatePhoneNumber(phone)) { setError("Please enter a valid 10-digit phone number."); return; }
    
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email, password, options: { data: { first_name: firstName, last_name: lastName, phone_number: phone } },
    });
    setIsLoading(false);

    if (error) { setError(error.message); return; }
    if (data.user) { router.push(`/verify-otp?email=${encodeURIComponent(email)}`); } 
    else { setError("An unexpected error occurred. Please try again."); }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-pure-white">
      {/* Left Column: The Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-6">
          <div>
            <Link href="/" className="inline-block"><h1 className="text-4xl font-bold font-display text-primary">Decorythm</h1></Link>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-gray-600">Begin your journey with us.</p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">Error:</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input-style" placeholder="First Name"/>
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input-style" placeholder="Last Name"/>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-style" placeholder="Email Address"/>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <label htmlFor="phone" className="sr-only">Phone Number</label>
              <input id="phone" type="tel" value={phone} onChange={handlePhoneInputChange} required placeholder="10-Digit Phone Number" className="input-style"/>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label htmlFor="password"  className="sr-only">Password</label>
              <PasswordInput id="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="Password" />
              <PasswordStrengthMeter password={password} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <label htmlFor="confirmPassword"  className="sr-only">Confirm Password</label>
              <PasswordInput id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm Password" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <button type="submit" disabled={isLoading} className="group button-primary w-full flex justify-center items-center gap-2">
                <UserPlus className="w-5 h-5 transition-transform group-hover:scale-110" />
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </motion.div>
          </form>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-accent hover:underline">Log In</Link>
          </p>
        </div>
      </div>

      {/* Right Column: The Visual */}
      <div className="hidden lg:block relative">
        <Image src="/images/signup-visual.jpg" alt="A beautiful, serene interior design" layout="fill" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="absolute bottom-10 left-10 text-white">
            <p className="text-3xl font-display italic text-shadow-md">"The home should be the</p>
            <p className="text-3xl font-display italic text-shadow-md">treasure chest of living."</p>
            <p className="mt-2 text-lg font-semibold">- Le Corbusier</p>
        </motion.div>
      </div>
    </div>
  );
}