import React from 'react';

export interface Tab { key: string; label: string }

export const Tabs: React.FC<{ tabs: Tab[]; value: string; onChange: (k: string) => void }>
= ({ tabs, value, onChange }) => (
  <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl w-max">
    {tabs.map((t) => (
      <button
        key={t.key}
        onClick={() => onChange(t.key)}
        className={`px-4 py-2 rounded-lg text-sm transition ${value === t.key ? 'bg-white dark:bg-gray-700 shadow' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'}`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

export default Tabs;