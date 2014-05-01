angular.module('app', ['ngRoute', 'ngSanitize', 'app.controller', 'app.service', 'app.directive'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/postSearch.htm',
                controller: 'PostsController',
                reloadOnSearch: false
            })
            .when('/:id', {
                templateUrl: '../../AngularJs/partials/post.htm',
                controller: 'PostController',
                reloadOnSearch: true
            })
            .when('/edit/:id', {
                templateUrl: '../../AngularJs/partials/editPost.htm',
                controller: 'PostEditController',
                reloadOnSearch: true
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
