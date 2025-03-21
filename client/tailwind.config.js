import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/@heroui/theme/dist/components/(card|ripple).js"],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
