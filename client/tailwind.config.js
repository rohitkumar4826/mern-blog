
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Include Flowbite components (JS files)
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Import Flowbite plugin directly
    import('flowbite/plugin'),
  ],
};
