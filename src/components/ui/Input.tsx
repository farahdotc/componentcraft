import React from 'react';

type State = 'default' | 'error' | 'success';

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  state?: State;
  helper?: string;
  leftIcon?: boolean; // simple decorative icon
  disabled?: boolean;
  onChange?: (v: string) => void;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  label = 'Label',
  placeholder = 'Type here…',
  value = '',
  state = 'default',
  helper,
  leftIcon = false,
  disabled = false,
  onChange,
  className = ''
}) => {
  const ring = state === 'error' ? 'ring-2 ring-red-400 focus:ring-red-500 border-red-300' : state === 'success' ? 'ring-2 ring-emerald-400 focus:ring-emerald-500 border-emerald-300' : 'focus:ring-brand border-gray-300';
  const text = 'text-gray-900 dark:text-gray-100';
  const bg = 'bg-white dark:bg-gray-700';
  const base = `w-full px-3 py-2 rounded-xl border ${bg} ${text} ${ring}`;

  return (
    <label className={`block ${className}`}>
      {label && <span className="block text-sm mb-1 text-gray-700 dark:text-gray-300">{label}</span>}
      <div className={`relative ${disabled ? 'opacity-60' : ''}`}>
        {leftIcon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">🔎</span>
        )}
        <input
          disabled={disabled}
          className={`${base} ${leftIcon ? 'pl-9' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
      {helper && (
        <span className={`mt-1 block text-xs ${state === 'error' ? 'text-red-600' : state === 'success' ? 'text-emerald-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {helper}
        </span>
      )}
    </label>
  );
};

export default Input;