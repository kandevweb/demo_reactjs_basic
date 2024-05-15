/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'primary-soft': 'rgb(var(--color-primary-soft) / <alpha-value>)',
        secondery: 'rgb(var(--color-secondery) / <alpha-value>)',
        bgbody: 'rgb(var(--color-bgbody) / <alpha-value>)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
