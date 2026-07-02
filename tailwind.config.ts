import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2a24",
        sand: "#efe8dd",
        terracotta: "#c8813b",
        charcoal: "#33362f"
      },
      fontFamily: {
        display: ["Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
