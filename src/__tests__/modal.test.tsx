import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Modal } from '../components/ui/Modal';

describe('Modal a11y', () => {
  it('calls onClose on Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Test" onClose={onClose}>
        <button>Focusable</button>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose on outside click', () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <Modal open title="Test" onClose={onClose}>
        <button>Focusable</button>
      </Modal>
    );
  
    // In the portal version, the overlay is the parent of the dialog
    const dialog = getByRole('dialog');
    const overlay = dialog.parentElement as HTMLElement;
  
    fireEvent.mouseDown(overlay);
    expect(onClose).toHaveBeenCalled();
  });
  

  it('traps focus within dialog when Tab cycles', async () => {
    const onClose = vi.fn();
    const { getByRole, getByText } = render(
      <Modal open title="Trap" onClose={onClose}>
        <button>Inner</button>
      </Modal>
    );
    const dialog = getByRole('dialog');
    const closeBtn = getByText('Close'); // footer button
    const innerBtn = getByText('Inner');

// wait for the effect to move focus inside the dialog
   await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    // tab repeatedly cycles between first and last focusables
    fireEvent.keyDown(document, { key: 'Tab' });
    fireEvent.keyDown(document, { key: 'Tab' });
    // We can't guarantee exact element without DOM order,
    // but focus should remain inside the dialog.
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Shift+Tab also stays inside
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(dialog.contains(document.activeElement)).toBe(true);

    // sanity: both known focusables are inside the dialog
    expect(dialog.contains(closeBtn)).toBe(true);
    expect(dialog.contains(innerBtn)).toBe(true);
  });
});
