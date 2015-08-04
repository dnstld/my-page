var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css");

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(less())
		.pipe(minify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
});

gulp.task("default", ["compile-less"]);