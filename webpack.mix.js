const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const postCSSNested = require('postcss-nested');

require('laravel-mix-purgecss');
require('laravel-mix-postcss-config');

mix.setPublicPath('public')
    .js('src/js/app.js', 'public/js')
    .postCss('src/css/app.css', 'public/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss]
    })
    .postCssConfig({
        plugins: [postCSSNested()]
    })
    .purgeCss({
        enabled: mix.inProduction(),
        globs: [path.join(__dirname, 'public/index.html')],
        extensions: ['html', 'js'],
        folders: ['src', 'public']
    })
    .extract(['vue']);

if (mix.inProduction()) {
    mix.version();
} else {
    mix.sourceMaps();
}
