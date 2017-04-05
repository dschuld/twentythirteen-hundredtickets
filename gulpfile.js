/* 
 * Copyright 2015 schuldd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless  required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var gulp = require('gulp');
var changed = require('gulp-changed'),
        uglify = require('gulp-uglify');

var devDir = process.env.LOCAL_DEV_THEME_DIR;
var prodDir = process.env.LOCAL_PROD_THEME_DIR;

gulp.task('deploy-themes', ['deploy-theme-prod','deploy-theme-dev'], function () {
    //aggregator task

});


/*
 * Deploys the uglified sources to the wordpress theme
 */
gulp.task('deploy-theme-prod', function () {
    gulp.src(['./js/*.js'])
            .pipe(uglify())
            .pipe(gulp.dest(prodDir + '/js'));

    gulp.src(['./*.php'])
            .pipe(gulp.dest(prodDir));
    
    gulp.src(['./screenshots/prod/screenshot.png'])
            .pipe(changed(prodDir))
            .pipe(gulp.dest(prodDir));
    
    
    return gulp.src(['./style.css'])
            .pipe(gulp.dest(prodDir));

});


/*
 * Deploys the non-uglified sources to the wordpress theme 
 */
gulp.task('deploy-theme-dev', function () {
    gulp.src(['./js/*.js'])
            .pipe(gulp.dest(devDir + '/js'));

    gulp.src(['./*.php'])
            .pipe(gulp.dest(devDir));
    
     return gulp.src(['./screenshots/dev/screenshot.png'])
            .pipe(changed(devDir))
            .pipe(gulp.dest(devDir));
    
});
