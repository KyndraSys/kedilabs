import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

const routes = [
  '/',
  '/about',
  '/programs',
  '/partners',
  '/blog',
  '/blog/blogdetail',
  '/contact',
];

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Kedi Labs - Transforming STEM Education',
          description: 'Empowering Africa\'s next generation of engineers and innovators through digital STEM education.',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});