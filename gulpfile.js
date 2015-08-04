var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

gulp.task("compile-less", function() {
	gulp.src("dev/less/main.less")
		.pipe(plumber())
		.pipe(less())
		.pipe(minify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(reload({
			stream: true
		}))
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
		.pipe(reload({
			stream: true
		}))
});

gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "./"
		},
		files: [
			"index.html",
			"dev/less/main.less",
			"dev/js/main.js"
		]
	});
});

gulp.task("default", ["compile-less", "scripts", "browserSync"]);









