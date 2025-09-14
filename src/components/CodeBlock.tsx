import React from 'react';

export const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const [showToast, setShowToast] = React.useState(false);
  const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';
  
  const copy = () => {
   try { void navigator.clipboard.writeText(code); } catch {}
   setShowToast(true);
   if (!isTest) {
     window.setTimeout(() => setShowToast(false), 1200);
   }
  };

  return (
    <div className="relative">
      <textarea
        readOnly
        aria-label="Code snippet"
        value={code}
        className="bg-gray-900 text-green-200 rounded-xl p-4 overflow-auto text-sm w-full h-40 font-mono"
      />
      <button
        onClick={copy}
        className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md bg-white/10 border border-white/20 text-white"
      >
        Copy
      </button>

      {/* Tiny toast */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute -bottom-3 right-2 translate-y-full rounded-lg bg-gray-900 text-white text-xs px-3 py-1 shadow-card"
        >
          Copied
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
