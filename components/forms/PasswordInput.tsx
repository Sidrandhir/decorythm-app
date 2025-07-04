// FINAL - File: components/forms/PasswordInput.tsx
'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // We will install lucide-react next

// Using a generic interface to accept any standard input props
interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="input-style pr-10" // Use the global style and add padding for the icon
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-text-color-subtle"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};