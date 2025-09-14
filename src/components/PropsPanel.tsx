import React from 'react';
import type { PropControl } from '../types';

export const PropsPanel: React.FC<{
  controls: PropControl[];
  values: Record<string, any>;
  onChange: (next: Record<string, any>) => void;
}> = ({ controls, values, onChange }) => {
  const set = (name: string, v: any) => onChange({ ...values, [name]: v });

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl grid grid-cols-2 gap-4">
      {controls.map((ctrl) => (
        <label key={ctrl.name} className="flex flex-col gap-2 text-sm">
          <span className="text-gray-600 dark:text-gray-300">{ctrl.label}</span>
          {ctrl.type === 'text' && (
            <input
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              value={values[ctrl.name] ?? ''}
              onChange={(e) => set(ctrl.name, e.target.value)}
            />
          )}
          {ctrl.type === 'select' && (
            <select
              className="px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
              value={values[ctrl.name]}
              onChange={(e) => set(ctrl.name, e.target.value)}
            >
              {ctrl.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}
          {ctrl.type === 'boolean' && (
            <input
              type="checkbox"
              className="h-5 w-5"
              checked={!!values[ctrl.name]}
              onChange={(e) => set(ctrl.name, e.target.checked)}
            />
          )}
          {ctrl.type === 'number' && (
            <input
              type="range"
              min={ctrl.min ?? 0}
              max={ctrl.max ?? 100}
              step={ctrl.step ?? 1}
              value={Number(values[ctrl.name] ?? ctrl.default)}
              onChange={(e) => set(ctrl.name, Number(e.target.value))}
            />
          )}
        </label>
      ))}
    </div>
  );
};

export default PropsPanel;