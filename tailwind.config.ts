import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2a24",
        sand: "#efe8dd",
        terracotta: "#c8813b",
        charcoal: "#33362f",
        gold: "#c9a13b"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        logo: ["Jost", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
