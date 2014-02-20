define([
    'marionette',
    'app/app'
], function(Marionette, App) {

    var appController = Marionette.Controller.extend({
        doHome: function() {
            console.log('home');
        }
    });

    return Marionette.AppRouter.extend({
        controller: new appController(),
        appRoutes: {
            '': 'doHome'
        },
        initialize: function() {
        }
    });

});