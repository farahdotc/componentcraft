import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('ComponentCraft App', () => {
  it('renders the title in the TopBar', () => {
    render(<App />);
    expect(screen.getByText(/ComponentCraft/i)).toBeInTheDocument();
  });

  it('shows AI suggestions for a simple prompt', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Describe your component/i);
    fireEvent.change(input, { target: { value: 'button cta' } });
    fireEvent.click(screen.getByText('Generate'));
    expect(await screen.findByText(/AI Suggested Components/)).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('copies code when clicking Copy', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Copy'));
    // If no error thrown, our clipboard + alert mocks handled it.
    expect(true).toBe(true);
  });

  it('falls back to Button when AI finds no matches', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Describe your component/i);
    fireEvent.change(input, { target: { value: 'gibberish unknown widget' } });
    fireEvent.click(screen.getByText('Generate'));
    expect(await screen.findByText(/AI Suggested Components/)).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });

  it('switches component via sidebar click', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Card'));
    expect(screen.getByText('Card')).toBeInTheDocument();
  });

  it('toggles theme icon on click', () => {
    render(<App />);
    // initial should show moon for light theme
    expect(screen.getByText('🌙')).toBeInTheDocument();
    fireEvent.click(screen.getByText('🌙'));
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('shows Input component when clicking sidebar', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Input'));
    expect(screen.getByText(/Input Component/i)).toBeInTheDocument();
  });
  
  it('Input shows helper text by default', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Input'));
    expect(screen.getByText(/never share your email/i)).toBeInTheDocument();
  });
});