import { Config } from "tailwindcss"

const tailwindConfig: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {},
  },
}

export default tailwindConfig
