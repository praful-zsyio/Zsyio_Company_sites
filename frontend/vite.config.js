import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
        glsl()
    ],
    build: {
        chunkSizeWarningLimit: 1000,
    },
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            // Proxy /api requests to the Django backend in development
            '/api': {
                target: process.env.VITE_API_BASE_URL || 'https://zsyio-company-sites-scm2.onrender.com',
                changeOrigin: true,
                secure: false,
            },

        },
    }
})
