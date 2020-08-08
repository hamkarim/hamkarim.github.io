var gulp = require('gulp');
var bs = require('browser-sync').create();

gulp.task('browser-sync', [], function() {
    bs.init({
        server: {
            baseDir: "./"
        },
    });
});

gulp.task('watch', ['browser-sync'], function () {
	// configure what files to watch
    gulp.watch(["**/*.html","**/*.css", "**/*.js"])
    	.on('change', bs.reload);
});