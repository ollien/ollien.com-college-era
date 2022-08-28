var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var autoprefixer = require("gulp-autoprefixer");
var gulpif = require("gulp-if");
var clean_css = require("gulp-clean-css");
var yargs = require("yargs");

// Write scss to file. Use prod flog to minify css, or the dest flag to set the destination of the build
exports.sass = function() {
	let dest = yargs.argv.hasOwnProperty("dest") ? yargs.argv.dest : "./";
	return gulp.src("./index.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulpif(yargs.argv.hasOwnProperty("prod"), clean_css()))
		.pipe(gulp.dest(dest));
};

exports.watch = function() {
	var sassWatch = gulp.watch("./index.scss", ["sass"])
	sassWatch.on("change", function (event) {
		console.log("Event '"+ event.type + "' detected on " + event.path + ". Running sass.");
	});
};

exports.default = exports.sass;
