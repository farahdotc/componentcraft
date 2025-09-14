export default {
    darkMode: 'class',
    content: [
      './index.html',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            DEFAULT: '#4f46e5',
            50: '#eef2ff',
            100: '#e0e7ff',
            600: '#4f46e5',
            700: '#4338ca'
          }
        },
        boxShadow: {
          card: '0 10px 25px -10px rgba(0,0,0,0.25)'
        }
      }
    },
    plugins: []
  };
  