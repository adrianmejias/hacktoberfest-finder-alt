const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');
const postCSSNested = require('postcss-nested');

require('laravel-mix-purgecss');
require('laravel-mix-postcss-config');

mix.js('assets/js/app.js', 'build')
    .postCss('assets/css/app.css', 'build')
	.options({
	    processCssUrls: false,

	    postCss: [
	    	tailwindcss
	    ],
	})
	.postCssConfig({
		plugins: [
			postCSSNested()
		]
	})
	.purgeCss({
	    enabled: mix.inProduction(),
	    extensions: ['html'],
	    folders: ['.']
	});
