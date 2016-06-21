"use strict";
var gulp = require('gulp'),
    msbuild = require("gulp-msbuild"),
    nugetRestore = require('gulp-nuget-restore'),
    nunit = require('gulp-nunit-runner');

gulp.task('default', ['test', 'watch']);

gulp.task('watch', function() {
    gulp.watch(['**/*.cs'], ['test']);
});

gulp.task("compile", function() {
    return gulp.src("./NUnitScaffold.sln")
        .pipe(nugetRestore())
        .pipe(msbuild({
            properties: {
                Configuration: 'Debug'
            },
            toolsVersion: 14.0,
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
