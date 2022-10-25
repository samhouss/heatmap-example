const mix = require('laravel-mix');

mix
    .vue()
    .sass('resources/scss/app.scss', 'public/dist/css/app.css')
    .js('resources/js/app.js', 'public/dist/js/app.js');
