import React from 'react';

const items = [
  { id: 'button', label: 'Button (lib)' },
  { id: 'card', label: 'Card' },
  { id: 'input', label: 'Input' },
  { id: 'modal', label: 'Modal' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'progress', label: 'Progress Bar' },
  { id: 'sidebar', label: 'Sidebar / Nav' }
];

export const Sidebar: React.FC<{ active: string; onSelect: (id: string) => void }> =  ({ active, onSelect }) => (
  <aside className="w-64 shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Component Library</div>
    <nav className="space-y-1">
      {items.map((it) => (
        <button
          key={it.id}
          onClick={() => onSelect(it.id)}
          className={`w-full text-left px-3 py-2 rounded-lg transition ${active === it.id ? 'bg-brand/10 text-brand' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          {it.label}
        </button>
      ))}
    </nav>
  </aside>
);

export default Sidebar;