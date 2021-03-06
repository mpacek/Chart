import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import less from 'gulp-less';
import path from 'path';
import LessAutoprefix from 'less-plugin-autoprefix';

// Less autoprefix configuration
const autoprefix = new LessAutoprefix({
    browsers: ['last 5 versions']
});

watchify.args.debug = true;

const sync = browserSync.create();

// Input file.
watchify.args.debug = true;
var bundler = browserify('src/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
        .on('error', function(error) {
            console.error('\nError: ', error.message, '\n');
            this.emit('end');
        })
        .pipe(exorcist('public/assets/js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
        .pipe(gulp.dest('public/assets/js'));
}

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('default', ['transpile']);

gulp.task('build', ['set-prod-node-env', 'transpile']);

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('less', () => {
    return gulp.src('src/styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('public/assets/'));
});

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('serve', ['transpile'], () => sync.init({
    server: 'public',
    port: process.env.PORT || 8000,
    host: process.env.IP || 'localhost'
}));

gulp.task('js-watch', ['transpile'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
    gulp.watch('src/**/*', ['js-watch'])
    gulp.watch('src/styles/**/*.less', ['less'])
    gulp.watch('public/assets/style.css', sync.reload)
    gulp.watch('public/index.html', sync.reload)
});
