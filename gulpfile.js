var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber");

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(minify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
});

gulp.task("default", ["compile-less"]);