module.exports = {
  scss: {
    src: './scss/*.scss',
    dist: './build/css',
  },
  views: {
    src: './views/*.pug',
    dist: './build',
  },
  js: {
    src: './js/*.js',
    dist: './build/js',
  },
  watch: {
    scss: './scss/**/*',
    pug: './views/**/*',
    js: './js/**/*',
  },
  maps: './maps',
};
