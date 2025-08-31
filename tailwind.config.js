/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "animate-spin", // ✅ ensure spinner class is never purged
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
