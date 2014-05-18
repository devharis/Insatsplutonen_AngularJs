angular.module('app', ['ngRoute', 'ngSanitize', 'app.controller', 'app.service', 'app.common', 'app.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/media/library.htm',
                controller: 'MediaController',
                reloadOnSearch: false
            })
            .when('/edit/:id', {
                templateUrl: '../../AngularJs/partials/media/edit.htm',
                controller: 'EditMediaController',
                reloadOnSearch: false
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
