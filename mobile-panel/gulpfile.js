var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sh = require('shelljs');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var changed    = require('gulp-changed');
var sass       = require('gulp-sass');
var minifyCss  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var replace = require('replace');

var paths = {
  sass: ['./scss/**/*.scss']
};

var config = {
    scripts : [
        './www/js/**/*.module.js',
        './www/js/**/*.js'
    ],
    sass: './scss/**/*.scss',
    css: './www/css/',
    html: './www/**/*.html',
    dest: './www/build/',
    minJS: 'app.min.js',
    fatJS: 'app.js'
};

var replaceFiles = [config.dest + config.minJS, config.dest + config.fatJS];

gulp.task('prod', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(uglify())
        .pipe(concat(config.minJS))
        .pipe(gulp.dest(config.dest));
});

gulp.task('js', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(concat(config.fatJS))
        .pipe(gulp.dest(config.dest));
});

gulp.task('watch', function(){
    gulp.watch(config.scripts, ['js']);
    gulp.watch(config.sass, ['sass']);
});

gulp.task('sass', function(done) {
  gulp.src(config.sass)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(config.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.css))
    .on('end', done);
});

gulp.task('default', ['sass','js','watch']);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


gulp.task('add-proxy', function() {
  return replace({
    regex: "http://socket.connected.house",
    replacement: "http://localhost:8100/socket",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/socket",
    replacement: "http://socket.connected.house",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
});
