import type { Config } from 'tailwindcss'

// we change this because of, now we are using lib/ui/tailwind.config file.
const config: Config = {
  presets: [require('../../libs/ui/tailwind.config')],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../libs/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
}
export default config
