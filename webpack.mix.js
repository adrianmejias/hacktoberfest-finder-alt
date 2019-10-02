const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
require('laravel-mix-purgecss');

mix.setPublicPath('public')
    .js('src/js/app.js', 'public/js')
    .sass('src/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss('./tailwind.js')]
    })
    .purgeCss({
        enabled: mix.inProduction(),
        globs: [
            path.join(__dirname, 'public/index.html'),
        ],
        extensions: ['html', 'js'],
        folders: ['src']
    })
    .extract(['vue']);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
