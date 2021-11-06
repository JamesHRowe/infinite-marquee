const mix = require('laravel-mix')

mix
  .js('resources/js/infinite-marquee.js', 'assets/js')
  .js('resources/js/demo.js', 'assets/js')
  .webpackConfig({
    output: {
      library: 'InfiniteMarquee',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
  })
  .postCss('resources/css/infinite-marquee.css', 'assets/css')
  .options({
    processCssUrls: false
  })
