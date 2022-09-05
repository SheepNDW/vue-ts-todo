import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons';
import transformerDirective from '@unocss/transformer-directives';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [presetUno(), presetIcons()],
      transformers: [transformerDirective()],
      rules: [
        ['shadow-normal', { 'box-shadow': '0px 0px 24px rgba(0, 0, 0, 0.15)' }],
        ['shadow-light', { 'box-shadow': '0px 0px 24px rgba(0, 0, 0, 0.08)' }],
      ],
      shortcuts: {
        wrapper:
          'md:w-[60%] w-[85%] max-w-[400px] sm:px-12 px-8 py-7 rounded-[1.5rem] bg-[#f5f6fc] shadow-normal',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
