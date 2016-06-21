"use strict";

var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    nugetRestore = require('gulp-nuget-restore'),
    nunit = require('gulp-nunit-runner');

gulp.task('default', ['test', 'watch']);

gulp.task('watch', function() {
    gulp.watch(['**/*.cs'], ['test']);
});

function getArgOrDefault(key, defaultVal){
    for (let arg of process.argv) {
      if (!arg.startsWith('--') || !arg.includes('=')) continue;
      let argKey = arg.substring(2, arg.indexOf('='));
      let argValue = arg.split('=')[1];
      if (argKey === key) {
        return argValue;
      }
    }
    return defaultVal;
};

gulp.task("compile", function() {
    let toolsVersion = getArgOrDefault('toolsVersion', 14.0)-0;
    return gulp.src("./NUnitScaffold.sln")
        .pipe(nugetRestore())
        .pipe(msbuild({
            properties: {
                Configuration: 'Debug'
            },
            toolsVersion: toolsVersion,
            stdout: true
        }));
});

gulp.task('test', ['compile'], function() {
    return gulp.src(['**/bin/Debug/NUnitScaffold.dll'], {
            read: false
        })
        .pipe(nunit({
                executable: './packages/NUnit.ConsoleRunner.3.2.1/tools/nunit3-console.exe',
                options: {
                    noheader: true,
                    noresult: true,
                    config: 'Debug',
                    framework: 'net-4.5'
                }
            })
            );
}).on('error', function() {
    this.emit('end');
});
