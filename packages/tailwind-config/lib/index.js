/**
 * Tailwind CSS 配置项
 * https://tailwindcss.com/docs/configuration#configuration-options
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  plugins: [require('./plugins/flex-center')]
}
