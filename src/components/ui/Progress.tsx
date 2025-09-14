import React from 'react';

export const Progress: React.FC<{ value: number }> =  ({ value }) => (
  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
    <div className="h-full bg-brand" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
);

export default Progress;