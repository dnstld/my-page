var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat");

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

gulp.task("scripts", function() {
	gulp.src("dev/js/main.js")
		.pipe(plumber())
		.pipe(concat("main.js"))
		.pipe(uglify().on("error", function() {
			console.log(err);
		}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/js/"))
});

gulp.task("default", ["compile-less", "scripts"]);