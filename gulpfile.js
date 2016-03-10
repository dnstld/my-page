var gulp = require("gulp"),
	less = require("gulp-less"),
	rename = require("gulp-rename"),
	minify = require("gulp-minify-css"),
	plumber = require("gulp-plumber"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	browserSync = require("browser-sync").create();
	deleteLines = require("gulp-delete-lines"),
	insertLines = require("gulp-insert-lines"),

	// scripts
	jquery = "node_modules/jquery/dist/jquery.js",
	smoothScroll = "node_modules/jquery-smooth-scroll/jquery.smooth-scroll.js",
	jqueryValidate = "node_modules/jquery-validation/dist/jquery.validate.js",
	mainJs = "dev/js/main.js";

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
	gulp.src([
			jquery,
			smoothScroll,
			jqueryValidate,
			mainJs
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
});

gulp.task("browserSync", function() {
    browserSync.init({
        server: {
			baseDir: "./",
		},
		browser: "google-chrome",
		files: [
			"index.html",
			"dev/less/**/*.less",
			"dev/js/main.js"
		]
    });
});

gulp.task("production", function() {
	gulp.src("index.html")
		.pipe(plumber())
		.pipe(deleteLines({
			"filters": [
				/<link\s+rel=/i
			]
		}))
		.pipe(insertLines({
			"before": /<\/head>$/,
			"lineBefore": '        <link rel="stylesheet" type="text/css" href="dist/css/main.min.css">',
	    }))
		.pipe(deleteLines({
			"filters": [
				/<script\s+src=/i
			]
		}))
	    .pipe(insertLines({
			"before": /<\/body>$/,
			"lineBefore": '        <script src="dist/js/main.min.js"></script>'
	    }))
		.pipe(rename({
			suffix: ".production"
		}))
		.pipe(gulp.dest("./"))
});

gulp.task("default", ["compile-less", "scripts", "browserSync"]);