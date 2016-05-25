/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        '@angular/common': 'node_modules/@angular/common/common.umd.js',
        '@angular/compiler': 'node_modules/@angular/compiler/compiler.umd.js',
        '@angular/core': 'node_modules/@angular/core/core.umd.js',
        '@angular/http': 'node_modules/@angular/http/http.umd.js',
        '@angular/platform-browser': 'node_modules/@angular/platform-browser/platform-browser.umd.js',
        '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/platform-browser-dynamic.umd.js',
        '@angular/router-deprecated': 'node_modules/@angular/router-deprecated/router-deprecated.umd.js',
        '@angular/router': 'node_modules/@angular/router/router.umd.js',
        'rxjs': 'node_modules/rxjs',
        'primeng': 'node_modules_custom/primeng'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'primeng': { defaultExtension: 'js' }
    };
    
    var config = {
        map: map,
        packages: packages
    }
    System.config(config);
})(this);
