require.config({
    baseUrl: '/js/',
    paths: {
        "jquery": '../lib/jquery/jquery',
        "underscore": '../lib/underscore/underscore',
        "backbone": '../lib/backbone/backbone',
        "backbone.wreqr": '../lib/backbone.wreqr/lib/backbone.wreqr',
        "backbone.babysitter": '../lib/backbone.babysitter/lib/backbone.babysitter',
        "marionette": '../lib/marionette/backbone.marionette',
        "text": '../lib/requirejs-text/text',
        "backbone.subroute": '../lib/backbone.subroute'
    },
    shim: {
        "jquery": {
            exports: '$'
        },
        "underscore": {
            exports: '_'
        },
        "backbone": {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        "marionette": {
            deps: ['backbone', 'jquery', 'underscore'],
            exports: 'Marionette'
        },
        "backbone.subroute": {
            deps: ['backbone']
        }

    }
});

define([
    'app/app',
    'app/appinit'
], function(mainApp, appInit) {
    appInit();
    mainApp.start();

});