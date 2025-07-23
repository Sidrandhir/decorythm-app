// FINAL & CORRECT - components/forms/PasswordInput.tsx
'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// This allows our component to accept all the standard props of an HTML input
type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        // Spread all the props from the parent (id, value, onChange, required, etc.)
        {...props}
        type={showPassword ? 'text' : 'password'}
        // We combine the global 'input-style' with padding-right for the icon
        className={`${props.className || ''} input-style pr-10`}
      />
      <button
        type="button" // Important: prevents form submission
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <Eye className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}