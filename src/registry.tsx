// src/registry.tsx
import React from 'react';
import type { ComponentSchema } from './types';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { Tabs } from './components/ui/Tabs';
import { Progress } from './components/ui/Progress';

export const REGISTRY: Record<string, ComponentSchema & { Preview: React.FC<any> }> = {
  button: {
    id: 'button',
    name: 'Button',
    description: 'Versatile CTA button with variants and sizes.',
    previewHeight: 120,
    initialProps: { children: 'Click me', variant: 'primary', size: 'md', disabled: false },
    controls: [
      { type: 'text', name: 'children', label: 'Label', default: 'Click me' },
      { type: 'select', name: 'variant', label: 'Variant', options: ['primary', 'secondary', 'destructive'], default: 'primary' },
      { type: 'select', name: 'size', label: 'Size', options: ['sm', 'md', 'lg'], default: 'md' },
      { type: 'boolean', name: 'disabled', label: 'Disabled', default: false }
    ],
    toCode: (p) =>
      [
        '<Button variant="', String(p.variant), '" size="', String(p.size), '" ',
        (p as any).disabled ? 'disabled ' : '',
        '>',
        String((p as any).children),
        '</Button>'
      ].join(''),
    Preview: (p) => <Button {...p} />
  },

  card: {
    id: 'card',
    name: 'Card',
    description: 'Content container with optional title and footer.',
    previewHeight: 200,
    initialProps: { title: 'Card Title', children: 'This is a card body.', footer: 'Footer content' },
    controls: [
      { type: 'text', name: 'title', label: 'Title', default: 'Card Title' },
      { type: 'text', name: 'children', label: 'Body', default: 'This is a card body.' },
      { type: 'text', name: 'footer', label: 'Footer', default: 'Footer content' }
    ],
    toCode: (p) =>
      [
        '<Card title="', String(p.title), '" footer={<>', String(p.footer), '</>}>',
        String(p.children),
        '</Card>'
      ].join(''),
    Preview: (p) => <Card {...p} />
  },

  input: {
    id: 'input',
    name: 'Input',
    description: 'Text field with label, helper and validation states.',
    previewHeight: 140,
    initialProps: {
      label: 'Email',
      placeholder: 'you@example.com',
      value: '',
      state: 'default',
      helper: 'We’ll never share your email.',
      leftIcon: true
    },
    controls: [
      { type: 'text', name: 'label', label: 'Label', default: 'Email' },
      { type: 'text', name: 'placeholder', label: 'Placeholder', default: 'you@example.com' },
      { type: 'text', name: 'value', label: 'Value', default: '' },
      { type: 'select', name: 'state', label: 'State', options: ['default', 'error', 'success'], default: 'default' },
      { type: 'boolean', name: 'leftIcon', label: 'Show Icon', default: true },
      { type: 'text', name: 'helper', label: 'Helper Text', default: 'We’ll never share your email.' }
    ],
    toCode: (p) => {
      const helperProp = (p as any).helper ? ' helper="…"' : '';
      return [
        '<Input label="', String((p as any).label),
        '" placeholder="', String((p as any).placeholder),
        '" value="', String((p as any).value),
        '" state="', String((p as any).state),
        '" leftIcon={', String((p as any).leftIcon), '}',
        helperProp,
        ' />'
      ].join('');
    },
    Preview: (p) => <Input {...p} />
  },

  modal: {
    id: 'modal',
    name: 'Modal',
    description: 'Accessible dialog with overlay and animation.',
    previewHeight: 260,
    initialProps: { open: true, title: 'Modal Title', children: 'Hello from the modal!' },
    controls: [
      { type: 'boolean', name: 'open', label: 'Open', default: true },
      { type: 'text', name: 'title', label: 'Title', default: 'Modal Title' },
      { type: 'text', name: 'children', label: 'Body', default: 'Hello from the modal!' }
    ],
    toCode: (p) =>
      [
        '<Modal open={', String(p.open), '} onClose={()=>{}} title="', String(p.title), '">',
        String(p.children),
        '</Modal>'
      ].join(''),
    // Stateful preview with prop sync
    Preview: (p) => {
      const [open, setOpen] = React.useState<boolean>(!!p.open);
      React.useEffect(() => {
        setOpen(!!p.open);
      }, [p.open]);

      return (
        <div className="flex flex-col items-center gap-3">
          <Modal open={open} title={String(p.title)} onClose={() => setOpen(false)}>
            {String(p.children)}
          </Modal>
          <Button variant="primary" size="sm" onClick={() => setOpen(true)}>
            Open Modal
          </Button>
        </div>
      );
    }
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    description: 'Simple tab switcher.',
    previewHeight: 120,
    initialProps: { value: 'a' },
    controls: [
      { type: 'select', name: 'value', label: 'Active', options: ['a', 'b', 'c'], default: 'a' }
    ],
    toCode: (p) =>
      [
        '<Tabs tabs={[{key:\'a\',label:\'A\'},{key:\'b\',label:\'B\'},{key:\'c\',label:\'C\'}]} value="',
        String(p.value),
        '" onChange={()=>{}} />'
      ].join(''),
    Preview: (p) => (
      <Tabs
        tabs={[{ key: 'a', label: 'A' }, { key: 'b', label: 'B' }, { key: 'c', label: 'C' }]}
        value={(p as any).value}
        onChange={() => {}}
      />
    )
  },

  progress: {
    id: 'progress',
    name: 'Progress Bar',
    description: 'Linear progress indicator.',
    previewHeight: 60,
    initialProps: { value: 40 },
    controls: [
      { type: 'number', name: 'value', label: 'Value', min: 0, max: 100, step: 1, default: 40 }
    ],
    toCode: (p) => ['<Progress value={', String(p.value), '} />'].join(''),
    Preview: (p) => <Progress value={(p as any).value as number} />
  },

  sidebar: {
    id: 'sidebar',
    name: 'Sidebar / Nav',
    description: 'Basic vertical navigation surface.',
    previewHeight: 220,
    initialProps: { items: ['Home', 'Projects', 'Settings'], active: 'Home' },
    controls: [{ type: 'text', name: 'active', label: 'Active Label', default: 'Home' }],
    toCode: (p) =>
      '/* pseudo */ <Sidebar items={["Home","Projects","Settings"]} active="' + String((p as any).active) + '" />',
    Preview: (p) => (
      <div className="w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-card p-3">
        {(((p as any).items as string[]) || ['Home', 'Projects', 'Settings']).map((it) => (
          <div
            key={it}
            className={`px-3 py-2 rounded-lg ${
              (p as any).active === it ? 'bg-brand/10 text-brand' : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            {it}
          </div>
        ))}
      </div>
    )
  }
};

export const orderedIds = Object.keys(REGISTRY);
