// vite.config.js
import {resolve} from 'path'
import {defineConfig} from 'vite'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'Kiyomics',
            // the proper extensions will be added
            fileName: 'kiyomics',
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name == 'style.css') {
                        return 'kiyomics.style.css';
                    }
                    return assetInfo.name;
                },
            }
        }
    },
})
