const { src, dest, watch, series, parallel } = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const pug = require('gulp-pug');
const lost = require('lost');

const paths = require('./paths');
const plugins = [
  lost(),
  autoprefixer({
    grid: true,
    cascade: false,
  }),
  require('postcss-font-magician')({
    variants: {
      montserrat: {
        '300': [],
        '400': [],
        '700': [],
        '900': [],
      },
    },
    foundries: ['google'],
  }),
  cssnano({ preset: 'default' }),
];

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
  return src(paths.js.src)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sourcemaps.write(paths.maps))
    .pipe(dest(paths.js.dist));
}

//Watch

//Server
function reload(done) {
  browserSync.reload();
}

function serve() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    port: 3000,
    open: true,
  });
  watch(paths.watch.scss, css);
  watch(paths.watch.pug, html);
  watch(paths.watch.js).on('change', series(js, reload));
  watch('./build/*.html').on('change', reload);
}

//Exports
exports.css = css;
exports.html = html;
exports.js = js;
exports.default = parallel(html, js, css, serve);
