// /** @type {import('tailwindcss').Config} */
// const defaultConfig = require("shadcn/ui/tailwind.config")

// module.exports = {
//   ...defaultConfig,
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     ...defaultConfig.theme,
//     extend: {
//       ...defaultConfig.theme.extend,
//       fontFamily: {
//         inter: ["Inter", "sans-serif"],
//       },
//       colors: {
//         ...defaultConfig.theme.extend.colors,
//         lime: {
//           50: "#f7fee7",
//           100: "#ecfccb",
//           200: "#d9f99d",
//           300: "#bef264",
//           400: "#a3e635",
//           500: "#84cc16",
//           600: "#65a30d",
//           700: "#4d7c0f",
//           800: "#3f6212",
//           900: "#365314",
//         },
//         emerald: {
//           50: "#ecfdf5",
//           100: "#d1fae5",
//           200: "#a7f3d0",
//           300: "#6ee7b7",
//           400: "#34d399",
//           500: "#10b981",
//           600: "#059669",
//           700: "#047857",
//           800: "#065f46",
//           900: "#064e3b",
//           950: "#022c22",
//         },
//         neutral: {
//           50: "#fafafa",
//           100: "#f5f5f5",
//           200: "#e5e5e5",
//           300: "#d4d4d4",
//           400: "#a3a3a3",
//           500: "#737373",
//           600: "#525252",
//           700: "#404040",
//           800: "#262626",
//           900: "#171717",
//           950: "#0a0a0a",
//         },
//         animation: {
//           "fade-in": "fadeIn 0.5s ease-in-out",
//           "slide-up": "slideUp 0.5s ease-out",
//           "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//         },
//         keyframes: {
//           fadeIn: {
//             "0%": { opacity: "0" },
//             "100%": { opacity: "1" },
//           },
//           slideUp: {
//             "0%": { transform: "translateY(20px)", opacity: "0" },
//             "100%": { transform: "translateY(0)", opacity: "1" },
//           },
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lime: { /* your lime colors */ },
        emerald: { /* your emerald colors */ },
        neutral: { /* your neutral colors */ },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
        pulseSlow: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
