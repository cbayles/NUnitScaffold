# NUnit Scaffold

This is a bare bones C# test project with .Net Framework 4.6.1. The NUnit 3.0 Nuget package is installed.


## Gulp Setup
If you want to run the unit tests automatically when a .cs file changes, you can use `gulp` to run unit tests in the command line. When a file changes, your code is automatically compiled and unit tests are run.

1. If you haven't already installed node.js, [get it here](https://nodejs.org/en/download/)

2. Install gulp:
```
npm install -g gulp-cli && npm install
```

## Usage

```
gulp
```

If you don't have .Net Framework 4.6 or Visual Studio 2015 installed, you can specify a lower msbuild version number by providing the `toolsVersion` argument like so:
```
gulp --toolsVersion=12.0
```
