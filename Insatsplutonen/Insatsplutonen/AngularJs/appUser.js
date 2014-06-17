var userApp = angular.module('app', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'app.filter'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '../../AngularJs/partials/user/userSearch.htm',
                controller: 'UsersCtrl',
                reloadOnSearch: false
            })
            //.when('/edit/:id', {
            //    templateUrl: '../../AngularJs/partials/media/edit.htm',
            //    controller: 'UserEditCtrl',
            //    reloadOnSearch: false
            //})
            .otherwise({ templateUrl: '../../AngularJs/partials/404.htm' });
    }
    ]);
