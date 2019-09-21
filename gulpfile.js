const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const pug = require('gulp-pug');
const lost = require('lost');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const paths = require('./paths');
const plugins = [
  lost(),
  require('postcss-font-magician')({
    hosted: ['./fonts'],
  }),
];
const devPlugins = plugins.concat([autoprefixer(), cssnano()]);

//css
function css() {
  return src(paths.scss.src)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss(plugins))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(dest(paths.scss.dist))
    .pipe(browserSync.stream());
}

//Views
function html() {
  return src(paths.views.src)
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(dest(paths.views.dist))
    .pipe(browserSync.stream());
}

//Javascript
function js() {
  return (
    src(paths.js.src)
      //.pipe(sourcemaps.init({ largeFile: true }))
      .pipe(named())
      .pipe(webpack(require('./webpack.config')))
      //.pipe(sourcemaps.write(paths.maps))
      .pipe(dest(paths.js.dist))
  );
}

//Server
function reload(done) {
  browserSync.reload();
}

function serve(done) {
  browserSync.init(
    {
      server: {
        baseDir: './build',
      },
      port: 3000,
      open: true,
    },
    done,
  );
  watch(paths.watch.scss, css);
  watch(paths.watch.pug, html);
  watch(paths.watch.js).on('change', series(js, reload));
  watch('./build/*.html').on('change', reload);
}

//Clean styles and javascript
function cleanCss() {
  return src(paths.scss.src)
    .pipe(sass())
    .pipe(postcss(devPlugins))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest(paths.scss.dist));
}

function cleanJs() {
  return src(paths.js.src)
    .pipe(named())
    .pipe(webpack(require('./webpack.config.prod')))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest(paths.js.dist));
}

//Exports
exports.css = css;
exports.html = html;
exports.js = js;
exports.build = series(cleanCss, cleanJs);
exports.default = parallel(html, js, css, serve);
