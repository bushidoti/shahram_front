import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin";
import flowbites from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      flowbites.content(),
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
   theme: {
    screens: {
      'mobile': '360px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1600px',
    },
    extend: {},
  },
     plugins: [flowbite],
};
export default config;