/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-pattern": `radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, #ffffff 1px)`,
      },
      backgroundSize: {
        "20px": "20px 20px",
      },
      backgroundPosition: {
        offset: "0 0, 10px 10px",
      },
    },
  },
  plugins: [],
};
