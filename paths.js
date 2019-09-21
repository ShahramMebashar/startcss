const path = require('path');

const dirPath = function(p) {
  return path.resolve(__dirname, p);
};

module.exports = {
  scss: {
    src: dirPath('scss/*.scss'),
    dist: dirPath('build/css'),
  },
  views: {
    src: dirPath('views/*.pug'),
    dist: dirPath('build'),
  },
  js: {
    src: dirPath('js/*.js'),
    dist: dirPath('build/js'),
  },
  watch: {
    scss: dirPath('scss/**/*'),
    pug: dirPath('views/**/*'),
    js: dirPath('js/**/*'),
  },
  maps: './maps',
};
