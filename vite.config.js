import { defineConfig } from 'vite';
import symaPlugin from '@syma/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
  plugins: [
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        // Apply optimization to all images
        return new URLSearchParams({
          format: 'webp;avif;png',
          quality: '80',
          w: '800;1200;1600',
          picture: true
        });
      }
    }),
    symaPlugin({
      entryModule: 'App/Main',
      modulesDir: 'src'
    })
  ]
});
