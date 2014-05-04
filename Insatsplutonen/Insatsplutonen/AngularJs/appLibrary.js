angular.module('app', ['ngRoute', 'ngSanitize', 'app.controller', 'app.service', 'app.directive', 'app.common'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/media/library.htm',
                controller: 'MediaController',
                reloadOnSearch: false
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
