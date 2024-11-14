import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    base: '/E-Commerce/', // Set this to your repository name for GitHub Pages
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/react_app/App.jsx'],
            refresh: true,
        }),
    ],
});
