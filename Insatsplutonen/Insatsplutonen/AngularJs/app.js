angular.module('app', ['ngRoute', 'app.controller', 'app.service', 'app.directive'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/articleSearch.htm',
                controller: 'ArticlesController',
                reloadOnSearch: false
            })
            .when('/article/:id', {
                templateUrl: '../../AngularJs/partials/article.htm',
                controller: 'ArticleController',
                reloadOnSearch: true
            })
            .when('/article/edit/:id', {
                templateUrl: '../../AngularJs/partials/editArticle.htm',
                controller: 'ArticleEditController',
                reloadOnSearch: true
            })
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
