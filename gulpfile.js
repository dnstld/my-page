var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	browserSync = require("browser-sync"),
	reload = browserSync.reload,
	deleteLines = require("gulp-delete-lines"),

	// scripts
	mainJsPath = "dev/js/main.js",
	jqueryPath = "vendor/jquery/dist/jquery.js";

/**
 * compila o less, minifica o css, renomeia e salva o arquivo
 */
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
/**
 * concatena, minifica, renomeia e salva o arquivo
 */
gulp.task("scripts", function() {
	gulp.src([
			jqueryPath,
			mainJsPath
		])
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
/**
 * sincroniza os navegadores
 */
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "./"
		},
		files: [
			"index.html",
			"dev/less/**/*.less",
			"dev/js/main.js"
		]
	});
});
/**
 * remove os scripts e links do html
 */
gulp.task("production", function() {
	gulp.src("index.html")
		.pipe(plumber())
		.pipe(deleteLines({
			"filters": [
				/<script\s+src=/i
			]
		}))
		.pipe(deleteLines({
			"filters": [
				/<link\s+rel=/i
			]
		}))
		.pipe(rename({
			suffix: ".production"
		}))
		.pipe(gulp.dest("./"))
});

gulp.task("default", ["compile-less", "scripts", "browserSync"]);