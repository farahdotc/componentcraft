import React from 'react';
import Sidebar from './components/Sidebar';
import PropsPanel from './components/PropsPanel';
import CodeBlock from './components/CodeBlock';
import TopBar from './components/TopBar';
import { REGISTRY, orderedIds } from './registry';

function useTheme() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() =>
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}

const App: React.FC = () => {
  const { theme, toggle } = useTheme();
  const [activeId, setActiveId] = React.useState<string>(orderedIds[0]);
  const schema = REGISTRY[activeId];
  const [values, setValues] = React.useState<Record<string, any>>(schema.initialProps);
  const [aiSuggestions, setAISuggestions] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    setValues(schema.initialProps);
  }, [activeId]);

  const code = `import { ${schema.name.replace(/\s/g, '')} } from "@/components/ui"\n\n${schema.toCode(values)}`;

  return (
    <div className="flex flex-col h-screen">
      <TopBar
        theme={theme}
        onThemeToggle={toggle}
        onAISearch={(ids) => {
          setAISuggestions(ids.length ? ids : ['button']);
        }}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active={activeId}
          onSelect={(id) => {
            setAISuggestions(null);
            setActiveId(id);
          }}
        />
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {aiSuggestions && (
            <section>
              <div className="text-sm text-gray-500 mb-2">✨ AI Suggested Components</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {aiSuggestions.map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveId(id);
                      setAISuggestions(null);
                    }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-card text-left hover:ring-2 hover:ring-brand transition"
                  >
                    <div className="font-medium">{REGISTRY[id].name}</div>
                    <div className="text-xs text-gray-500 mt-1">{REGISTRY[id].description}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-3">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{schema.name} Component</div>
            <div className="text-sm text-gray-500">{schema.description}</div>
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 flex items-center justify-center"
              style={{ height: schema.previewHeight ?? 180 }}
            >
              <schema.Preview {...values} />
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">Props</div>
            <PropsPanel controls={schema.controls} values={values} onChange={setValues} />
          </section>

          <section className="space-y-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">Code</div>
            <CodeBlock code={code} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
