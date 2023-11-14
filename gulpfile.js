'use strict';
import gulp from 'gulp';
import concat from 'gulp-concat';

const paths = {
    source: {
        js: ['src/js/**/*.js'],
        css: 'src/css/*.css',
        workers: 'src/js/workers/**/*.js',
    },
    dist: {
        js: 'dist/js',
        css: 'dist/css',
    },
};

gulp.task('js', function () {
    gulp.src(paths.source.js, {
        allowEmpty: true,
    })
        .pipe(concat('retrocade.js'))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('css', function () {
    gulp.src(paths.source.css, {
        allowEmpty: true,
    })
        .pipe(concat('retrocade.css'))
        .pipe(gulp.dest(paths.dist.js));
});

// New task for bundling worker files
gulp.task('workers', function () {
    gulp.src(paths.source.workers, {
        allowEmpty: true,
    })
        .pipe(concat('workers.js'))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('watch', function () {
    gulp.watch(paths.source.js, gulp.parallel(['js']));
    gulp.watch(paths.source.css, gulp.parallel(['css']));
    gulp.watch(paths.source.workers, gulp.parallel(['workers'])); // Watch worker files
});

gulp.task('default', gulp.parallel(['js', 'css', 'workers'])); // Include 'workers' task in the default task
