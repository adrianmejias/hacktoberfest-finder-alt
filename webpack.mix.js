const mix = require("laravel-mix");

console.info(`Generating assets for ${process.env.NODE_ENV} environment.`);

mix.setPublicPath("public")
    .js("src/js/app.js", "public/js")
    .vue({ version: 3 })
    .postCss("src/css/app.css", "public/css", [
        require("tailwindcss"),
        require("postcss-nested"),
    ])
    .options({
        processCssUrls: false,
    })
    .extract(["vue"]);

if (mix.inProduction()) {
    mix.version().disableNotifications();
} else {
    mix.sourceMaps().webpackConfig({
        devtool: "inline-source-map",
    });
}
