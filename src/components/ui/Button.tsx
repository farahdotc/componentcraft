import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = HTMLMotionProps<'button'> & {
  variant?: Variant;
  size?: Size;
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-base'
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-700 focus:ring-brand',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) => {
  const cn =
    `inline-flex items-center justify-center rounded-xl font-medium transition ` +
    `focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ` +
    `${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return <motion.button {...rest} className={cn} />;
};

export default Button;
