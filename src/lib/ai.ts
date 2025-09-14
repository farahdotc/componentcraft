const KEYWORDS: Record<string, string[]> = {
  button: ['button', 'cta', 'click', 'primary', 'secondary', 'submit'],
  card: ['card', 'panel', 'tile', 'summary'],
  input: ['input', 'text field', 'textfield', 'form', 'email', 'search', 'textbox'],
  modal: ['modal', 'dialog', 'popup'],
  tabs: ['tabs', 'tab', 'switch views'],
  progress: ['progress', 'stepper', 'loading bar', 'status'],
  sidebar: ['sidebar', 'navigation', 'nav']
};

export function suggestComponents(prompt: string): string[] {
  const p = prompt.toLowerCase();
  const scores = Object.keys(KEYWORDS).map((id) => {
    const hits = KEYWORDS[id].filter((k) => p.includes(k)).length;
    return { id, score: hits };
  });
  return scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.id);
}