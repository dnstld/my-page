var gulp = require("gulp"),
	less = require("gulp-less"),
	minify = require("gulp-minify-css");

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(less())
		.pipe(minify())
		.pipe(gulp.dest("dist/css"))
});

gulp.task("default", ["compile-less"]);