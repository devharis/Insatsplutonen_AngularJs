angular.module('app', ['ngRoute', 'ngSanitize', 'app.controller', 'app.service', 'app.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/manage/postSearch.htm',
                controller: 'PostsEditController',
                reloadOnSearch: false
            })
            .when('/:id', {
                templateUrl: '../../AngularJs/partials/manage/editPost.htm',
                controller: 'PostEditController',
                reloadOnSearch: true
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
