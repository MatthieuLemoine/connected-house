var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var changed    = require('gulp-changed');
var sass       = require('gulp-sass');
var minifyCss  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var livereload = require('gulp-livereload');

var config = {
    scripts : [
        './public/js/**/*.module.js',
        './public/js/**/*.js'
    ],
    sass: './scss/**/*.scss',
    css: './public/css/',
    html: './public/**/*.html',
    dest: './public/build/',
    minJs: 'app.min.js',
    fatJS: 'app.js'
};

gulp.task('prod', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(uglify())
        .pipe(concat(config.minJs))
        .pipe(gulp.dest(config.dest));
});

gulp.task('js', function() {
    return gulp.src(config.scripts)
        .pipe(changed(config.dest))
        .pipe(concat(config.fatJS))
        .pipe(gulp.dest(config.dest))
        .pipe(livereload());
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(config.scripts, ['js']);
    gulp.watch(config.sass, ['sass']);
    gulp.watch(config.html).on('change',function(file){
      livereload.changed(file);
    });
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
    .pipe(livereload())
    .on('end', done);
});

gulp.task('default', ['sass','js','watch']);
