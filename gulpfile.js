
'use strict';

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const cpr = require('cpr');
const gulp = require('gulp');
const pug = require('gulp-pug');
const git = require('gulp-git');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

const config = require('./config.json');

gulp.task('html', ['prepareGit'], () => {
  return gulp.src('./src/templates/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'));
});

gulp.task('sass', ['prepareGit'], () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', ['prepareGit'], () => {
  return gulp.src('./src/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

function copyOverGitRepo(cb) {
  console.log('Clearing build...');
  rimraf(path.join(__dirname , 'build'), (err) => {
    if(err) throw err;
    console.log('Copying repo...')
    cpr(path.join(__dirname , 'tmpGit'), path.join(__dirname , 'build'), {
      confirm: true //After the copy, stat all the copied files to make sure they are there
    }, function(err) {
      if(err) throw err;
      cb();
    });
  });
}

gulp.task('prepareGit', (cb) => {
  fs.access(path.join(__dirname , 'tmpGit'), fs.constants.F_OK, (err) => {
    if(err) {
      console.log('Directory does not exist, cloning...');
      git.clone(config.target.repo, {args: `./tmpGit --single-branch --depth 1 --branch ${ config.target.branch }`}, (err) => {
        if(err) throw err;
        copyOverGitRepo(cb);
      });
    } else {
      console.log('Directory exists, pulling...');
      git.pull('origin', 'master', {cwd: path.join(__dirname , 'tmpGit')}, (err) => {
        if(err) throw err;
        copyOverGitRepo(cb);
      });
    }
  });
});

gulp.task('default', [ 'prepareGit', 'js', 'html', 'sass' ]);
