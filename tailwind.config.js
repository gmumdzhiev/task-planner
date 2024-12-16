/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { 
    extend: { 
      fontSize: { 
        'xs': '0.75rem', 
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem', 
        'xl': '1.25rem', 
      },
      screens: { 
        'sm': '640px', 
        'md': '768px', 
        'lg': '1024px', 
        'xl': '1280px', 
      },
      animation: { 
        slideIn: 'slideIn 0.3s ease-out forwards', 
        slideOut: 'slideOut 0.3s ease-in forwards', 
      }, 
      keyframes: { 
        slideIn: { 
          '0%': { transform: 'translateX(100%)' }, 
          '100%': { transform: 'translateX(0)' }, 
        }, 
        slideOut: { 
          '0%': { transform: 'translateX(0)' },
           '100%': { transform: 'translateX(100%)' }, 
          }, 
        }, 
      }, 
    },
  plugins: [],
}