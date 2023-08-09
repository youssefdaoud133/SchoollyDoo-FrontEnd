/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      cursor: {
        fancy: "url(hand.cur), pointer",
      },
    },
  },
  corePlugins: {
    // Enable all core plugins (components)
    preflight: true,
    container: true,
    accessibility: true,
    pointerEvents: true,
    formField: true,
    grid: true,
    tableLayout: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    transform: true,
    translate: true,
    scale: true,
    rotate: true,
    skew: true,
    transitionProperty: true,
    transitionTimingFunction: true,
    transitionDuration: true,
    transitionDelay: true,
    animation: true,
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};

// // tailwind.config.js
// /**@type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       cursor: {
//         fancy: "url(hand.cur), pointer",
//       },
//     },
//   },

//   // Other configurations...
//   corePlugins: {
//     // Enable all core plugins (components)
//     preflight: true,
//     container: true,
//     accessibility: true,
//     pointerEvents: true,
//     formField: true,
//     grid: true,
//     tableLayout: true,
//     gridColumn: true,
//     gridColumnEnd: true,
//     gridColumnStart: true,
//     gridRow: true,
//     gridRowEnd: true,
//     gridRowStart: true,
//     transform: true,
//     translate: true,
//     scale: true,
//     rotate: true,
//     skew: true,
//     transitionProperty: true,
//     transitionTimingFunction: true,
//     transitionDuration: true,
//     transitionDelay: true,
//     animation: true,
//   },
//   plugins: [
//     // Enable all other additional plugins (components)
//     require("@tailwindcss/aspect-ratio"),
//     require("@tailwindcss/forms"),
//     require("@tailwindcss/line-clamp"),
//     // Add other plugins as needed...
//   ],
// };
