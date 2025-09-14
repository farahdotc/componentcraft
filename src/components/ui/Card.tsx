import React from 'react';

export const Card: React.FC<{ title?: string; footer?: React.ReactNode; className?: string; children?: React.ReactNode }>
= ({ title, footer, className = '', children }) => (
  <div className={`bg-white dark:bg-gray-700 rounded-2xl shadow-card p-6 ${className}`}>
    {title && <div className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">{title}</div>}
    <div className="text-gray-700 dark:text-gray-100">{children}</div>
    {footer && <div className="mt-4 border-t border-gray-200 dark:border-gray-600 pt-3">{footer}</div>}
  </div>
);

export default Card;