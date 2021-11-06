const mix = require('laravel-mix')

mix
  .js('resources/js/demo.js', 'assets/js')
  .postCss('resources/css/infinite-marquee.css', 'assets/css')
  .options({
    processCssUrls: false
  })
