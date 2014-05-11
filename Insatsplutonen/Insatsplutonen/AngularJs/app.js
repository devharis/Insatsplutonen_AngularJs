angular.module('app', ['ngRoute', 'ngSanitize', 'app.controller', 'app.service'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/post/postSearch.htm',
                controller: 'PostsController',
                reloadOnSearch: false
            })
            .when('/:id', {
                templateUrl: '../../AngularJs/partials/post/post.htm',
                controller: 'PostController',
                reloadOnSearch: true
            })
            .when('/edit/:id', {
                templateUrl: '../../AngularJs/partials/post/editPost.htm',
                controller: 'PostEditController',
                reloadOnSearch: true
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
