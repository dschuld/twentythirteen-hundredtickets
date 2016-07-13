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


var LOCAL_WORDPRESS_THEME_DIR = '/home/david/dev/theme/twentythirteen-hundredtickets/';

var gulp = require('gulp');
var changed = require('gulp-changed'),
        jshint = require('gulp-jshint'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        imagemin = require('gulp-imagemin'),
        clean = require('gulp-clean'),
        cssnano = require('gulp-cssnano');


gulp.task('default', ['scripts', 'cssnano'], function () {
    //default aggregator
});

gulp.task('scripts-non-ugly', function () {
    return gulp.src(["./js/libs/async/async.js", "./js/libs/markerclusterer/markerclusterer_compiled.js", "./js/libs/geojson/GeoJSON.js", "./js/pluginLoader.js", "./js/wpApi.js", "./js/FuTa.js", "./js/featurefactory.js", "./js/util.js", "./js/InfoWindow.js", "./js/geomodel.js", "./js/s11_controls.js", "./js/data.js", "./js/s11.js", "./js/locationIndicator.js", "./js/photoFeed.js", "./js/places.js", "./js/routes_regions.js", "./js/help-control.js"])
            .pipe(changed('./../dist/'))
            .pipe(concat('all.js'))
            .pipe(gulp.dest('./../dist/'));
});

gulp.task('scripts', ['scripts-non-ugly'], function () {
    return gulp.src(['./../dist/all.js'])
            .pipe(uglify())
            .pipe(gulp.dest('./../dist/'));
});


gulp.task('cssnano', function () {
    return gulp.src(['./maps-style.css'])
            .pipe(changed('./../dist/'))
            .pipe(cssnano())
            .pipe(gulp.dest('./../dist/'));
});


/*
 * Deploys the uglified sources to the wordpress theme
 */
gulp.task('deploy-wordpress-prod', function () {
    gulp.src(['./js/*.js'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR + '/js'))
            .pipe(uglify())
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR + '/js'));

    gulp.src(['./*.php'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));
    
    gulp.src(['./screenshot.png'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));
    
    
    return gulp.src(['./style.css'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(cssnano())
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));

});


/*
 * Deploys the non-uglified sources to the wordpress theme 
 */
gulp.task('deploy-wordpress-test', function () {
    gulp.src(['./js/*.js'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR + '/js'))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR + '/js'));

    gulp.src(['./*.php'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));
    
    gulp.src(['./screenshot.png'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));
    
    
    return gulp.src(['./style.css'])
            .pipe(changed(LOCAL_WORDPRESS_THEME_DIR))
            .pipe(gulp.dest(LOCAL_WORDPRESS_THEME_DIR));
});



gulp.task('jshint', function () {
    return gulp.src(["./js/util.js", './js/featurefactory.js', './js/FuTa.js', './js/data.js', './js/geomodel.js', "./js/s11_controls.js", './js/s11.js', "./js/locationIndicator.js", "./js/photoFeed.js", "./js/places.js", "./js/routes_regions.js"])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});


