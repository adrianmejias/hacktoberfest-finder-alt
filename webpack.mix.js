const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const postCSSNested = require('postcss-nested');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

require('laravel-mix-purgecss');
require('laravel-mix-postcss-config');

console.info(`Generating assets for ${process.env.NODE_ENV} environment.`);

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
    .webpackConfig({
        plugins: [
            new SWPrecacheWebpackPlugin({
                cacheId: 'hacktoberfest',
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                navigateFallback: '/index.html',
                staticFileGlobs: [
                    'public/css/**.*',
                    'public/favicons/**.*',
                    'public/images/**.*',
                    'public/js/**.*',
                    'public/index.html'
                ],
                mergeStaticsConfig: true,
                minify: mix.inProduction(),
                stripPrefix: 'public/',
                handleFetch: true,
                dynamicUrlToDependencies: {
                    '/': ['public/index.html']
                },
                staticFileGlobsIgnorePatterns: [
                    /\.map$/,
                    /mix-manifest\.json$/,
                    /manifest\.json$/,
                    /browserconfig\.xml$/,
                    /service-worker\.js$/,
                    /robots\.txt$/
                ],
                runtimeCaching: [{
                    urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/css/,
                    handler: 'cacheFirst'
                }, {
                    urlPattern: /^https:\/\/([a-z0-9]+)\.cloudfront\.net\//,
                    handler: 'cacheFirst'
                }, {
                    urlPattern: /^https:\/\/api\.github\.com\/search\/issues/,
                    handler: 'networkFirst'
                }, {
                    urlPattern: /\/(images|favicons)\/(\w+)\.(png|jpg|gif|jpeg|jpe|bmp|svg|ico)$/,
                    handler: 'cacheFirst'
                }]
            })
        ]
    })
    .extract(['vue']);

if (mix.inProduction()) {
    mix.version()
        .disableNotifications();
} else {
    mix.sourceMaps()
        .webpackConfig({
            devtool: 'inline-source-map'
        });
}
