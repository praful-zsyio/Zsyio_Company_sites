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
                target: 'https://zsyio-company-7d1w.onrender.com' || 'http://127.0.0.1:8000',
                changeOrigin: true,
                secure: false,
            },
        },
    }
})
