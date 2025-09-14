// src/components/ui/Modal.tsx
import React from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

export const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const prevFocusRef = React.useRef<Element | null>(null);
  const prevOverflowRef = React.useRef<string>('');
  const titleId = React.useId();
  const descId = React.useId();

  const handleOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  React.useEffect(() => {
    if (!open) return;

    prevFocusRef.current = document.activeElement;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      (items[0] ?? dialog).focus();
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (items.length === 0) return;

        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (!active || active === first || !dialog.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (!active || active === last || !dialog.contains(active)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    // Focus immediately so jsdom + real DOM both behave well
    focusFirst();
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflowRef.current;
      if (prevFocusRef.current instanceof HTMLElement) prevFocusRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const node = (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayMouseDown}
      className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descId}
        tabIndex={-1}
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-800 shadow-card outline-none"
      >
        <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
          {title ? (
            <h2 id={titleId} className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            aria-label="Close"
            className="px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <div id={descId} className="p-4 text-gray-800 dark:text-gray-100">
          {children}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-brand text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default Modal;
