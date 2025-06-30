import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js'
            ],
            refresh: true,
        }),
        vue({
            template: {
                base: null,
                includeAbsolute: false
            }
        }),
        // Remova ou substitua esta linha pelo seu plugin i18n real:
        // i18n(),
    ],
    
    resolve: {
        alias: {
            'global': 'global/window',
            '@': '/resources/js',
            'ziggy': '/vendor/tightenco/ziggy/dist/vue.es.js',
        }
    },
    
    define: {
        global: 'window',
        'process.env': process.env
    },
    
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            'axios',
        ],
        esbuildOptions: {
            define: {
                global: 'globalThis'
            }
        }
    },
    
    server: {
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
        }
    },
    
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks: {
                    'pixi.js': ['pixi.js'],
                    'vendor': [
                        'vue',
                        'vue-router',
                        'axios'
                    ],
                }
            }
        }
    }
});