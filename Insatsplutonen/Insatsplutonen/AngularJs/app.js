var appBlog = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'angular-flexslider', 'app.filter'])
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
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
