// Include gulp
var gulp = require('gulp');

// Include Our Plugins
const less = require('gulp-less');
const path = require('path');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
const ts = require("gulp-typescript");
const babel = require('gulp-babel');

// Compile backend typescript
gulp.task("typescriptBackend", function(){
    return gulp.src('src/clientJs/*.ts')
        .pipe(ts())
        .pipe(babel())
        .pipe(gulp.dest("dist/clientJs"));
});

// Compile client typescript
gulp.task("typescriptClient", function(){
    return gulp.src('src/backendJs/*.ts')
        .pipe(ts())
        .pipe(gulp.dest("dist"));
});

gulp.task("typescript", ['typescriptBackend', 'typescriptClient']);

// build
gulp.task('build', ['typescript', 'less', 'distHTML']);

gulp.task("distHTML", function(){
    return gulp.src('src/html/*.html')
    .pipe(gulp.dest("dist"));
});

// Compile Our Less
gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['typescript']);
    gulp.watch('src/html/*.html', ['distHTML']);
    gulp.watch('less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['build']);