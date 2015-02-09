/*
 * This file is part of the-pool-vagrant
 *
 * (c) Elliot Wright <elliot@elliotwright.co>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

var gulp = require("gulp");
var shell = require("gulp-shell");
var watch = require("gulp-watch");

var paths = {
    src: {
        www: "/Users/seer/git/projects/byng_systems@bitbucket.org/the-pool"
    },
    dest: {
        www: "/opt/www"
    }
};

gulp.task("default", [ "sync", "watch" ]);

gulp.task("watch", function() {
    gulp.start("sync");

    watch(paths.src.www + "/**/*", function() {
        gulp.start("sync");
    });
});

gulp.task("sync", shell.task([
    "vagrant rsync"
]));
