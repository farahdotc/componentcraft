export type PropControl =
  | { type: 'text'; name: string; label: string; default: string }
  | { type: 'select'; name: string; label: string; options: string[]; default: string }
  | { type: 'boolean'; name: string; label: string; default: boolean }
  | { type: 'number'; name: string; label: string; min?: number; max?: number; step?: number; default: number };

export type ComponentSchema = {
  id: string;
  name: string;
  description: string;
  previewHeight?: number;
  initialProps: Record<string, unknown>;
  controls: PropControl[];
  // function that turns props into JSX string for copy
  toCode: (props: Record<string, unknown>) => string;
};