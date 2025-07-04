// File: components/forms/PasswordStrengthMeter.tsx
'use client';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterProps {
  password?: string;
}

export const PasswordStrengthMeter = ({ password = '' }: PasswordStrengthMeterProps) => {
  // We only run the calculation if there's a password, to save resources.
  const testResult = password ? zxcvbn(password) : zxcvbn('');
  
  // Calculate score as a percentage (0, 25, 50, 75, 100)
  const score = testResult.score * 25;

  const getStrengthLabel = () => {
    if (!password) return ''; // Don't show a label for empty password
    switch (testResult.score) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  const getStrengthColor = () => {
    switch (testResult.score) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-400';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="w-full mt-2">
      <div className="bg-gray-200 rounded-full h-1.5">
        <div 
          className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${getStrengthColor()}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-xs text-right text-text-color-subtle h-4 mt-1">
        {getStrengthLabel()}
      </p>
    </div>
  );
};