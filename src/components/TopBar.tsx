import React from 'react';
import { suggestComponents } from '../lib/ai';
import { Button as UIButton } from './ui/Button';

export const TopBar: React.FC<{
onAISearch: (ids: string[]) => void;
onThemeToggle: () => void;
theme: 'light' | 'dark';
}> = ({ onAISearch, onThemeToggle, theme }) => {
const [prompt, setPrompt] = React.useState('');
return (
<header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur flex items-center gap-4 px-4">
<div className="font-semibold tracking-tight">ComponentCraft</div>
<div className="flex-1 flex items-center gap-2">
<input
value={prompt}
onKeyDown={(e) => { if (e.key === 'Enter') { onAISearch(suggestComponents(prompt)); } }}
onChange={(e) => setPrompt(e.target.value)}
placeholder="✨ Describe your component…"
className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
/>
<UIButton
onClick={() => onAISearch(suggestComponents(prompt))}
variant="primary"
size="md"
>
Generate
</UIButton>
</div>
<button onClick={onThemeToggle} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
{theme === 'dark' ? '☀️' : '🌙'}
</button>
</header>
);
};

export default TopBar;